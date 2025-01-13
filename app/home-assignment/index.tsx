import { PageView, Loader, TextInput, Button, DatePicker, Paragraph } from "@/components/ui";
import { useQuery } from "@/lib/client";
import { HomeAssignmentDocument } from "@/graphql";
import { useState } from "react";
import useStore from "../../lib/store";

export default function HomeAssignment() {
	const [data, error, loading, retry] = useQuery<HomeAssignmentQuery>(HomeAssignmentDocument);
	const { updateData, data: storeData, resetKeys } = useStore();

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
		<PageView>
			<Paragraph>{sovHomeAssignment?.intro}</Paragraph>
			{sovHomeAssignment?.inputs.map((item) =>
				item.__typename === "SovInputTextRecord" ? (
					<TextInput
						key={item.id}
						slug={item.slug}
						label={item.label}
					/>
				) : (
					<DatePicker
						key={item.id}
						id={item.id}
						label={item.label}
						slug={item.slug}
					/>
				)
			)}
			<Button onPress={() => resetKeys(sovHomeAssignment?.inputs.map((item) => item.slug))}>
				Rensa
			</Button>
		</PageView>
	);
}
