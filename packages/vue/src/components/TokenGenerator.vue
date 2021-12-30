<template>
  <div class="bg-black flex flex-col gap-4 p-4 w-min text-center">
    <div class="div flex items-center justify-between">
      <h1 class>
        Signup Token
      </h1>
      <base-button @click="regenerateToken()">
        <i-fluency-restart />Regenerate
      </base-button>
    </div>

    <base-tooltip :text="copied ? 'Copied!' : 'Click to copy!'" placement="bottom">
      <div
        class="bg-white cursor-pointer  w-full bg-opacity-10 p-4 rounded border-4 transition duration-100 uppercase text-lg border-transparent hover:border-primary-400"
        @click="copy(token)"
      >
        <p
          :class="expired && 'line-through'"
          class="whitespace-nowrap w-86"
        >
          {{ token || 'Generating token...' }}
        </p>
      </div>
    </base-tooltip>

    <div class="flex text-sm justify-between">
      <p v-if="expired" class="text-red-500">
        Token expired, Generate a new one
      </p>
      <p v-else-if="expiresIn">
        Token will expire in {{ expiresIn }}s
      </p>

      <base-link href="https://github.com/xornet-cloud/Reporter">
        What to do?
      </base-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, Ref } from "vue";
import { useClipboard } from "@vueuse/core";
import BaseLink from "./base/BaseLink.vue";
import { useState } from "../services/state";
import BaseTooltip from "./base/BaseTooltip.vue";
import BaseButton from "./base/BaseButton.vue";
const state = useState();

const token = <Ref<string>>ref();
const { copy, copied } = useClipboard({ source: token });

const expiresAt = ref<number>();
const expiresIn = ref<number>();
const expired = computed(() => expiresIn.value! <= 0);

const clock = ref();
onMounted(() => {
  if (!token.value) regenerateToken();
  clock.value = setInterval(() => updateExpiration(), 1000)
})
onUnmounted(() => clearInterval(clock.value));

const regenerateToken = async() => {
	token.value = "";
	const { key, expiration } = await state.machines.generateToken();
	token.value = key;
	expiresAt.value = expiration;
};

const updateExpiration = () => {
	expiresIn.value = ~~((expiresAt.value! - Date.now()) / 1000);
};

</script>

<style scoped lang="postcss">

</style>