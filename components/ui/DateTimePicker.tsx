import { StyleSheet } from "react-native";
import DateTimePickerElement, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Text } from "./Text";
import Theme from "@/styles/theme";

export const DateTimePicker = ({
	id,
	value,
	label,
	onChange,
}: {
	id: string;
	value?: Date | null | undefined;
	label?: string | undefined | null;
	onChange: (e: DateTimePickerEvent) => void;
}) => {
	const s = StyleSheet.create({
		text: {
			color: Theme.color.greyDark,
			fontSize: Theme.fontSize.small,
			marginBottom: Theme.margin / 2,
		},
		picker: {
			marginBottom: Theme.margin,
			marginLeft: 0,
		},
	});

	return (
		<>
			<Text style={s.text}>{label}</Text>
			<DateTimePickerElement
				testID={id}
				value={value ?? new Date()}
				mode={"date"}
				is24Hour={true}
				onChange={onChange}
				style={s.picker}
			/>
		</>
	);
};
