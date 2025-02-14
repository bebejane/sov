import { useNavigation } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Header, Loader, PageView, Spacer, Button, Text } from '@/components/ui';
import { useLocalSearchParams } from 'expo-router';
import useStore from '@/lib/store';
import { formatDate } from '@/lib/utils';
import { useQuery } from '../../../lib/client';
import { SorkDocument } from '@/graphql';
import React from 'react';
import { useFocusEffect } from 'expo-router';

export type Props = {
	params: {
		id: string;
	};
};

export default function SorkItem() {
	const [data, error, loading, retry] = useQuery<SorkQuery>(SorkDocument);
	const navigation = useNavigation();
	const id = useLocalSearchParams().id as string;
	const { data: storeData, updateData } = useStore();
	const sork = storeData.sorks?.find((item: any) => id === item.id);
	const titleKey = Object.keys(sork ?? {}).find((key: string) => key.toLowerCase() === 'situation');
	const title = titleKey ? sork?.[titleKey] : 'Ingen titel...';

	useFocusEffect(() => {
		if (!sork) return;
		navigation.setOptions({ title });
	});

	if (loading || error) return <Loader loading={loading} error={error} onRetry={retry} />;

	if (!sork) return <Text>Hittade ej inlägg med id: {id}</Text>;

	const { sovSork } = data;

	return (
		<PageView>
			{sovSork?.inputs.map(({ id, label, text, slug }, i) => (
				<React.Fragment key={i}>
					<Header size='small' margin='small'>
						{label}
					</Header>
					<Text>{sork[slug]}</Text>
					<Spacer />
				</React.Fragment>
			))}
			<Button
				onPress={() => {
					updateData({ sorks: storeData.sorks?.filter((item: any) => item.id !== id) });
					navigation.goBack();
				}}
			>
				Ta bort
			</Button>
		</PageView>
	);
}

const s = StyleSheet.create({});
