<template>
  <nav class="serverList">
    <div class="logo">
        <logo/>
    </div>

    <section>
        <img :src="require('@/assets/icons/vm-small.png')" alt="">
        <h1>Virtual Machines</h1>
    </section>
    <div class="list">
        <serverListButton :machine="vm" v-for="vm of vms" :key="vm"/>
    </div>

    <section>
        <img :src="require('@/assets/icons/pm-small.png')" alt="">
        <h1>Physical Machines</h1>
    </section>

    <div class="list">
        <serverListButton :machine="pm" v-for="pm of pms" :key="pm"/>
    </div>
  </nav>
</template>

<script>
import logo from '@/components/logo';
import serverListButton from '@/components/serverListButton';
export default {
    name: 'serverList',
    components: {
        serverListButton,
        logo
    },
    props: {
        vms: { type: Object, required: false },
        pms: { type: Object, required: false },
    }
}
</script>

<style scoped>

.serverList {
    width: 320px;
    min-width: 320px;
    height: 100%;
    flex-direction: column;
    font-family: 'Work Sans', sans-serif;
    padding: 0px 8px;
    background-color: white;
}

.serverList .logo {
    width: 100%;
    padding: 8px 0px;
    display: flex;
}

.serverList section {
    height: 32px;
    width: 100%;
    display: flex;
    padding: 8px;
    gap: 8px;
}

.serverList section img {
    height: 16px;
}

.serverList section h1 {
    text-transform: uppercase;
    font-family: Work Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 117.9%;
    display: flex;
    align-items: center;
    text-align: center;
    color: #414569;
}

.serverList .list {
    flex-direction: column;
    display: flex;
    gap: 4px;
}

</style>