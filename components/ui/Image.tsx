import { StyleSheet, Image as ImageElement, View } from "react-native";

import Theme from "@/styles/theme";

type Props = {
	src?: string;
	style?: any;
};

export const Image = ({ src, style }: Props) => {
	if (!src) return null;
	const width = Theme.screenWidth - Theme.padding * 2;

	return (
		<View style={s.container}>
			<ImageElement
				style={[s.image, style]}
				width={width}
				resizeMode='contain'
				source={{ uri: `${src}?w=1000` }}
			/>
		</View>
	);
};

const s = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
	},
	image: {
		objectFit: "contain",
		marginLeft: -3,
		marginRight: -3,
		marginBottom: Theme.margin,
		aspectRatio: 1,
	},
});
