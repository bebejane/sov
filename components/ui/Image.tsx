import { StyleSheet, Image as ImageElement, View } from "react-native";

import Theme from "@/styles/theme";

export type Props = {
	data?: FileField;
	style?: any | undefined | null;
};

export const Image = ({ data, style }: Props) => {
	if (!data?.url) return null;

	const width = Theme.screenWidth - Theme.padding * 2;
	const ratio = width / data.width; //541 is actual image width

	const height = data.height * ratio;

	return (
		<ImageElement
			style={[s.image, style]}
			width={width}
			height={height}
			resizeMode={"contain"}
			source={{ uri: `${data.url}?w=1000` }}
		/>
	);
};

const s = StyleSheet.create({
	image: {
		marginLeft: -3,
		marginRight: -3,
		marginBottom: Theme.margin,
	},
});
