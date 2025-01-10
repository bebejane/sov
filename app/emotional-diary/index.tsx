import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { View, Button, TextInput, Header, Text, Loader, SliderInput } from "@/components/ui";
import { FlatList } from "react-native";
import { format } from "date-fns";
import React from "react";
import { useQuery } from "../../lib/client";
import { EmotionalDiaryDocument } from "../../graphql";
import useStore from "../../lib/store";

export default function EmotionalDiary() {
	const [data, error, loading, retry] = useQuery<EmotionalDiaryQuery>(EmotionalDiaryDocument);
	const { setData, data: storeData, resetKeys } = useStore();
	const items = storeData.diary ?? [];

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

		const data: { [key: string]: string | number | (string | number)[] } = {
			diary: [...items, currentItem],
		};

		const resetFields = sovEmotionalDiary?.inputs.map((item) => item.slug);
		setData(data);
		resetKeys(resetFields);
	};

	const remove = (item: any) => {
		const data: { [key: string]: string | number | (string | number)[] } = {
			diary: items.filter((i: any) => i.id !== item.id),
		};
		setData(data);
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
		<View>
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
				title={"Spara"}
				onPress={save}
				disabled={!isValidItem()}
			/>
			<Header size='large'>Dagbokslogg</Header>
			{items.length === 0 ? (
				<Text>Det finns inga dagboksinlägg...</Text>
			) : (
				<FlatList
					data={items}
					style={{ width: "100%" }}
					renderItem={({ item, separators }) => (
						<>
							<Text
								onPress={() =>
									setData({
										diary: items.map((i: any) =>
											i.id === item.id ? { ...i, _open: !i._open } : i
										),
									})
								}
							>
								{format(new Date(item.date), "yyyy-MM-dd HH:mm:ss")}
							</Text>
							{item._open && (
								<>
									{sovEmotionalDiary?.inputs.map((input) => (
										<React.Fragment key={input.id}>
											<Header
												size='small'
												key={item.id}
											>
												{input.label}
											</Header>
											<Text>
												{storeData.diary.find((i: any) => i.slug === item.slug)?.[input.slug]}
											</Text>
										</React.Fragment>
									))}
									<Button
										title={"Ta bort"}
										onPress={() => remove(item)}
									/>
								</>
							)}
						</>
					)}
				/>
			)}
		</View>
	);
}
