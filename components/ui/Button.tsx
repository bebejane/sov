import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";
import Theme from "@/styles/theme";

type Props = {
	onPress: () => void;
	children?: string;
	disabled?: boolean;
	label?: string;
	buttonStyles?: any;
	textStyles?: any;
};

export function Button(props: Props) {
	return (
		<TouchableOpacity
			style={[s.container, props.buttonStyles, props.disabled && s.disabled]}
			disabled={props.disabled}
			onPress={props.onPress}
			accessibilityLabel={props.label || "A Button"}
		>
			<Text style={[s.text, props.textStyles]}>{props.children || props.label}</Text>
		</TouchableOpacity>
	);
}

const s = StyleSheet.create({
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 0,
		backgroundColor: Theme.color.white,
		borderColor: Theme.color.grey,
		borderWidth: 2,
		padding: 10,
	},
	disabled: {
		opacity: 0.5,
	},
	text: {
		color: Theme.color.black,
		textTransform: "uppercase",
	},
});
