<template>
  <div class="card">
    <a href="https://www.youtube.com/watch?v=mNunrdp_epM" target="_blank"><img :src="image" alt=""/></a>
    <div class="details">
      <form v-on:submit.prevent="!isLoading && !isFormValid ? login() : null">
        <div class="text">
          <h1>Welcome back</h1>
          <p>Your machines have been waiting for you!</p>
        </div>

        <div class="fields">
          <input v-model="form.username" class="inputField" type="text" placeholder="Username" autocomplete="username"/>
          <input v-model="form.password" class="inputField" type="password" placeholder="Password" />
          <p>Don’t have an account? <router-link :to="{ name: 'signup' }">Click here</router-link></p>
          <!-- <p>Forgot your password? <router-link :to="{ name: 'forgot' }">Click here</router-link></p> -->
        </div>

        <button type="submit" :class="{ disabled: isFormValid || isLoading }">Login <img v-if="isLoading" :src="require('@/assets/animations/loading.gif')" alt="" /></button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginCard",
  data() {
    return {
      form: {
        username: "",
        password: ""
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
    async login() {
      this.isLoading = true;
      try {
        const status = await this.api.user.login(JSON.stringify(this.form));
        if (status == 200) this.$router.push(`/dashboard/profile/${this.form.username}`);
      } catch (error) {
        console.log(error);
      }

      this.isLoading = false;
    }
  }
};
</script>
