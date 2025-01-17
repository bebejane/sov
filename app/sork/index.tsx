import { PageView, Loader, Button, Header, TextInput, SliderInput } from "@/components/ui";
import { Text } from "react-native";
import { useQuery } from "@/lib/client";
import { SorkDocument } from "@/graphql";
import React from "react";
import useStore from "../../lib/store";
import { useSegments } from "expo-router";

export default function Sork() {
	const [section] = useSegments();
	const [data, error, loading, retry] = useQuery<SorkQuery>(SorkDocument);
	const { updateData, data: storeData, resetKeys } = useStore();

	if (loading || error)
		return (
			<Loader
				loading={loading}
				error={error}
				onRetry={retry}
			/>
		);

	const { sovSork } = data;

	if (!sovSork) return <Text>Det finns ingen data...</Text>;

	return (
		<PageView>
			{sovSork?.inputs.map((item) =>
				item.__typename === "SovInputTextRecord" ? (
					<React.Fragment key={item.id}>
						<TextInput
							title={item.label}
							label={item.text}
							slug={item.slug}
						/>
					</React.Fragment>
				) : (
					<SliderInput
						key={item.id}
						id={item.id}
						label={item.label}
						slug={item.slug}
						min={item.min}
						max={item.max}
					/>
				)
			)}
			<Button
				onPress={() =>
					resetKeys(
						sovSork.inputs.map((item) => item.slug),
						section
					)
				}
			>
				Rensa
			</Button>
		</PageView>
	);
}
