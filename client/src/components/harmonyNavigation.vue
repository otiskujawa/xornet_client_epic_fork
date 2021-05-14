<template>
    <div class="harmony">
        <router-link to="/users" class="button">
            <img :src="require('@/assets/icons/user.png')" alt="">
            <h1>Users</h1>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'harmonyNavigation',
}
</script>

<style>
.harmony {
    position: fixed;
    gap: 4px;
    display: flex;
    padding: 4px;
    margin-top: 8px;
    left: 50%;
    background-color: var(--background-color);
    transform: translateX(-50%);
    border-radius: 4px;
}

.harmony .button {
    padding: 4px;
    background-color: var(--white);
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid transparent;
    display: flex;
    gap: 8px;
    cursor: pointer;
    transition: 100ms ease;
    text-decoration: none;
    user-select: none;
}

.harmony .button:hover {
    background-color: var(--white);
}

.harmony .button:active {
    background-color: var(--white);
}

.harmony .button img {
    width: 16px;
    height: 16px;
    filter: invert(var(--filter));
}
.harmony .button h1 {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 11px;
    font-family: 'Work Sans', sans-serif;
    color: var(--slyColor);;
    text-align: left;
    cursor: pointer;
    font-weight: 600;
    text-transform: uppercase;
}

</style>