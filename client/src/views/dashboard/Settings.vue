<template>
  <div
    class="settingspage w-full h-full py-2 sm:py-6 px-2 overflow-scroll sm:px-16 md:px-32 lg:px-48 xl:px-72 2xl:128 font-workSans font-semibold text-sm"
  >
    <div class="flex flex-col items-center gap-2 w-full ">
      <Account />
      <Interface />
      <Appearance />
      <Language />
      <Security />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Account from "@/components/dashboard/settings/Account.vue";
import Interface from "@/components/dashboard/settings/Interface.vue";
import Appearance from "@/components/dashboard/settings/Appearance.vue";
import Language from "@/components/dashboard/settings/Language.vue";
import Security from "@/components/dashboard/settings/Security.vue";
</script>
