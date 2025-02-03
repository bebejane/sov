import Theme from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { HeaderBackButton } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";

export function StackHeaderBackButton(props: any) {
	const router = useRouter();

	return (
		<RectButton
			{...props}
			style={{ padding: 10, marginLeft: -10 }}
			tintColor={Theme.color.green}
			label={""}
			onPress={() => router.back()}
		>
			<Ionicons
				name='chevron-back'
				style={s.backButton}
				size={24}
			/>
		</RectButton>
	);
}

const s = StyleSheet.create({
	backButton: {
		color: Theme.color.green,
	},
});
