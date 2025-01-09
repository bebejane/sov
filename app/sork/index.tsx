import { ScrollView, Loader, Button, Header, TextInput, SliderInput } from "@/components/ui";
import { useQuery } from "@/lib/client";
import { SorkDocument } from "@/graphql";
import React from "react";
import useStore from "../../lib/store";

export default function Sork() {
	const [data, error, loading] = useQuery<SorkQuery>(SorkDocument);
	const { setData, data: storeData, resetKeys } = useStore();
	if (loading) return <Loader loading={loading} />;

	const { sovSork } = data;

	return (
		<ScrollView>
			{sovSork?.inputs.map((item) =>
				item.__typename === "SovInputTextRecord" ? (
					<React.Fragment key={item.id}>
						<Header size='large'>{item.label}</Header>
						<TextInput
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
				title={"Rensa"}
				onPress={() => resetKeys(sovSork?.inputs.map((item) => item.slug))}
			/>
		</ScrollView>
	);
}
