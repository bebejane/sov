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
				textStyle={s.header}
				style={{ backgroundColor: Theme.color.grey }}
			/>
			{data.data.map((cols: any, i: number) => (
				<Row
					key={i}
					data={Object.keys(cols).map((key: string) => cols[key])}
				/>
			))}
		</TableElement>
	);
};

const s = StyleSheet.create({
	table: {
		padding: 4,
	},
	border: {
		borderWidth: Theme.borderWidth,
		borderColor: Theme.color.grey,
	},
	header: {
		fontWeight: "bold",
	},
});
