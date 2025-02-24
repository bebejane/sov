import { Paragraph, Loader, TextInput, PageView, Image } from '@/components/ui';
import { useQuery } from '@/lib/client';
import { ValuedDirectionDocument } from '@/graphql';

export default function ValuedDirectionWithGoal() {
	const [data, error, loading, retry] = useQuery<ValuedDirectionQuery>(ValuedDirectionDocument);

	if (loading || error) return <Loader loading={loading} error={error} onRetry={retry} />;

	const { sovValuedDirection } = data;

	return (
		<PageView>
			<Paragraph>{sovValuedDirection?.intro}</Paragraph>
			<TextInput slug={sovValuedDirection?.input.slug} label={sovValuedDirection?.input.label} />
			<Paragraph>{sovValuedDirection?.text}</Paragraph>
			<Image data={sovValuedDirection?.image as FileField} />
		</PageView>
	);
}
