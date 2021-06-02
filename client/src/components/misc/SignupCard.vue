<template>
  <div class="card">
    <a href="https://www.youtube.com/watch?v=CH7FuFtpG68" target="_blank"><img :src="image" alt=""/></a>
    <div class="content">
      <form v-on:submit.prevent="!isLoading && !isFormValid ? signup() : null">
        <div class="text">
          <h1>Create account</h1>
          <p>Create your account so you can start tracking your machines!</p>
        </div>

        <div class="fields">
          <input v-model="form.email" class="inputField" type="email" placeholder="Email" />
          <input v-model="form.username" class="inputField" type="text" placeholder="Username" />
          <input v-model="form.password" class="inputField" type="password" placeholder="Password" />
          <input v-model="form.repeatPassword" class="inputField" type="password" placeholder="Repeat password" />
          <p>Have an account? <router-link :to="{ name: 'login' }">Click here</router-link></p>
        </div>

        <button type="submit" :class="{ disabled: isFormValid || isLoading }">Signup <img v-if="isLoading" :src="require('@/assets/icons/loading.gif')" alt="" /></button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignupCard",
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        repeatPassword: ""
      },
      isLoading: false
    };
  },
  computed: {
    isFormValid: function() {
      return Object.values(this.form).some(field => field == "");
    }
  },
  props: {
    image: { type: String, required: true }
  },
  methods: {
    async signup() {
      this.isLoading = true;
      console.log(this.form);
      await this.api.user.signup(this.form);
      const status = await this.api.user.login(JSON.stringify(this.form));
      this.isLoading = false;
      if (status == 200) this.$router.push("/dashboard/profile");
    }
  }
};
</script>
remove