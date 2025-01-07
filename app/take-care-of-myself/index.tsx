import { Paragraph, ScrollView, Loader, TextInput } from "@/styles";
import { useQuery } from "@/lib/client";
import { TakeCareOfYourselfDocument } from "@/graphql";
import Theme from "@/styles/theme";
import { useState } from "react";

export default function TekeCareOfMyself() {
	const [data, error, loading] = useQuery<TakeCareOfYourselfQuery>(TakeCareOfYourselfDocument);
	const [categories, setCategories] = useState<{ [key: string]: string }>({});

	if (loading) return <Loader loading={loading} />;

	const { sovTakeCareOfMyself } = data;

	return (
		<ScrollView>
			<Paragraph>{sovTakeCareOfMyself?.intro}</Paragraph>
			{sovTakeCareOfMyself?.categories.map(({ id, title }) => (
				<TextInput
					key={id}
					label={title}
					value={categories[id]}
					onChangeText={(text) => setCategories((t) => ({ ...t, [id]: text }))}
				/>
			))}
		</ScrollView>
	);
}
