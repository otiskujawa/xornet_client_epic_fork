<template>
  <div v-if="user" class="flex w-full flex-col">
    <top-bar />
    <div class="w-full h-full bg-black bg-opacity-25">
      <div
        class="p-4 flex items-center justify-center"
      >
        <avatar :img="user?.avatar" width="8rem" />
      </div>
      <h1 class="text-center">
        {{ user }}
      </h1>
      <h2 class="text-center">
        {{ user?.biography }}
      </h2>
    </div>
  </div>
</template>
<script setup lang="ts">
import TopBar from "/@/components/TopBar.vue";
import Avatar from "/@/components/user/Avatar.vue";
import { useState } from "/@/services/state";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted } from "vue";
const router = useRouter();
const route = useRoute();
const state = useState();
const user = computed(() => {
	if (route.params?.uuid)
		return state.users.get(route.params?.uuid as string);
	else
		return null;
});
onMounted(async() => {
	if (route.name === "profile" && !route.params.uuid) {
		await state.users.fetchMe();
		const user = state.users.getMe();
		router.push({ name: "profile", params: { uuid: user?.uuid } });
	}
});

</script>
