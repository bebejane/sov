import useStore from "@/lib/store";
import { formatDate } from "@/lib/utils";
import Theme from "@/styles/theme";
import { Stack } from "expo-router";
import { StackHeaderBackButton } from "@/components/StackHeaderBackButton";

export default function Layout() {
	const { data } = useStore();
	const assignments: any[] = data.assignments ?? [];

	return (
		<Stack
			screenOptions={{
				headerLeft: (props) => <StackHeaderBackButton {...props} />,
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
