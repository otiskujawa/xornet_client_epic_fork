<template>
  <img class="w-full max-w-6 max-h-6" :src="`/public/isps/${image}.svg`" :alt="image">
</template>

<script setup lang="ts">import { computed } from "vue";

const props = defineProps<{name: string}>();

const image = computed(() => {
	switch (props.name) {
		case "Polkomtel Sp. z o.o.":
			return "polkomtel";
		case "MEDIANOVA INTERNET HIZMETLERI VE TICARET ANONIM SIRKETI":
			return "medianova";
		case "TURKCELL":
			return "turkcell";
		case "Cosmote Mobile Telecommunications S.A.":
			return "cosmote";
		case "Vodafone Libertel B.V.":
			return "vodafone";
		default:
			return "vodafone";
	}
});

</script>
