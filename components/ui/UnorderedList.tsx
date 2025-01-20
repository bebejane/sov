import { StyleSheet, View } from "react-native";
import { Text } from "./Text";
import Theme from "@/styles/theme";

export const UnorderedList = ({
	items,
	style,
}: {
	items: { id: string; label: string }[];
	style?: any;
}) => {
	return (
		<View style={[s.list, style]}>
			{items.map((item, index) => (
				<View
					key={index}
					style={s.row}
				>
					<View style={s.item}>
						<Text style={s.bullet}>• </Text>
						<Text style={s.text}>{item.label}</Text>
					</View>
				</View>
			))}
		</View>
	);
};

const s = StyleSheet.create({
	list: {
		display: "flex",
		flexDirection: "column",
		marginBottom: Theme.margin / 2,
	},
	row: {
		marginBottom: Theme.margin / 4,
	},

	item: {
		display: "flex",
		flexDirection: "row",
		alignItems: "flex-start",
	},
	bullet: {
		paddingRight: 0,
		color: Theme.color.green,
	},
	text: {
		flex: 1,
		fontSize: Theme.fontSize.default,
	},
});
