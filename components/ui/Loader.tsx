import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "./Text";
import Ionicons from "@expo/vector-icons/Ionicons";
import Theme from "@/styles/theme";

type Props = {
	loading: boolean;
	error: any;
	onRetry?: () => void;
};

export const Loader = ({ loading, error, onRetry }: Props) => {
	return (
		<View style={s.view}>
			{!error && loading && <Text>Loading...</Text>}
			{error && (
				<View style={s.error}>
					<Text style={s.errorText}>Ett fel uppstod</Text>
					<TouchableOpacity onPress={() => onRetry?.()}>
						<Ionicons
							name='refresh'
							size={Theme.fontSize.large}
							color={Theme.color.black}
						/>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

const s = StyleSheet.create({
	view: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: Theme.screenWidth,
	},
	loading: {
		color: Theme.color.white,
		fontSize: Theme.fontSize.default,
	},
	error: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	errorText: {
		color: Theme.color.black,
		marginBottom: 10,
	},
});
