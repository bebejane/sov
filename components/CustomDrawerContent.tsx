import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { Header } from "../styles";

export default function CustomDrawerContent(props: any) {
	const { bottom } = useSafeAreaInsets();
	const navigation = useNavigation();

	const closeDrawer = () => {
		navigation.dispatch(DrawerActions.closeDrawer());
	};
	return (
		<View style={{ flex: 1 }}>
			<DrawerContentScrollView
				{...props}
				scrollEnabled={false}
			>
				<View>
					<Header size={"medium"}>Header</Header>
				</View>
				<DrawerItemList {...props} />
			</DrawerContentScrollView>
		</View>
	);
}
