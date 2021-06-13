<template>
  <div class="card">
    <a href="https://cdn.discordapp.com/attachments/806300597338767450/833734391883759656/deskslam.mp4" target="_blank"><img :src="image" alt=""/></a>
    <div class="details">
      <form v-on:submit.prevent="!isLoading && !isFormValid ? login() : null">
        <div class="text">
          <h1>Wow! Good job</h1>
          <p>Type in your email to send you a password reset!</p>
        </div>

        <div class="fields">
          <input v-model="form.email" class="inputField" type="email" placeholder="Email" />
        </div>
        <button type="submit" :class="{ disabled: isFormValid || isLoading }">Reset Password <img v-if="isLoading" :src="require('@/assets/animations/loading.gif')" alt="" /></button>
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
        email: ""
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
  }
};
</script>
