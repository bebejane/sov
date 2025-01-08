import { StyleSheet } from "react-native";
import SliderElement from "@react-native-community/slider";
import { Text } from "./Text";
import Theme from "@/styles/theme";
import { useEffect, useState } from "react";
import React from "react";

export const Slider = ({
	id,
	label,
	value: _value,
	onValueChange,
}: {
	id: string;
	label?: string | null | undefined;
	value: number;
	onValueChange: (value: number) => void;
}) => {
	const [value, setValue] = useState<number>(_value);

	useEffect(() => {
		onValueChange(value ?? 0);
	}, [value]);

	useEffect(() => {
		setValue(_value);
	}, [_value]);

	return (
		<React.Fragment key={id}>
			<Text>
				{label} ({value ?? "0"})
			</Text>
			<SliderElement
				key={id}
				style={{ width: "100%", height: 40 }}
				value={value}
				minimumValue={0}
				maximumValue={10}
				step={1}
				minimumTrackTintColor='#000000'
				maximumTrackTintColor='#FFFFFF'
				onValueChange={(step: number) => setValue(step)}
			/>
		</React.Fragment>
	);
};
