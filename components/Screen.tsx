import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "../lib/client";
import React from "react";
import { Loader } from "./ui";

export type ScreenProps = {
	document: any;
	///children: React.ReactNode[];
};

export default function Screen({ document }: ScreenProps) {
	const [data, error, loading] = useQuery(document);

	if (loading)
		return (
			<Loader
				loading={loading}
				error={error}
			/>
		);
	return { data, error };
	return;
}
