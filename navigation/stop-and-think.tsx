import { Stack, useRouter } from "expo-router";
import { HeaderBackButton } from "@react-navigation/elements";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StopAndThinkStepsDocument } from "@/graphql";
import { useQuery } from "@/lib/client";
import { Loader } from "../components/ui";

export default function StopAndthinkNavigation() {
	const router = useRouter();
	const [data, error, loading, retry] = useQuery<StopAndThinkStepsQuery>(StopAndThinkStepsDocument);
	const { allSovStopAndThinkTools: tools } = data;

	return (
		<Stack
			screenOptions={{
				headerLeft: (props) => {
					return (
						<>
							<HeaderBackButton
								{...props}
								label={"Back"}
								onPress={() => {
									router.back();
								}}
							/>
						</>
					);
				},
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
