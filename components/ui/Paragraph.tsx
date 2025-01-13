import { StyleSheet } from "react-native";
import Markdown from "react-native-markdown-display";
import Theme from "@/styles/theme";

export const Paragraph = ({ children }: { children: any }) => {
	return <Markdown style={s}>{children}</Markdown>;
};

// Kolla här för att styla olika element
// https://github.com/iamacup/react-native-markdown-display/blob/master/src/lib/styles.js

const s = StyleSheet.create({
	body: {
		fontSize: Theme.fontSize.default,
		marginBottom: Theme.margin / 2,
		lineHeight: 20
	},
});
