<template>
  <div class="w-full flex items-center justify-center h-full">
    <div class="rounded-lg bg-black bg-opacity-25 w-128">
      <base-form title="Sign Up" @submit="onSubmit">
        <base-input v-model="username" placeholder="Username" type="username" />
        <base-input v-model="email" placeholder="Email" type="email" />
        <base-input v-model="password" placeholder="Password" type="password" />
        <base-input v-model="repeatPassword" placeholder="Repeat Password" type="new-password" />
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
import { computed, ref } from "vue";
import BaseButton from "/@/components/base/BaseButton.vue";
import BaseForm from "/@/components/base/BaseForm.vue";
import BaseInput from "/@/components/base/BaseInput.vue";
import BaseLink from "/@/components/base/BaseLink.vue";

// defineProps<{}>();
// defineEmits([]);

const username = ref("");
const email = ref("");
const password = ref("");
const repeatPassword = ref("");

const isValid = computed(() => username.value && email.value && password.value && repeatPassword.value === password.value);

const onSubmit = async() => {
	const response = await fetch("http://127.0.0.1:8085/users/@login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: email.value,
			username: username.value,
			password: password.value,
		}),
	});
};

</script>

<style scoped lang="postcss">

</style>
