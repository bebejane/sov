import { StyleSheet, Text } from 'react-native';
import Markdown from 'react-native-markdown-display';
import Theme from '@/styles/theme';

export type Props = {
	children: React.ReactNode | React.ReactNode[];
	style?: any;
	markdown?: boolean;
};

export const Paragraph = ({ children, markdown = true, style }: Props) => {
	if (markdown) return <Markdown style={{ body: { ...s.body, ...style } }}>{children}</Markdown>;
	else return <Text style={[s.body, style]}>{children}</Text>;
};

const s = StyleSheet.create({
	body: {
		fontSize: Theme.fontSize.default,
		marginBottom: Theme.margin / 2,
		lineHeight: Theme.lineHeight.default,
	},
});
