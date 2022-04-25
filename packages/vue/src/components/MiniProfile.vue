<template>
  <base-popover open-on-hover arrow placement="left" class="tooltip ">
    <slot />

    <template #content>
      <div class="bg-background-300  rounded-8px overflow-hidden">
        <changable-image
          class="h-6rem w-24rem"
          name="banner"
          :input-placeholder="user.banner"
          :image-url="user.banner"
          vignette
        />
        <div class=" p-8 text-text flex gap-6 items-center transform -translate-y-20">
          <avatar :url="user.avatar" :size="24" />
          <div class="flex gap-4 pt-12 items-center">
            <h1 class=" text-2xl">
              {{ user.username }}
            </h1>
            <admin-tag :user="user" />
          </div>
        </div>
      </div>
    </template>
  </base-popover>
</template>

<script setup lang="ts">
import type { IUser } from "../types/api/user";
import BasePopover from "/@/components/base/BasePopover.vue";
import ChangableImage from "/@/components/ChangableImage.vue";
import AdminTag from "/@/components/tags/AdminTag.vue";

defineProps<{user: IUser}>();

</script>
