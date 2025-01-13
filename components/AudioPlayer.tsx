import { AVPlaybackStatusSuccess, Audio } from "expo-av";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import React, { useEffect, useRef } from "react";
import { Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Theme from "../styles/theme";

export default function AudioPlayer({ src }: { src: string }) {
	const [status, setStatus] = React.useState<AVPlaybackStatusSuccess | null>(null);
	const [error, setError] = React.useState<string | null>(null);
	const soundRef = useRef<any>(null);

	useEffect(() => {
		const loadAudio = async () => {
			console.log("loading audio");
			setError(null);
			soundRef.current = null;

			try {
				const { sound, status } = await Audio.Sound.createAsync(
					{ uri: src },
					{ isLooping: false, shouldPlay: false }
				);

				soundRef.current = sound;
			} catch (e) {
				setError((e as Error).message);
			}
			soundRef.current.setOnPlaybackStatusUpdate(function (status: AVPlaybackStatusSuccess) {
				setStatus(status);
			});
		};

		loadAudio();
		return () => {
			soundRef.current?.unloadAsync();
		};
	}, []);

	const play = () => {
		soundRef.current?.playAsync();
	};

	const pause = () => {
		soundRef.current?.pauseAsync();
	};

	return (
		<AudioPlayerView
			active={true}
			playable={true}
			loading={status?.isLoaded ? false : true}
			isPlaying={status?.isPlaying ?? false}
			playAudio={play}
			pauseAudio={pause}
			totalDuration={status?.durationMillis ?? 0}
			seekAudio={(value: number) => soundRef.current?.setPositionAsync(value)}
			duration={status?.positionMillis ?? 0}
		/>
	);
}

type AudioPlayerViewProps = {
	active: boolean; // is player active
	playable: boolean; // whether we can play the specific audio or not.
	loading: boolean; // is audio loading inside create async
	isPlaying: boolean; // is current audio playing
	playAudio: () => void; // callback function to play the audio.
	pauseAudio: () => void; // callback function to pause the audio
	totalDuration: number; // total time duration of the playable audio.
	seekAudio: (value: number) => void; // value to jump on value for the audio (in milliseconds)
	duration: number; // current playing duration value of audio player.
};

export const AudioPlayerView = ({
	active,
	playable,
	loading,
	isPlaying,
	playAudio,
	pauseAudio,
	totalDuration,
	seekAudio,
	duration,
}: AudioPlayerViewProps) => {
	const handleIconClick = (e: any) => {
		if (Platform.OS === "web") {
			e?.preventDefault();
			e?.stopPropagation();
		}

		if (!isPlaying) {
			playAudio();
		} else {
			pauseAudio();
		}
	};

	function audioDuration(currentDuration: number) {
		if (totalDuration == 0) {
			return "00:00";
		}
		const minutes = Math.floor((totalDuration - currentDuration) / 60000);
		const seconds = parseInt((((totalDuration - currentDuration) % 60000) / 1000).toFixed(0));
		return `-${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	}

	return (
		<View style={s.view}>
			{!playable ? (
				<View>
					<Text>Not playable...</Text>
				</View>
			) : null}
			<Ionicons
				style={s.icon}
				disabled={loading}
				name={!isPlaying ? "play" : "pause"}
				size={28}
				color={Theme.color.black}
				onPress={(e) => handleIconClick(e)}
			/>
			<Slider
				style={s.slider}
				value={duration}
				minimumValue={0}
				maximumValue={totalDuration == 0 ? 100 : totalDuration}
				step={1}
				minimumTrackTintColor='#000000'
				maximumTrackTintColor='#FFFFFF'
				accessibilityLabel='Audio Player'
				onValueChange={(step: number) => seekAudio(step)}
			/>
			<Text style={s.duration}>{audioDuration(duration)}</Text>
		</View>
	);
};

const s = StyleSheet.create({
	view: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		height: 50,
		backgroundColor: Theme.color.grey,
	},
	icon: {
		flexGrow: 1,
		flexShrink: 1,
		marginLeft: 10,
	},
	slider: {
		flexGrow: 6,
		flexShrink: 6,
		height: 30,
		marginLeft: 10,
		marginRight: 10,
	},
	duration: {
		color: Theme.color.black,
		flexGrow: 1,
		flexShrink: 1,
		marginRight: 10,
	},
});
