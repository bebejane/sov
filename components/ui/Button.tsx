import { StyleSheet, Button as ButtonElement } from "react-native";
import Theme from "@/styles/theme";

export const Button = ({
	title,
	style,
	onPress,
	disabled = false,
}: {
	title: string;
	style?: any;
	onPress: () => void;
	disabled?: boolean;
}) => {
	const s = StyleSheet.create({
		button: {
			fontSize: Theme.fontSize.default,
			color: Theme.color.black,
			marginBottom: Theme.margin,
			...style,
		},
	});
	return (
		<ButtonElement
			onPress={onPress}
			title={title}
			disabled={disabled}
		/>
	);
};
