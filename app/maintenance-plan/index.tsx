import { Paragraph, ScrollView, Loader, TextInput } from "@/components/ui";
import { useQuery } from "@/lib/client";
import { MaintanencePlanDocument } from "@/graphql";

export default function MaintenancePlan() {
	const [data, error, loading] = useQuery<MaintanencePlanQuery>(MaintanencePlanDocument);

	if (loading) return <Loader loading={loading} />;

	const { sovMaintanencePlan } = data;

	return (
		<ScrollView>
			<Paragraph>{sovMaintanencePlan?.intro}</Paragraph>
			{sovMaintanencePlan?.inputs.map(({ id, label, slug }) => (
				<TextInput
					key={id}
					label={label}
					slug={slug}
				/>
			))}
		</ScrollView>
	);
}
