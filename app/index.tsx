import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { RelativePathString, useRouter } from 'expo-router';
import { Header, List, Spacer, PageView } from '@/components/ui';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Theme from '@/styles/theme';
import useStore from '@/lib/store';

export type ShortCut = {
	name: string;
	route: string;
	icon: keyof typeof Ionicons.glyphMap;
};

const shortcuts: ShortCut[] = [
	{ name: 'Ljudövningar', route: '/sound-exercises', icon: 'headset-outline' },
	{ name: 'Sork', route: '/sork', icon: 'options-outline' },
	{ name: 'Stop & Tänk stegen', route: '/stop-and-think', icon: 'hand-left-outline' },
	{ name: 'Enkel känslodagbok', route: '/emotional-diary', icon: 'book-outline' },
];

export default function Home() {
	const router = useRouter();
	const {
		data: { diary, assignments },
	} = useStore();

	return (
		<>
			<PageView style={s.container}>
				<Header size='small'>GENVÄGAR</Header>
				<View style={s.shortcuts}>
					{shortcuts.map(({ name, route, icon }) => (
						<TouchableOpacity
							style={s.button}
							activeOpacity={0.5}
							key={name}
							onPress={() => router.push(route as RelativePathString)}
						>
							<Text style={s.label}>{name}</Text>
							<Ionicons style={s.icon} name={icon} size={20} color={Theme.color.black} />
						</TouchableOpacity>
					))}
				</View>
				<Spacer size='small' />
				<View style={s.list}>
					<List
						title='Dagbok'
						onPress={(id) =>
							router.push(`/emotional-diary/${diary?.find((item) => item.id === id)?.id}`)
						}
						items={diary
							?.slice(0, 2)
							.map(({ id, date, situation: label }) => ({ id, date, label }))}
						emptyText='Du finns inga dagboksinlägg sparade...'
					/>
				</View>
				<Spacer />
				<View style={s.list}>
					<List
						title='Hemuppgifter'
						onPress={(id) =>
							router.push(`/home-assignment/${assignments?.find((item) => item.id === id)?.id}`)
						}
						items={assignments?.slice(0, 2).map(({ id, date, 'vad-ska-jag-gora': label }) => ({
							id,
							date,
							label,
						}))}
						emptyText='Du finns inga hemuppgifter sparade...'
					/>
				</View>
			</PageView>
			<StatusBar backgroundColor={Theme.color.green} style='auto' />
		</>
	);
}

const s = StyleSheet.create({
	container: {
		flex: 1,
		padding: Theme.padding,
	},
	shortcuts: {
		display: 'flex',
		width: '100%',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		gap: Theme.padding / 1.5,
		marginTop: -Theme.margin / 2,
		marginBottom: Theme.margin,
	},
	icon: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		color: Theme.color.lightGreen,
		fontSize: 20,
		margin: Theme.padding / 1.5,
	},
	button: {
		flex: 1,
		flexShrink: 1,
		flexGrow: 1,
		borderRadius: Theme.borderRadius,
		flexBasis: '45%',
		height: 140,
		padding: Theme.padding / 1.2,
		paddingTop: Theme.padding / 1.4,
		backgroundColor: Theme.color.green,
	},
	label: {
		color: Theme.color.white,
		fontSize: Theme.fontSize.default,
		fontWeight: 600,
	},
	list: {
		display: 'flex',
		flexDirection: 'column',
	},
	diaryItem: {},
});
