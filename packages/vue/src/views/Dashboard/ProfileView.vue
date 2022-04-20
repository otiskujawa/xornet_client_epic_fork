<template>
  <div v-if="user" class="w-full overflow-scroll h-full flexcol bg-black bg-opacity-25">
    <div class="w-full h-8 drag absolute" />
    <changable-image
      class="h-32rem"
      name="banner"
      :update-fn="state.users.updateBanner"
      :input-placeholder="user?.banner"
      :image-url="user?.banner"
      :editable="user.uuid === state.users.getMe().uuid"
      vignette
    />
    <div class="w-full h-full">
      <div class="px-4 sm:px-16 md:px-32 lg:px-48 xl:px-64">
        <div class="flex">
          <changable-image
            class="w-32 h-32 transform -translate-y-3rem rounded-full overflow-hidden"
            name="avatar"
            :update-fn="state.users.updateAvatar"
            :input-placeholder="user?.avatar"
            :image-url="user?.avatar"
            :editable="user.uuid === state.users.getMe().uuid"
          />
          <div class="flex items-center gap-4 mb-12 px-8">
            <p class="text-4xl">
              {{ user.username }}
            </p>
            <admin-tag :user="user" />
          </div>
        </div>
        <div class="flex flexcol gap-2">
          <div class="flex gap-4 items-center">
            <p class="text-2xl">
              {{ userMachines.length }}
            </p>
            <p class="text-lg text-text text-opacity-75 font-light">
              Machines
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useState } from "/@/app";
import AdminTag from "/@/components/tags/AdminTag.vue";
import type { IDatabaseMachine } from "/@/types/api/machine";
import ChangableImage from "../../components/ChangableImage.vue";
const router = useRouter();
const route = useRoute();
const state = useState();
const user = computed(() => route.params?.uuid ? state.users.get(route.params?.uuid as string) : null);
const userMachines = ref<IDatabaseMachine[]>([]);
watch(() => route.params, async() => route.params.uuid ? await state.users.fetchMachines(route.params.uuid as string) : []);
onMounted(async() => {
	userMachines.value = await state.users.fetchMachines(route.params.uuid as string);
	if (route.name === "profile" && !route.params.uuid) {
		await state.users.fetchMe();
		const user = state.users.getMe();
		router.push({ name: "profile", params: { uuid: user?.uuid } });
	}
});
</script>
