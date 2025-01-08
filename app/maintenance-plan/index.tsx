import { Paragraph, ScrollView, Loader, TextInput } from "@/components/ui";
import { useQuery } from "@/lib/client";
import { MaintanencePlanDocument } from "@/graphql";
import Theme from "@/styles/theme";
import { useState } from "react";

export default function MaintenancePlan() {
	const [data, error, loading] = useQuery<MaintanencePlanQuery>(MaintanencePlanDocument);
	const [questions, setQuestions] = useState<{ [key: string]: string }>({});

	if (loading) return <Loader loading={loading} />;

	const { sovMaintanencePlan } = data;

	return (
		<ScrollView>
			<Paragraph>{sovMaintanencePlan?.intro}</Paragraph>
			{sovMaintanencePlan?.questions.map(({ id, title }) => (
				<TextInput
					key={id}
					label={title}
					value={questions[id]}
					onChangeText={(text) => setQuestions((t) => ({ ...t, [id]: text }))}
				/>
			))}
		</ScrollView>
	);
}
