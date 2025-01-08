import { Text } from "./Text";
import Theme from "@/styles/theme";

export const Header = ({
	children,
	style,
	size,
}: {
	children: any;
	style?: any;
	size: "small" | "medium" | "large";
}) => {
	const marginBottom = size === "small" ? 0 : Theme.margin / 2;

	return (
		<Text
			style={{
				fontSize: Theme.fontSize[size],
				fontWeight: "bold",
				marginBottom,
				...style,
			}}
		>
			{children}
		</Text>
	);
};
