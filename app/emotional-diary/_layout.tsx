import useStore from "@/lib/store";
import { Stack } from "expo-router";
import { formatDate } from "@/lib/utils";
import { StackHeaderBackButton } from "@/components/StackHeaderBackButton";

export default function Layout() {
	const { data } = useStore();
	const diary: any[] = data.diary ?? [];

	return (
		<Stack
			screenOptions={{
				headerLeft: (props) => <StackHeaderBackButton {...props} />,
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
