import { Paragraph, ScrollView, Loader, Header, SliderInput } from "@/components/ui";
import { useQuery } from "@/lib/client";
import { AssessViolenceDocument } from "@/graphql";
import { useState } from "react";

export default function AssessViolence() {
	const [data, error, loading] = useQuery<AssessViolenceQuery>(AssessViolenceDocument);

	if (loading) return <Loader loading={loading} />;

	const { sovAssessViolence } = data;

	return (
		<ScrollView>
			<Paragraph>{sovAssessViolence?.intro}</Paragraph>
			<Header size='medium'>Skatta våld sedan senaste samtalet</Header>
			{sovAssessViolence?.sinceLastSession.map(({ id, label, slug, min, max }) => (
				<SliderInput
					key={id}
					id={id}
					label={label}
					slug={slug}
					min={min}
					max={max}
				/>
			))}
			<Header size='medium'>Andra bekymmer och problem</Header>
			{sovAssessViolence?.otherProblems.map(({ id, label, slug, min, max }) => (
				<SliderInput
					key={id}
					id={id}
					label={label}
					slug={slug}
					min={min}
					max={max}
				/>
			))}
		</ScrollView>
	);
}
