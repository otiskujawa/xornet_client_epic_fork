<template>
  <div v-if="user" class="w-full h-full flexcol bg-black bg-opacity-25">
    <div class="w-full h-full">
      <div
        class="w-full h-18rem bg-cover bg-center bg-norepeat drag"
        :style="bannerStyle"
      />
      <div class="px-32">
        <div
          class="flex"
        >
          <avatar :url="new_avatar || user.avatar" class="w-32 transform -translate-y-3rem" />
          <p class="text-4xl text-center p-4 px-8">
            {{ user.username }}
          </p>
        </div>
        {{ user.biography }}
        <br>
        UUID: {{ user.uuid }}
        <br>
        Account created: {{ new Date(user.created_at).toLocaleString() }}
        <br>
        Edited: {{ new Date(user.updated_at).toLocaleString() }}
        <br>
        <br>
        <div v-if="user.uuid === state.users.getMe().uuid">
          Avatar URL: <base-input
            v-model="new_avatar"
            :placeholder="user.avatar"
            @change="updateAvatar()"
          />
        </div>
        <div v-if="user.uuid === state.users.getMe().uuid">
          Banner URL: <base-input
            v-model="new_banner"
            :placeholder="user.banner"
            @change="updateBanner()"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useState } from "/@/app";
import BaseInput from "/@/components/base/BaseInput.vue";
import Avatar from "/@/components/user/Avatar.vue";
const router = useRouter();
const route = useRoute();
const state = useState();
const user = computed(() => route.params?.uuid ? state.users.get(route.params?.uuid as string) : null);
const new_avatar = ref("");
const new_banner = ref("");
const banner_url = computed(() => new_banner.value || user.value?.banner || "");
const bannerStyle = computed(() => `
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.25) 100%),
  url(${banner_url.value});
`);

const updateAvatar = () => user.value && state.users.updateAvatar(new_avatar.value);
const updateBanner = () => user.value && state.users.updateBanner(new_banner.value);
onMounted(async() => {
	if (route.name === "profile" && !route.params.uuid) {
		await state.users.fetchMe();
		const user = state.users.getMe();
		router.push({ name: "profile", params: { uuid: user?.uuid } });
	}
});

</script>
