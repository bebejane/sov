import { Link, useNavigation } from "expo-router";
import { Pressable, StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native";
import Theme from "@/styles/theme";
import { useQuery } from "@/lib/client";
import { Loader, Spacer, Button } from "@/components/ui";
import { StopAndThinkStepsDocument } from "@/graphql";
import useStore from "@/lib/store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { defaultSteps } from "../../index";
import { useEffect } from "react";

export type Props = {
	params: {
		step: string;
	};
};

export default function StopAndthinkStep() {
	const router = useRouter();
	const navigation = useNavigation();
	const { updateData, data: storeData } = useStore();
	const [data, error, loading, retry] = useQuery<StopAndThinkStepsQuery>(StopAndThinkStepsDocument);
	const step = parseInt(useLocalSearchParams().step as string) ?? 0;
	const steps = defaultSteps.map((s, i) => storeData?.steps?.[i] ?? defaultSteps[i]);

	useEffect(() => {
		navigation.setOptions({ title: "Välj verktyg" });
	}, []);

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
		router.back();
	}

	const { allSovStopAndThinkTools: tools } = data;
	const selectedTool = tools.find(({ id }) => id === steps[step]);
	const availableTools = tools.filter(({ id }) => !steps.find((s) => s === id));

	return (
		<View style={s.container}>
			<Link
				href='/stop-and-think'
				asChild
			>
				<Pressable style={StyleSheet.absoluteFill} />
			</Link>
			<FlatList
				style={s.tools}
				data={tools.map(({ id, title }) => ({ id, title }))}
				renderItem={({ item }) => {
					const disabled = availableTools.find(({ id }) => id === item.id) === undefined;
					const selected = selectedTool?.id === item.id;
					return (
						<TouchableOpacity
							key={item.id}
							disabled={disabled && !selected}
						>
							<Button
								disabled={disabled && !selected}
								buttonStyles={s.toolItem}
								textStyles={[selected ? s.selected : undefined]}
								onPress={() => handlePress(item.id)}
							>
								{item.title}
							</Button>
						</TouchableOpacity>
					);
				}}
			/>
			<Spacer />
		</View>
	);
}

const s = StyleSheet.create({
	container: {
		flex: 1,
		display: "flex",
		padding: 20,
		backgroundColor: "transparent",
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
		marginBottom: 2,
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
