import Theme from "@/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { HeaderBackButton } from "@react-navigation/elements";
import { useNavigation } from "expo-router";
import { StyleSheet } from "react-native";

export function BackButton(props: any) {
	const navigation = useNavigation();

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
			onPress={() => {
				navigation.goBack();
			}}
		/>
	);
}

const s = StyleSheet.create({
	backButton: {
		color: Theme.color.green,
	},
});
