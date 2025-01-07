import { Image } from "react-native";
import { Paragraph, View, Loader, TextInput, Header } from "@/styles";
import { useQuery } from "@/lib/client";
import { SoundExerciseDocument } from "@/graphql";
import Theme from "@/styles/theme";
import { useState } from "react";
import React from "react";
import AudioPlayer from "@/components/AudioPlayer";
import YoutubePlayer from "@/components/YoutubePlayer";

export default function SoundExercises() {
	const [data, error, loading] = useQuery<SoundExerciseQuery>(SoundExerciseDocument);

	if (loading) return <Loader loading={loading} />;

	const { sovSoundExercise } = data;

	return (
		<View>
			<Paragraph>{sovSoundExercise?.intro}</Paragraph>
			{sovSoundExercise?.exercises.map(({ title, file, youtube }, i) => (
				<React.Fragment key={i}>
					<Header size='small'>{title}</Header>
					{file && <AudioPlayer src={file.url} />}
					{youtube && <YoutubePlayer src={youtube.url} />}
				</React.Fragment>
			))}
		</View>
	);
}
