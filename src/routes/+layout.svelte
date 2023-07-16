<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { signIn } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { PUBLIC_COGNITO_CLIENT_ID, PUBLIC_COGNITO_DOMAIN } from '$env/static/public';
	const federatedSignOut = () => {
		// signOut only signs out of Auth.js's session
		// We need to log out of Cognito as well
		// Federated signout is currently not supported.
		// Therefore, we use a workaround: https://github.com/nextauthjs/next-auth/issues/836#issuecomment-1007630849
		const signoutRedirectUrl = 'http://localhost:5173/signout';
		// https://docs.aws.amazon.com/cognito/latest/developerguide/logout-endpoint.html
		window.location.replace(
			`${PUBLIC_COGNITO_DOMAIN}/logout?client_id=${PUBLIC_COGNITO_CLIENT_ID}&logout_uri=${encodeURIComponent(
				signoutRedirectUrl
			)}`
		);
	};
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
						<button on:click={federatedSignOut} class="btn variant-filled-surface">Sign out</button>
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
	<div class="m-10">
		<slot />
	</div>
</AppShell>
