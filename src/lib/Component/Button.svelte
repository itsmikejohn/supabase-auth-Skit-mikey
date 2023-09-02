<script lang="ts">
    export let title = "btn_title";
    export let loader = false;
    export let loader_title = "loader_title";
</script>

<button class="w-full rounded-md text-white bg-green-500 px-2 py-1 transition-all active:font-semibold hover:opacity-60" disabled={loader} on:click>
    {#if loader}
        <div class="flex items-center justify-center gap-2">
            <p>{loader_title}</p>
            <div class="w-4 h-4 border-2 border-b-green-500 animate-spin rounded-full"></div>
        </div>
    {:else}
        <p>{title}</p>
    {/if}
</button>
