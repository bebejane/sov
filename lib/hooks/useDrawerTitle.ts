import { useFocusEffect, useNavigation, } from "expo-router";
import { menu } from "@/app/_layout";

export default function useDrawerTitle(title?: string) {
  const navigation = useNavigation();
  const state = navigation.getState();
  const t = menu.find(m => m.name === state?.routeNames[state.index])?.options?.title;

  useFocusEffect(() => {
    navigation.setOptions({ title: title ?? t ?? 'No title' });
  });
}