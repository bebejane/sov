import {
	createAudioPlayer,
	useAudioPlayerStatus,
	setAudioModeAsync,
	setIsAudioActiveAsync,
	requestNotificationPermissionsAsync,
	type AudioPlayer as ExpoAudioPlayer,
	type AudioStatus,
} from 'expo-audio';
import { View, Text, StyleSheet, AppState, Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import React, { useState, useEffect, useRef } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ActivityIndicator } from 'react-native';
import Theme from '@/styles/theme';

export default function AudioPlayer({ src, title }: { src: string; title?: string }) {
	const [error, setError] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState(false);
	const [playing, setPlaying] = React.useState(false);
	const [player, setPlayer] = useState<ExpoAudioPlayer>(() =>
		createAudioPlayer(src, { keepAudioSessionActive: true })
	);
	const playerRef = useRef(player);
	const appState = useRef(AppState.currentState);

	const status: AudioStatus | null = useAudioPlayerStatus(player);

	const positionMs = status?.currentTime ? status.currentTime * 1000 : 0;
	const durationMs = status?.duration ? status.duration * 1000 : 0;

	// Keep ref in sync with player state (needed for cleanup on unmount)
	useEffect(() => {
		playerRef.current = player;
	}, [player]);

	// Update player source when src prop changes
	useEffect(() => {
		player.replace(src);
	}, [src]);

	// Cleanup player on unmount
	useEffect(() => {
		return () => {
			playerRef.current?.release();
		};
	}, []);

	// Sync playing state from player status
	useEffect(() => {
		if (status?.playing !== undefined) {
			setPlaying(status.playing);
		}
	}, [status?.playing]);

	// AppState listener: re-activate audio when returning to foreground
	useEffect(() => {
		const sub = AppState.addEventListener('change', (nextState) => {
			if (appState.current.match(/inactive|background/) && nextState === 'active') {
				setIsAudioActiveAsync(true);
				setAudioModeAsync({
					playsInSilentMode: true,
					shouldPlayInBackground: true,
					interruptionMode: 'doNotMix',
				});
			}
			appState.current = nextState;
		});
		return () => sub.remove();
	}, []);

	// Request notification permission on Android 13+ (required for foreground service)
	useEffect(() => {
		if (Platform.OS === 'android') {
			requestNotificationPermissionsAsync();
		}
	}, []);

	const setupAndPlay = async (p: ExpoAudioPlayer) => {
		await setAudioModeAsync({
			playsInSilentMode: true,
			shouldPlayInBackground: true,
			interruptionMode: 'doNotMix',
		});

		p.setActiveForLockScreen(true, {
			title: title ?? 'Ljudövning',
			artist: 'S o V',
			albumTitle: 'Ljudövningar',
		});

		p.play();
	};

	const play = async () => {
		setLoading(true);
		setError(null);

		try {
			await setupAndPlay(player);
		} catch (e) {
			// Player may be stale (e.g. after Android Activity destruction),
			// recreate it and retry
			try {
				const oldPlayer = playerRef.current;
				const newPlayer = createAudioPlayer(src, { keepAudioSessionActive: true });
				playerRef.current = newPlayer;
				setPlayer(newPlayer);
				oldPlayer?.release();
				await setupAndPlay(newPlayer);
			} catch (e2) {
				setPlaying(false);
				setError((e2 as Error).message);
			}
		}
		setLoading(false);
	};

	const pause = () => {
		player.pause();
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
	};

	const handleSeek = (val: number) => {
		player.seekTo(val / 1000);
	};

	const audioDuration = (totalDuration: number, currentDuration: number) => {
		if (totalDuration === 0) {
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
				value={positionMs}
				minimumValue={0}
				maximumValue={durationMs === 0 ? 100 : durationMs}
				step={1}
				minimumTrackTintColor={Theme.color.green}
				maximumTrackTintColor={Theme.color.white}
				accessibilityLabel='Audio Player'
				onSlidingComplete={handleSeek}
			/>
			<Text style={s.duration}>{audioDuration(durationMs, positionMs)}</Text>
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
		flexGrow: 0,
		flexShrink: 0,
		marginRight: 20,
	},
});
