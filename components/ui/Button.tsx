import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Theme from "@/styles/theme";

type Props = {
	onPress: () => void;
	children?: string;
	disabled?: boolean;
	label?: string;
	buttonStyles?: any;
	textStyles?: any;
	size?: "small" | "large" | "full";
	icon?: (typeof Ionicons.defaultProps)["name"];
};

export function Button({
	onPress,
	children,
	disabled,
	label,
	buttonStyles,
	textStyles,
	size = "full",
}: Props) {
	return (
		<TouchableOpacity
			style={[s.container, buttonStyles, disabled && s.disabled, s[size]]}
			disabled={disabled}
			onPress={onPress}
			accessibilityLabel={label || "A Button"}
		>
			<Text style={[s.text, textStyles]}>{children ?? label}</Text>
		</TouchableOpacity>
	);
}

const s = StyleSheet.create({
	container: {
		flex: 0,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
		backgroundColor: Theme.color.green,
		borderColor: Theme.color.green,
		borderRadius: Theme.borderRadius,
		borderWidth: 0,
		padding: 15,
	},
	small: {
		width: "33%",
	},
	large: {
		width: "50%",
	},
	full: {
		width: "100%",
	},
	disabled: {
		opacity: 0.3,
	},
	text: {
		color: Theme.color.white,
		textTransform: "uppercase",
		letterSpacing: 2,
		fontWeight: 500,
	},
});
