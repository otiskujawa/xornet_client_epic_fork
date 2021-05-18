<template>
    <div class="main">
        <img :src="require('@/assets/logos/logoColored.svg')" alt="Xornet">

        <div class="textFields">
            <section>
                <h1>Our Goal</h1>
                <p>
                    We are XORNET this is a fun little project started by Geoxor for people who have servers and don’t have shit to do with them<br>
                    Our goal is to let people use our servers for themselves for cheap!<br>
                    <br>
                    As an individual: you can contact us to get a VM to host your websites, discord bots, and so on!<br>
                    As a sysadmin: you can become one our nodes for people to use your server for!<br>
                </p>
            </section>
            <section>
                <h1>Infrastructure</h1>
                <p>
                    We have servers around the world interconnected and managed through XORNET<br>
                    Anyone who whos willing can lend their servers for us to grow our network and become bigger<br>
                    <br>
                    The main idea is that if you have a server sitting around, idling 90% of the time and you have decent bandwidth you can share your server with us and others can use it, that way you get your satisfaction of someone using your machine for something actually useful.
                </p>
            </section>
        </div>

        <div class="coolShit">
            <div>
                <h1>6</h1>
                <p>Total Machines</p>
            </div>
            <div>
                <h1>468GB</h1>
                <p>Total Daily Traffic</p>
            </div>
            <div>
                <h1>56</h1>
                <p>Total Cores throughout</p>
            </div>
            <div>
                <h1>156GB</h1>
                <p>Total RAM</p>
            </div>
            <!-- <div class="backgroundRectangle"></div> -->
        </div>

    </div>
</template>

<script>
export default {
    data: () => {
        return {
            
        }
    },
}
</script>

<style scoped>

.main {
    width: 100%;
    padding: 8px 10vw;
    position: relative;
    height: 100%;
}

.main img {
    z-index: 2;
    margin-top: 156px;  
}

.main .textFields {
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin-top: 48px;
}

.main .textFields section {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    color: white;
}

.main .textFields section h1 {
    font-size: 48px;
    width: fit-content;
    line-height: 54px;
    z-index: 2;
    font-style: normal;
    font-weight: bold;
}

.main .textFields section p {
    font-size: 14px;
    line-height: 20px;
    z-index: 2;
    text-align: left;
    vertical-align: top;
    max-width: 900px;
    letter-spacing: -4%;
}

.main .coolShit {
    display: flex;
    margin-top: 64px;
    justify-content: space-between;
    position: relative;
    color: white;
}

.main .coolShit h1 {
    font-size: 48px;
    text-align: left;
}

.main .coolShit p {
    color: rgba(141, 153, 174, 1);
    text-align: left;
}

.main .coolShit .backgroundRectangle {
    width: calc(120vw + 200px);
    height: 100vh;
    position: absolute;
    top: 0px;

    /* Dark */
    z-index: 1;
    background: #151527;
    transform: rotate(-6.71deg) translateX(-25vw);
}

.main .coolShit h1 {
    z-index: 2;
}

</style>
