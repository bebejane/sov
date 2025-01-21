import { Paragraph, PageView, Loader, Header, Spacer } from "@/components/ui";
import { useQuery } from "@/lib/client";
import { SoundExerciseDocument } from "@/graphql";
import React from "react";
import AudioPlayer from "@/components/ui/AudioPlayer";
import YoutubePlayer from "@/components/YoutubePlayer";
import Theme from "../../styles/theme";
import { View } from "react-native";

export default function SoundExercises() {
	const [data, error, loading, retry] = useQuery<SoundExerciseQuery>(SoundExerciseDocument);

	if (loading || error)
		return (
			<Loader
				loading={loading}
				error={error}
				onRetry={retry}
			/>
		);

	const { sovSoundExercise } = data;

	return (
		<PageView>
			<Paragraph>{sovSoundExercise?.intro}</Paragraph>
			{sovSoundExercise?.exercises.map(({ title, file, youtube }, i) => (
				<View
					key={i}
					style={{ marginBottom: Theme.margin }}
				>
					<Spacer size='line' />
					<Header
						size='medium'
						margin='medium'
					>
						{title}
					</Header>
					{file && <AudioPlayer src={file.url} />}
					{youtube && <YoutubePlayer src={youtube.url} />}
				</View>
			))}
		</PageView>
	);
}
