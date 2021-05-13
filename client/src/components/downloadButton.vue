<template>
    <a href="https://github.com/Geoxor/Xornet/releases" target="_blank" class="downloadButton">
        <img class="icon" :src="require(`@/assets/icons/vm.png`)" alt="">
        <h1 class="text">Downloads</h1>
    </a>
</template>

<script>
export default {
    name: 'downloadButton',
}
</script>

<style scoped>

.downloadButton {
    padding: 4px 8px;
    background: linear-gradient(110.78deg,rgb(255, 24, 189) 0%, rgb(26, 75, 255) 100%);
    border-radius: 4px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 8px; 
    width: fit-content;
    cursor: pointer;
    transition: 100ms ease;
    text-decoration: none;
    user-select: none;
}

.downloadButton img.icon {
    width: 24px;
    height: 24px;
    /* filter: invert(1); */
}

.downloadButton .text {
    font-weight: 600;
    font-size: 10px;
    font-family: 'Work Sans', sans-serif;
    color: #ffffff;
    text-align: left;
    text-transform: uppercase;
}

</style>