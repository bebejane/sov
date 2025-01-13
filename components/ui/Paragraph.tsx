import { StyleSheet } from "react-native";
import Markdown from "react-native-markdown-display";
import Theme from "@/styles/theme";

export const Paragraph = ({ children, style }: { children: any; style?: any }) => {
	return <Markdown style={{ ...s.text, ...style }}>{children}</Markdown>;
};

const s = StyleSheet.create({
	text: {
		fontSize: Theme.fontSize.default,
		marginBottom: Theme.margin,
		backgroundColor: '#002333',
	},
});
