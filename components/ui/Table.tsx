import { Table as TableElement, Row, Rows } from "react-native-reanimated-table";
import { StyleSheet } from "react-native";
import Theme from "@/styles/theme";

export type TableProps = {
	data: {
		columns: string[];
		data: any[];
	};
};

export const Table = ({ data }: TableProps) => {
	return (
		<TableElement
			style={s.table}
			borderStyle={s.border}
		>
			<Row
				data={data.columns}
				textStyle={[s.column, s.headerText]}
				style={[s.header]}
			/>
			{data.data.map((cols: any, i: number) => (
				<Row
					key={i}
					textStyle={s.column}
					data={Object.keys(cols).map((key: string) => cols[key])}
				/>
			))}
		</TableElement>
	);
};

const s = StyleSheet.create({
	table: {
		padding: 0,
	},
	column: {
		display: "flex",
		alignItems: "flex-start",
		padding: Theme.padding / 2,
	},
	border: {
		borderWidth: Theme.borderWidth,
		borderColor: Theme.color.lightGreen,
	},
	header: {
		backgroundColor: Theme.color.grey,
	},
	headerText: {
		fontWeight: "bold",
	},
});
