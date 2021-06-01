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
          <input v-model="form.username" class="inputField" type="text" placeholder="Username" />
          <input v-model="form.email" class="inputField" type="email" placeholder="Email" />
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

<style>
.card {
  width: 280px;
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: var(--background-color);
  min-height: 400px;
  border-radius: 8px;
  transform: scale(1.25);
}

.card a img {
  width: 280px;
  height: auto;
}

.card .content {
  padding: 16px 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: left;
  height: 100%;
}

.card .content form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.card .content form .text * {
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  line-height: 175%;
}

.card .content form .text h1 {
  font-weight: bold;
  font-size: 16px;
  color: #585858;
}

.card .content form .text p {
  font-weight: 600;
  font-size: 12px;
  color: #8b8b8b;
}
.card .content form .fields {
  display: flex;
  gap: 8px;
  width: 100%;
  flex-direction: column;
}

.card .content form .fields .inputField {
  width: 100%;

  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 12px;

  border: none;
  background-color: #f8f8f8;
  height: 32px;
  padding: 6px 8px;
}

.card .content form .fields .inputField::placeholder {
  color: #c4c4c4;
}
.card .content form .fields p {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  color: #c4c4c4;
  line-height: 175%;
}

.card .content form .fields p a {
  font-family: Montserrat;
  color: var(--theme-main);
  font-weight: bold;
  font-style: normal;
  text-decoration: none;
}

.card .content form button {
  color: white;
  border: none;
  background-color: var(--theme-main);
  width: min-content;
  padding: 4px 16px;
  border-radius: 4px;
  /* box-shadow: 0px 4px 12px rgba(67, 97, 238, 0.5); */
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  line-height: 175%;
  transition: 100ms ease;
  display: flex;
  align-items: center;
  gap: 8px;
}
.card .content form button.disabled {
  cursor: not-allowed;
  user-select: none;
  filter: grayscale(1);
}

.card .content form button:hover {
  box-shadow: 0px 4px 12px rgba(67, 97, 238, 0.5);
  transform: translateY(-1px);
}

.card .content form button:active {
  transform: translateY(1px);
}

.card .content form button img {
  filter: invert(1);
  mix-blend-mode: screen;
  width: 16px;
  height: 16px;
}
</style>
