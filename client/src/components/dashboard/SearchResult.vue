<template>
  <router-link class="searchResult" :to="{ name: 'profile', params: { username: user.username } }">
    <div class="profile">
      <img class="profileImg" :src="user.profileImage?.url ?? 'https://cdn.discordapp.com/attachments/816028632269979668/855437868825444372/unknown.png'" alt="user profile image" />
      <div class="user">
        <div class="username">
          <p>{{ user.username }}</p>
          <img class="location" :src="user.geolocation?.countryCode ? require(`@/assets/flags/${user.geolocation.countryCode}.png`) : require('@/assets/flags/__.png')" alt="Country Flag" />
        </div>
        <div class="badges">
          <img class="badge" v-for="badge of user.badges?.owned" :key="badge" :src="require(`@/assets/badges/${badge}.svg`)" />
        </div>
      </div>
    </div>
    <div class="userPoints">
      <p class="p">Points</p>
      <p class="points">{{ ~~user.points }}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "SearchResult",
  components: {},
  computed: {},
  data() {
    return {};
  },
  props: {
    user: { type: Object, required: true }
  }
};
</script>

<style scoped>
.searchResult {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  justify-content: space-between;
  gap: 8px;
  text-align: left;
}

.searchResult:hover {
  /* Shadow */
  background-color: var(--white);
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.1);
}

.userPoints {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: right;
}

.userPoints .p {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  left: 0px;
  color: var(--black);
}

.points {
  background: linear-gradient(90deg, #8676ff 0%, #516dff 33.33%, #32b5ff 69.27%, #4adeff 100%);
  background-clip: border-box;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: Work Sans;
  font-weight: 600;
  font-size: 16px;
  left: 0px;
}

.profile {
  display: flex;
  flex-direction: row;
  width: 40%;
  gap: 8px;
}

.username {
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: center;
  align-items: center;
}

.username img {
  height: 13px;
  border-radius: 2px;
}

.badges {
  display: flex;
  flex-direction: row;
  gap: 8px;

  bottom: 4px;
}

.badges .badge {
  height: 16px;
  width: 16px;
}
.profile {
  display: flex;
  gap: 8px;
}

.profile .profileImg {
  width: 48px;
  height: 48px;
  border-radius: 135.5px;
  object-fit: cover;
}

.profile .user {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 4px 0px;
  width: 40%;
  min-width: 128px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 100%;

  display: flex;
  color: var(--black);
}
</style>
