import { useNavigation } from "expo-router";
import { StyleSheet } from "react-native";
import Theme from "@/styles/theme";
import { useQuery } from "@/lib/client";
import { Button, Loader, PageView } from "@/components/ui";
import StructuredContent from "@/components/StructuredContent";
import { StopAndThinkToolDocument } from "@/graphql";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

export type Props = {
	params: {
		step: string;
	};
};

export default function StopAndThinkTool() {
	const navigation = useNavigation();
	const id = useLocalSearchParams().id as string;
	const [data, error, loading, retry] = useQuery<StopAndThinkToolQuery>(StopAndThinkToolDocument, {
		variables: { id },
	});

	useEffect(() => {
		navigation.setOptions({ title: data.sovStopAndThinkTool?.title });
	}, [data]);

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
			{/*<Button onPress={retry}>Reload</Button>*/}
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
