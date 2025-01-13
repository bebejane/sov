import { Paragraph, Loader, TextInput, PageView, Image } from "@/components/ui";
import { useQuery } from "@/lib/client";
import { ValuedDirectionDocument } from "@/graphql";
import Theme from "@/styles/theme";

export default function ValuedDirectionWithGoal() {
	const [data, error, loading] = useQuery<ValuedDirectionQuery>(ValuedDirectionDocument);

	if (loading)
		return (
			<Loader
				loading={loading}
				error={error}
			/>
		);

	const { sovValuedDirection } = data;

	return (
		<PageView>
			<Paragraph>{sovValuedDirection?.intro}</Paragraph>
			<TextInput
				slug={sovValuedDirection?.input.slug}
				label={sovValuedDirection?.input.label}
			/>
			<Paragraph>{sovValuedDirection?.text}</Paragraph>
			<Image src={sovValuedDirection?.image?.url} />
		</PageView>
	);
}
