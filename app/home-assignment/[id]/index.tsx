import { useNavigation } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { Header, Loader, PageView, Spacer, Button } from "@/components/ui";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import useStore from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { useQuery } from "../../../lib/client";
import { HomeAssignmentDocument } from "@/graphql";
import React from "react";

export type Props = {
	params: {
		id: string;
	};
};

export default function HomeAssignmentItem() {
	const [data, error, loading, retry] = useQuery<HomeAssignmentQuery>(HomeAssignmentDocument);
	const navigation = useNavigation();
	const id = useLocalSearchParams().id as string;
	const { data: storeData, updateData } = useStore();
	const assignment = storeData.assignments?.find((item: any) => id === item.id);

	useEffect(() => {
		if (!assignment) return;
		navigation.setOptions({ title: formatDate(assignment.date) });
	}, [assignment]);

	if (loading || error)
		return (
			<Loader
				loading={loading}
				error={error}
				onRetry={retry}
			/>
		);

	if (!assignment) return <Text>Hittade ej uppgift med id: {id}</Text>;

	const { sovHomeAssignment } = data;

	return (
		<PageView>
			{sovHomeAssignment?.inputs.map(({ __typename, id, label, text, slug }, i) => (
				<React.Fragment key={i}>

					<Header
						size='small'
						margin='small'
					>{label}
					</Header>

					<Text>
						{__typename === "SovInputDateRecord"
							? formatDate(assignment[slug], true)
							: assignment[slug]}
					</Text>
					<Spacer size="medium" />
				</React.Fragment>
			))}
			<Spacer size="medium" />

			<Button
				onPress={() => {
					updateData({ assignments: storeData.assignments?.filter((item: any) => item.id !== id) });
					navigation.goBack();
				}}
			>
				Ta bort
			</Button>
		</PageView>
	);
}

const s = StyleSheet.create({});
