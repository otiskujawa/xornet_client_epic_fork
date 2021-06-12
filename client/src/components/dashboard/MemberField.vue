<template>
  <div class="membersInfo">
    <h1 class="title">Members</h1>
    <router-link :to="{ name: 'profile', params: { username: member.username } }" class="member" v-for="member of members" :key="member">
      <div class="user">
        <img :src="member.profileImage?.url" :alt="member.username" />
        <h1>{{ member.username }}</h1>
      </div>
      <ShadowButton v-if="isOwner" colored class="revoke" title="Revoke" textonly @click="revoke(member._id)" />
    </router-link>
    <ShadowButton v-if="isOwner" title="Add" textonly @click="showMemberCard = !showMemberCard" />
    <MemberCard v-if="showMemberCard" />
  </div>
</template>

<script>
import ShadowButton from "@/components/dashboard/ShadowButton";
import MemberCard from "@/components/misc/MemberCard";
export default {
  name: "MemberField",
  data() {
    return {
      showMemberCard: false
    };
  },
  props: {
    members: { type: Array, required: true },
    isOwner: { type: Boolean, required: true }
  },
  components: {
    ShadowButton,
    MemberCard
  },
  methods: {
    async revoke(user) {
      await this.api.datacenters.revokeMember(this.$route.params.name, user);
    }
  }
};
</script>

<style scoped>
.membersInfo {
  display: flex;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  flex-direction: column;
  text-align: left;
  gap: 8px;
  width: 100%;
  color: var(--black);
  padding: 16px;
  cursor: pointer;
  background-color: var(--background-color);
  transition: 100ms ease;
}

.membersInfo img {
  width: 24px;
  height: 24px;
  object-fit: cover;
  border-radius: 50px;
}

.membersInfo h1 {
  font-size: 14px;
  white-space: nowrap;
}

.membersInfo .title {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;
  line-height: 117.9%;
  color: var(--black);
}

.membersInfo .member {
  font-family: Roboto Mono;
  font-style: normal;
  font-weight: bold;
  line-height: 117.9%;
  white-space: nowrap;
  justify-content: space-between;
  align-items: center;
  display: flex;
  text-align: center;
  color: var(--black);
}

.membersInfo .member .user {
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
