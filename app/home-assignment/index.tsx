import { ScrollView, Loader, TextInput, Button, DateTimePicker, Paragraph } from "@/components/ui";
import { useQuery } from "@/lib/client";
import { HomeAssignmentDocument } from "@/graphql";
import { useState } from "react";
import useStore from "../../lib/store";

export default function HomeAssignment() {
	const [data, error, loading, retry] = useQuery<HomeAssignmentQuery>(HomeAssignmentDocument);
	const { setData, data: storeData, resetKeys } = useStore();

	if (loading || error)
		return (
			<Loader
				loading={loading}
				error={error}
				onRetry={retry}
			/>
		);

	const { sovHomeAssignment } = data;

	return (
		<ScrollView>
			<Paragraph>{sovHomeAssignment?.intro}</Paragraph>
			{sovHomeAssignment?.inputs.map((item) =>
				item.__typename === "SovInputTextRecord" ? (
					<TextInput
						key={item.id}
						slug={item.slug}
						label={item.label}
					/>
				) : (
					<DateTimePicker
						key={item.id}
						id={item.id}
						label={item.label}
						slug={item.slug}
					/>
				)
			)}
			<Button
				title={"Rensa"}
				onPress={() => resetKeys(sovHomeAssignment?.inputs.map((item) => item.slug))}
			/>
		</ScrollView>
	);
}
