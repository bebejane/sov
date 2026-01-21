import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import { Button, TextInput, PageView, Spacer, List, Image } from '@/components/ui';
import { StyleSheet, Alert, View, TouchableOpacity, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import useStore from '../../lib/store';
import { useNavigation, useRouter, useSegments } from 'expo-router';
import Theme from '@/styles/theme';
import * as ImagePicker from 'expo-image-picker';

export default function Notepad() {
	const [section] = useSegments();
	const navigation = useNavigation();
	const router = useRouter();
	const [images, setImages] = useState<ImagePicker.ImagePickerAsset[] | null>(null);
	const { updateData, data: storeData, resetKeys } = useStore();
	const items = storeData.notes || [];

	useEffect(() => {
		navigation.setOptions({ headerShown: false });
	}, []);

	const save = () => {
		const currentItem: { [key: string]: string | number } = {
			id: nanoid(),
			date: new Date().toString(),
			text: storeData.notepad.note,
			images: images ?? [],
		} as any;

		const notes = [...items, currentItem].sort((a, b) =>
			new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : 1,
		);

		updateData(notes, 'notes');
		resetKeys(['note'], 'notepad');
		setImages(null);
	};

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library.
		// Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
		// and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
		// so the app users aren't surprised by a system dialog after picking a video.
		// See "Invoke permissions for videos" sub section for more details.
		const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (!permissionResult.granted) {
			Alert.alert('Permission required', 'Permission to access the media library is required.');
			return;
		}

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images'],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled && result.assets.length > 0) {
			setImages((i) => [...(i ?? []), result.assets[0] as ImagePicker.ImagePickerAsset]);
		}
	};

	console.log(!storeData?.notepad?.note);
	return (
		<PageView>
			<TextInput slug={'note'} label={'Anteckning'} rows={10} />
			{images?.map((image, i) => (
				<View key={i} style={s.imageWrap}>
					<Image data={{ url: image.uri, width: image.width, height: image.height } as FileField} />
					<TouchableOpacity
						style={[s.imageRemove]}
						onPress={() => setImages((i) => i?.filter((i) => i.uri !== image.uri) ?? null)}
						accessibilityLabel={'Ta bort bild'}
					>
						<Text style={[s.imageRemoveButton]}>Ta bort</Text>
					</TouchableOpacity>
				</View>
			))}
			<Button onPress={pickImage}>+ Bild</Button>
			<Spacer />
			<Button onPress={save} disabled={!storeData?.notepad?.note}>
				Spara
			</Button>
			<Spacer />
			<List
				onPress={(id) => router.navigate(`/notepad/${id}`)}
				title='Anteckningar'
				emptyText='Det finns inga anteckningar ännu...'
				items={items?.map(({ id, date, text }) => ({
					id,
					date,
					label: `${text?.substring(0, 20)}...`,
				}))}
			/>
		</PageView>
	);
}

const s = StyleSheet.create({
	list: {
		display: 'flex',
		flexDirection: 'column',
		borderTopColor: Theme.color.green,
		borderTopWidth: 1,
	},
	item: {
		width: '100%',
		paddingTop: Theme.padding,
		paddingBottom: Theme.padding,
		borderBottomColor: Theme.color.green,
		borderBottomWidth: 1,
	},
	itemText: {
		fontSize: Theme.fontSize.large,
	},
	imageWrap: {
		position: 'relative',
		width: '100%',
	},
	imageRemove: {
		position: 'absolute',
		flex: 0,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		top: 0,
		right: 3,
		height: 40,
		zIndex: 2,
	},
	imageRemoveButton: {
		backgroundColor: Theme.color.black,
		color: Theme.color.white,
		padding: 10,
	},
});
