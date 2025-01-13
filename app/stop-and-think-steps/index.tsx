import { Paragraph, PageView, Loader, Header, SliderInput, Text } from "@/components/ui";
import { useQuery } from "@/lib/client";
import { StopAndThinkStepsDocument } from "@/graphql";
import { useState } from "react";

export default function StopAndThinkSteps() {
	const [data, error, loading, retry] = useQuery<StopAndThinkStepsQuery>(StopAndThinkStepsDocument);
	const [values, setValues] = useState<{ [key: string]: string }>({});

	if (loading || error)
		return (
			<Loader
				loading={loading}
				error={error}
				onRetry={retry}
			/>
		);

	const { sovStopAndThinkStep } = data;

	return (
		<PageView>
			<Text>Stopp och tänk stegen</Text>
		</PageView>
	);
}
