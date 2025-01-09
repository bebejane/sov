import { StyleSheet } from "react-native";
import DateTimePickerElement, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Text } from "./Text";
import Theme from "@/styles/theme";
import useStore from "../../lib/store";

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

export const DateTimePicker = ({
	id,
	label,
	slug,
}: {
	id: string;
	label?: string | undefined | null;
	slug: string | undefined | null;
}) => {
	const { setData, data } = useStore();

	const handleOnChange = (e: DateTimePickerEvent) => {
		slug && setData({ [slug]: e.nativeEvent.timestamp });
	};

	return (
		<>
			<Text style={s.text}>{label}</Text>
			<DateTimePickerElement
				testID={id}
				value={slug && data[slug] ? new Date(data[slug]) : new Date()}
				mode={"date"}
				is24Hour={true}
				onChange={handleOnChange}
				style={s.picker}
			/>
		</>
	);
};
