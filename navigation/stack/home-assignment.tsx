import { Stack, useRouter } from "expo-router";
import { HeaderBackButton } from "@react-navigation/elements";
import { formatDate } from "@/lib/utils";
import useStore from "@/lib/store";
import Theme from "../../styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { BackButton } from "./";

export default function HomeAssignmentNavigation() {
	const router = useRouter();
	const { data } = useStore();
	const assignments: any[] = data.assignments ?? [];

	return (
		<Stack
			screenOptions={{
				headerLeft: (props) => <BackButton {...props} />,
			}}
		>
			{assignments?.map(({ id, date }, i) => (
				<Stack.Screen
					key={id}
					name={`home-assignments/${id}`}
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
