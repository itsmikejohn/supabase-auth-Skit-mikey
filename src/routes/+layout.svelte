<script lang="ts">
	import '../app.postcss';

	// Highlight JS
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { userTokenStore } from '$lib';
	import { supabase } from '../hooks.client';
	import type { AuthChangeEvent, Session } from '@supabase/supabase-js';

	supabase.auth.onAuthStateChange( (event: AuthChangeEvent, session: Session | null) =>
	{
		$userTokenStore = session?.access_token;
	})
</script>

<main>
	<div class="p-2 w-full bg-blue-500 flex justify-center gap-2">
		<a href="/" class="transition-all active:scale-95 hover:opacity-60 hover:bg-red-500 p-2">Home</a>
		{#if $userTokenStore}
			<a href="/Dashboard" class="transition-all active:scale-95 hover:opacity-60 hover:bg-red-500 p-2">Dashboard</a>
		{:else}
			<a href="/Login" class="transition-all active:scale-95 hover:opacity-60 hover:bg-red-500 p-2">Login</a>
		{/if}

	</div>
	<slot />
</main>
