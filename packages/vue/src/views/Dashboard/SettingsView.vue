<template>
  <div class="w-full h-full overflow-y-scroll items-center flexcol bg-black bg-opacity-25">
    <top-bar />

    <div class="flexcol gap-12 pt-8 transform -translate-x-12">
      <div class="flex gap-4">
        <avatar :size="14" :url="state.users.getMe()?.avatar" />
        <div class="flexcol gap-2">
          <p class="text-xl">
            {{ state.users.getMe()?.username }}
          </p>
          <p class="font-light">
            {{ state.users.getMe()?.uuid }}
          </p>
        </div>
      </div>
      <div class="flex">
        <ul class="w-min min-w-64 max-w-max h-full whitespace-nowrap gap-2 rounded-8px ">
          <router-link class="settingsRoute" :to="{name: 'settings.account'}">
            <li>
              <div class="active ">
                <br>
              </div>
              <i-fluency-settings /> Account
            </li>
          </router-link>

          <router-link class="settingsRoute" :to="{name: 'settings.appearance'}">
            <li>
              <div class="active">
                <br>
              </div>
              <i-fluency-palette /> Appearance
            </li>
          </router-link>

          <router-link v-if="isElectron()" class="settingsRoute" :to="{name: 'settings.behavior'}">
            <li>
              <div class="active">
                <br>
              </div>
              <i-fluency-settings /> Behavior
            </li>
          </router-link>

          <router-link class="settingsRoute" :to="{name: 'settings.machinelist'}">
            <li>
              <div class="active">
                <br>
              </div>
              <i-fluency-tasks /> Machine List
            </li>
          </router-link>
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
const state = useState();
</script>

<style lang="postcss">

.optionList {
  @apply h-full text-left gap-4 items-center w-full max-w-224 min-w-224 gap-2 text-12px text-text px-8;
  & > p {
    @apply text-xl w-full ;
  }
}

.exampleNic {
  @apply bg-background-400 w-full whitespace-nowrap font-light gap-4 items-center justify-center overflow-hidden p-4 rounded-8px;
  & > p {
    @apply text-white text-center text-xs text-opacity-50;
  }
}

.settingsRoute {
  @apply p-2 px-4 flex items-center gap-3 rounded-4px cursor-pointer;

  & .active {
    @apply opacity-0 h-full w-2 bg-primary-400 rounded-full;
  }

  &:hover {
    .active {
      @apply opacity-50;
    }
  }

  &.router-link-active {
    @apply bg-background-300;
    .active {
      @apply opacity-100;
    }
  }

  & li {
    @apply flex items-center gap-3;
  }
}

</style>
