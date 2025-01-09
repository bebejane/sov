import { Paragraph, ScrollView, Loader, TextInput } from "@/components/ui";
import { useQuery } from "@/lib/client";
import { TakeCareOfYourselfDocument } from "@/graphql";
import Theme from "@/styles/theme";
import { useState } from "react";

export default function TekeCareOfMyself() {
	const [data, error, loading] = useQuery<TakeCareOfYourselfQuery>(TakeCareOfYourselfDocument);

	if (loading) return <Loader loading={loading} />;

	const { sovTakeCareOfMyself } = data;

	return (
		<ScrollView>
			<Paragraph>{sovTakeCareOfMyself?.intro}</Paragraph>
			{sovTakeCareOfMyself?.inputs.map(({ id, label, slug }) => (
				<TextInput
					key={id}
					slug={slug}
					label={label}
				/>
			))}
		</ScrollView>
	);
}
