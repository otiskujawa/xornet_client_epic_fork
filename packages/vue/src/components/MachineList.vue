<template>
  <resizable-div
    id="list"
    :minimum-width="96"
    class="bg-black bg-opacity-25 h-full w-64"
    @resize="handleResize"
  >
    <div class="p-2 pr-1 flex gap-4">
      <base-input v-model="filter" placeholder="Filter" />

      <base-dialog v-model="showToken" unsized>
        <div class="bg-black flex flex-col gap-4 p-4 w-min text-center">
          <div class="div flex items-center justify-between">
            <h1 class>Signup Token</h1>
            <base-button @click="regenerateToken()">
              <i-fluency-restart />Regenerate
            </base-button>
          </div>

          <base-tooltip :text="copied ? 'Copied!' : 'Click to copy!'" placement="bottom">
            <div
              class="bg-white cursor-pointer w-full bg-opacity-10 p-4 rounded border-4 transition duration-100 uppercase text-lg border-transparent hover:border-primary-400"
              @click="copy(token)"
            >
              <p
                :class="expired && 'line-through'"
                class="whitespace-nowrap w-86"
              >{{ token || 'Generating token...' }}</p>
            </div>
          </base-tooltip>

          <div class="flex text-sm justify-between">
            <p class="text-red-500" v-if="expired">Token expired, Generate a new one</p>
            <p v-else>Token will expire in {{ display }}</p>

            <base-link href="https://github.com/xornet-cloud/Reporter">What to do?</base-link>
          </div>
        </div>
      </base-dialog>
      <base-tooltip text="Add machine">
        <base-button class="w-12 flex items-center justify-center" @click="onShowTokenDialog">
          <i-fluency-plus class="w-4 h-4" />
        </base-button>
      </base-tooltip>
    </div>
    <machine-button
      v-for="machine of state.machines.getAll()"
      :key="machine.uuid"
      :mode="mode"
      :machine="machine"
    />
  </resizable-div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { ref } from "vue";

import { useClipboard } from "@vueuse/core";
import { useState } from "../services/state";

import MachineButton from "/@/components/MachineButton.vue";
import ResizableDiv from "/@/components/shared/ResizableDiv.vue";

import BaseInput from "./base/BaseInput.vue";
import BaseTooltip from "./base/BaseTooltip.vue";
import BaseButton from "./base/BaseButton.vue";
import BaseDialog from "./base/BaseDialog.vue";
import BaseLink from "./base/BaseLink.vue";

const state = useState();
const filter = ref();
const mode: Ref<"minimal" | "normal" | "maximal"> = ref("normal");
const showToken = ref(false);
const token = <Ref<string>>ref();
const { copy, copied } = useClipboard({ source: token });

const timer = ref();
const timeLeft = ref();
const display = ref();
const expired = ref(false);

const handleResize = (value: number) => {
  if (value < 128) return (mode.value = "minimal");
  else if (value >= 128 && value < 256) return (mode.value = "normal");
  else return (mode.value = "maximal");
};

const startTimer = (duration: number): Promise<void> => {
  clearInterval(timer.value);
  return new Promise((resolve) => {
    timeLeft.value = duration;
    let minutes: string;
    let seconds: string;
    timer.value = setInterval(() => {
      timeLeft.value--;

      const n_seconds = ~~timeLeft.value % 60;
      const n_minutes = ~~((timeLeft.value % 3600) / 60);

      minutes = n_minutes < 10 ? `0${n_minutes}` : `${n_minutes}`;
      seconds = n_seconds < 10 ? `0${n_seconds}` : `${n_seconds}`;

      display.value = `${minutes}:${seconds}`;

      if (timeLeft.value === 0) {
        clearInterval(timer.value);
        resolve();
      }
    }, 1000);
  });
};

const regenerateToken = async () => {
  token.value = "";
  token.value = await state.machines.generateToken();
  expired.value = false;
  await startTimer(300);
  expired.value = true;
};

const onShowTokenDialog = () => {
  if (!token.value) regenerateToken();
  showToken.value = true;
};

</script>
