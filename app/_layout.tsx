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
import { RelativePathString, useRouter } from "expo-router";

export type Menu = { name: string; href: string; options: any }[];

export const menu: Menu = [
	{
		href: "/",
		name: "index",
		options: {
			title: "Samtal om Våld",
			drawerLabel: "Hem",
		},
	},
	{
		href: "/valued-direction",
		name: "valued-direction/index",
		options: {
			title: "Värderad riktning med mål",
		},
	},
	{
		href: "/take-care-of-myself",
		name: "take-care-of-myself/index",
		options: {
			title: "Ta hand om mig",
		},
	},
	{
		href: "/home-assignment",
		name: "home-assignment",
		options: {
			title: "Hemmauppgift",
		},
	},
	{
		href: "/assess-violence",
		name: "assess-violence/index",
		options: {
			title: "Skatta våld",
		},
	},
	{
		href: "/sork",
		name: "sork/index",
		options: {
			title: "Sork",
		},
	},
	{
		href: "/emotional-diary",
		name: "emotional-diary",
		options: {
			title: "Enkel känslodagbok",
		},
	},
	{
		href: "/sound-exercises",
		name: "sound-exercises/index",
		options: {
			title: "Ljudövningar",
		},
	},
	{
		href: "/maintenance-plan",
		name: "maintenance-plan/index",
		options: {
			title: "Vidmakthållandeplan",
		},
	},
	{
		href: "/stop-and-think",
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
		popToTopOnBlur: true,
	},
}));

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
		items: menu.slice(7),
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
					{menu.map(({ href, name, options }) => (
						<Drawer.Screen
							key={href}
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
	const home = menu.find((m) => m.href === "/");
	const router = useRouter();

	return (
		<DrawerContentScrollView
			{...props}
			scrollEnabled={true}
		>
			{home && (
				<DrawerItem
					key={"home"}
					label={home?.options.drawerLabel}
					style={s.item}
					activeTintColor={Theme.color.green}
					labelStyle={s.label}
					focused={props.state.routeNames[props.state.index] === "index"}
					onPress={() => router.push("/")}
				/>
			)}
			{groups.map((g, i) => (
				<DrawerGroup
					key={i}
					{...g}
					active={props.state.routeNames[props.state.index]}
					onPress={(href: RelativePathString) => router.push(href)}
				/>
			))}
		</DrawerContentScrollView>
	);
}

type DrawerGroupProps = {
	title: string;
	items: any[];
	active: string;
	onPress: (name: RelativePathString) => void;
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
				{items.map(({ href, name, options }) => (
					<DrawerItem
						key={href}
						route={href}
						label={options.drawerLabel}
						style={s.item}
						activeTintColor={Theme.color.green}
						labelStyle={s.label}
						focused={name === active}
						onPress={() => onPress(href)}
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
