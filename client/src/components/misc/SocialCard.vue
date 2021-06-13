<template>
  <div class="card">
    <a href="https://cdn.discordapp.com/attachments/806300597338767450/833734391883759656/deskslam.mp4" target="_blank"><img src="https://media.discordapp.net/attachments/812793476059496448/846190595706060810/image0.gif" alt=""/></a>
    <div class="details">
      <form v-on:submit.prevent="!isLoading && !isFormValid ? add(form.url) : null">
        <div class="text">
          <h1>Flexing I see</h1>
          <p>Type in a URL</p>
        </div>

        <div class="fields">
          <input v-model="form.url" class="inputField" type="text" placeholder="URL" />
        </div>
        <button type="submit" :class="{ disabled: isFormValid || isLoading }">Add <img v-if="isLoading" :src="require('@/assets/animations/loading.gif')" alt="" /></button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SocialCard",
  data() {
    return {
      form: {
        url: ""
      },
      isLoading: false
    };
  },
  props: {
    add: { type: Function }
  },
  computed: {
    isFormValid: function() {
      return Object.values(this.form).some(field => field == "");
    }
  }
};
</script>

<style scoped>
.card {
  position: absolute;
  left: 50%;
  z-index: 100;
  top: 50%;
  transform: translate(50%, 50%);

  width: fit-content;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: var(--background-color);
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  transform: scale(1.25);
}

.card a img {
  width: 280px;
  height: auto;
}

.card .details {
  padding: 16px 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: left;
  height: 100%;
}

.card .details form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.card .details form .text * {
  font-style: normal;
  line-height: 175%;
}

.card .details form .text h1 {
  font-weight: bold;
  font-size: 16px;
  color: #585858;
}

.card .details form .text p {
  font-weight: 600;
  font-size: 12px;
  color: #8b8b8b;
}
.card .details form .fields {
  display: flex;
  gap: 8px;
  width: 100%;
  flex-direction: column;
}

.card .details form .fields .inputField {
  width: 100%;

  font-weight: 600;
  font-size: 12px;

  border: none;
  background-color: #f8f8f8;
  height: 32px;
  padding: 6px 8px;
}

.card .details form .fields .inputField::placeholder {
  color: #c4c4c4;
}
.card .details form .fields p {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  color: #c4c4c4;
  line-height: 175%;
}

.card .details form .fields p a {
  font-family: Montserrat;
  color: var(--theme-color);
  font-weight: bold;
  font-style: normal;
}

.card .details form button {
  color: white;
  border: none;
  background-color: var(--theme-color);
  width: min-content;
  padding: 4px 16px;
  border-radius: 4px;
  /* box-shadow: 0px 4px 12px rgba(67, 97, 238, 0.5); */

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
.card .details form button.disabled {
  cursor: not-allowed;
  user-select: none;
  filter: grayscale(1);
}

.card .details form button:hover {
  box-shadow: 0px 4px 12px rgba(67, 97, 238, 0.5);
  transform: translateY(-1px);
}

.card .details form button:active {
  transform: translateY(1px);
}

.card .details form button img {
  filter: invert(1);
  mix-blend-mode: screen;
  width: 16px;
  height: 16px;
}
</style>
