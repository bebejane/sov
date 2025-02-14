import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import { PageView, Loader, Button, TextInput, SliderInput, Spacer, List } from '@/components/ui';
import { Text } from 'react-native';
import { useQuery } from '@/lib/client';
import { SorkDocument } from '@/graphql';
import React, { useEffect } from 'react';
import useStore from '@/lib/store';
import { useNavigation, useRouter, useSegments } from 'expo-router';

export default function Sork() {
	const [section] = useSegments();
	const router = useRouter();
	const navigation = useNavigation();
	const [data, error, loading, retry] = useQuery<SorkQuery>(SorkDocument);
	const { updateData, data: storeData, resetKeys } = useStore();
	const items = storeData.sorks ?? [];

	useEffect(() => {
		navigation.setOptions({ headerShown: false });
	}, [data]);

	if (loading || error) return <Loader loading={loading} error={error} onRetry={retry} />;

	const { sovSork } = data;

	if (!sovSork) return <Text>Det finns ingen data...</Text>;

	const itemLabelSlug = sovSork?.inputs.find(
		(item) => item.label.toLowerCase() === 'situation'
	)?.slug;

	const isValidItem = () => {
		const currentItem: { [key: string]: string | number } = {};

		sovSork?.inputs.forEach((item) => {
			currentItem[item.slug] = storeData[section]?.[item.slug];
		});

		return Object.keys(currentItem).some(
			(key) =>
				currentItem[key] !== undefined && currentItem[key] !== null && currentItem[key] !== ''
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
			new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : 1
		);

		const resetFields = sovSork?.inputs.map((item: any) => item.slug) as string[];
		updateData(sorks, 'sorks');
		resetKeys(resetFields, section);
	};

	return (
		<PageView>
			{sovSork?.inputs.map((item) =>
				item.__typename === 'SovInputTextRecord' ? (
					<React.Fragment key={item.id}>
						<TextInput title={item.label} label={item.text} slug={item.slug} />
					</React.Fragment>
				) : (
					<SliderInput
						key={item.id}
						id={item.id}
						label={item.label}
						slug={item.slug}
						min={item.min}
						max={item.max}
					/>
				)
			)}
			<Button
				onPress={() =>
					resetKeys(
						sovSork.inputs.map((item) => item.slug),
						section
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
		</PageView>
	);
}
