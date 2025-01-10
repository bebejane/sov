import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { View } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import Theme from "@/styles/theme";

import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedStyle,
	Easing,
} from "react-native-reanimated";

import { useState } from "react";
import { menu, groups } from "./menu";

export default function Navigation() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Drawer drawerContent={CustomDrawerContent}>
				{menu.map(({ name, options }) => (
					<Drawer.Screen
						key={name}
						name={name}
						options={{
							...options,
						}}
					/>
				))}
			</Drawer>
		</GestureHandlerRootView>
	);
}

export function CustomDrawerContent(props: any) {
	const [open, setOpen] = useState<any>({
		"my-change": true,
		diary: true,
		other: false,
	});

	let index = 0;

	return (
		<DrawerContentScrollView
			{...props}
			scrollEnabled={false}
		>
			{groups.map(({ id, title, items }, i) => (
				<View key={title}>
					<TouchableOpacity
						onPress={() => setOpen((o: any) => ({ ...o, [id]: !o[id] }))}
						key={title}
					>
						<View style={styles.dropdown}>
							<Text style={styles.header}>{title}</Text>
							<Ionicons
								style={styles.arrow}
								name={open[id] ? "chevron-down" : "chevron-up"}
								size={16}
								color='black'
							/>
						</View>
					</TouchableOpacity>
					{open[id] &&
						items.map(({ name, options }, x) => (
							<DrawerItem
								key={name}
								label={options.title}
								style={styles.item}
								labelStyle={styles.label}
								focused={props.state.index - 1 === index++}
								//@ts-ignore
								onPress={() => props.navigation.navigate(name)}
							/>
						))}
				</View>
			))}
		</DrawerContentScrollView>
	);
}

const styles = StyleSheet.create({
	dropdown: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
	},
	header: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 5,
		marginTop: 20,
		flex: 1,
	},
	arrow: {
		flex: 0,
	},
	label: {
		fontSize: 16,
		margin: 0,
	},
	item: {
		borderRadius: 0,
		padding: 0,
	},
});
