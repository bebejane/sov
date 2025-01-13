import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import Theme from "@/styles/theme";
import { useState } from "react";
import { useQuery } from "../../lib/client";
import { Loader } from "../../components/ui";
import { StopAndThinkStepsDocument } from "../../graphql";

export type Props = {
	tools: StopAndThinkStepsQuery["allSovStopAndThinkTools"];
};

export default function Modal() {
	const [data, error, loading, retry] = useQuery<StopAndThinkStepsQuery>(StopAndThinkStepsDocument);
	console.log(data);
	if (loading || error)
		return (
			<Loader
				loading={loading}
				error={error}
				onRetry={retry}
			/>
		);

	const { sovStopAndThink, allSovStopAndThinkTools: tools } = data;

	return (
		<Animated.View
			entering={FadeIn}
			style={s.container}
		>
			{/* Dismiss modal when pressing outside */}
			<Link
				href='/stop-and-think'
				asChild
			>
				<Pressable style={StyleSheet.absoluteFill} />
			</Link>
			<Animated.View
				entering={SlideInDown}
				style={s.box}
			>
				<View style={s.tools}>
					{tools.map((tool) => (
						<View key={tool.id}>
							<Text>{tool.title}</Text>
						</View>
					))}
				</View>
				<Link href='/stop-and-think'>
					<Text>← Go back</Text>
				</Link>
			</Animated.View>
		</Animated.View>
	);
}

const s = StyleSheet.create({
	container: {
		flex: 1,
		display: "flex",
		padding: 50,
		justifyContent: "center",
		backgroundColor: "transparent",
		opacity: 0.5,
		height: "100%",
	},
	box: {
		backgroundColor: Theme.color.white,
		padding: Theme.padding,
	},
	tools: {
		display: "flex",
		flexDirection: "column",
	},
});
