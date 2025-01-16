import HTMLView from "react-native-htmlview";
import { render } from "datocms-structured-text-to-html-string";
import { Paragraph, Image, TextInput, Table, UnorderedList, Header } from "./ui";
import unescape from "lodash-es/unescape";
import AudioPlayer from "./ui/AudioPlayer";

export default function StructuredContent({ content }: { content: any }) {
	const html = render(content, {
		renderBlock({ record, adapter: { renderNode } }) {
			switch (record?.__typename) {
				case "ImageBlockRecord":
					const { url } = record?.image as { url: string };
					return renderNode("img", { src: url });
				case "AudioBlockRecord":
					const { url: src } = record?.audio as { url: string };
					return renderNode("audio", { src });
				case "TextInputBlockRecord":
					const { id, text, label, slug } = record?.input as any;
					return renderNode("input", { id, label, text, slug });
				case "TableBlockRecord":
					const { tableData } = record as any;
					return renderNode("table", { table: JSON.stringify(tableData) });
			}
			return null;
		},
	}) as string;

	return (
		<HTMLView
			value={html}
			renderNode={(node, index, children) => {
				switch (node.name) {
					case "img":
						return (
							<Image
								key={index}
								src={node.attribs.src}
							/>
						);
					case "audio":
						return (
							<AudioPlayer
								key={index}
								src={node.attribs.src}
							/>
						);
					case "input":
						return (
							<TextInput
								key={index}
								slug={node.attribs.slug}
								{...node.attribs}
							/>
						);
					case "ul":
						const items = node.children.map((item, i) => ({
							id: `${i}`,
							label: item.children?.[0]?.children?.[0]?.data ?? "",
						}));
						return (
							<UnorderedList
								key={index}
								items={items}
							/>
						);
					case "h1":
					case "h2":
					case "h3":
					case "h4":
					case "h5":
					case "h6":
						const h = parseInt(node.name.charAt(1));
						const size = h <= 2 ? "medium" : "small";
						const margin = h === 1 ? "large" : h === 2 ? "medium" : "small";

						return (
							<Header
								key={index}
								size={size}
								margin={margin}
							>
								{node.children?.[0]?.data}
							</Header>
						);
					case "p":
						if (!node.children?.[0]?.data) {
							return undefined;
						}
						return (
							<Paragraph
								key={index}
								markdown={false}
							>
								{node.children[0].data}
							</Paragraph>
						);
					case "table":
						const data = node.attribs.table;
						if (!data) return undefined;

						let table;
						try {
							table = JSON.parse(unescape(data));
						} catch (err) {
							console.error(err);
							return undefined;
						}
						return (
							<Table
								key={index}
								data={table}
							/>
						);
					default:
						return undefined;
				}
			}}
		/>
	);
}
