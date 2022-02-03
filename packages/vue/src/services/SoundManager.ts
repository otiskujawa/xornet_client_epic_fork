import { state } from "./state";

export class SoundManager {
	public static sounds = {
		hoverSounds: [
			new Audio("sounds/hover1.wav"),
			new Audio("sounds/hover2.wav"),
			new Audio("sounds/hover3.wav"),
			new Audio("sounds/hover4.wav"),
		],
		click1: new Audio("sounds/click1.wav"),
		escape: new Audio("sounds/escape.wav"),
	};

	public static playHover() {
		if (!state.settings.enableSoundEffects.value) return;
		const sounds = this.sounds.hoverSounds;
		let sound = sounds[~~(Math.random() * sounds.length - 1)];
		sound = <HTMLAudioElement>sound.cloneNode(false);
		sound.volume = 0.15;
		sound.play();
	}

	public static playClick() {
		if (!state.settings.enableSoundEffects.value) return;
		const sound = <HTMLAudioElement> this.sounds.click1.cloneNode(false);
		sound.volume = 0.25;
		sound.play();
	}

	public static playEscape() {
		if (!state.settings.enableSoundEffects.value) return;
		const sound = <HTMLAudioElement> this.sounds.escape.cloneNode(false);
		sound.volume = 0.25;
		sound.play();
	}
}
