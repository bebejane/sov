import { useNavigation } from 'expo-router';
import { StyleSheet } from 'react-native';
import { PageView, Button, Text, Image, Spacer } from '@/components/ui';
import { useLocalSearchParams } from 'expo-router';
import useStore from '@/lib/store';
import { formatDate } from '@/lib/utils';
import Theme from '@/styles/theme';
import React from 'react';
import { useFocusEffect } from 'expo-router';

export type Props = {
	params: {
		id: string;
	};
};

export default function NotepadItem() {
	const navigation = useNavigation();
	const id = useLocalSearchParams().id as string;
	const { data: storeData, updateData } = useStore();
	const note = storeData.notes?.find((item: any) => id === item.id);
	//let tmp = await FileSystem.getInfoAsync(uri);
	useFocusEffect(() => {
		if (!note) return;
		navigation.setOptions({ title: formatDate(note.date) });
	});

	if (!note) return <Text>Hittade ej anteckning med id: {id}</Text>;

	return (
		<PageView>
			<Text>{note.text}</Text>
			<Spacer />
			{note.images?.map((image, i) => (
				<Image
					key={i}
					data={{ url: image.uri, width: image.width, height: image.height } as FileField}
				/>
			))}
			<Button
				onPress={() => {
					updateData({ notes: storeData.notes?.filter((item: any) => item.id !== id) });
					navigation.goBack();
				}}
			>
				Ta bort
			</Button>
		</PageView>
	);
}

const s = StyleSheet.create({});
