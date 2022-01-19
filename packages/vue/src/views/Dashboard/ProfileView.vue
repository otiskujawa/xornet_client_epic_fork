<template>
  <div v-if="user" class="flex w-full flex-col bg-black bg-opacity-25">
    <top-bar />
    <div class="w-full h-full px-4">
      <div
        class="p-4 flex items-center justify-center"
      >
        <avatar :user="user" width="8rem" />
      </div>
      <p class="text-4xl text-center">
        {{ user.username }}
      </p>
      <br>
      {{ user.biography }}
      <br>
      UUID: {{ user.uuid }}
      <br>
      Account created: {{ new Date(user.created_at).toLocaleString() }}
      <br>
      Edited: {{ new Date(user.updated_at).toLocaleString() }}
      <br>
      <div v-if="user.uuid === state.users.getMe().uuid">
        Avatar URL: <base-input
          v-model="avatar_url"
          :placeholder="user.avatar"
          @change="updateAvatar(avatar_url)"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import BaseInput from "/@/components/base/BaseInput.vue";
import TopBar from "/@/components/TopBar.vue";
import Avatar from "/@/components/user/Avatar.vue";
import { useState } from "/@/services/state";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
const router = useRouter();
const route = useRoute();
const state = useState();
const user = computed(() => {
	if (route.params?.uuid)
		return state.users.get(route.params?.uuid as string);
	else
		return null;
});
// This is kinda dumb
const avatar_url = ref(user.value?.avatar || "");
const updateAvatar = (url: string) => {
	if (user.value)
		state.users.updateAvatar(url);
};

onMounted(async() => {
	if (route.name === "profile" && !route.params.uuid) {
		await state.users.fetchMe();
		const user = state.users.getMe();
		router.push({ name: "profile", params: { uuid: user?.uuid } });
	}
});

</script>
