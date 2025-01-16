"use dom";

import HTMLView from "react-native-htmlview";
import { StructuredText } from "react-datocms";

export default function StructuredT({ content }: { content: any }) {
	return <StructuredText data={content} />;
}
