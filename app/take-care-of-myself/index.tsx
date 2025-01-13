import { Paragraph, PageView, Loader, TextInput } from "@/components/ui";
import { useQuery } from "@/lib/client";
import { TakeCareOfYourselfDocument } from "@/graphql";
import Theme from "@/styles/theme";
import { useState } from "react";

export default function TekeCareOfMyself() {
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
		</PageView>
	);
}
