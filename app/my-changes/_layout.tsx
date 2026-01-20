import useStore from '@/lib/store';
import { Stack } from 'expo-router';
import { formatDate } from '@/lib/utils';
import StackHeader from '@/components/StackHeader';

export default function Layout() {
	const { data } = useStore();
	const sorks: any[] = data.sorks ?? [];

	return (
		<StackHeader>
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
		</StackHeader>
	);
}
