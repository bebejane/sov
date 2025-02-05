import { Paragraph, PageView, Loader, TextInput, Button, Spacer } from "@/components/ui";
import { Text } from "react-native";
import { useQuery } from "@/lib/client";
import { TakeCareOfYourselfDocument } from "@/graphql";
import useStore from "../../lib/store";
import { useSegments } from "expo-router";

export default function TekeCareOfMyself() {
	const [section] = useSegments();
	const { resetKeys } = useStore();
	const [data, error, loading, retry] = useQuery<TakeCareOfYourselfQuery>(
		TakeCareOfYourselfDocument
	);

	if (loading || error)
		return (
			<Loader
				loading={loading}
				error={error}
				onRetry={retry}
			/>
		);

	const { sovTakeCareOfMyself } = data;
	if (!sovTakeCareOfMyself) return <Text>Det finns ingen data...</Text>;

	return (
		<PageView>
			<Paragraph>{sovTakeCareOfMyself.intro}</Paragraph>
			{sovTakeCareOfMyself.inputs.map(({ id, label, slug }) => (
				<TextInput
					key={id}
					slug={slug}
					label={label}
				/>
			))}
			<Button
				onPress={() =>
					resetKeys(
						sovTakeCareOfMyself.inputs.map(({ slug }) => slug),
						section
					)
				}
			>
				Rensa
			</Button>
		</PageView>
	);
}
