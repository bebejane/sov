import {
	useAudioPlayer,
	useAudioPlayerStatus,
	setAudioModeAsync,
	type AudioStatus,
} from 'expo-audio';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ActivityIndicator } from 'react-native';
import Theme from '@/styles/theme';

export default function AudioPlayer({ src, title }: { src: string; title: string }) {
	const [error, setError] = React.useState<string | null>(null);
	const [loading, setLoading] = React.useState(false);
	const [playing, setPlaying] = React.useState(false);
	const player = useAudioPlayer(src);
	const status: AudioStatus | null = useAudioPlayerStatus(player);

	const positionMs = status?.currentTime ? status.currentTime * 1000 : 0;
	const durationMs = status?.duration ? status.duration * 1000 : 0;

	useEffect(() => {
		if (status?.playbackState) {
			setPlaying(status.playbackState === 'playing');
		}
	}, [status?.playbackState]);

	const play = async () => {
		setLoading(true);
		setError(null);

		try {
			await setAudioModeAsync({
				playsInSilentMode: true,
				shouldPlayInBackground: true,
				interruptionMode: 'doNotMix',
			});

			player.setActiveForLockScreen(true, {
				title: title ?? 'Ljudövning',
				artist: 'S o V',
				albumTitle: 'Ljudövningar',
			});

			player.play();
		} catch (e) {
			setError((e as Error).message);
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
		setPlaying(!playing);
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
