import Slider from "@react-native-community/slider";
import { Text } from "./Text";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import React from "react";
import useStore from "../../lib/store";

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
			<Text>
				{label} ({value ?? "0"})
			</Text>
			<Slider
				key={id}
				style={s.slider}
				value={value}
				minimumValue={min}
				maximumValue={max}
				step={1}
				minimumTrackTintColor='#000000'
				maximumTrackTintColor='#FFFFFF'
				onValueChange={handleOnChange}
			/>
		</View>
	);
};

const s = StyleSheet.create({
	container: {
		width: "100%",
	},
	slider: { width: "100%", height: 40 },
});
