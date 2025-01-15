import "react-native-get-random-values";
import { nanoid } from "nanoid";
import {
	Button,
	TextInput,
	Header,
	Text,
	Loader,
	SliderInput,
	PageView,
	Spacer,
} from "@/components/ui";
import { FlatList, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useQuery } from "../../lib/client";
import { EmotionalDiaryDocument } from "../../graphql";
import useStore from "../../lib/store";
import { Link, useNavigation } from "expo-router";
import { formatDate } from "@/lib/utils";
import Theme from "@/styles/theme";

export default function EmotionalDiary() {
	const navigation = useNavigation();
	const [data, error, loading, retry] = useQuery<EmotionalDiaryQuery>(EmotionalDiaryDocument);
	const { updateData, data: storeData, resetKeys } = useStore();
	const items = storeData.diary ?? [];

	useEffect(() => {
		navigation.setOptions({ headerShown: false });
	}, [data]);

	const isValidItem = () => {
		const currentItem: { [key: string]: string | number } = {};

		sovEmotionalDiary?.inputs.forEach((item) => {
			currentItem[item.slug] = storeData[item.slug];
		});

		let valid = true;

		Object.keys(currentItem).forEach((key) => {
			if (currentItem[key] === undefined || currentItem[key] === null || currentItem[key] === "") {
				valid = false;
				return;
			}
		});

		return valid;
	};

	const save = () => {
		const currentItem: { [key: string]: string | number } = {
			id: nanoid(),
			date: new Date().toString(),
		};

		sovEmotionalDiary?.inputs.forEach((item) => {
			currentItem[item.slug] = storeData[item.slug];
		});

		const data = {
			diary: [...items, currentItem].sort((a, b) =>
				new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : 1
			),
		};

		const resetFields = sovEmotionalDiary?.inputs.map((item) => item.slug);
		updateData(data);
		resetKeys(resetFields);
	};

	const remove = (item: any) => {
		const data = {
			diary: items.filter((i: any) => i.id !== item.id),
		};
		updateData(data);
	};

	if (loading || error)
		return (
			<Loader
				loading={loading}
				error={error}
				onRetry={retry}
			/>
		);

	const { sovEmotionalDiary } = data;
	return (
		<PageView>
			{sovEmotionalDiary?.inputs.map((item) =>
				item.__typename === "SovInputTextRecord" ? (
					<TextInput
						key={item.id}
						slug={item.slug}
						label={item.label}
					/>
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
				onPress={save}
				disabled={!isValidItem()}
			>
				Spara
			</Button>
			<Spacer />
			<Header size='medium'>Dagbokslogg</Header>
			{items.length === 0 ? (
				<Text>Det finns inga dagboksinlägg...</Text>
			) : (
				<FlatList
					contentContainerStyle={s.list}
					data={items}
					renderItem={({ item, separators }) => (
						<TouchableOpacity style={s.item}>
							<Link href={`/emotional-diary/${item.id}`}>
								<Text style={s.itemText}>{formatDate(item.date)}</Text>
							</Link>
						</TouchableOpacity>
					)}
				/>
			)}
		</PageView>
	);
}

const s = StyleSheet.create({
	list: {
		display: "flex",
		flexDirection: "column",
		borderTopColor: Theme.color.green,
		borderTopWidth: 1,
	},
	item: {
		width: "100%",
		paddingTop: Theme.padding,
		paddingBottom: Theme.padding,
		borderBottomColor: Theme.color.green,
		borderBottomWidth: 1,
	},
	itemText: {
		fontSize: Theme.fontSize.large,
	},
});
