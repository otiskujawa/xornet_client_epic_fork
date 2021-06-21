<template>
  <div class="card">
    <a href="https://cdn.discordapp.com/attachments/806300597338767450/833734391883759656/deskslam.mp4" target="_blank"
      ><img src="https://media.discordapp.net/attachments/812793476059496448/846190595706060810/image0.gif" alt=""
    /></a>
    <div class="details">
      <form v-on:submit.prevent="!isLoading && !isFormValid ? add(form.url) : null">
        <div class="text">
          <h1>Flexing I see</h1>
          <p>Type in a URL</p>
        </div>

        <div class="fields">
          <input v-model="form.url" class="inputField" type="text" placeholder="URL" />
        </div>
        <button type="submit" :class="{ disabled: isFormValid || isLoading }">
          Add <img v-if="isLoading" :src="require('@/assets/animations/loading.gif')" alt="" />
        </button>
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

<style scoped src="@/components/misc/card.css"></style>
