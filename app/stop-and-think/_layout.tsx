import { useQuery } from "@/lib/client";
import { StopAndThinkStepsDocument } from "@/graphql";
import { Stack } from "expo-router";
import { BackButton } from "@/components/BackButton";

export default function Layout() {
	const [data, error, loading, retry] = useQuery<StopAndThinkStepsQuery>(StopAndThinkStepsDocument);
	const { allSovStopAndThinkTools: tools } = data;

	return (
		<Stack
			screenOptions={{
				headerLeft: (props) => <BackButton {...props} />,
			}}
		>
			{tools?.map(({ id, title, description }, i) => (
				<Stack.Screen
					key={id}
					name={`stop-and-think/tool/${id}`}
					initialParams={{ id, title }}
					options={{
						title,
						headerTitle: title,
					}}
				/>
			))}
		</Stack>
	);
}
