import {
	StyleSheet,
	Text as TextElement,
	View as ViewElement,
	ScrollView as ScrollViewElement,
	TextInput as TextInputElement,
	Button as ButtonElement,
	Image as ImageElement,
} from "react-native";

import DateTimePickerElement, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import SliderElement from "@react-native-community/slider";

import Theme from "./theme";
import { useEffect, useState } from "react";
import React from "react";

export const Text = ({
	children,
	style,
	onPress,
}: {
	children: any;
	style?: any;
	onPress?: () => void;
}) => {
	const s = StyleSheet.create({
		text: {
			fontSize: Theme.fontSize.default,
			color: Theme.color.black,
			...style,
		},
	});
	return (
		<TextElement
			style={s.text}
			onPress={onPress}
		>
			{children}
		</TextElement>
	);
};

export const Paragraph = ({ children, style }: { children: any; style?: any }) => {
	return <Text style={{ marginBottom: Theme.margin, ...style }}>{children}</Text>;
};

export const Header = ({
	children,
	style,
	size,
}: {
	children: any;
	style?: any;
	size: "small" | "medium" | "large";
}) => {
	const marginBottom = size === "small" ? Theme.margin / 4 : Theme.margin / 2;

	return (
		<Text
			style={{
				fontSize: Theme.fontSize[size],
				fontWeight: "bold",
				marginBottom,
				...style,
			}}
		>
			{children}
		</Text>
	);
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
	label,
	placeholder,
	onChangeText,
}: {
	value?: string;
	label?: string | undefined | null;
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
			<Text style={s.text}>{label}</Text>
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

export const Button = ({
	title,
	style,
	onPress,
	disabled = false,
}: {
	title: string;
	style?: any;
	onPress: () => void;
	disabled?: boolean;
}) => {
	const s = StyleSheet.create({
		button: {
			fontSize: Theme.fontSize.default,
			color: Theme.color.black,
			marginBottom: Theme.margin,
			...style,
		},
	});
	return (
		<ButtonElement
			onPress={onPress}
			title={title}
			disabled={disabled}
		/>
	);
};

export const DateTimePicker = ({
	id,
	value,
	label,
	onChange,
}: {
	id: string;
	value?: Date | null | undefined;
	label?: string | undefined | null;
	onChange: (e: DateTimePickerEvent) => void;
}) => {
	const s = StyleSheet.create({
		text: {
			color: Theme.color.greyDark,
			fontSize: Theme.fontSize.small,
			marginBottom: Theme.margin / 2,
		},
		picker: {
			marginBottom: Theme.margin,
			marginLeft: 0,
		},
	});

	return (
		<>
			<Text style={s.text}>{label}</Text>
			<DateTimePickerElement
				testID={id}
				value={value ?? new Date()}
				mode={"date"}
				is24Hour={true}
				onChange={onChange}
				style={s.picker}
			/>
		</>
	);
};

export const Slider = ({
	id,
	label,
	value: _value,
	onValueChange,
}: {
	id: string;
	label?: string | null | undefined;
	value: number;
	onValueChange: (value: number) => void;
}) => {
	const [value, setValue] = useState<number>(_value);

	useEffect(() => {
		onValueChange(value ?? 0);
	}, [value]);

	useEffect(() => {
		setValue(_value);
	}, [_value]);

	return (
		<React.Fragment key={id}>
			<Text>
				{label} ({value ?? "0"})
			</Text>
			<SliderElement
				key={id}
				style={{ width: "100%", height: 40 }}
				value={value}
				minimumValue={0}
				maximumValue={10}
				step={1}
				minimumTrackTintColor='#000000'
				maximumTrackTintColor='#FFFFFF'
				onValueChange={(step: number) => setValue(step)}
			/>
		</React.Fragment>
	);
};
