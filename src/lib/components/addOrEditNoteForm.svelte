<!-- https://github.com/skeletonlabs/skeleton/blob/master/sites/skeleton.dev/src/lib/modals/examples/ModalExampleForm.svelte -->
<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { modalStore } from '@skeletonlabs/skeleton';
	export let parent: any;
	export let noteId: string;
	export let existingContent: string;

	let content = existingContent || '';
	const onFormSubmit = async () => {
		try {
			if (noteId) {
				await fetch(`/api/notes/${noteId}`, {
					method: 'PUT',
					body: JSON.stringify({ content })
				});
			} else {
				await fetch('/api/notes', {
					method: 'POST',
					body: JSON.stringify({ content })
				});
			}
			modalStore.close();
			invalidateAll();
		} catch (e) {
			console.error(e);
		}
	};
</script>

{#if $modalStore[0]}
	<div class="card p-4 w-modal shadow-xl space-y-4">
		<header class="text-2xl font-bold">{noteId ? 'Edit' : 'Create'} note</header>
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
				<button class="btn {parent.buttonPositive}" type="submit">Submit</button>
			</footer>
		</form>
	</div>
	<!-- without slot, an error is thrown: <AddNoteForm> received an unexpected
	slot "default". Not sure why-->
	<slot />
{/if}
