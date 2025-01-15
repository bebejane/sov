import { HeaderBackButton } from "@react-navigation/elements";
import Theme from "../../styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export function BackButton(props: any) {
	const router = useRouter();
	return (
		<HeaderBackButton
			{...props}
			tintColor={Theme.color.green}
			label={""}
			backImage={() => (
				<Ionicons
					name='chevron-back'
					style={s.backButton}
					size={24}
				/>
			)}
			onPress={() => router.back()}
		/>
	);
}

const s = StyleSheet.create({
	backButton: {
		color: Theme.color.green,
	},
});
