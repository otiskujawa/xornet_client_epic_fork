<template>
  <div class="w-full flex items-center justify-center h-full">
    <div class="rounded-4px bg-black bg-opacity-25 w-128">
      <base-form title="Login" @submit="onSubmit">
        <base-input v-model="form.username" placeholder="Username" type="username" />
        <base-input v-model="form.password" placeholder="Password" type="password" autocomplete="password" />
        <base-link to="signup">
          Sign Up?
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

// defineProps<{}>();
// defineEmits([]);

const form = reactive({
	username: "",
	password: "",
});

const isValid = computed(() => form.username && form.password);

const onSubmit = async() => {
	const response = await fetch("http://127.0.0.1:8085/users/@login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username: form.username,
			password: form.password,
		}),
	});
};

</script>

<style scoped lang="postcss">

</style>
