import { Image } from "react-native";
import { Text, View, Loader, TextInput } from "@/styles";
import { useQuery } from "@/lib/client";
import { ValuedDirectionDocument } from "@/graphql";
import Theme from "@/styles/theme";
import { useState } from "react";

export default function ValuedDirectionWithGoal() {
	const [data, error, loading] = useQuery<ValuedDirectionQuery>(ValuedDirectionDocument);
	const [text, setText] = useState("");

	if (loading) return <Loader loading={loading} />;

	const { sovValuedDirection } = data;

	return (
		<View>
			<Text>{sovValuedDirection?.intro}</Text>
			<TextInput
				header={sovValuedDirection?.textInput}
				value={text}
				onChangeText={(t) => setText(t)}
			/>
			<Text>{sovValuedDirection?.text}</Text>
			<Image
				width={Theme.screenWidth - Theme.padding * 2}
				height={200}
				source={{ uri: sovValuedDirection?.image?.url }}
			/>
		</View>
	);
}
