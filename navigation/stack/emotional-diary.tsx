import { Stack, useRouter } from "expo-router";
import { HeaderBackButton } from "@react-navigation/elements";
import { formatDate } from "@/lib/utils";
import useStore from "@/lib/store";
import Theme from "../../styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { BackButton } from "./";

export default function EmotionalDiaryNavigation() {
	const router = useRouter();
	const { data } = useStore();
	const diary: any[] = data.diary ?? [];

	return (
		<Stack
			screenOptions={{
				headerLeft: (props) => <BackButton {...props} />,
			}}
		>
			{diary?.map(({ id, date }, i) => (
				<Stack.Screen
					key={id}
					name={`emotional-diary/${id}`}
					initialParams={{ id, date }}
					options={{
						title: formatDate(date),
						headerTitle: formatDate(date),
					}}
				/>
			))}
		</Stack>
	);
}

const s = StyleSheet.create({
	backButton: {
		color: Theme.color.green,
	},
});
