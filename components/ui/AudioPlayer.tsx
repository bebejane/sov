import { AVPlaybackStatus, AVPlaybackStatusSuccess, Audio } from "expo-av";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import React, { useEffect, useRef } from "react";
import { Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
	Easing,
	useAnimatedStyle,
	withRepeat,
	withSequence,
	withTiming,
} from "react-native-reanimated";
import Theme from "@/styles/theme";

export default function AudioPlayer({ src }: { src: string }) {
	const [status, setStatus] = React.useState<AVPlaybackStatusSuccess | null>(null);
	const [error, setError] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState(false);
	const soundRef = useRef<Audio.Sound | null>(null);

	const loadAudio = async () => {
		console.log("loading sound...");
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
		soundRef.current?.setOnPlaybackStatusUpdate(function (status: AVPlaybackStatus) {
			setStatus(status as AVPlaybackStatusSuccess);
		});
		console.log("done loading sound...");
	};

	const play = async () => {
		if (!status?.isLoaded) {
			setLoading(true);
			try {
				await loadAudio();
			} catch (e) {
				setError((e as Error).message);
				setLoading(false);
				return;
			}
			setLoading(false);
		}

		soundRef.current?.playAsync();
	};

	const pause = () => {
		soundRef.current?.pauseAsync();
	};

	return (
		<AudioPlayerView
			active={true}
			playable={true}
			loading={loading}
			isLoaded={status?.isLoaded ? false : true}
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
	isLoaded: boolean; // is audio loaded
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
				name={!isPlaying ? "play" : "pause"}
				size={28}
				color={Theme.color.green}
				onPress={(e) => handleIconClick(e)}
			/>
			<Slider
				style={s.slider}
				value={duration}
				minimumValue={0}
				maximumValue={totalDuration == 0 ? 100 : totalDuration}
				step={1}
				minimumTrackTintColor={Theme.color.green}
				maximumTrackTintColor={Theme.color.white}
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
		height: 70,
		backgroundColor: Theme.color.lightGreen,
		borderRadius: Theme.borderRadius,
		marginBottom: Theme.margin / 2,
	},
	icon: {
		flexGrow: 1,
		flexShrink: 1,
		marginLeft: 20,
	},
	slider: {
		flexGrow: 6,
		flexShrink: 6,
		height: 30,
		marginLeft: 15,
		marginRight: 20,
	},
	duration: {
		color: Theme.color.green,
		flexGrow: 1,
		flexShrink: 1,
		marginRight: 20,
	},
});
