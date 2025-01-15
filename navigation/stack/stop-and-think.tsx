import { Stack } from "expo-router";
import { StopAndThinkStepsDocument } from "@/graphql";
import { useQuery } from "@/lib/client";
import { BackButton } from ".";

export default function StopAndthinkNavigation() {
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
