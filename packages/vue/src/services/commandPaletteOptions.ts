import { useState } from "../app";
import router from "../router";

export type CommandPalleteOptionCategory = "route" | "machine" | "appearance" | "sound" | "theme" | "setting";

export interface CommandPalleteOption {
	title: string
	icon?: string
	electronOnly?: boolean
	category: CommandPalleteOptionCategory
	onClickHandler?: Function
}

const state = useState();

const defineOption = (onClickHandler: Function, category: CommandPalleteOptionCategory, title: string, icon: string, electronOnly = false) => {
	return {
		onClickHandler,
		category,
		title,
		icon,
		electronOnly,
	};
};

const defineThemeCommands = (themes: string[]): CommandPalleteOption[] => {
	return themes.map(theme => defineOption(
		() => state.settings.general.theme = theme,
		"theme",
		`Set ${theme} theme`,
		"color-palette",
	));
};

export const commandPaletteOptions: CommandPalleteOption[] = [
	...defineThemeCommands(["nord", "dark"]),
	defineOption(
		() => state.settings.general.enable_rounded_corners = !state.settings.general.enable_rounded_corners,
		"appearance",
		"Toggle rounded corners",
		"color-palette",
		true,
	),
	defineOption(
		() => state.settings.general.enable_bloom = !state.settings.general.enable_bloom,
		"appearance",
		"Toggle bloom",
		"palette",
	),
	defineOption(
		() => state.settings.general.fixed_column_width = !state.settings.general.fixed_column_width,
		"appearance",
		"Toggle fixed column width",
		"command-palette",
	),
	defineOption(
		() => state.settings.general.enable_sound_effects = !state.settings.general.enable_sound_effects,
		"sound",
		"Toggle sound effects",
		"sound",
	),
	defineOption(
		() => state.settings.general.enable_status_bar = !state.settings.general.enable_status_bar,
		"appearance",
		"Toggle status bar",
		"palette",
	),
	defineOption(
		() => router.push({ name: "profile" }),
		"route",
		"Profile Page",
		"user",
	),
	defineOption(
		() => router.push({ name: "machines" }),
		"route",
		"Machines Page",
		"nas",
	),
	defineOption(
		() => router.push({ name: "settings" }),
		"route",
		"Settings Page",
		"settings",
	),
	defineOption(
		() => state.syncSettings(),
		"setting",
		"Sync (read) Settings",
		"synchronize",
	),
	defineOption(
		() => state.updateSettings(),
		"setting",
		"Sync (write) Settings",
		"synchronize",
	),
];
