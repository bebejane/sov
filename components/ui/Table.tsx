import { Table as TableElement, Row } from "react-native-reanimated-table";
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
					style={s.text}
					data={Object.keys(cols).map((key: string) => cols[key])}
				/>
			))}
		</TableElement>
	);
};

const s = StyleSheet.create({
	table: {
		padding: 0,
		verticalAlign: "top",
	},
	column: {
		flex: 1,
		padding: Theme.padding / 2,
	},
	text: {
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "flex-start",
	},
	border: {
		borderWidth: Theme.borderWidth,
		borderColor: Theme.color.lightGreen,
	},
	header: {
		backgroundColor: Theme.color.lightGreen,
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "flex-start",
	},
	headerText: {
		fontWeight: "bold",
	},
});
