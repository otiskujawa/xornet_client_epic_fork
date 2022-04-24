import type { AppState } from "./state/AppState";

export class SoundManager {
	constructor(public state: AppState) {}
	public sounds: {[key: string]: HTMLAudioElement } = {
		hover_1: new Audio("sounds/hover_1.wav"),
		hover_2: new Audio("sounds/hover_2.wav"),
		hover_3: new Audio("sounds/hover_3.wav"),
		hover_4: new Audio("sounds/hover_4.wav"),
		click: new Audio("sounds/click.wav"),
		escape: new Audio("sounds/escape.wav"),
	};

	private playSound(sound: HTMLAudioElement) {
		if (!this.state.settings.general.enable_sound_effects) return;
		const soundClone = <HTMLAudioElement> sound.cloneNode(false);
		soundClone.volume = this.state.settings.general.sound_volume / 100;
		soundClone.play();
	}

	public playClick() {
		this.playSound(this.sounds.click);
	}

	public playEscape() {
		this.playSound(this.sounds.escape);
	}
}
