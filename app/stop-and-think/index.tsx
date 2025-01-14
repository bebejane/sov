import { Button, Loader, Text } from "@/components/ui";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useQuery } from "@/lib/client";
import { StopAndThinkStepsDocument } from "@/graphql";
import Theme from "@/styles/theme";
import { Stack, useNavigation, useRouter } from "expo-router";
import useStore from "../../lib/store";
import { useEffect } from "react";

export const NUM_STEPS = 6;
export const defaultSteps = new Array(NUM_STEPS).fill(null);

type Step = {
	tool: StopAndThinkStepsQuery["allSovStopAndThinkTools"][0];
};

export default function StopAndThink() {
	const navigation = useNavigation();
	const [data, error, loading, retry] = useQuery<StopAndThinkStepsQuery>(StopAndThinkStepsDocument);
	const { updateData, data: storeData } = useStore();
	const steps = defaultSteps.map((s, i) => storeData?.steps?.[i] ?? defaultSteps[i]);

	useEffect(() => {
		navigation.setOptions({ headerShown: false });
	}, [data]);

	if (loading || error)
		return (
			<Loader
				loading={loading}
				error={error}
				onRetry={retry}
			/>
		);

	const { allSovStopAndThinkTools: tools } = data;

	return (
		<View style={s.container}>
			<View style={s.steps}>
				{steps.map((s, i) => {
					const tool = tools.find((t) => t.id === s);
					return (
						<Step
							key={i}
							toolId={tool?.id}
							step={i}
							label={tool?.title}
						/>
					);
				})}
				{/* <Button onPress={() => updateData({ steps: [] })}>Rensa</Button> */}
			</View>
			<View style={s.back}>
				<View style={[s.bar, s.left]} />
				<View style={[s.bar, s.right]} />
			</View>
		</View>
	);
}

type StepProps = {
	toolId?: string;
	step: number;
	label?: string;
};

const Step = ({ toolId, step, label }: StepProps) => {
	const router = useRouter();

	return (
		<TouchableOpacity
			style={[s.step, label ? s.enabled : undefined]}
			activeOpacity={0.8}
			onPress={() =>
				router.navigate(toolId ? `/stop-and-think/tool/${toolId}` : `/stop-and-think/step/${step}`)
			}
		>
			<Text style={s.stepText}>{label ?? "+"}</Text>
		</TouchableOpacity>
	);
};

const s = StyleSheet.create({
	container: {
		position: "relative",
		flex: 1,
		alignItems: "flex-start",
	},
	steps: {
		position: "absolute",
		left: 0,
		top: 0,
		width: "100%",
		height: "100%",
		display: "flex",
		flex: 1,
		flexDirection: "column",
		padding: Theme.padding,
		marginBottom: Theme.padding * 2,
		marginTop: Theme.padding * 2,
		zIndex: 2,
	},
	step: {
		display: "flex",
		flexBasis: `${80 / defaultSteps.length}%`,
		width: "100%",
		borderRadius: Theme.borderRadius,
		backgroundColor: Theme.color.lightGreen,
		borderWidth: Theme.borderWidth,
		borderColor: Theme.color.green,
		padding: Theme.padding / 1.5,
		marginBottom: 10,

		fontSize: Theme.fontSize.large,
		zIndex: 4,
	},
	enabled: {
		backgroundColor: Theme.color.green,
		alignItems: "flex-start",
		justifyContent: "flex-start",
	},
	stepText: {
		color: Theme.color.white,
	},
	back: {
		position: "absolute",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		zIndex: 0,
	},
	bar: {
		top: 0,
		left: 0,
		width: 20,
		height: "100%",
		backgroundColor: Theme.color.green,
		zIndex: 0,
	},
	left: {
		marginLeft: Theme.margin * 2,
	},
	right: {
		marginRight: Theme.margin * 2,
	},
});
