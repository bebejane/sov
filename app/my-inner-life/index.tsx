import 'react-native-get-random-values';
import { PageView, Loader, Header, TextInput, Spacer, Paragraph } from '@/components/ui';
import { Text } from 'react-native';
import { useQuery } from '@/lib/client';
import { MyInnerLifeDocument } from '@/graphql';
import React from 'react';

export default function MyChanges() {
	const [data, error, loading, retry] = useQuery<MyInnerLifeQuery>(MyInnerLifeDocument);

	if (loading || error) return <Loader loading={loading} error={error} onRetry={retry} />;

	const { sovMyInnerLife } = data;

	if (!sovMyInnerLife) return <Text>Det finns ingen data...</Text>;

	return (
		<PageView>
			<Header size='medium' margin={'small'}>
				Våldsamma sidan
			</Header>
			<Paragraph>{sovMyInnerLife.introViolence}</Paragraph>
			{sovMyInnerLife?.inputsViolence.map((item) =>
				item.__typename === 'SovInputTextRecord' ? (
					<React.Fragment key={item.id}>
						<TextInput title={item.label} label={item.text} slug={item.slug} />
					</React.Fragment>
				) : null,
			)}
			<Spacer />
			<Header size='medium' margin={'small'}>
				Sårbara sidan
			</Header>
			<Paragraph>{sovMyInnerLife.introVulnerable}</Paragraph>
			{sovMyInnerLife?.inputsVulnerable.map((item) =>
				item.__typename === 'SovInputTextRecord' ? (
					<React.Fragment key={item.id}>
						<TextInput title={item.label} label={item.text} slug={item.slug} />
					</React.Fragment>
				) : null,
			)}
		</PageView>
	);
}
