import React from "react";
import { View } from "react-native";
import YTPlayer from "react-native-youtube-iframe";

export default function YoutubePlayer({ src }: { src: string }) {
	if (!src) return null;
	const youtubeId = new URL(src).searchParams.get("v");
	if (!youtubeId) return null;

	return (
		<View style={{ marginBottom: 20 }}>
			<YTPlayer
				height={200}
				videoId={youtubeId}
			/>
		</View>
	);
}
