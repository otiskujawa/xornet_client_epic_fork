<template>
  <p>
    Security
  </p>
  <option-field label="Login Activity" description="When you were logged in">
    <base-button text="Logout" @click="logout()" />
    <template #example>
      <div class="w-full h-1px bg-background-500 my-2" />
      <ul v-if="logins.length !== 0" class="flexcol gap-2">
        <li v-for="login of logins " :key="login.timestamp" class="flex py-1  text-text text-opacity-100  items-center gap-4">
          <i-fluency-location class="text-xl" />
          <div class="flexcol gap-1 ">
            <div class="flex gap-2 items-center text-xs">
              <p class="text-xs">
                {{ getAgent(login.agent) }}
              </p>
              <p class="text-xs">
                •
                {{ login.ip }}
              </p>
              <p v-if="login.timestamp" class="text-xs">
                •
                {{ secondsToHuman(secondsSince(login.timestamp)) }} ago
              </p>
            </div>
          </div>
        </li>
      </ul>
      <p v-else class="text-xs">
        There's no records, relog to see an entry
      </p>
    </template>
  </option-field>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { onMounted, ref } from "vue";
import { useState } from "/@/app";
import BaseButton from "/@/components/base/BaseButton.vue";
import OptionField from "/@/components/OptionField.vue";
import { logout, secondsSince, secondsToHuman } from "/@/services/logic";
import type { IUserLoginHistory } from "/@/types/api/user";
import Flag from "/@/components/Flag.vue";
import IspLogo from "/@/components/IspLogo.vue";

const getAgent = (agent: string) => {
	if (!agent) return "Unknown device";
	const browserStyle = agent.substring(agent.indexOf("(") + 1, agent.indexOf(";"));
	if (browserStyle.trim() === "")
		return agent;
	return browserStyle;
};

const state = useState();
const logins: Ref<IUserLoginHistory[]> = ref([]);
onMounted(async() => logins.value = await state.users.fetchLogins());
</script>
