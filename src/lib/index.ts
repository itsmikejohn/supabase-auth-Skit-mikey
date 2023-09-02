import { writable } from "svelte/store";

export const userTokenStore = writable<string | undefined>("");

export const staticState = writable({
    showReg: false,
})