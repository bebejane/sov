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
	icon,
}: Props) {
	return (
		<TouchableOpacity
			style={[s.container, buttonStyles, disabled && s.disabled, s[size]]}
			disabled={disabled}
			onPress={onPress}
			accessibilityLabel={label || "A Button"}
		>
			{icon && (
				<Ionicons
					name={icon}
					size={20}
					color={Theme.color.black}
				/>
			)}
			<Text style={[s.text, textStyles]}>{children ?? label}</Text>
		</TouchableOpacity>
	);
}

const s = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 0,
		backgroundColor: Theme.color.white,
		borderColor: Theme.color.grey,
		borderWidth: 2,
		padding: 10,
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
		opacity: 0.5,
	},
	text: {
		color: Theme.color.black,
		textTransform: "uppercase",
	},
});
