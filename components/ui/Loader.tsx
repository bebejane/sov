import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator } from 'react-native';

import { Text } from './Text';
import Ionicons from '@expo/vector-icons/Ionicons';
import Theme from '@/styles/theme';
import { Button } from './Button';

type Props = {
	loading: boolean;
	error: any;
	onRetry?: () => void;
};

export const Loader = ({ loading, error, onRetry }: Props) => {
	return (
		<View style={s.view}>
			{!error && loading && <ActivityIndicator size={50} color={Theme.color.greyDark} />}
			{error && (
				<View style={s.error}>
					<Text style={s.errorText}>Ett nätverks fel uppstod!</Text>
					<Button icon={'refresh'} onPress={() => onRetry?.()} size='large'>
						Försök igen
					</Button>
				</View>
			)}
		</View>
	);
};

const s = StyleSheet.create({
	view: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: Theme.screenWidth,
	},
	loading: {
		color: Theme.color.white,
		fontSize: Theme.fontSize.default,
	},
	error: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	errorText: {
		color: Theme.color.black,
		fontSize: Theme.fontSize.large,
		marginBottom: 20,
	},
});
