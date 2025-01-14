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
		<>
			<View style={s.container}>
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
				<Button onPress={() => updateData({ steps: [] })}>Rensa</Button>
			</View>
		</>
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
		display: "flex",
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: Theme.padding,
		marginBottom: Theme.padding * 2,
		marginTop: Theme.padding * 2,
	},
	step: {
		display: "flex",
		flexBasis: "15%",
		flexDirection: "column",
		borderRadius: Theme.borderRadius,
		backgroundColor: Theme.color.lightGreen,
		borderWidth: Theme.borderWidth,
		borderColor: Theme.color.green,
		alignItems: "center",
		justifyContent: "center",
		padding: Theme.padding / 1.5,
		marginBottom: 10,
		width: "100%",
		fontSize: Theme.fontSize.large,
	},
	enabled: {
		backgroundColor: Theme.color.green,
		alignItems: "flex-start",
		justifyContent: "flex-start",
	},
	stepText: {
		color: Theme.color.white,
	},
});
