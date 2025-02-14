import useStore from '@/lib/store';
import { formatDate } from '@/lib/utils';
import StackHeader from '@/components/StackHeader';
import { Stack } from 'expo-router';

export default function Layout() {
	const { data } = useStore();
	const assignments: any[] = data.assignments ?? [];

	return (
		<StackHeader>
			{assignments?.map(({ id, date }, i) => (
				<Stack.Screen
					key={id}
					name={`home-assignments/${id}`}
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
