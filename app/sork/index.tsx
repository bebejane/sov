import { Text, ScrollView, Loader, Button, Header, Paragraph, TextInput, Slider } from "@/styles";
import { useQuery } from "@/lib/client";
import { SorkDocument } from "@/graphql";
import Theme from "@/styles/theme";
import { useState } from "react";
import React from "react";

export default function Sork() {
	const [data, error, loading] = useQuery<SorkQuery>(SorkDocument);
	const [values, setValues] = useState<{ [key: string]: string | number }>({});
	const reset = () => {
		setValues({});
	};

	if (loading) return <Loader loading={loading} />;

	const { sovSork } = data;

	return (
		<ScrollView>
			{sovSork?.categories.map(({ id, title, text }) => (
				<React.Fragment key={id}>
					<Header size='large'>{title}</Header>
					<TextInput
						label={text}
						value={(values[id] as string) ?? ""}
						onChangeText={(t) => setValues((v) => ({ ...v, [id]: t }))}
					/>
				</React.Fragment>
			))}
			<Slider
				id='temp'
				label='Känslotermometer'
				value={(values.temp as number) ?? 0}
				onValueChange={(num) => setValues((s) => ({ ...s, temp: num }))}
			/>
			<Button
				title={"Rensa"}
				onPress={reset}
			/>
		</ScrollView>
	);
}
