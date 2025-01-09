import { Paragraph, ScrollView, Loader, Header, SliderInput, Text } from "@/components/ui";
import { useQuery } from "@/lib/client";
import { StopAndThinkStepsDocument } from "@/graphql";
import { useState } from "react";

export default function StopAndThinkSteps() {
	const [data, error, loading] = useQuery<StopAndThinkStepsQuery>(StopAndThinkStepsDocument);
	const [values, setValues] = useState<{ [key: string]: string }>({});

	if (loading) return <Loader loading={loading} />;

	const { sovStopAndThinkStep } = data;

	return (
		<ScrollView>
			<Text>Stopp och tänk stegen</Text>
		</ScrollView>
	);
}
