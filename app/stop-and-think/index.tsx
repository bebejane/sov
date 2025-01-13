import { Loader, Text } from "@/components/ui";
import { View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { useQuery } from "@/lib/client";
import { StopAndThinkStepsDocument } from "@/graphql";
import { useState } from "react";
import Theme from "@/styles/theme";
import { Link, useRouter } from "expo-router";

const NUM_STEPS = 6;

type Step = {
	tool: StopAndThinkStepsQuery["allSovStopAndThinkTools"][0];
};

export default function StopAndThink() {
	const [data, error, loading, retry] = useQuery<StopAndThinkStepsQuery>(StopAndThinkStepsDocument);
	const [steps, setSteps] = useState<(Step | null)[]>(new Array(NUM_STEPS).fill(null));

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
		<View style={s.container}>
			{steps.map((s, i) => {
				return (
					<Step
						key={i}
						step={i + 1}
						label={s?.tool.title}
					/>
				);
			})}
		</View>
	);
}

type StepProps = {
	step: number;
	label?: string;
};

const Step = ({ step, label }: StepProps) => {
	const router = useRouter();
	return (
		<TouchableOpacity
			style={[s.step, label ? s.enabled : undefined]}
			onPress={() => router.push(`/stop-and-think/modal?step=${step}`)}
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
	},
	step: {
		display: "flex",
		flex: 1,
		flexDirection: "column",
		borderRadius: Theme.borderRadius,
		backgroundColor: Theme.color.lightGreen,
		borderWidth: Theme.borderWidth,
		borderColor: Theme.color.green,
		alignItems: "center",
		justifyContent: "center",
		padding: Theme.padding,
		marginBottom: 10,
		width: "100%",
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
