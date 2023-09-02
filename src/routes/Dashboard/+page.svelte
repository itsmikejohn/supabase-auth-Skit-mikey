<script lang="ts">
	import { goto } from "$app/navigation";
	import Button from "$lib/Component/Button.svelte";
	import { supabase } from "../../hooks.client";
    import { userTokenStore } from "$lib";
    import { getSession } from "../../hooks.client";
	import { onMount } from "svelte";

    onMount( async () =>
    {
        if(!await getSession()){
            goto("/")
        }
    })

    const logoutHandler = async () =>
    {
        const {error:err} = await supabase.auth.signOut();
        goto("/");
    }   
</script>

{#await getSession()}
    <p>CHECKING FIREWALL</p>
{:then dito} 
    {#if dito}
        <main>
            <div class="flex gap-2">
                <p>Welcome to dashboard!</p>
                <div class="">
                    <Button title="Logout" on:click={logoutHandler}/>
                </div>
            </div>
        </main>
    {:else}
        <p>CHECKING AGAIN</p>
    {/if}
{/await}