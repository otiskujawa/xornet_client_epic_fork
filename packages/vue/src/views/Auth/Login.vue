<template>
  <div class="w-full flex items-center justify-center h-full">
    <div class="rounded-4px bg-background-400 w-128">
      <base-form title="Login" @submit="onSubmit">
        <base-input v-model="form.username" placeholder="Username" type="username" />
        <base-input v-model="form.password" placeholder="Password" type="password" autocomplete="password" />
        <p class="">
          New to Xornet?
          <base-link to="signup">
            Create new account
          </base-link>
        </p>
        <p class="font-bold text-caution">
          {{ errorText }}
        </p>
        <base-button type="submit" :disabled="!isValid">
          Login
        </base-button>
      </base-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import BaseButton from "/@/components/base/BaseButton.vue";
import BaseForm from "/@/components/base/BaseForm.vue";
import BaseInput from "/@/components/base/BaseInput.vue";
import BaseLink from "/@/components/base/BaseLink.vue";
import xornet, { useState } from "/@/app";
const router = useRouter();
const state = useState();

const form = reactive({
	username: "",
	password: "",
});

const errorText = ref("");

const isValid = computed(() => form.username && form.password);
const onSubmit = () => state.users.login(form).then(() => {
	router.push({ name: "machines" });
	xornet.initDashboard();
}).catch(async(e) => {
	errorText.value = (await e).error;
});
</script>

<style scoped lang="postcss">

</style>
