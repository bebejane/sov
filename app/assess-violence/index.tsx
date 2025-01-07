import { Text, ScrollView, Loader, Button, Header, Paragraph } from "@/styles";
import { useQuery } from "@/lib/client";
import { AssessViolenceDocument } from "@/graphql";
import SliderElement from "@react-native-community/slider";

import Theme from "@/styles/theme";
import { useEffect, useState } from "react";
import React from "react";

export default function AssessViolence() {
	const [data, error, loading] = useQuery<AssessViolenceQuery>(AssessViolenceDocument);
	const [values, setValues] = useState<{ [key: string]: string }>({});
	const reset = () => {
		setValues({});
	};

	if (loading) return <Loader loading={loading} />;

	const { sovAssessViolence } = data;

	return (
		<ScrollView>
			<Paragraph>{sovAssessViolence?.intro}</Paragraph>
			<Header size='medium'>Since last session</Header>
			{sovAssessViolence?.sinceLastSession.map(({ id, title }) => (
				<Slider
					key={id}
					id={id}
					title={title}
					value={values[id] ? Number(values[id]) : 0}
					onValueChange={(text) => setValues((t) => ({ ...t, [id]: text }))}
				/>
			))}
			<Header size='medium'>Other problems</Header>
			{sovAssessViolence?.otherProblems.map(({ id, title }) => (
				<Slider
					key={id}
					id={id}
					title={title}
					value={values[id] ? Number(values[id]) : 0}
					onValueChange={(text) => setValues((t) => ({ ...t, [id]: text }))}
				/>
			))}
			<Button
				title={"Rensa"}
				onPress={reset}
			/>
		</ScrollView>
	);
}

const Slider = ({
	id,
	title,
	value: _value,
	onValueChange,
}: {
	id: string;
	title?: string | null | undefined;
	value: number;
	onValueChange: (value: number) => void;
}) => {
	const [value, setValue] = useState<number>(_value);

	useEffect(() => {
		onValueChange(value ?? 0);
	}, [value]);

	useEffect(() => {
		setValue(_value);
	}, [_value]);

	return (
		<React.Fragment key={id}>
			<Text>
				{title} ({value ?? "0"})
			</Text>
			<SliderElement
				key={id}
				style={{ width: "100%", height: 40 }}
				value={value}
				minimumValue={0}
				maximumValue={10}
				step={1}
				minimumTrackTintColor='#000000'
				maximumTrackTintColor='#FFFFFF'
				onValueChange={(step) => setValue(step)}
			/>
		</React.Fragment>
	);
};
