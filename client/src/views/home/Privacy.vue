<template>
  <div class="view privacypage h-100vh overflow-scroll bg-xorblack">
    <Header />
    <div class="content flex justify-center h-full items-center p-6 text-left">
        <div class="textFields flex flex-col gap-2rem md:w-max-1/2 w-full p-4">
            <h1 class="font-bold md:text-6xl text-4xl">Privacy Information</h1>
            <h2 class="font-bold">Last Updated: 22/6/2021</h2>
            <section>
                <h3 class="text-2xl font-bold">What is collected?</h3>
                <ul class="list-disc list-inside">
                    <li>Your Country</li>
                    <li>Other data such as CPU and Network is collected every second</li>
                    <li>Your computer's specifications when you first add it</li>
                </ul>
            </section>
            <section>
                <h3 class="text-2xl font-bold">Where does my data go?</h3>
                <ul class="list-disc list-inside">
                    <li>Your data is transferred to a centralized server which is then displayed on the site to users you select</li>
                    <li>Your data is transferred using websockets and other technologies to prevent loss of data</li>
                </ul>
            </section>
        </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/home/Header";

export default {
    name: "Privacy",
    components: {
        Header
    }
}
</script>

<style lang="postcss">
.privacypage {
    @apply bg-xorblack;
}

.privacypage * {
    @apply text-xorwhite;
}
</style>