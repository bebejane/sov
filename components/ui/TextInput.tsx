import { StyleSheet, TextInput as TextInputElement } from "react-native";
import { Text } from "./Text";
import Theme from "@/styles/theme";

export const TextInput = ({
	value,
	label,
	placeholder,
	onChangeText,
}: {
	value?: string;
	label?: string | undefined | null;
	placeholder?: string;
	onChangeText: (t: string) => void;
}) => {
	const s = StyleSheet.create({
		text: {
			color: Theme.color.greyDark,
			fontSize: Theme.fontSize.small,
			marginBottom: Theme.margin / 2,
		},
	});

	return (
		<>
			<Text style={s.text}>{label}</Text>
			<TextInputElement
				style={{
					height: Theme.fontSize.default * 4,
					padding: 10,
					marginBottom: Theme.margin,
					backgroundColor: Theme.color.grey,
				}}
				multiline={true}
				placeholder={placeholder}
				onChangeText={onChangeText}
				defaultValue={value}
			/>
		</>
	);
};
