import React from "react";
import YTPlayer from "react-native-youtube-iframe";

export default function YoutubePlayer({ src }: { src: string }) {
	const youtubeId = new URL(src).searchParams.get("v");
	if (!youtubeId) return null;

	return (
		<YTPlayer
			height={200}
			videoId={youtubeId}
		/>
	);
}
