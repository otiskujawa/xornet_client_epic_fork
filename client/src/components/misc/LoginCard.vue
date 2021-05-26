<template>
  <div class="card">
        <a href="https://www.youtube.com/watch?v=mNunrdp_epM" target="_blank"><img :src="image" alt=""></a>
        <div class="content">
            <form v-on:submit.prevent="!isLoading && !isFormValid ? login() : null">
                <div class="text">
                    <h1>Welcome back</h1>
                    <p>Your machines have been waiting for you!</p>
                </div>

                <div class="fields">
                    <input v-model="form.username" class="inputField" type="text" placeholder="Username">
                    <input v-model="form.password" class="inputField" type="password" placeholder="Password">
                    <p>Don’t have an account? <router-link :to="{ name: 'signup'}">Click here</router-link></p>
                </div>

                <button type="submit" :class="{disabled: isFormValid || isLoading}">Login <img v-if="isLoading" :src="require('@/assets/icons/loading.gif')" alt=""></button>
            </form>
        </div>
  </div>
</template>

<script>
export default {
    name: 'LoginCard',
    data(){
        return {
            form: {
                username: '',
                password: '',
            },
            isLoading: false,
        }
    },
    computed: {
        isFormValid: function(){
            return Object.values(this.form).some(field => field == '');
        }
    },
    props: {
        image: { type: String, required: true },
    },
    methods: {
      async login(){
        this.isLoading = true;
        try {
            const status = await this.api.user.login(JSON.stringify(this.form));
            if (status == 200) this.$router.push('/dashboard/profile');
        } catch (error) {
            console.log(error);
        }

        this.isLoading = false;
      }
    }
}
</script>

<style>
.card {
    width: 280px;
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
    font-family: 'Montserrat', sans-serif;
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
    color: #8B8B8B;
}
.card .content form .fields {
    display: flex;
    gap: 8px;
    width: 100%;
    flex-direction: column;
}

.card .content form .fields .inputField {
    width: 100%;

    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 12px;

    border: none;
    background-color: #F8F8F8;
    height: 32px;
    padding: 6px 8px;
}

.card .content form .fields .inputField::placeholder {
    color:#c4c4c4;
}
.card .content form .fields p {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    color:#c4c4c4;
    line-height: 175%;
}

.card .content form .fields p a {
    font-family: Montserrat;
    color: #4361EE;
    font-weight: bold;
    font-style: normal;
    text-decoration: none;
}


.card .content form button {
    color: white;
    border: none;
    background-color: #4361EE;
    width: min-content;
    padding: 4px 16px;
    border-radius: 4px;
    /* box-shadow: 0px 4px 12px rgba(67, 97, 238, 0.5); */
    font-family: 'Montserrat', sans-serif;
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
    filter:invert(1);
    mix-blend-mode: screen;
    width: 16px;
    height: 16px;
}


</style>