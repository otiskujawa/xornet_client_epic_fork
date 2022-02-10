import type { AppState } from "./state/AppState";

export class SoundManager {
	constructor(public state: AppState) {}
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
		if (!this.state.settings.general.enable_sound_effects) return;
		const sounds = SoundManager.sounds.hoverSounds;
		let sound = sounds[~~(Math.random() * sounds.length - 1)];
		sound = <HTMLAudioElement>sound.cloneNode(false);
		sound.volume = 0.15;
		sound.play();
	}

	public playClick() {
		if (!this.state.settings.general.enable_sound_effects) return;
		const sound = <HTMLAudioElement> SoundManager.sounds.click1.cloneNode(false);
		sound.volume = 0.25;
		sound.play();
	}

	public playEscape() {
		if (!this.state.settings.general.enable_sound_effects) return;
		const sound = <HTMLAudioElement> SoundManager.sounds.escape.cloneNode(false);
		sound.volume = 0.25;
		sound.play();
	}
}
