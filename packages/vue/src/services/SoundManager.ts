import type { AppState } from "./state/AppState";

export class SoundManager {
	constructor(public state: AppState) {}
	public static sounds = {
		hoverSounds: [
			new Audio("sounds/hover_1.wav"),
			new Audio("sounds/hover_2.wav"),
			new Audio("sounds/hover_3.wav"),
			new Audio("sounds/hover_4.wav"),
		],
		click1: new Audio("sounds/click.wav"),
		escape: new Audio("sounds/escape.wav"),
	};

	public playHover() {
		if (!this.state.settings.general.enable_sound_effects) return;
		const sounds = SoundManager.sounds.hoverSounds;
		let sound = sounds[~~(Math.random() * sounds.length - 1)];
		sound = <HTMLAudioElement>sound.cloneNode(false);
		sound.volume = this.state.settings.general.sound_volume / 100;
		sound.play();
	}

	public playClick() {
		if (!this.state.settings.general.enable_sound_effects) return;
		const sound = <HTMLAudioElement> SoundManager.sounds.click1.cloneNode(false);
		sound.volume = this.state.settings.general.sound_volume / 100;
		console.log(sound.volume);
		sound.play();
	}

	public playEscape() {
		if (!this.state.settings.general.enable_sound_effects) return;
		const sound = <HTMLAudioElement> SoundManager.sounds.escape.cloneNode(false);
		sound.volume = this.state.settings.general.sound_volume / 100;
		console.log(sound.volume);
		sound.play();
	}
}
