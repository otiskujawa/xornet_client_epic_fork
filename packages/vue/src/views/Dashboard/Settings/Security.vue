<template>
  <p>
    Security
  </p>
  <option-field new-feature label="Login Activity" description="When you were logged in">
    <base-button text="Logout" @click="logout()" />
    <template #example>
      <div class="w-full h-1px bg-background-500 my-2" />
      <ul v-if="logins.length !== 0">
        <li v-for="login of logins " :key="login.timestamp">
          <i-fluency-location class="text-2xl" />
          <div class="flexcol gap-1">
            <p>
              {{ login.location }}
            </p>
            <p class="text-text text-opacity-40 text-xs">
              {{ login.agent.substring(login.agent.indexOf("(") + 1, login.agent.indexOf(";")) }} · {{ login.ip }} · {{ secondsToHuman(secondsSince(login.timestamp)) }} ago
            </p>
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
const state = useState();
const logins: Ref<IUserLoginHistory[]> = ref([]);
onMounted(async() => {
	logins.value = await state.users.fetchLogins();
});
</script>
