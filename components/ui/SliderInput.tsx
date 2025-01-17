import Slider from "@react-native-community/slider";
import { Text } from "./Text";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSegments } from "expo-router";
import React from "react";
import useStore from "../../lib/store";
import Theme from "@/styles/theme";

export const SliderInput = ({
	id,
	label,
	slug,
	min,
	max,
}: {
	id: string;
	label?: string | null | undefined;
	slug: string | undefined | null;
	min: number;
	max: number;
}) => {
	const [section] = useSegments();
	const { updateData, data } = useStore();
	const [value, setValue] = useState<number>(slug ? data[section]?.[slug] : min);

	const handleOnChange = (step: number) => {
		setValue(step);
	};
	useEffect(() => {
		slug && updateData({ [slug]: value ?? min }, section);
	}, [value]);

	return (
		<View
			key={id}
			style={s.container}
		>
			<View style={s.label}>
				<Text style={s.title}>{label}</Text>
				<Text style={s.value}>{value ?? "0"}</Text>
			</View>
			<Slider
				key={id}
				style={s.slider}
				value={value}
				minimumValue={min}
				maximumValue={max}
				step={1}
				minimumTrackTintColor={Theme.color.green}
				maximumTrackTintColor={Theme.color.grey}
				onValueChange={handleOnChange}
			/>
		</View>
	);
};

const s = StyleSheet.create({
	container: {
		width: "100%",
		paddingBottom: Theme.margin / 2,
	},
	label: {
		flexDirection: "row",
		alignItems: "center",
	},
	title: {
		flex: 1,
		color: Theme.color.green,
		fontSize: Theme.fontSize.small,
		fontWeight: 600,
	},
	value: {
		fontWeight: "bold",
		color: Theme.color.green,
	},
	slider: { width: "100%", height: 40 },
});
