import { useNavigation } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Header, Loader, PageView, Spacer, Button, Text } from '@/components/ui';
import { useLocalSearchParams } from 'expo-router';
import useStore from '@/lib/store';
import { formatDate } from '@/lib/utils';
import { useQuery } from '../../../lib/client';
import { EmotionalDiaryDocument } from '@/graphql';
import React from 'react';
import { useFocusEffect } from 'expo-router';

export type Props = {
	params: {
		id: string;
	};
};

export default function EmotionalDiaryItem() {
	const [data, error, loading, retry] = useQuery<EmotionalDiaryQuery>(EmotionalDiaryDocument);
	const navigation = useNavigation();
	const id = useLocalSearchParams().id as string;
	const { data: storeData, updateData } = useStore();
	const diary = storeData.diary?.find((item: any) => id === item.id);

	useFocusEffect(() => {
		if (!diary) return;
		navigation.setOptions({ title: formatDate(diary.date) });
	});

	if (loading || error) return <Loader loading={loading} error={error} onRetry={retry} />;

	if (!diary) return <Text>Hittade ej dagboksinlägg med id: {id}</Text>;

	const { sovEmotionalDiary } = data;

	return (
		<PageView>
			{sovEmotionalDiary?.inputs.map(({ id, label, text, slug }, i) => (
				<React.Fragment key={i}>
					<Header size='small' margin='small'>
						{label}
					</Header>
					<Text>{diary[slug]}</Text>
					<Spacer />
				</React.Fragment>
			))}
			<Button
				onPress={() => {
					updateData({ diary: storeData.diary?.filter((item: any) => item.id !== id) });
					navigation.goBack();
				}}
			>
				Ta bort
			</Button>
		</PageView>
	);
}

const s = StyleSheet.create({});
