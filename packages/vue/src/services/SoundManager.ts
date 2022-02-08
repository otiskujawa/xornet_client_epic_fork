import type { GlobalState } from "/@/app";

export class SoundManager {
	constructor(public state: GlobalState) {}
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

	public playHover() {
		if (!this.state.settings.enableSoundEffects.value) return;
		const sounds = SoundManager.sounds.hoverSounds;
		let sound = sounds[~~(Math.random() * sounds.length - 1)];
		sound = <HTMLAudioElement>sound.cloneNode(false);
		sound.volume = 0.15;
		sound.play();
	}

	public playClick() {
		if (!this.state.settings.enableSoundEffects.value) return;
		const sound = <HTMLAudioElement> SoundManager.sounds.click1.cloneNode(false);
		sound.volume = 0.25;
		sound.play();
	}

	public playEscape() {
		if (!this.state.settings.enableSoundEffects.value) return;
		const sound = <HTMLAudioElement> SoundManager.sounds.escape.cloneNode(false);
		sound.volume = 0.25;
		sound.play();
	}
}
