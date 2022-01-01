import { state } from "./state";

export class SoundManager {
	public static playHover() {
		if (!state.settings.enableSoundEffects.value) return;

		const sounds = [
			new Audio("sounds/hover1.wav"),
			new Audio("sounds/hover2.wav"),
			new Audio("sounds/hover3.wav"),
			new Audio("sounds/hover4.wav"),
		];

		const sound = sounds[~~(Math.random() * sounds.length - 1)];
		sound.volume = 0.25;
		sound.play();
	}

	public static playClick() {
		if (!state.settings.enableSoundEffects.value) return;

		const sound = new Audio("sounds/click1.wav");
		sound.volume = 0.25;
		sound.play();
	}

	public static playEscape() {
		if (!state.settings.enableSoundEffects.value) return;

		const sound = new Audio("sounds/escape.wav");
		sound.volume = 0.25;
		sound.play();
	}
}
