<template>
  <div class="w-full h-full overflow-y-scroll items-center flexcol bg-black bg-opacity-25">
    <top-bar />

    <div class="flexcol gap-12 pt-8 w-full items-center ">
      <div class="flex gap-4 w-full max-w-256 px-1/40  ">
        <avatar :size="14" :user="me" />
        <div class="flexcol gap-2">
          <div class="flex items-center gap-4">
            <p class="text-2xl">
              {{ me?.username }}
            </p>
            <admin-tag :user="me" />
          </div>
          <p class="text-white text-opacity-50 font-light">
            {{ me?.uuid }}
          </p>
        </div>
      </div>
      <div class="flex gap-8 px-8 w-full max-w-256">
        <ul class="w-full max-w-48 h-full whitespace-nowrap gap-2 rounded-8px ">
          <settings-category-button to="account" name="Account">
            <i-fluency-user />
          </settings-category-button>
          <settings-category-button to="appearance" name="Appearance">
            <i-fluency-palette />
          </settings-category-button>
          <settings-category-button to="sounds" name="Sounds">
            <i-fluency-sound />
          </settings-category-button>
          <settings-category-button v-if="isElectron()" to="behavior" name="Behavior">
            <i-fluency-settings />
          </settings-category-button>
          <settings-category-button to="machinelist" name="Machine List">
            <i-fluency-tasks />
          </settings-category-button>
        </ul>
        <div class="optionList flexcol">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useState } from "/@/app";
import TopBar from "/@/components/TopBar.vue";
import Avatar from "/@/components/user/Avatar.vue";
import { isElectron } from "/@/services/logic";
import SettingsCategoryButton from "/@/components/SettingsCategoryButton.vue";
import AdminTag from "/@/components/tags/AdminTag.vue";
import { computed } from "vue";
const state = useState();
const me = computed(() => state.users.getMe());
</script>

<style lang="postcss">

.optionList {
  @apply h-full text-left gap-4 items-center  w-full gap-2 text-12px text-text;
  & > p {
    @apply text-xl w-full ;
  }
}

.exampleNic {
  @apply bg-background-400 w-full whitespace-nowrap font-light gap-4 items-center justify-center overflow-hidden p-1/40 rounded-8px;
  & > p {
    @apply text-white hidden lg:flex text-center text-xs text-opacity-50;
  }
}

</style>
