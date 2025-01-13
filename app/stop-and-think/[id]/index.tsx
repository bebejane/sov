import { Link } from "expo-router";
import { StyleSheet, Text } from "react-native";
import Theme from "@/styles/theme";
import { useQuery } from "@/lib/client";
import { Button, Loader, PageView, Spacer, StructuredContent } from "@/components/ui";
import { StopAndThinkToolDocument } from "@/graphql";
import useStore from "@/lib/store";
import { useLocalSearchParams, useRouter } from "expo-router";

export type Props = {
	params: {
		step: string;
	};
};

export default function Modal() {
	const router = useRouter();
	const id = useLocalSearchParams().id as string;
	const { updateData, data: storeData } = useStore();
	const [data, error, loading, retry] = useQuery<StopAndThinkToolQuery>(StopAndThinkToolDocument, {
		variables: { id },
	});

	if (loading || error)
		return (
			<Loader
				loading={loading}
				error={error}
				onRetry={retry}
			/>
		);

	const { sovStopAndThinkTool } = data;

	return (
		<PageView>
			<StructuredContent content={sovStopAndThinkTool?.content} />
			<Spacer />
			<Button onPress={retry}>Refresh</Button>
			<Spacer />
			<Button onPress={() => router.push("/stop-and-think")}>Back</Button>
		</PageView>
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
