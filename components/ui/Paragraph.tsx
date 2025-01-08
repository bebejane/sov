import { Text } from "./Text";
import Theme from "@/styles/theme";

export const Paragraph = ({ children, style }: { children: any; style?: any }) => {
	return <Text style={{ marginBottom: Theme.margin, ...style }}>{children}</Text>;
};
