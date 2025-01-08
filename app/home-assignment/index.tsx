import { ScrollView, Loader, TextInput, Button, DateTimePicker, Paragraph } from "@/components/ui";
import { useQuery } from "@/lib/client";
import { HomeAssignmentDocument } from "@/graphql";
import { useState } from "react";

const form = [
	{
		id: "what",
		header: "Vad ska jag gära?",
		placeholder: "Vad ska jag gära?",
	},
	{
		id: "why",
		header: "Varför ska jag göra det?",
		placeholder: "Varför ska jag göra det?",
	},
	{
		id: "comments",
		header: "Egna kommentarer om uppgiften",
		placeholder: "När ska jag göra det?",
	},
];

export default function HomeAssignment() {
	const [data, error, loading] = useQuery<HomeAssignmentQuery>(HomeAssignmentDocument);
	const [values, setValues] = useState<{ [key: string]: string }>({});
	const [today, setToday] = useState<Date | null>(new Date());
	const [nextSession, setNextSession] = useState<Date | null>(null);
	const reset = () => {
		setValues({});
		setToday(new Date());
		setNextSession(null);
	};

	if (loading) return <Loader loading={loading} />;

	const { sovHomeAssignment } = data;

	return (
		<ScrollView>
			<Paragraph>{sovHomeAssignment?.intro}</Paragraph>
			<DateTimePicker
				id='today'
				label={"När ska jag göra det?"}
				value={today}
				onChange={(e) => setToday(new Date(e.nativeEvent.timestamp))}
			/>
			<DateTimePicker
				id='nextSession'
				label={"Nästa session"}
				value={nextSession}
				onChange={(e) => setNextSession(new Date(e.nativeEvent.timestamp))}
			/>
			{form.map(({ id, header, placeholder }) => (
				<TextInput
					key={id}
					label={header}
					value={values[id]}
					onChangeText={(text) => setValues((t) => ({ ...t, [id]: text }))}
				/>
			))}
			<Button
				title={"Rensa"}
				onPress={reset}
			/>
		</ScrollView>
	);
}
