import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import Theme from "@/styles/theme";
import { RelativePathString, useRouter } from "expo-router";
import { Header } from "../components/ui";

const shortcuts: { name: string; route: string }[] = [
	{ name: "Värderad riktning med mål", route: "/valued-direction" },
	{ name: "Ta hand om mig", route: "/take-care-of-myself" },
	{ name: "Hemmauppgift", route: "/home-assignment" },
	{ name: "Skatta våld", route: "/assess-violence" },
];

export default function Home() {
	const router = useRouter();

	return (
		<View style={s.container}>
			<Header size='medium'>Genvägar</Header>

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
			<View style={s.shortcuts}>
				<Header size='medium'>Dagbok</Header>
			</View>
		</View>
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
});
