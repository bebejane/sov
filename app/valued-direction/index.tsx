import { Image } from "react-native";
import { Paragraph, View, Loader, TextInput } from "@/styles";
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
			<Paragraph>{sovValuedDirection?.intro}</Paragraph>
			<TextInput
				label={sovValuedDirection?.textInput}
				value={text}
				onChangeText={(t) => setText(t)}
			/>
			<Paragraph>{sovValuedDirection?.text}</Paragraph>
			<Image
				width={Theme.screenWidth - Theme.padding * 2}
				height={200}
				source={{ uri: sovValuedDirection?.image?.url }}
			/>
		</View>
	);
}
