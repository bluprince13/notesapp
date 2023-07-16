<!-- https://github.com/skeletonlabs/skeleton/blob/master/sites/skeleton.dev/src/lib/modals/examples/ModalExampleForm.svelte -->
<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { modalStore } from '@skeletonlabs/skeleton';
	export let parent: any;

	let content = '';
	const onFormSubmit = async () => {
		try {
			await fetch('/api/notes', {
				method: 'POST',
				body: JSON.stringify({ content })
			});
			modalStore.close();
			invalidateAll();
		} catch (e) {
			console.error(e);
		}
	};
</script>

{#if $modalStore[0]}
	<div class="card p-4 w-modal shadow-xl space-y-4">
		<header class="text-2xl font-bold">New note</header>
		<form class="modal-form" on:submit|preventDefault={onFormSubmit}>
			<textarea
				class="textarea"
				rows="4"
				placeholder={'Add your new note here'}
				bind:value={content}
			/>
			<footer class="modal-footer {parent.regionFooter}">
				<button class="btn {parent.buttonNeutral}" on:click|preventDefault={parent.onClose}
					>{parent.buttonTextCancel}</button
				>
				<button class="btn {parent.buttonPositive}" type="submit">Add</button>
			</footer>
		</form>
	</div>
	<!-- without slot, an error is thrown: <AddNoteForm> received an unexpected
	slot "default". Not sure why-->
	<slot />
{/if}
