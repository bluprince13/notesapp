<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">
					<a href="/"> Amazon Verified Permissions Demo</a>
				</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<!-- https://authjs.dev/reference/sveltekit -->
				{#if $page.data.session}
					<div>
						Hello {$page.data.session.user?.email}
						<button on:click|preventDefault={signOut} class="btn variant-filled-surface"
							>Sign out</button
						>
					</div>
				{:else}
					<button class="btn variant-filled-surface" on:click={() => signIn('cognito')}
						>Sign In</button
					>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
