import { StyleSheet, Text as TextElement } from "react-native";
import Theme from "@/styles/theme";

export const Text = ({
	children,
	style,
	onPress,
}: {
	children: any;
	style?: any;
	onPress?: () => void;
}) => {
	return (
		<TextElement
			style={[s.text, style]}
			onPress={onPress}
		>
			{children}
		</TextElement>
	);
};

const s = StyleSheet.create({
	text: {
		fontSize: Theme.fontSize.default,
		color: Theme.color.black,
		lineHeight: Theme.lineHeight.default
	},
});
