import Slider from "@react-native-community/slider";
import { Text } from "./Text";
import { useEffect, useState } from "react";
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
	const { setData, data } = useStore();
	const [value, setValue] = useState<number>(slug ? data[slug] : min);

	useEffect(() => {
		slug && setData({ [slug]: value ?? min });
	}, [value]);

	return (
		<React.Fragment key={id}>
			<Text>
				{label} ({value ?? "0"})
			</Text>
			<Slider
				key={id}
				style={{ width: "100%", height: 40 }}
				value={slug ? data[slug] : min}
				minimumValue={min}
				maximumValue={max}
				step={1}
				minimumTrackTintColor='#000000'
				maximumTrackTintColor='#FFFFFF'
				onValueChange={(step: number) => setValue(step)}
			/>
		</React.Fragment>
	);
};
