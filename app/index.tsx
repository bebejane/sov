import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import Theme from "@/styles/theme";
import { RelativePathString, useRouter } from "expo-router";
import { Header, List, Spacer } from "@/components/ui";
import { StatusBar } from "expo-status-bar";
import useStore from "@/lib/store";

const shortcuts: { name: string; route: string }[] = [
	{ name: "Ljudövningar", route: "/sound-exercises" },
	{ name: "Sork", route: "/sork" },
	{ name: "Stop & Tänk stegen", route: "/stop-and-think" },
	{ name: "Enkel känslodagbok", route: "/emotional-diary" },
];

export default function Home() {
	const router = useRouter();
	const {
		data: { diary, assignments },
	} = useStore();

	return (
		<>
			<View style={s.container}>
				<Header size='small'>GENVÄGAR</Header>
				<View style={s.shortcuts}>
					{shortcuts.map(({ name, route }) => (
						<TouchableOpacity
							style={s.button}
							activeOpacity={0.5}
							key={name}
							onPress={() => router.push(route as RelativePathString)}
						>
							<Text style={s.label}>{name}</Text>
						</TouchableOpacity>
					))}
				</View>
				<Spacer size="small"></Spacer>
				<View style={s.list}>
					<List
						title='Hemmauppgifter'
						onPress={(id) =>
							router.push(`/home-assignment/${assignments?.find((item) => item.id === id)?.id}`)
						}
						items={assignments?.map(({ id, date, label }) => ({ id, date, label }))}
						emptyText='Du finns hemmauppgifter sparade...'
					/>
				</View>
				<Spacer />
				<View style={s.list}>
					<List
						title='Dagbok'
						onPress={(id) =>
							router.push(`/emotional-diary/${diary?.find((item) => item.id === id)?.id}`)
						}
						items={diary?.map(({ id, date, situation, label }) => ({ id, date, label: situation }))}
						emptyText='Du finns inga dagboks inlägg...'
					/>
				</View>
			</View>
			<StatusBar
				backgroundColor={Theme.color.green}
				style='auto'
			/>
		</>
	);
}

const s = StyleSheet.create({
	container: {
		flex: 1,
		padding: Theme.padding,
	},
	shortcuts: {
		display: "flex",
		width: "100%",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		gap: Theme.padding / 2,
		marginTop: - Theme.margin / 2,
		marginBottom: Theme.margin,
	},
	button: {
		flex: 1,
		flexShrink: 1,
		flexGrow: 1,
		borderRadius: Theme.borderRadius,
		flexBasis: "45%",
		height: 140,
		padding: Theme.padding / 1.5,
		backgroundColor: Theme.color.green,
	},
	label: {
		color: Theme.color.white,
		fontWeight: 600,
	},
	list: {
		display: "flex",
		flexDirection: "column",
	},
	diaryItem: {},
});
