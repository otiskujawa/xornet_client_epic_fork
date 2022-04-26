<template>
  <div class="flexcol w-full items-center">
    <changable-image
      :is-editable="true"
      name="banner"
      vertical-vignette
      class="w-full h-64"
      :image-url="user.banner"
      :input-placeholder="user.banner"
    />
    <div class="flex gap-4 w-full transform -translate-y-14 select-none  items-center max-w-256 px-1/40  ">
      <changable-image
        class="w-24 h-24 rounded-full overflow-hidden"
        name="avatar"
        :input-placeholder="user.avatar"
        :image-url="user.avatar"
        :is-editable="true"
        @update="(newImage: string) => state.users.updateAvatar(newImage)"
      />
      <div class="flexcol gap-2">
        <div class="flex items-center gap-4">
          <p class="text-2xl">
            {{ user.username }}
          </p>
          <admin-tag :user="user" />
        </div>
        <p class="text-text text-opacity-50 font-light">
          {{ user.uuid }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useState } from "../app";
import type { IUser } from "../types/api/user";
import ChangableImage from "./ChangableImage.vue";
import AdminTag from "./tags/AdminTag.vue";
const state = useState();
defineProps<{user: IUser}>();
</script>
