import { Paragraph, ScrollView, Loader, Header, Slider } from "@/components/ui";
import { useQuery } from "@/lib/client";
import { AssessViolenceDocument } from "@/graphql";
import { useState } from "react";

export default function AssessViolence() {
	const [data, error, loading] = useQuery<AssessViolenceQuery>(AssessViolenceDocument);
	const [values, setValues] = useState<{ [key: string]: string }>({});

	if (loading) return <Loader loading={loading} />;

	const { sovAssessViolence } = data;

	return (
		<ScrollView>
			<Paragraph>{sovAssessViolence?.intro}</Paragraph>
			<Header size='medium'>Skatta våld sedan senaste samtalet</Header>
			{sovAssessViolence?.sinceLastSession.map(({ id, title }) => (
				<Slider
					key={id}
					label={title}
					id={id}
					value={values[id] ? Number(values[id]) : 0}
					onValueChange={(step) => setValues((t) => ({ ...t, [id]: step }))}
				/>
			))}
			<Header size='medium'>Andra bekymmer och problem</Header>
			{sovAssessViolence?.otherProblems.map(({ id, title }) => (
				<Slider
					key={id}
					label={title}
					id={id}
					value={values[id] ? Number(values[id]) : 0}
					onValueChange={(step) => setValues((t) => ({ ...t, [id]: step }))}
				/>
			))}
		</ScrollView>
	);
}
