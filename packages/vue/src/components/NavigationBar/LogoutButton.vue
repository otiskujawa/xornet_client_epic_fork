<template>
  <base-dialog v-model="showConfirmDialog" unsized>
    <div class="bg-black flex flex-col gap-4 p-4 w-full text-center">
      <div class="flex items-center justify-center">
        <i-fluency-skull class="w-24 h-24" />
      </div>
      <div class="text-white">
        Are you sure you want to logout?
      </div>
      <div class="flex gap-4">
        <base-button class="w-full" @click="showConfirmDialog = false">
          <i-fluency-happy-skull class="w-24px h-24px" />
          No
        </base-button>
        <base-button transparent class="w-full bg-caution" @click="logout">
          <i-fluency-skull class="w-24px h-24px" />
          Yes
        </base-button>
      </div>
    </div>
  </base-dialog>
  <base-button
    transparent
    draggable="false"
    class="p-4 flex items-center justify-center text-69px opacity-25"
    @click="showConfirmDialog = true"
  >
    <i-fluency-skull class="w-24px h-24px" />
  </base-button>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import BaseDialog from "../base/BaseDialog.vue";
import BaseButton from "../base/BaseButton.vue";
import { useState } from "/@/services/state";
const router = useRouter();
const state = useState();
const showConfirmDialog = ref(false);

const logout = () => {
	router.push({ name: "login" });
	state.users.logout();
};
</script>
