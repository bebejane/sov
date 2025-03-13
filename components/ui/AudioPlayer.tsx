import {
	AVPlaybackStatus,
	AVPlaybackStatusSuccess,
	Audio,
	InterruptionModeAndroid,
	InterruptionModeIOS,
} from 'expo-av';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import React, { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ActivityIndicator } from 'react-native';
import Theme from '@/styles/theme';

export default function AudioPlayer({ src }: { src: string }) {
	const [status, setStatus] = React.useState<AVPlaybackStatusSuccess | null>(null);
	const [error, setError] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState(false);
	const [playing, setPlaying] = React.useState(false);
	const soundRef = useRef<Audio.Sound | null>(null);
	const intervalRef = useRef<any | null>(null);
	const totalDuration = status?.durationMillis ? status?.durationMillis : 0;

	const loadAudio = async () => {
		setError(null);
		soundRef.current = null;

		try {
			const { sound, status } = await Audio.Sound.createAsync(
				{ uri: src },
				{ isLooping: false, shouldPlay: false }
			);
			soundRef.current = sound;
		} catch (e) {
			console.log(e);
			setError((e as Error).message);
		}
		if (Platform.OS === 'ios') {
			soundRef.current?.setOnPlaybackStatusUpdate(function (status: AVPlaybackStatus) {
				setStatus(status as AVPlaybackStatusSuccess);
			});
		} else if (Platform.OS === 'android') {
			const updatePlaybackStatus = async () => {
				const status = (await soundRef.current?.getStatusAsync()) as AVPlaybackStatusSuccess;
				setStatus(status);
				setPlaying(status.isPlaying);
			};

			clearInterval(intervalRef.current);
			intervalRef.current = setInterval(() => {
				updatePlaybackStatus();
			}, 500);

			updatePlaybackStatus();
		}
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

		await Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
			staysActiveInBackground: true,
			playsInSilentModeIOS: true,
			interruptionModeIOS: InterruptionModeIOS.DuckOthers,
			interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
			shouldDuckAndroid: true,
			playThroughEarpieceAndroid: true,
		});

		soundRef.current?.playAsync();
	};

	const pause = () => {
		soundRef.current?.pauseAsync();
	};

	const handleIconClick = (e: any) => {
		if (Platform.OS === 'web') {
			e?.preventDefault();
			e?.stopPropagation();
		}

		if (!playing) {
			play();
		} else {
			pause();
		}
		setPlaying(!playing);
	};

	const audioDuration = (totalDuration: number, currentDuration: number) => {
		if (totalDuration == 0) {
			return '00:00';
		}
		const minutes = Math.floor((totalDuration - currentDuration) / 60000);
		const seconds = parseInt((((totalDuration - currentDuration) % 60000) / 1000).toFixed(0));
		return `-${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	};

	return (
		<View style={s.view}>
			{error && (
				<View>
					<Text>Not playable...</Text>
				</View>
			)}
			{loading ? (
				<ActivityIndicator style={s.icon} size={28} color={Theme.color.greyDark} />
			) : (
				<Ionicons
					style={s.icon}
					name={!playing ? 'play' : 'pause'}
					size={28}
					color={Theme.color.green}
					onPress={(e) => handleIconClick(e)}
				/>
			)}
			<Slider
				style={s.slider}
				value={status?.positionMillis ?? 0}
				minimumValue={0}
				maximumValue={totalDuration == 0 ? 100 : totalDuration}
				step={1}
				minimumTrackTintColor={Theme.color.green}
				maximumTrackTintColor={Theme.color.white}
				accessibilityLabel='Audio Player'
				onSlidingComplete={(val: number) => {
					soundRef.current?.setPositionAsync(val);
				}}
			/>
			<Text style={s.duration}>{audioDuration(totalDuration, status?.positionMillis ?? 0)}</Text>
		</View>
	);
}

const s = StyleSheet.create({
	view: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
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
