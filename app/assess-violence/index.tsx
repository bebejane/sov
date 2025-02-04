import { PageView, Loader, Header, SliderInput, Spacer } from "@/components/ui";
import { useQuery } from "@/lib/client";
import { AssessViolenceDocument } from "@/graphql";

export default function AssessViolence() {
	const [data, error, loading, retry] = useQuery<AssessViolenceQuery>(AssessViolenceDocument);

	if (loading || error)
		return (
			<Loader
				loading={loading}
				error={"sad"}
				onRetry={retry}
			/>
		);

	const { sovAssessViolence } = data;

	return (
		<PageView>
			<Spacer size='small' />
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
			<Spacer size='medium' />
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
		</PageView>
	);
}
