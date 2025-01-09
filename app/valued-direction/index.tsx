import { Image } from "react-native";
import { Paragraph, View, Loader, TextInput } from "@/components/ui";
import { useQuery } from "@/lib/client";
import { ValuedDirectionDocument } from "@/graphql";
import Theme from "@/styles/theme";

export default function ValuedDirectionWithGoal() {
	const [data, error, loading] = useQuery<ValuedDirectionQuery>(ValuedDirectionDocument);

	if (loading) return <Loader loading={loading} />;

	const { sovValuedDirection } = data;

	return (
		<View>
			<Paragraph>{sovValuedDirection?.intro}</Paragraph>
			<TextInput
				slug={sovValuedDirection?.input.slug}
				label={sovValuedDirection?.input.label}
			/>
			<Paragraph>{sovValuedDirection?.text}</Paragraph>
			<Image
				width={Theme.screenWidth - Theme.padding * 2}
				height={200}
				source={{ uri: sovValuedDirection?.image?.url }}
			/>
		</View>
	);
}
