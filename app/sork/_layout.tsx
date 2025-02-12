import useStore from '@/lib/store';
import { Stack } from 'expo-router';
import { formatDate } from '@/lib/utils';
import { StackHeaderBackButton } from '@/components/StackHeaderBackButton';
import { StackHeader } from '../../components/StackHeader';

export default function Layout() {
	const { data } = useStore();
	const sorks: any[] = data.sorks ?? [];

	return (
		<Stack
			screenOptions={{
				headerLeft: (props) => <StackHeaderBackButton {...props} />,
				headerTitle: (props) => <StackHeader {...props} />,
			}}
		>
			{sorks?.map(({ id, date }, i) => (
				<Stack.Screen
					key={id}
					name={`sork/${id}`}
					initialParams={{ id, date }}
					options={{
						title: formatDate(date),
						headerTitle: formatDate(date),
					}}
				/>
			))}
		</Stack>
	);
}
