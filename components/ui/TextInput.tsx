import { StyleSheet, TextInput as TextInputElement } from "react-native";
import { Text } from "./Text";
import Theme from "@/styles/theme";
import useStore from "../../lib/store";
import React, { useState } from "react";
import { Header } from "./Header";

export const TextInput = ({
	title,
	label,
	slug,
	placeholder,
}: {
	title?: string;
	label?: string | undefined | null;
	slug: string | undefined | null;
	placeholder?: string;
}) => {
	const { updateData, data } = useStore();
	const [isFocused, setIsFocused] = useState(false);
	const [haveText, setHaveText] = useState(data[slug as string]?.length > 0);

	const handleChangeText = (t: string) => {
		slug && updateData({ [slug]: t });
		setHaveText(t?.length > 0);
	};

	return (
		<>
			{title && (
				<Header
					size='medium'
					margin='small'
				>
					{title}
				</Header>
			)}
			{label && <Text style={s.text}>{label}</Text>}
			<TextInputElement
				style={[
					s.input,
					isFocused && { backgroundColor: Theme.color.white },
					haveText && { backgroundColor: Theme.color.white },
				]}
				multiline={true}
				placeholder={placeholder}
				onChangeText={handleChangeText}
				defaultValue={slug ? data[slug] : undefined}
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
		fontWeight: 600,
		marginBottom: Theme.margin / 2,
		lineHeight: 20,
	},
	input: {
		height: Theme.fontSize.default * 5,
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
