<script lang="ts">
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import AddOrEditNoteForm from '$lib/components/addOrEditNoteForm.svelte';
	import FaTrash from '~icons/fa/trash';
	import FaEdit from '~icons/fa/edit';
	import { invalidateAll } from '$app/navigation';

	const onAdd = async () => {
		// https://www.skeleton.dev/utilities/modals
		const modal: ModalSettings = {
			type: 'component',
			component: {
				ref: AddOrEditNoteForm
			}
		};
		modalStore.trigger(modal);
	};

	const onEdit = async (noteId: string, existingContent: string) => {
		const modal: ModalSettings = {
			type: 'component',
			component: {
				ref: AddOrEditNoteForm,
				props: { noteId, existingContent }
			}
		};
		modalStore.trigger(modal);
	};

	const onDelete = async (noteId: string) => {
		await fetch(`/api/notes/${noteId}`, {
			method: 'DELETE'
		});
		invalidateAll();
	};

	export let data;
	$: notes = data.notes;
</script>

<div>
	<button class="btn variant-filled-surface my-5" on:click={onAdd}>Add note</button>
	<ul class="list">
		{#each notes as note}
			<li>
				<div class="card p-4 flex-auto flex flex-row space-x-2">
					<div class="flex-grow whitespace-pre-line space-y-2">
						<div>
							{note.content}
						</div>
						<div class="text-xs text-slate-500 italic">
							{new Date(note.createdAt).toLocaleString()}
						</div>
					</div>
					<button
						type="button"
						class="btn-icon variant-filled btn-sm
				self-center"
						on:click={() => onEdit(note.noteId, note.content)}><FaEdit /></button
					>
					<button
						type="button"
						class="btn-icon variant-filled btn-sm
				self-center"
						on:click={() => onDelete(note.noteId)}><FaTrash /></button
					>
				</div>
			</li>
		{/each}
	</ul>
</div>
