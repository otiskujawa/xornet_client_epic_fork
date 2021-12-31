<template>
  <div class="w-full flex items-center justify-center h-full">
    <div class="rounded-4px bg-background-400 w-128">
      <base-form title="Sign Up" @submit="onSubmit">
        <base-input v-model="form.username" placeholder="Username" type="username" />
        <base-input v-model="form.email" placeholder="Email" type="email" />
        <base-input v-model="form.password" placeholder="Password" type="password" />
        <base-input v-model="form.repeatPassword" placeholder="Repeat Password" type="password" />
        <base-link to="login">
          Already have an account?
        </base-link>
        <base-button type="submit" :disabled="!isValid">
          Sign Up
        </base-button>
      </base-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import BaseButton from "/@/components/base/BaseButton.vue";
import BaseForm from "/@/components/base/BaseForm.vue";
import BaseInput from "/@/components/base/BaseInput.vue";
import BaseLink from "/@/components/base/BaseLink.vue";
import { useState } from "/@/services/state";
const router = useRouter();
const state = useState();

const form = reactive({
	username: "",
	email: "",
	password: "",
	repeatPassword: "",
});

const isValid = computed(() => form.username && form.email && form.password && form.repeatPassword === form.password);

const onSubmit = async() => state.users.signup(form).then(() => router.push({ name: "machines" }));

</script>

<style scoped lang="postcss">

</style>
