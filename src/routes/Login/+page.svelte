<script lang="ts">
    import { staticState } from "$lib";
	import { onMount } from "svelte";
    import Login from "./Login.svelte";
    import Register from "./Register.svelte";
    import { getSession } from "../../hooks.client";
    import { goto } from "$app/navigation";

    onMount( async () =>
    {
        if(await getSession()){
            goto("/")
        }
    })

</script>

{#await getSession()}
    <p>Firewall checking</p>
{:then ditoYun} 
    {#if ditoYun}
        <p>nice try hackers</p>
    {:else}
        <main>
            {#if $staticState.showReg}
                <Register />
            {:else}
                <Login />
            {/if}
        </main>
    {/if}
{/await}