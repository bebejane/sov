import { StyleSheet } from "react-native";
//import DatePickerElement, { DatePickerEvent } from "@react-native-community/datetimepicker";
//import DatePickerElement from "react-native-date-picker";
import DatePickerElement from "react-native-ui-datepicker";

import { Text, Button } from "./";
import Theme from "@/styles/theme";
import useStore from "../../lib/store";
import { useState } from "react";
import { format } from "date-fns";

export const DatePicker = ({
	id,
	label,
	slug,
}: {
	id: string;
	label?: string | undefined | null;
	slug: string | undefined | null;
}) => {
	const { updateData, data } = useStore();
	const [show, setShow] = useState(false);

	const handleOnChange = (e: any) => {
		slug && updateData({ [slug]: e.date });
		setShow(false);
	};

	const date = slug && data[slug] ? new Date(data[slug]) : null;

	return (
		<>
			<Text style={s.text}>{label}</Text>
			<Button onPress={() => setShow(!show)}>
				{date ? format(date, "yyyy-MM-dd") : "Välj datum"}
			</Button>
			{show && (
				<DatePickerElement
					mode={"single"}
					date={date}
					onChange={handleOnChange}
					selectedRangeBackgroundColor={Theme.color.green}

				/>
			)}
		</>
	);
};

const s = StyleSheet.create({
	text: {
		color: Theme.color.greyDark,
		fontSize: Theme.fontSize.small,
		marginBottom: Theme.margin / 2,
	},
	picker: {
		marginBottom: Theme.margin,
		marginTop: Theme.margin,
		marginLeft: 0,
	},
});
