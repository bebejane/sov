import { Loader, Text } from "@/components/ui";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useQuery } from "@/lib/client";
import { StopAndThinkStepsDocument } from "@/graphql";
import Theme from "@/styles/theme";
import { useNavigation, useRouter } from "expo-router";
import useStore from "../../lib/store";
import { useEffect, useRef } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { LinearGradient } from "expo-linear-gradient";

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

	const openRowRef = useRef<any | null>(null);
	const onRowDidOpen = (rowKey: any, rowMap: any) => (openRowRef.current = rowMap[rowKey]);
	const closeOpenRow = () => openRowRef.current?.closeRow?.();

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
				contentContainerStyle={s.stepsContent}
				data={steps.map((s, i) => ({ id: s, key: `k${i}` }))}
				onRowOpen={onRowDidOpen}
				recalculateHiddenLayout={true}
				disableRightSwipe={true}
				closeOnRowOpen
				closeOnRowBeginSwipe
				rightOpenValue={-1 * (s.removeButton.width as number)}
				renderItem={({ item, index }) => {
					const tool = tools.find((t) => t.id === item.id);
					return (
						<Step
							key={index}
							toolId={tool?.id}
							step={index}
							label={tool?.title}
						/>
					);
				}}
				renderHiddenItem={(data: any, rowMap: any) => {
					return (
						<TouchableOpacity
							style={[s.step, s.remove]}
							onPress={(e) => {
								updateData({ steps: steps.map((s) => (s === data.item.id ? null : s)) });
								closeOpenRow();
							}}
						>
							<View style={s.removeButton}>
								<Text style={s.removeText}>Ta bort</Text>
							</View>
						</TouchableOpacity>
					);
				}}
			/>

			<View style={s.back}>
				<LinearGradient
					colors={[Theme.color.lightGreen, Theme.color.green]}
					end={{ x: 0, y: 0.4 }}
					style={[s.bar, s.left]}
				/>
				<LinearGradient
					colors={[Theme.color.lightGreen, Theme.color.green]}
					end={{ x: 0, y: 0.4 }}
					style={[s.bar, s.right]}
				/>
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
	const enabled = toolId && label;
	return (
		<TouchableOpacity
			style={[s.step, enabled ? s.enabled : undefined]}
			activeOpacity={0.9}
			onPress={() =>
				router.navigate(toolId ? `/stop-and-think/tool/${toolId}` : `/stop-and-think/step/${step}`)
			}
		>
			<Text style={[s.stepText, enabled && s.stepTextEnabled]}>{label ?? "+"}</Text>
		</TouchableOpacity>
	);
};

const s = StyleSheet.create({
	container: {
		position: "relative",
		display: "flex",
		flex: 1,
		alignItems: "flex-start",
		height: "100%",
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
	stepsContent: {
		height: "100%",
	},
	step: {
		display: "flex",
		flex: 1,
		flexBasis: `${80 / defaultSteps.length}%`,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		color: Theme.color.white,
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
		color: Theme.color.green,
		fontWeight: 600,
	},
	stepTextEnabled: {
		color: Theme.color.white,
	},
	remove: {
		flex: 1,
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
		width: "100%",
		padding: 0,
		borderColor: Theme.color.green,
	},
	removeButton: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Theme.color.lightGreen,
		padding: 0,
		width: 100,
	},
	removeText: {
		color: Theme.color.green,
	},
	removeIcon: {
		color: Theme.color.black,
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
		width: 25,
		height: "100%",
		//background: `linear-gradient(0deg, ${Theme.color.green} 50%, ${Theme.color.lightGreen} 100%)`,
		backgroundColor: Theme.color.green,
		zIndex: 0,
	},
	left: {
		marginLeft: Theme.margin * 2.5,
	},
	right: {
		marginRight: Theme.margin * 2.5,
	},
});
