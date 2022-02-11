import { useRouter } from "vue-router";
import { useState } from "../app";

export type CommandPalleteOptionCategory = "route" | "machine" | "appearance" | "sound" | "theme" | "setting";

export interface CommandPalleteOption {
	title: string
	icon?: string
	electronOnly?: boolean
	category: CommandPalleteOptionCategory
	onClickHandler?: Function
}

const state = useState();
const router = useRouter();

export const commandPaletteOptions: CommandPalleteOption[] = [
	{
		onClickHandler: () => state.settings.general.enable_bloom = !state.settings.general.enable_bloom,
		category: "appearance",
		title: "Toggle bloom",
		icon: "palette",
	},
	{
		onClickHandler: () => state.settings.general.enable_rounded_corners = !state.settings.general.enable_rounded_corners,
		category: "appearance",
		title: "Toggle rounded corners",
		electronOnly: true,
		icon: "palette",
	},
	{
		onClickHandler: () => state.settings.general.fixed_column_width = !state.settings.general.fixed_column_width,
		category: "appearance",
		title: "Toggle fixed column width",
		icon: "command-palette",
	},
	{
		onClickHandler: () => state.settings.general.enable_sound_effects = !state.settings.general.enable_sound_effects,
		category: "sound",
		title: "Toggle sound effects",
		icon: "sound",
	},
	{
		onClickHandler: () => state.settings.general.enable_status_bar = !state.settings.general.enable_status_bar,
		category: "appearance",
		title: "Toggle status bar",
		icon: "palette",
	},
	{
		onClickHandler: () => state.settings.general.theme = "dark",
		category: "theme",
		title: "Set Dark",
		icon: "color-palette",
	},
	{
		onClickHandler: () => state.settings.general.theme = "nord",
		category: "theme",
		title: "Set Nord",
		icon: "color-palette",
	},
	{
		onClickHandler: () => router.push({ name: "machines" }),
		category: "route",
		title: "Machines Page",
		icon: "nas",
	},
	{
		onClickHandler: () => router.push({ name: "settings" }),
		category: "route",
		title: "Settings Page",
		icon: "settings",
	},
	{
		onClickHandler: () => state.syncSettings(),
		category: "setting",
		title: "Sync (read) Settings",
		icon: "synchronize",
	},
	{
		onClickHandler: () => state.updateSettings(),
		category: "setting",
		title: "Sync (write) Settings",
		icon: "synchronize",
	},
	{
		onClickHandler: () => router.push({ name: "profile" }),
		category: "route",
		title: "Profile Page",
		icon: "user",
	},
];
