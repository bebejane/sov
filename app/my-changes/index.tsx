import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import {
	PageView,
	Loader,
	Header,
	Button,
	TextInput,
	SliderInput,
	Spacer,
	List,
	Paragraph,
} from '@/components/ui';
import { Text } from 'react-native';
import { useQuery } from '@/lib/client';
import { MyChangesDocument, SorkDocument } from '@/graphql';
import React, { useEffect } from 'react';
import useStore from '@/lib/store';
import { useNavigation, useRouter, useSegments } from 'expo-router';

export default function MyChanges() {
	const [section] = useSegments();
	const router = useRouter();
	const navigation = useNavigation();
	const [data, error, loading, retry] = useQuery<MyChangesQuery>(MyChangesDocument);
	const { updateData, data: storeData, resetKeys } = useStore();
	const items = storeData.sorks ?? [];

	useEffect(() => {
		navigation.setOptions({ headerShown: false });
	}, [data]);

	if (loading || error) return <Loader loading={loading} error={error} onRetry={retry} />;

	const { sovMyChange } = data;

	if (!sovMyChange) return <Text>Det finns ingen data...</Text>;

	/*
	const itemLabelSlug = sovSork?.inputs.find(
		(item) => item.label.toLowerCase() === 'situation',
	)?.slug;

	const isValidItem = () => {
		const currentItem: { [key: string]: string | number } = {};

		sovMyChange?.inputsViolence.forEach((item) => {
			currentItem[item.slug] = storeData[section]?.[item.slug];
		});

		return Object.keys(currentItem).some(
			(key) =>
				currentItem[key] !== undefined && currentItem[key] !== null && currentItem[key] !== '',
		);
	};

	const save = () => {
		const currentItem: { [key: string]: string | number } = {
			id: nanoid(),
			date: new Date().toString(),
		};

		sovSork?.inputs.forEach((item) => {
			currentItem[item.slug] = storeData[section]?.[item.slug];
		});

		const sorks = [...items, currentItem].sort((a, b) =>
			new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : 1,
		);

		const resetFields = sovSork?.inputs.map((item: any) => item.slug) as string[];
		updateData(sorks, 'sorks');
		resetKeys(resetFields, section);
	};
*/
	return (
		<PageView>
			<Header size='medium' margin={'small'}>
				Våldsamma sidan
			</Header>
			<Paragraph>{sovMyChange.introViolence}</Paragraph>
			{sovMyChange?.inputsViolence.map((item) =>
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
			<Paragraph>{sovMyChange.introVulnerable}</Paragraph>
			{sovMyChange?.inputsVulnerable.map((item) =>
				item.__typename === 'SovInputTextRecord' ? (
					<React.Fragment key={item.id}>
						<TextInput title={item.label} label={item.text} slug={item.slug} />
					</React.Fragment>
				) : null,
			)}
			{/*
			<Button
				onPress={() =>
					resetKeys(
						sovMyChange?.inputsViolence.map((item) => item.slug),
						section,
					)
				}
			>
				Rensa
			</Button>
			<Spacer size='small' />
			<Button disabled={!isValidItem()} onPress={save}>
				Spara
			</Button>
			<Spacer />
			<List
				onPress={(id) => router.navigate(`/sork/${id}`)}
				title='Sork'
				emptyText='Det finns inga sparade inlägg...'
				items={items?.map((item) => ({
					id: item.id,
					date: item.date,
					label: itemLabelSlug && item[itemLabelSlug] ? item[itemLabelSlug] : 'Ingen titel...',
				}))}
			/>
			*/}
		</PageView>
	);
}
