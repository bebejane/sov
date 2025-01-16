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

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import StatusBar from "@/components/StatusBar";

export type Menu = { name: string; options: any }[];

const menu: Menu = [
	{
		name: "index",
		options: {
			drawerLabel: "Hem",
			title: "Samtal om Våld",
		},
	},
	{
		name: "valued-direction/index",
		options: {
			title: "Värderad riktning med mål",
		},
	},
	{
		name: "take-care-of-myself/index",
		options: {
			title: "Ta hand om mig",
		},
	},
	{
		name: "home-assignment",
		options: {
			title: "Hemmauppgift",
		},
	},
	{
		name: "assess-violence/index",
		options: {
			title: "Skatta våld",
		},
	},
	{
		name: "sork/index",
		options: {
			title: "Sork",
		},
	},
	{
		name: "emotional-diary",
		options: {
			title: "Enkel känslodagbok",
		},
	},
	{
		name: "sound-exercises/index",
		options: {
			title: "Ljudövningar",
		},
	},
	{
		name: "maintenance-plan/index",
		options: {
			title: "Vidmakthållandeplan",
		},
	},
	{
		name: "stop-and-think",
		options: {
			title: "Stop & Tänk Stegen",
		},
	},
].map((screen) => ({
	...screen,
	options: {
		...screen.options,
		drawerLabel: screen.options.drawerLabel ?? screen.options.title,
	},
})) as { name: string; options: any }[];

const groups = [
	{
		id: "my-change",
		title: "Min förändring",
		items: menu.slice(1, 5),
		open: true,
	},
	{
		id: "diary",
		title: "Dagbok mellan samtal",
		items: menu.slice(5, 7),
		open: true,
	},
	{
		id: "other",
		title: "Övrigt",
		items: menu.slice(7, 10),
		open: false,
	},
];

export default function Navigation() {
	return (
		<>
			<StatusBar />
			<GestureHandlerRootView style={{ flex: 1 }}>
				<Drawer
					drawerContent={CustomDrawerContent}
					screenOptions={{
						headerTintColor: Theme.color.green,
					}}
				>
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
		</>
	);
}

export function CustomDrawerContent(props: any) {
	const home = menu.find((m) => m.name === "index");

	return (
		<DrawerContentScrollView
			{...props}
			scrollEnabled={true}
		>
			<DrawerItem
				key={"home"}
				label={home?.options.drawerLabel}
				style={s.item}
				activeTintColor={Theme.color.green}
				labelStyle={s.label}
				focused={props.state.routeNames[props.state.index] === "index"}
				onPress={() => props.navigation.navigate(home?.name)}
			/>
			{groups.map((g, i) => (
				<DrawerGroup
					key={i}
					{...g}
					active={props.state.routeNames[props.state.index]}
					onPress={(name: string) => props.navigation.navigate(name)}
				/>
			))}
		</DrawerContentScrollView>
	);
}

type DrawerGroupProps = {
	title: string;
	items: any[];
	active: string;
	onPress: (name: string) => void;
};

export function DrawerGroup({ title, items, active, onPress }: DrawerGroupProps) {
	const ref = useRef<View>(null);
	const [height, setHeight] = useState<number | null>(null);
	const heightAnimation = useSharedValue(0);
	const [open, setOpen] = useState(true);

	useLayoutEffect(() => {
		height === null && ref.current?.measure((x, y, w, h, e) => setHeight(h));
	}, []);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			height: withTiming(heightAnimation.value, {
				duration: 350,
				easing: Easing.bezier(0.25, 0.1, 0.25, 1),
			}),
		};
	});

	useEffect(() => {
		heightAnimation.value = open && height !== null ? height : 0;
	}, [open, height]);

	return (
		<View key={title}>
			<TouchableOpacity
				onPress={() => setOpen(!open)}
				key={title}
			>
				<View style={s.dropdown}>
					<Text style={s.header}>{title}</Text>
					<Ionicons
						style={s.arrow}
						name={open ? "chevron-down" : "chevron-up"}
						size={16}
						color='black'
					/>
				</View>
			</TouchableOpacity>
			<Animated.View
				ref={ref}
				style={[s.items, height !== null && animatedStyle]}
			>
				{items.map(({ name, options }) => (
					<DrawerItem
						key={name}
						route={name}
						label={options.drawerLabel}
						style={s.item}
						activeTintColor={Theme.color.green}
						labelStyle={s.label}
						focused={name === active}
						onPress={() => onPress(name)}
					/>
				))}
			</Animated.View>
		</View>
	);
}

const s = StyleSheet.create({
	dropdown: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
	},
	header: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 10,
		marginTop: 20,
		flex: 1,
	},
	arrow: {
		flex: 0,
	},
	label: {
		fontSize: 16,
		margin: 0,
		lineHeight: 20,
	},
	items: {
		overflow: "hidden",
	},
	item: {
		justifyContent: "center",
		borderRadius: 0,
		padding: 0,
		height: 50,
	},
});
