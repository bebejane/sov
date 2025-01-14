import { Loader, Text } from "@/components/ui";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useQuery } from "@/lib/client";
import { StopAndThinkStepsDocument } from "@/graphql";
import Theme from "@/styles/theme";
import { useNavigation, useRouter } from "expo-router";
import useStore from "../../lib/store";
import { useEffect, useRef } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { Ionicons } from "@expo/vector-icons";

export const NUM_STEPS = 6;
export const defaultSteps = new Array(NUM_STEPS).fill({});

type Step = {
	tool: StopAndThinkStepsQuery["allSovStopAndThinkTools"][0];
};

export default function StopAndThink() {
	const navigation = useNavigation();
	const [data, error, loading, retry] = useQuery<StopAndThinkStepsQuery>(StopAndThinkStepsDocument);
	const { updateData, data: storeData } = useStore();
	const steps = defaultSteps.map((s, i) => storeData?.steps?.[i] ?? defaultSteps[i]);

	const openRowRef = useRef<any | null>(null);
	const onRowDidOpen = (rowKey: any, rowMap: any) => {
		openRowRef.current = rowMap[rowKey];
	};
	const closeOpenRow = () => {
		console.log("closeOpenRow");
		console.log(openRowRef.current);
		openRowRef.current?.closeRow?.();
		openRowRef.current = null;
	};

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
			<SwipeListView
				style={s.steps}
				data={steps}
				onRowOpen={onRowDidOpen}
				recalculateHiddenLayout={true}
				disableRightSwipe={true}
				closeOnRowOpen
				closeOnRowBeginSwipe
				rightOpenValue={-1 * (s.removeButton.width as number)}
				renderItem={({ item, index }) => {
					const tool = tools.find((t) => t.id === item);
					return (
						<Step
							key={index}
							toolId={tool?.id}
							step={index}
							label={tool?.title}
						/>
					);
				}}
				renderHiddenItem={(data: any, rowMap: any) => (
					<View style={[s.step, s.remove]}>
						<TouchableOpacity
							style={s.removeButton}
							onPress={(e) => {
								closeOpenRow();
								updateData({ steps: steps.map((s) => (s !== data?.item ? s : {})) });
							}}
						>
							<Ionicons
								style={s.removeIcon}
								disabled={false}
								name={"close-circle-outline"}
								size={28}
								color={Theme.color.black}
							/>
						</TouchableOpacity>
					</View>
				)}
			/>

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
		flexBasis: `${100 / defaultSteps.length}%`,
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
	remove: {
		flex: 1,
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
		width: "100%",
		padding: 0,
		borderColor: Theme.color.lightGreen,
	},
	removeButton: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Theme.color.white,
		padding: 0,
		width: 50,
	},
	removeText: {
		color: Theme.color.black,
	},
	removeIcon: {},
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
