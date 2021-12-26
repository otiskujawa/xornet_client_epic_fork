<template>
  <div class="w-full flex items-center justify-center h-full">
    <div class="rounded-lg bg-black bg-opacity-25 w-128">
      <base-form title="Sign Up" @submit="onSubmit">
        <base-input v-model="form.username" placeholder="Username" type="username" />
        <base-input v-model="form.email" placeholder="Email" type="email" />
        <base-input v-model="form.password" placeholder="Password" type="password" />
        <base-input v-model="form.repeatPassword" placeholder="Repeat Password" type="new-password" />
        <base-link to="login">
          Already have an account?
        </base-link>
        <base-button type="submit" :disabled="!isValid">
          Login
        </base-button>
      </base-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import BaseButton from "/@/components/base/BaseButton.vue";
import BaseForm from "/@/components/base/BaseForm.vue";
import BaseInput from "/@/components/base/BaseInput.vue";
import BaseLink from "/@/components/base/BaseLink.vue";

const form = reactive({
	username: "",
	email: "",
	password: "",
	repeatPassword: "",
});

const isValid = computed(() => form.username && form.email && form.password && form.repeatPassword === form.password);

const onSubmit = async() => {
	const response = await fetch("http://127.0.0.1:8085/users/@login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: form.email,
			username: form.username,
			password: form.password,
		}),
	});
};

</script>

<style scoped lang="postcss">

</style>
