import { PageScrollView, Loader, Button, Header, TextInput, SliderInput } from "@/components/ui";
import { useQuery } from "@/lib/client";
import { SorkDocument } from "@/graphql";
import React from "react";
import useStore from "../../lib/store";

export default function Sork() {
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

	return (
		<PageScrollView>
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
			<Button onPress={() => resetKeys(sovSork?.inputs.map((item) => item.slug))}>Rensa</Button>
		</PageScrollView>
	);
}
