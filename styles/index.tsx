import {
	StyleSheet,
	Text as TextElement,
	View as ViewElement,
	ScrollView as ScrollViewElement,
	TextInput as TextInputElement,
	Image as ImageElement,
} from "react-native";
import Theme from "./theme";

export const Text = ({ children, style }: { children: any; style?: any }) => {
	const s = StyleSheet.create({
		text: {
			fontSize: Theme.fontSize.default,
			color: Theme.color.black,
			marginBottom: Theme.margin,
			...style,
		},
	});
	return <TextElement style={s.text}>{children}</TextElement>;
};

export const View = ({ children, style }: { children?: any; style?: any }) => {
	const s = StyleSheet.create({
		view: {
			flex: 1,
			flexDirection: "column",
			padding: Theme.padding,
			backgroundColor: Theme.color.white,
			width: Theme.screenWidth,
			height: Theme.screenHeight,
			...style,
		},
	});
	return <ViewElement style={s.view}>{children}</ViewElement>;
};

export const ScrollView = ({ children, style }: { children?: any; style?: any }) => {
	const s = StyleSheet.create({
		view: {
			flex: 1,
			flexDirection: "column",
			padding: Theme.padding,
			backgroundColor: Theme.color.white,
			width: Theme.screenWidth,
			height: Theme.screenHeight,
			...style,
		},
	});
	return <ScrollViewElement style={s.view}>{children}</ScrollViewElement>;
};

export const Loader = ({ loading }: { loading: boolean }) => {
	const s = StyleSheet.create({
		text: {
			color: Theme.color.white,
			fontSize: Theme.fontSize.default,
		},
		view: {
			flex: 1,
			top: 0,
			left: 0,
			zIndex: 10,
			justifyContent: "center",
			alignItems: "center",
			width: Theme.screenWidth,
			height: Theme.screenHeight,
		},
	});
	return (
		<ViewElement style={s.view}>
			<TextElement>Loading...</TextElement>
		</ViewElement>
	);
};

export const TextInput = ({
	value,
	header,
	placeholder,
	onChangeText,
}: {
	value?: string;
	header?: string | undefined | null;
	placeholder?: string;
	onChangeText: (t: string) => void;
}) => {
	const s = StyleSheet.create({
		text: {
			color: Theme.color.greyDark,
			fontSize: Theme.fontSize.small,
			marginBottom: Theme.margin / 2,
		},
	});

	return (
		<>
			<Text style={s.text}>{header}</Text>
			<TextInputElement
				style={{
					height: Theme.fontSize.default * 4,
					padding: 10,
					marginBottom: Theme.margin,
					backgroundColor: Theme.color.grey,
				}}
				multiline={true}
				placeholder={placeholder}
				onChangeText={onChangeText}
				defaultValue={value}
			/>
		</>
	);
};
