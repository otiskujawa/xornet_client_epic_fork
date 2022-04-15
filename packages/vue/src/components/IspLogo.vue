<template>
  <img class="w-full max-w-6 max-h-6" :src="`/public/isps/${image}.svg`" :alt="image">
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
	return "unknown";
});

</script>
