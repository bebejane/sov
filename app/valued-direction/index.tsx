import { Text, Image } from "react-native";
import { useQuery } from "@/lib/client";
import { ValuedDirectionDocument } from "@/graphql";
import { useEffect } from "react";

export default function ValuedDirectionWithGoal() {
	const [{ sofValuedDirection }, error, loading] =
		useQuery<ValuedDirectionQuery>(ValuedDirectionDocument);

	if (loading) return <Text>Loading...</Text>;

	return (
		<>
			<Text>{sofValuedDirection?.intro}</Text>
			<Text>{sofValuedDirection?.text}</Text>
			<Image
				width={200}
				height={200}
				source={{ uri: sofValuedDirection?.image?.url }}
			/>
		</>
	);
}
