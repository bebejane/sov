import { StyleSheet, TextInput as TextInputElement, Keyboard } from 'react-native';
import { Text } from './Text';
import Theme from '@/styles/theme';
import useStore from '@/lib/store';
import React, { useState } from 'react';
import { Header } from './Header';
import { useSegments } from 'expo-router';

export const TextInput = ({
	title,
	label,
	slug,
	placeholder,
	obligatory,
	rows = 5,
}: {
	title?: string;
	label?: string | undefined | null;
	slug: string | undefined | null;
	placeholder?: string;
	obligatory?: boolean;
	rows?: number;
}) => {
	const [section] = useSegments();
	const { updateData, data } = useStore();
	const [isFocused, setIsFocused] = useState(false);
	const [haveText, setHaveText] = useState(data[section]?.[slug as string]?.length > 0);

	const handleChangeText = (t: string) => {
		slug && updateData({ [slug]: t }, section);
		setHaveText(t?.length > 0);
	};

	return (
		<>
			{title && (
				<Header size='medium' margin='small'>
					{title}
				</Header>
			)}
			{label && (
				<Text style={s.text}>
					{label} {obligatory ? '*' : ''}
				</Text>
			)}
			<TextInputElement
				style={[
					s.input,
					{ height: Theme.fontSize.default * rows },
					haveText && {
						backgroundColor: Theme.color.white,
						borderColor: Theme.color.grey,
					},
					isFocused && {
						backgroundColor: Theme.color.white,
					},
					isFocused &&
						haveText && {
							borderColor: Theme.color.green,
						},
				]}
				multiline={true}
				placeholder={placeholder}
				onChangeText={handleChangeText}
				defaultValue={slug ? data[section]?.[slug] : undefined}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>
		</>
	);
};

const s = StyleSheet.create({
	text: {
		color: Theme.color.green,
		fontSize: Theme.fontSize.small,
		fontWeight: 500,
		marginBottom: Theme.margin / 2,
		lineHeight: Theme.lineHeight.default,
	},
	input: {
		padding: 10,
		paddingLeft: 15,
		paddingRight: 15,
		marginBottom: Theme.margin,
		backgroundColor: Theme.color.lightGreen,
		borderColor: Theme.color.green,
		borderRadius: Theme.borderRadius,
		borderWidth: 1,
		fontSize: Theme.fontSize.default,
		lineHeight: Theme.lineHeight.default,
	},
});
