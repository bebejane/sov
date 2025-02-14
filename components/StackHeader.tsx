import { Stack, useRouter } from 'expo-router';
import { RectButton } from 'react-native-gesture-handler';
import Theme from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

export type Props = {
	children: any;
};

export default function StackHeader(props: Props) {
	return (
		<Stack
			screenOptions={{
				headerLeft: (props) => <StackHeaderBackButton {...props} />,
				headerTitle: (props) => <StackHeadeTitle {...props} />,
				headerTitleAlign: 'center',
			}}
		></Stack>
	);
}

export function StackHeaderBackButton(props: any) {
	const router = useRouter();

	return (
		<RectButton
			{...props}
			style={{ padding: 10, marginLeft: -10 }}
			tintColor={Theme.color.green}
			label={''}
			onPress={() => router.back()}
		>
			<Ionicons name='chevron-back' style={{ color: Theme.color.green }} size={24} />
		</RectButton>
	);
}

export function StackHeadeTitle(props: any) {
	return (
		<View style={s.headerContainer}>
			<Text style={s.headerTitle} numberOfLines={1}>
				{props.children}
			</Text>
		</View>
	);
}

const s = StyleSheet.create({
	headerContainer: {
		display: 'flex',
		alignItems: 'center',
	},
	headerTitle: {
		fontSize: Theme.fontSize.default,
		color: Theme.color.green,
		fontWeight: 600,
	},
});
