import { Paragraph, PageView, Loader, TextInput, Button } from "@/components/ui";
import { useQuery } from "@/lib/client";
import { TakeCareOfYourselfDocument } from "@/graphql";
import useStore from "../../lib/store";

export default function TekeCareOfMyself() {
	const [data, error, loading, retry] = useQuery<TakeCareOfYourselfQuery>(
		TakeCareOfYourselfDocument
	);
	const { resetKeys } = useStore();

	if (loading || error)
		return (
			<Loader
				loading={loading}
				error={error}
				onRetry={retry}
			/>
		);

	const { sovTakeCareOfMyself } = data;

	return (
		<PageView>
			<Paragraph>{sovTakeCareOfMyself?.intro}</Paragraph>
			{sovTakeCareOfMyself?.inputs.map(({ id, label, slug }) => (
				<TextInput
					key={id}
					slug={slug}
					label={label}
				/>
			))}
			<Button onPress={() => resetKeys(sovTakeCareOfMyself?.inputs.map(({ slug }) => slug))}>
				Rensa
			</Button>
		</PageView>
	);
}
