import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Theme from '@/styles/theme';
import { formatDate } from '../../lib/utils';

type Props = {
	onPress: (id: string) => void;
	items: { id: string; date: string; label: string }[] | null | undefined;
	title: string;
	emptyText?: string;
};

export function List({ onPress, items, emptyText, title }: Props) {
	const empty = !items || items.length === 0;

	return (
		<View style={s.container}>
			<Text style={s.header}>{title}</Text>
			{empty && <Text style={s.empty}>{emptyText}</Text>}
			{!empty && (
				<>
					{items?.map((item, i) => (
						<TouchableOpacity
							key={i}
							onPress={() => onPress(item.id)}
							style={s.item}
							activeOpacity={0.8}
						>
							<Text style={[s.column, s.text, s.first]}>{formatDate(item.date, true)}</Text>
							<Text style={[s.column, s.text]} numberOfLines={1}>
								{item.label ?? 'Ingen titel...'}
							</Text>
						</TouchableOpacity>
					))}
				</>
			)}
		</View>
	);
}

const s = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 0,
		flexDirection: 'column',
	},
	header: {
		textTransform: 'uppercase',
		marginBottom: Theme.margin / 2,
		fontSize: Theme.fontSize.smaller,
		letterSpacing: 1,
	},
	empty: {
		color: Theme.color.greyDark,
	},
	item: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: Theme.padding / 4,
		backgroundColor: Theme.color.white,
		borderColor: Theme.color.green,
		borderWidth: Theme.borderWidth,
		borderRadius: Theme.borderRadius,
		marginBottom: Theme.margin / 2,
	},
	column: {
		padding: Theme.padding / 2,
	},
	text: {
		flex: 1,
		color: Theme.color.black,
		fontWeight: 600,
	},
	first: {
		flex: 0,
		color: Theme.color.greyDark,
	},
});
