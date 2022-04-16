<template>
  <div class="bg-black flexcol gap-4 p-4 w-min">
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
        class="text-center copyButton"
        @click="copy(token)"
      >
        <p
          :class="expired && 'line-through'"
          class="whitespace-nowrap w-120"
        >
          {{ token || 'Generating token...' }}
        </p>
      </div>
    </base-tooltip>
    Linux Installer

    <base-tooltip :text="copied ? 'Copied!' : 'Click to copy!'" placement="bottom">
      <div
        class="copyButton"
        @click="copy('curl https://raw.githubusercontent.com/xornet-cloud/Reporter/main/scripts/install.sh | sudo bash')"
      >
        <p
          class="text-left"
        >
          $ curl https://raw.githubusercontent.com/xornet-cloud/Reporter/main/scripts/install.sh | sudo bash
        </p>
      </div>
    </base-tooltip>

    Windows Installer

    <base-tooltip :text="copied ? 'Copied!' : 'Click to copy!'" placement="bottom">
      <div
        class="copyButton"
        @click="copy('Set-ExecutionPolicy RemoteSigned -Scope CurrentUser \niwr -useb get.scoop.sh | iex \nscoop install https://raw.githubusercontent.com/xornet-cloud/Reporter/main/scripts/xornet-reporter.json')"
      >
        <p
          class="text-left"
        >
          $ Set-ExecutionPolicy RemoteSigned -Scope CurrentUser <br>
          $ iwr -useb get.scoop.sh | iex <br>
          $ scoop install "https://raw.githubusercontent.com/xornet-cloud/Reporter/main/scripts/xornet-reporter.json"
        </p>
      </div>
    </base-tooltip>

    <div class="flex  justify-between">
      <p v-if="expired" class="text-red-500">
        Token expired, Generate a new one
      </p>
      <p v-else-if="expiresIn">
        Token will expire in {{ expiresIn }}s
      </p>

      <base-link href="https://github.com/xornet-cloud/Reporter#-installation">
        What to do?
      </base-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useState } from "/@/app";
import BaseButton from "/@/components/base/BaseButton.vue";
import BaseLink from "/@/components/base/BaseLink.vue";
import BaseTooltip from "/@/components/base/BaseTooltip.vue";

const state = useState();

const token = ref<string>();
const { copy, copied } = useClipboard({ source: token.value });

const expiresAt = ref<number>();
const expiresIn = ref<number>();
const expired = computed(() => expiresIn.value! <= 0);

const clock = ref();

const regenerateToken = async() => {
	token.value = "";
	const { key, expiration } = await state.machines.generateToken();
	token.value = key;
	expiresAt.value = expiration;
};

const updateExpiration = () => {
	expiresIn.value = ~~((expiresAt.value! - Date.now()) / 1000);
};

onMounted(() => {
	if (!token.value) regenerateToken();
	clock.value = setInterval(() => updateExpiration(), 1000);
});
onUnmounted(() => clearInterval(clock.value));

</script>

<style>
.copyButton {
  @apply bg-white cursor-pointer w-full bg-opacity-10 p-4 rounded border-4 transition duration-100 text-lg border-transparent hover:border-primary-400;
}
</style>
