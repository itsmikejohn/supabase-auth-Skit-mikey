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

    const registerHandler = async () =>
    {
        dsComp.loader = true;
        const {data:{session}, error:err} = await supabase.auth.signUp({
            email: dsComp.email,
            password: dsComp.password,
        })
        if(err){
            dsComp.domMsg = `Error at ${err.status} ${err.message}`;
            dsComp.loader = false;
        }else{
            goto("/Dashboard");
            $userTokenStore = session?.access_token;
            dsComp.loader = false;
        }
    }


</script>

<main>
    <p class="mt-[10vh] mx-auto sm:max-w-lg text-center text-red-500">{dsComp.domMsg}</p>
    <div class="card flex flex-col gap-2 mx-auto sm:max-w-lg mt-2 p-4" in:scale>
        <h1 class="h1 text-center p-2">Register</h1>
        <input type="email" placeholder="Enter your email" class="input" bind:value={dsComp.email}/>
        <input type="password" placeholder="Enter your password" class="input" bind:value={dsComp.password}/>
        <Button title="Register" loader={dsComp.loader} loader_title="Registering" on:click={registerHandler}/>

        <div class="">
            <p>Don't have an account yet?</p>
            <button class="text-blue-400 underline transition-all active:font-semibold" on:click={() => $staticState.showReg = false}>Login here</button>
        </div>
    </div>
</main>