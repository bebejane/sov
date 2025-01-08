import { View, Button, Slider, TextInput, Header, Text } from "@/styles";
import { FlatList } from "react-native";
import { useCallback, useState } from "react";
import { format } from "date-fns";
import Theme from "@/styles/theme";
import React from "react";

type Item = {
	date: string;
	situation: string;
	baseFeeling: string;
	feeling: string;
	temp: number;
	open: boolean;
};

const defaultItem = {
	date: "",
	situation: "",
	baseFeeling: "",
	feeling: "",
	temp: 0,
	open: false,
};

export default function EmotionalDiary() {
	const [values, setValues] = useState<Item>(defaultItem);
	const [items, setItems] = useState<Item[]>([]);
	const isValidItem = useCallback(() => {
		return (
			values.situation !== "" &&
			values.baseFeeling !== "" &&
			values.feeling !== "" &&
			values.temp >= 0 &&
			values.temp <= 10
		);
	}, [values]);

	const save = () => {
		setItems((i) => [...i, { ...values, date: new Date().toString() }]);
		setValues(defaultItem);
	};

	//if (loading) return <Loader loading={loading} />;

	return (
		<View>
			<TextInput
				value={values.situation}
				onChangeText={(val: string) => setValues((v) => ({ ...v, situation: val }))}
				label='Situation'
			/>
			<TextInput
				value={values.baseFeeling}
				onChangeText={(val: string) => setValues((v) => ({ ...v, baseFeeling: val }))}
				label='Grundkänsla'
			/>
			<Slider
				id='temp'
				label='Känslotermometer'
				value={values.temp ? Number(values.temp) : 0}
				onValueChange={(val: number) => setValues((v) => ({ ...v, temp: val }))}
			/>
			<TextInput
				value={values.feeling}
				onChangeText={(val: string) => setValues((v) => ({ ...v, feeling: val }))}
				label='Känslan i kroppen'
			/>
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
									setItems((items) =>
										items.map((i) => (i.date === item.date ? { ...i, open: !i.open } : i))
									)
								}
							>
								{format(new Date(item.date), "yyyy-MM-dd HH:mm:ss")}
							</Text>
							{item.open && (
								<>
									<Header size='small'>Situation</Header>
									<Text>{item.situation}</Text>
									<Header size='small'>Grundkänsla</Header>
									<Text>{item.baseFeeling}</Text>
									<Header size='small'>Känslan i kroppen</Header>
									<Text>{item.feeling}</Text>
								</>
							)}
						</>
					)}
				/>
			)}
		</View>
	);
}
