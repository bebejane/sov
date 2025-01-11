import { StyleSheet, TextInput as TextInputElement } from "react-native";
import { Text } from "./Text";
import Theme from "@/styles/theme";
import useStore from "../../lib/store";

export const TextInput = ({
	label,
	slug,
	placeholder,
}: {
	label?: string | undefined | null;
	slug: string | undefined | null;
	placeholder?: string;
}) => {
	const { updateData, data } = useStore();
	const handleChangeText = (t: string) => {
		slug && updateData({ [slug]: t });
	};

	return (
		<>
			<Text style={s.text}>{label}</Text>
			<TextInputElement
				style={s.input}
				multiline={true}
				placeholder={placeholder}
				onChangeText={handleChangeText}
				defaultValue={slug ? data[slug] : undefined}
			/>
		</>
	);
};

const s = StyleSheet.create({
	text: {
		color: Theme.color.greyDark,
		fontSize: Theme.fontSize.small,
		marginBottom: Theme.margin / 2,
	},
	input: {
		height: Theme.fontSize.default * 4,
		padding: 10,
		marginBottom: Theme.margin,
		backgroundColor: Theme.color.grey,
		borderRadius: Theme.borderRadius,
	},
});
