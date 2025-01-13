import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import Theme from "@/styles/theme";
import { useQuery } from "@/lib/client";
import { Loader, Spacer } from "@/components/ui";
import { StopAndThinkStepsDocument } from "@/graphql";
import useStore from "@/lib/store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { defaultSteps } from "../../index";

export type Props = {
	params: {
		step: string;
	};
};

export default function Modal() {
	const router = useRouter();
	const { updateData, data: storeData } = useStore();
	const [data, error, loading, retry] = useQuery<StopAndThinkStepsQuery>(StopAndThinkStepsDocument);
	const step = parseInt(useLocalSearchParams().step as string) ?? 0;
	const steps = defaultSteps.map((s, i) => storeData?.steps?.[i] ?? defaultSteps[i]);

	if (loading || error)
		return (
			<Loader
				loading={loading}
				error={error}
				onRetry={retry}
			/>
		);

	function handlePress(toolId: string) {
		steps[step] = toolId;
		updateData({ steps });
		router.push("/stop-and-think");
	}

	const { sovStopAndThink, allSovStopAndThinkTools: tools } = data;
	const selectedTool = tools.find(({ id }) => id === steps[step]);
	const availableTools = tools.filter(({ id }) => !steps.find((s) => s === id));

	return (
		<Animated.View
			entering={FadeIn}
			style={s.container}
		>
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
					{tools.map((tool) => {
						const disabled = availableTools.find(({ id }) => id === tool.id) === undefined;
						const selected = selectedTool?.id === tool.id;
						return (
							<TouchableOpacity
								key={tool.id}
								disabled={disabled && !selected}
								onPress={() => handlePress(tool.id)}
							>
								<Text
									style={[s.toolItem, selected ? s.selected : disabled ? s.disabled : undefined]}
								>
									{tool.title}
								</Text>
							</TouchableOpacity>
						);
					})}
				</View>
				<Spacer />
				<Link href='/stop-and-think'>
					<Text>Stäng</Text>
				</Link>
			</Animated.View>
		</Animated.View>
	);
}

const s = StyleSheet.create({
	container: {
		flex: 1,
		display: "flex",
		padding: 20,
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
	toolItem: {
		display: "flex",
		flexDirection: "row",
	},
	disabled: {
		opacity: 0.5,
		pointerEvents: "none",
	},
	selected: {
		color: Theme.color.green,
		opacity: 1,
	},
});
