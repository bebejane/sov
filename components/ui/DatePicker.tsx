import { StyleSheet } from 'react-native';
import { Text, Button, Spacer } from './';
import DatePickerElement from 'react-native-ui-datepicker';
import Theme from '@/styles/theme';
import useStore from '../../lib/store';
import { useState } from 'react';
import { format } from 'date-fns';
import { useSegments } from 'expo-router';

export const DatePicker = ({
	id,
	label,
	slug,
	obligatory,
}: {
	id: string;
	label?: string | undefined | null;
	slug: string | undefined | null;
	obligatory?: boolean;
}) => {
	const [section] = useSegments();
	const { updateData, data } = useStore();
	const [show, setShow] = useState(false);

	const handleOnChange = (e: any) => {
		slug && updateData({ [slug]: new Date(e.date).toString() }, section);
		setShow(false);
	};

	const date = slug && data[section]?.[slug] ? new Date(data[section][slug]) : undefined;

	return (
		<>
			<Text style={s.text}>{label}</Text>
			<Button onPress={() => setShow(!show)}>
				{date ? format(date, 'yyyy-MM-dd') : 'Välj datum'}
			</Button>
			{show && (
				<>
					<Spacer size='small' />
					<DatePickerElement
						mode={'single'}
						date={date}
						onChange={handleOnChange}
						selectedItemColor={Theme.color.green}
					/>
				</>
			)}
			<Spacer size='medium' />
		</>
	);
};

const s = StyleSheet.create({
	text: {
		color: Theme.color.green,
		fontSize: Theme.fontSize.small,
		fontWeight: 500,
		marginBottom: Theme.margin / 2,
	},
	picker: {
		marginBottom: Theme.margin,
		marginTop: Theme.margin,
		marginLeft: 0,
	},
});
