import { Audio } from "expo-av";
import { Button, View } from "react-native";

export default function AudioPlayer({ src }: { src: string }) {
	//const player = useAudioPlayer(src);

	return (
		<View>
			<Button
				title={"Play"}
				onPress={() => loadAndPlayAudio({ uri: src })}
			/>
		</View>
	);
}

async function loadAndPlayAudio({ uri }: { uri: string }) {
	const { sound, status } = await Audio.Sound.createAsync(
		{ uri },
		{ isLooping: false, shouldPlay: true }
	);
	console.log(uri);

	if (status.isLoaded) {
		console.log("play");
		await sound.setVolumeAsync(1);
		await sound.playAsync();
		console.log("done");
	}
	sound.setOnPlaybackStatusUpdate(function (status) {
		//console.log(status.volume);
	});
}
