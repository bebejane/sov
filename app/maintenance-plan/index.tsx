import { Paragraph, PageView, Loader, TextInput } from "@/components/ui";
import { useQuery } from "@/lib/client";
import { MaintanencePlanDocument } from "@/graphql";

export default function MaintenancePlan() {
	const [data, error, loading, retry] = useQuery<MaintanencePlanQuery>(MaintanencePlanDocument);

	if (loading || error)
		return (
			<Loader
				loading={loading}
				error={error}
				onRetry={retry}
			/>
		);

	const { sovMaintanencePlan } = data;

	return (
		<PageView>
			<Paragraph>{sovMaintanencePlan?.intro}</Paragraph>
			{sovMaintanencePlan?.inputs.map(({ id, label, slug }) => (
				<TextInput
					key={id}
					label={label}
					slug={slug}
				/>
			))}
		</PageView>
	);
}
