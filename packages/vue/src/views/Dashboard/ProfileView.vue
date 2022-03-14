<template>
  <div v-if="user" class="w-full h-full flexcol bg-black bg-opacity-25">
    <div class="w-full h-full">
      <div class="relative edithover">
        <div class="w-full h-8 drag absolute" />
        <div
          class="w-full h-18rem bg-cover bg-center bg-norepeat"
          :style="bannerStyle"
        />
        <button class="absolute hovershow opacity-0 bg-background-200 bg-opacity-50 rounded-full bottom-4 right-4 p-2 items-center cursor-pointer flex duration-100" @click="is_banner_editor = true">
          <i-fluency-edit />
          <base-dialog v-model="is_banner_editor">
            <div v-if="user.uuid === state.users.getMe().uuid" class="popup">
              Banner URL: <base-input
                v-model="new_banner"
                :placeholder="user.banner"
                @change="updateBanner()"
              />
            </div>
          </base-dialog>
        </button>
      </div>
      <div class="px-32">
        <div
          class="flex"
        >
          <div class="w-32 h-32 transform -translate-y-3rem edithover">
            <button class=" w-full h-full absolute hovershow opacity-0 bg-background-200 bg-opacity-50 rounded-full p-2 items-center cursor-pointer flex duration-100 flexcol justify-center" @click="is_avatar_editor = true">
              <p>change</p>
              <p>avatar</p>
              <base-dialog v-model="is_avatar_editor">
                <div v-if="user.uuid === state.users.getMe().uuid" class="popup">
                  Avatar URL: <base-input
                    v-model="new_avatar"
                    :placeholder="user.avatar"
                    @change="updateAvatar()"
                  />
                </div>
              </base-dialog>
            </button>
            <avatar :url="new_avatar || user.avatar" class="h-full" />
          </div>
          <p class="text-4xl text-center p-4 px-8">
            {{ user.username }}
          </p>
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
import { formatDate } from "/@/services/logic";
import BaseDialog from "/@/components/base/BaseDialog.vue";
const router = useRouter();
const route = useRoute();
const state = useState();
const user = computed(() => route.params?.uuid ? state.users.get(route.params?.uuid as string) : null);
const new_avatar = ref("");
const new_banner = ref("");
const is_banner_editor = ref(false);
const is_avatar_editor = ref(false);
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
<style scoped>
  .edithover {
    &:hover .hovershow {
      @apply opacity-100;
    }
    &:active .hovershow {
      @apply bg-primary-400;
    }
  }
  .popup {
    @apply bg-background-200 p-8 flexcol gap-2;
  }
</style>
