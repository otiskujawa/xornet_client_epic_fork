<template>
  <div class="flex w-full flex-col">
    <top-bar />
    <div class="w-full h-full bg-black bg-opacity-25">
      <div
        class="p-4 flex items-center justify-center"
      >
        <avatar :img="state.users.getMe().avatar" />
      </div>
      <h1 class="text-center">
        {{ user?.username }}
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
import { computed } from "vue";
const router = useRouter();
const route = useRoute();
const state = useState();
const user = computed(() => {
	if (route.params.uuid)
		return state.users.get(route.params?.uuid as string);
	else
		return state.users.getMe();
});

</script>
