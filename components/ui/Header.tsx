import { StyleSheet } from "react-native";
import { Text } from "./Text";
import Theme from "@/styles/theme";

export const Header = ({
	children,
	size = "medium",
	margin = "medium",
}: {
	children: any;
	size: "small" | "medium";
	margin: "small" | "medium" | "large";
}) => {
	return <Text style={[s.text, s[size], s[`${margin}Margin`]]}>{children}</Text>;
};

const s = StyleSheet.create({
	text: {
		fontSize: Theme.fontSize.default,
		fontWeight: "bold",
	},
	small: {
		fontSize: Theme.fontSize.small,
	},
	medium: {
		fontSize: Theme.fontSize.medium,
	},
	smallMargin: {
		marginBottom: Theme.margin,
	},
	mediumMargin: {
		marginBottom: Theme.margin * 2,
	},
	largeMargin: {
		marginBottom: Theme.margin * 3,
	},
});
