<template>
  <img v-if="image" class="max-h-5 w-min max-w-20" :src="`/isps/${image}.svg`" :alt="image">
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps<{name: string}>();

const KNOWN_ISPS = [
	"at&t",
	"comcast",
	"cox",
	"dna",
	"dom.ru",
	"elisa",
	"fios",
	"o2",
	"ote",
	"rt.ru",
	"telia",
	"telus",
	"timewarnercable",
	"tmobile",
	"turner",
	"virgin",
	"vodafone",
	"wind",
	"xfinity",
	"xs4all",
];

const image = computed(() => {
	const lowercase = props.name.toLowerCase();
	for (let i = 0; i < KNOWN_ISPS.length; i++) {
		const knownIsp = KNOWN_ISPS[i];
		if (lowercase.includes(knownIsp))
			return knownIsp;
	}
	return undefined;
});

</script>
