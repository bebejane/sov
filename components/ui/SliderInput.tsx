import Slider from '@react-native-community/slider';
import { Text } from './Text';
import { StyleSheet, View } from 'react-native';
import { useSegments } from 'expo-router';
import React, { useEffect, useState } from 'react';
import useStore from '@/lib/store';
import Theme from '@/styles/theme';

export const SliderInput = ({
	id,
	label,
	slug,
	min,
	max,
	obligatory,
}: {
	id: string;
	label?: string | null | undefined;
	slug: string | undefined | null;
	min: number;
	max: number;
	obligatory?: boolean;
}) => {
	const [section] = useSegments();
	const { updateData, data } = useStore();
	const [value, setValue] = useState(slug ? data[section]?.[slug] ?? 0 : 0);
	const [valueLabel, setValueLabel] = useState(0);

	const handleOnChangeComplete = (step: number) => {
		if (!slug) return;
		setValue(step);
		updateData({ [slug]: step }, section);
	};

	const handleOnValueChange = (step: number) => {
		setValueLabel(step);
	};

	return (
		<View key={id} style={s.container}>
			<View style={s.label}>
				<Text style={s.title}>
					{label} {obligatory ? '*' : ''}
				</Text>
				<Text style={s.value}>{valueLabel}</Text>
			</View>
			<Slider
				key={id}
				style={s.slider}
				minimumValue={min}
				maximumValue={max}
				value={value}
				step={1}
				minimumTrackTintColor={Theme.color.green}
				maximumTrackTintColor={Theme.color.grey}
				thumbTintColor={Theme.color.green}
				onValueChange={handleOnValueChange}
				onSlidingComplete={handleOnChangeComplete}
			/>
		</View>
	);
};

const s = StyleSheet.create({
	container: {
		width: '100%',
		paddingBottom: Theme.margin / 2,
	},
	label: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	title: {
		flex: 1,
		color: Theme.color.green,
		fontSize: Theme.fontSize.small,
		fontWeight: 600,
		paddingBottom: Theme.margin / 2,
	},
	value: {
		fontWeight: 'bold',
		color: Theme.color.green,
	},
	slider: { width: '100%', height: 40 },
});
