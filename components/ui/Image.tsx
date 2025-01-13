import { StyleSheet, Image as ImageElement } from "react-native";
import Theme from "@/styles/theme";

type Props = {
	src?: string;
	style?: any;
};

export const Image = ({ src, style }: Props) => {
	if (!src) return null;
	return (
		<ImageElement
			style={[s.image, style]}
			width={Theme.screenWidth - Theme.padding * 2}
			height={200}
			source={{ uri: src }}
		/>
	);
};

const s = StyleSheet.create({
	image: {
		width: Theme.screenWidth - Theme.padding * 2,
		marginTop: Theme.margin,
		objectFit: "contain",
	},
});
