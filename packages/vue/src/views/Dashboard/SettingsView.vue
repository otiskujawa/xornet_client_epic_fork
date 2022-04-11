<template>
  <div class="w-full h-full overflow-y-scroll items-center flexcol bg-black bg-opacity-25">
    <top-bar />

    <div class="flexcol gap-12 pt-8 w-full items-center ">
      <div class="flex gap-4 w-full max-w-256 px-1/40  ">
        <avatar :size="14" :user="state.users.getMe()" />
        <div class="flexcol gap-2">
          <p class="text-2xl">
            {{ state.users.getMe()?.username }}
          </p>
          <p class="text-white text-opacity-50 font-light">
            {{ state.users.getMe()?.uuid }}
          </p>
        </div>
      </div>
      <div class="flex gap-8 px-8 w-full max-w-256">
        <ul class="w-full max-w-48 h-full whitespace-nowrap gap-2 rounded-8px ">
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

          <router-link class="settingsRoute" :to="{name: 'settings.sounds'}">
            <li>
              <div class="active">
                <br>
              </div>
              <i-fluency-sound /> Sounds
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
import NewTag from "/@/components/NewTag.vue";
const state = useState();
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

.settingsRoute {
  @apply p-2 px-4 flex items-center gap-3 text-white text-opacity-50 hover:text-opacity-100 rounded-4px cursor-pointer;

  & .active {
    @apply opacity-0 h-full w-2 bg-primary-400 rounded-full;
  }

  &:hover {
    .active {
      @apply opacity-50;
    }
  }

  &.router-link-active {
    @apply bg-background-300 text-opacity-100;
    .active {
      @apply opacity-100;
    }
  }

  & li {
    @apply flex items-center gap-3;
  }
}

</style>
