import { Text } from "./Text";
import Markdown from "react-native-markdown-display";
import Theme from "@/styles/theme";

export const Paragraph = ({ children, style }: { children: any; style?: any }) => {
	return <Markdown style={{ marginBottom: Theme.margin, ...style }}>{children}</Markdown>;
};
