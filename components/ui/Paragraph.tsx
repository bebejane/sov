import { StyleSheet, Text } from "react-native";
import Markdown from "react-native-markdown-display";
import Theme from "@/styles/theme";

export type Props = {
	children: React.ReactNode | React.ReactNode[];
	markdown?: boolean;
};

export const Paragraph = ({ children, markdown = true }: Props) => {
	if (markdown) return <Markdown style={s}>{children}</Markdown>;
	else return <Text style={s.body}>{children}</Text>;
};

// Kolla här för att styla olika element
// https://github.com/iamacup/react-native-markdown-display/blob/master/src/lib/styles.js

const s = StyleSheet.create({
	body: {
		fontSize: Theme.fontSize.default,
		marginBottom: Theme.margin / 2,
		lineHeight: Theme.lineHeight.default,
	},
});
