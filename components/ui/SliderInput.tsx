import Slider from "@react-native-community/slider";
import { Text } from "./Text";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
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
	const { updateData, data } = useStore();
	const [value, setValue] = useState<number>(slug ? data[slug] : min);

	const handleOnChange = (step: number) => {
		setValue(step);
	};
	useEffect(() => {
		slug && updateData({ [slug]: value ?? min });
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
	},
	value: {
		fontWeight: "bold",
	},
	slider: { width: "100%", height: 40 },
});
