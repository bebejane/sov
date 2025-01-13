import HTMLView from "react-native-htmlview";
import { render } from "datocms-structured-text-to-html-string";
import { Paragraph, Image } from "./";

export function StructuredContent({ content }: { content: any }) {
	const html = render(content, {
		renderBlock({ record, adapter: { renderNode } }) {
			switch (record?.__typename) {
				case "ImageBlockRecord":
					const { url } = record?.image as { url: string };
					return renderNode("img", { src: url });
			}
			return null;
		},
	}) as string;

	return (
		<HTMLView
			value={html}
			renderNode={(node: any, index: number, children: any) => {
				switch (node.name) {
					case "img":
						return (
							<Image
								key={index}
								src={node.attribs.src}
							/>
						);
					case "p":
						if (!node.children?.[0]?.data) return undefined;
						return (
							<Paragraph
								key={index}
								markdown={false}
							>
								{node.children[0].data}
							</Paragraph>
						);
					default:
						return undefined;
				}
			}}
		/>
	);
}
