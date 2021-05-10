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
        <div class="button" v-for="vm of vms" :key="vm">
            <img  class="machineType" :src="require('@/assets/icons/vm.png')" alt="">
            <div class="info">
                <h1 class="hostname">{{vm.name}}</h1>
                <h1 class="status">{{vm.static.uuid.os}}</h1>
            </div>
            <div class="platform">
                <img v-if="vm.platform == 'win32'" :src="require('@/assets/icons/windows-small.png')" alt="">
                <img v-if="vm.platform == 'darwin'" :src="require('@/assets/icons/macos-small.png')" alt="">
                <img v-if="vm.platform == 'linux'" :src="require('@/assets/icons/linux-small.png')" alt="">
                <h1 v-if="vm.reporterVersion">v{{vm.reporterVersion}}</h1>
            </div>
        </div>
    </div>

    <section>
        <img :src="require('@/assets/icons/hypervisor-small.png')" alt="">
        <h1>Physical Machines</h1>
    </section>

    <div class="list">
        <div class="button" v-for="pm of pms" :key="pm">
            <img class="machineType" :src="require('@/assets/icons/hypervisor.png')" alt="">
            <div class="info">
                <h1 class="hostname">{{pm.name}}</h1>
                <h1 class="status">{{pm.static.uuid.os.replace(/-/g, '')}}</h1>
            </div>
            <div class="platform">
                <img v-if="pm.platform == 'win32'" :src="require('@/assets/icons/windows-small.png')" alt="">
                <img v-if="pm.platform == 'darwin'" :src="require('@/assets/icons/macos-small.png')" alt="">
                <img v-if="pm.platform == 'linux'" :src="require('@/assets/icons/linux-small.png')" alt="">
                <h1 v-if="pm.reporterVersion">v{{pm.reporterVersion}}</h1>
            </div>
        </div>
    </div>

  </nav>
</template>

<script>
import logo from '@/components/logo';
export default {
    name: 'serverList',
    components: {
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

.serverList .list .button {
    padding: 8px;
    background-color: white;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid transparent;
    display: flex;
    gap: 8px;
    cursor: pointer;
    transition: 100ms ease;
}

.serverList .list .button:hover {
    border: 1px solid var(--white);
    transform: translateY(-1px);
    box-shadow: rgb(0 0 0 / 10%) 0px 10px 20px;

}


.serverList .list .button img.machineType {
    width: 32px;
    height: 32px;
    filter: invert(1);
}

.serverList .list .button .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    text-align: center;
    gap: 2px;
}

.serverList .list .button .info .hostname {
    font-family: Work Sans;
    font-style: normal;
    font-weight: 500;
    white-space: nowrap;
    font-size: 14px;
    line-height: 117.9%;
    text-transform: lowercase;
    color: var(--black);
}

.serverList .list .button .info .status,
.serverList .list .button .platform h1 {
    font-weight: 600;
    font-size: 10px;
    font-family: 'Work Sans', sans-serif;

    color: #414569;
}
.serverList .list .button .info .status {
    background: linear-gradient(110.78deg, rgb(118, 230, 80) -1.13%, rgb(249, 214, 73) 15.22%, rgb(240, 142, 53) 32.09%, rgb(236, 81, 87) 48.96%, rgb(255, 24, 189) 67.94%, rgb(26, 75, 255) 85.34%, rgb(98, 216, 249) 99.57%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

.serverList .list .button .platform {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;

}

.serverList .list .button .platform img {
    width: 12px;
    height: 12px;
}


</style>