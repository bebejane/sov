import Slider from '@react-native-community/slider';
import { Text } from './Text';
import { StyleSheet, View } from 'react-native';
import { useSegments } from 'expo-router';
import React, { useState } from 'react';
import useStore from '@/lib/store';
import Theme from '@/styles/theme';

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
	const [defaultValue, seDefaultValue] = useState(slug ? data[section]?.[slug] : 0);
	const value = slug ? data[section]?.[slug] : 0;

	const handleOnChange = (step: number) => {
		if (!slug) return;
		updateData({ [slug]: step }, section);
	};

	return (
		<View key={id} style={s.container}>
			<View style={s.label}>
				<Text style={s.title}>{label}</Text>
				<Text style={s.value}>{value ?? '0'}</Text>
			</View>
			<Slider
				key={id}
				style={s.slider}
				value={defaultValue}
				minimumValue={min}
				maximumValue={max}
				step={1}
				minimumTrackTintColor={Theme.color.green}
				maximumTrackTintColor={Theme.color.grey}
				thumbTintColor={Theme.color.green}
				onValueChange={handleOnChange}
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
