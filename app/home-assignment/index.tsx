import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { PageView, Loader, TextInput, Button, DatePicker, Spacer, List } from "@/components/ui";
import { useQuery } from "@/lib/client";
import { HomeAssignmentDocument } from "@/graphql";
import useStore from "@/lib/store";
import { useNavigation, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function HomeAssignment() {
	const [section] = useSegments();
	const router = useRouter();
	const navigation = useNavigation();
	const [data, error, loading, retry] = useQuery<HomeAssignmentQuery>(HomeAssignmentDocument);
	const { updateData, data: storeData, resetKeys, reset } = useStore();
	const assignments = storeData.assignments ?? [];

	useEffect(() => {
		navigation.setOptions({ headerShown: false });
	}, [data]);

	if (loading || error)
		return (
			<Loader
				loading={loading}
				error={error}
				onRetry={retry}
			/>
		);

	const { sovHomeAssignment } = data;

	const isValidItem = () => {
		const currentItem: { [key: string]: string | number } = {};

		sovHomeAssignment?.inputs.forEach((item) => {
			currentItem[item.slug] = storeData[section]?.[item.slug];
		});

		let valid = true;

		Object.keys(currentItem).forEach((key) => {
			if (currentItem[key] === undefined || currentItem[key] === null || currentItem[key] === "") {
				valid = false;
				return;
			}
		});

		return valid;
	};

	const save = () => {
		const currentItem: { [key: string]: string | number } = {
			id: nanoid(),
			date: new Date().toString(),
		};

		sovHomeAssignment?.inputs.forEach((item) => {
			currentItem[item.slug] = storeData[section]?.[item.slug];
		});

		const ass = [...assignments, currentItem].sort((a, b) =>
			new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : 1
		);

		const resetFields = sovHomeAssignment?.inputs.map((item) => item.slug) as string[];
		updateData(ass, "assignments");
		resetKeys(resetFields, section);
	};

	return (
		<>
			<PageView>
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
				<Button
					disabled={!isValidItem()}
					onPress={save}
				>
					Spara
				</Button>
				<Spacer />
				<List
					onPress={(id) => router.navigate(`/home-assignment/${id}`)}
					title='Sparade Hemuppgifter'
					emptyText='Det finns inga hemuppgifter sparade...'
					items={assignments?.map(({ id, date, "vad-ska-jag-gora": label }) => ({
						id,
						date,
						label,
					}))}
				/>
			</PageView>
		</>
	);
}
