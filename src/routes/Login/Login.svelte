<script lang="ts">
    import { scale } from "svelte/transition";
    import { supabase } from "../../hooks.client";
    import { staticState, userTokenStore } from "$lib";
	import Button from "$lib/Component/Button.svelte";
	import { goto } from "$app/navigation";

    const dsComp = {
        loader: false,
        domMsg: "",
        email: "",
        password: "",
    }

    const loginHandler = async () =>
    {
        dsComp.loader = true;
        const {data, error:err} = await supabase.auth.signInWithPassword({
            email: dsComp.email,
            password: dsComp.password,
        })
        if(err){
            dsComp.domMsg = `Error at ${err.status} ${err.message}`;
            dsComp.loader = false;
        }else{
            dsComp.loader = false;
            goto("/Dashboard");
            $userTokenStore = data.session?.access_token;
        }
    }

</script>

<main>
    <p class="mt-[10vh] mx-auto sm:max-w-lg text-center text-red-500">{dsComp.domMsg}</p>
    <div class="card flex flex-col gap-2 mx-auto mt-2 sm:max-w-lg p-4 shadow-lg shadow-pink-700" in:scale>
        <h1 class="h1 text-center p-2">Login</h1>
        <input type="email" placeholder="Enter your email" class="input" bind:value={dsComp.email}/>
        <input type="password" placeholder="Enter your password" class="input" bind:value={dsComp.password}/>
        <Button title="Login" loader={dsComp.loader} loader_title="Logging" on:click={loginHandler}/>

        <div class="">
            <p>Don't have an account yet?</p>
            <button class="text-blue-400 underline transition-all active:font-semibold" on:click={() => $staticState.showReg = true}>Register here</button>
        </div>
    </div>
</main>