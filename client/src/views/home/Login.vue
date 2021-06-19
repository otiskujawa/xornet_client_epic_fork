<template>
  <div class="view loginpage">
    <Header />
    <div class="content">
      <LoginCard :image="'https://cdn.discordapp.com/attachments/806300597338767450/846759276889636885/twitch-xqc.gif'" />
    </div>
  </div>
</template>

<script>
import Header from "@/components/home/Header";
import LoginCard from "@/components/misc/LoginCard";

export default {
  name: "Login",
  components: {
    LoginCard,
    Header
  }
};
</script>

<style>
.loginpage {
  min-width: 100%;
  min-height: 100%;

  background: linear-gradient(0deg, #ffffff, #ffffff), url("https://cdn.discordapp.com/attachments/806300597338767450/849090088070938694/wallhaven-eogkdo.png"), #bcbcbc;
  background-blend-mode: color, screen, normal;
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;

  position: relative;
  height: 100vh;
}

.loginpage .content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.card {
  width: 280px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: var(--background-color);
  min-height: 400px;
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
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
  color: var(--black);
}

.card .details form .text p {
  font-weight: 600;
  font-size: 12px;
  color: var(--black);
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
  background-color: var(--white);
  height: 32px;
  padding: 6px 8px;
}

.card .details form .fields .inputField::placeholder {
  color: var(--gray);
}
.card .details form .fields p {
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  color: var(--black);
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
