import HTMLView from 'react-native-htmlview';
import { render } from 'datocms-structured-text-to-html-string';
import { Paragraph, Image, TextInput, Table, UnorderedList, Header, Text } from './ui';
import unescape from 'lodash-es/unescape';
import AudioPlayer from './ui/AudioPlayer';
import YoutubePlayer from '@/components/YoutubePlayer';

export default function StructuredContent({ content, styles }: { content: any; styles?: any }) {
	const html = render(content, {
		renderBlock({ record, adapter: { renderNode } }) {
			switch (record?.__typename) {
				case 'ImageBlockRecord':
					return renderNode('img', { image: JSON.stringify(record?.image) });
				case 'AudioBlockRecord':
					const { url: src } = record?.audio as { url: string };
					return renderNode('audio', { src });
				case 'VideoBlockRecord':
					const { url } = record?.youtube as { url: string };
					return renderNode('video', { src: url });
				case 'TextInputBlockSofRecord':
					const { id, text, label, slug } = record?.input as any;
					return renderNode('input', { id, label, text, slug });
				case 'TableBlockRecord':
					const { tableData } = record as any;
					return renderNode('table', { table: JSON.stringify(tableData) });
			}
			return null;
		},
	}) as string;

	return (
		<HTMLView
			value={html}
			stylesheet={styles}
			renderNode={(node, index, children) => {
				switch (node.name) {
					case 'img':
						return <Image key={index} data={JSON.parse(unescape(node.attribs.image))} />;
					case 'audio':
						return <AudioPlayer key={index} src={node.attribs.src} />;
					case 'video':
						return <YoutubePlayer key={index} src={node.attribs.src} />;
					case 'input':
						return <TextInput key={index} slug={node.attribs.slug} {...node.attribs} />;
					case 'ul':
						const items = node.children.map((item, i) => ({
							id: `${i}`,
							label: item.children?.[0]?.children?.[0]?.data ?? '',
						}));
						return <UnorderedList key={index} items={items} />;
					case 'h1':
					case 'h2':
					case 'h3':
					case 'h4':
					case 'h5':
					case 'h6':
						const h = parseInt(node.name.charAt(1));
						const size = h <= 2 ? 'medium' : 'medium';
						const margin = h === 1 ? 'large' : h === 2 ? 'medium' : 'small';
						const title = node.children?.find((n) => n.type === 'text')?.data;

						return (
							<Header key={index} size={size} margin={margin}>
								{title}
							</Header>
						);
					case 'p':
						return (
							<Paragraph key={index} markdown={false} style={styles?.p}>
								{node.children.map((n, i) =>
									n.name === 'strong' ? (
										<Text key={i} style={{ fontWeight: 'bold', ...styles?.p }}>
											{n.children[0].data}
										</Text>
									) : (
										<Text key={i} style={{ ...styles?.p }}>
											{n.data}
										</Text>
									)
								)}
							</Paragraph>
						);
					case 'table':
						const data = node.attribs.table;
						if (!data) return undefined;

						let table;
						try {
							table = JSON.parse(unescape(data));
						} catch (err) {
							console.error(err);
							return undefined;
						}
						return <Table key={index} data={table} />;
					default:
						return undefined;
				}
			}}
		/>
	);
}
