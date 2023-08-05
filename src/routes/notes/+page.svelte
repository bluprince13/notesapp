<script lang="ts">
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import AddOrEditNoteForm from '$lib/components/addOrEditNoteForm.svelte';
	import FaTrash from '~icons/fa/trash';
	import FaEdit from '~icons/fa/edit';
	import { notes } from '$lib/stores';

	export let data;
	$: notes.set(data.notes);

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
		notes.update((notes) => {
			return notes.filter((note) => note.noteId !== noteId);
		});
	};
</script>

<div>
	<button class="btn variant-filled-surface mb-5" on:click={onAdd}>Add note</button>
	<ul class="list space-y-2">
		{#each $notes as note}
			<li>
				<div class="card p-4 flex-auto flex flex-row space-x-4">
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
				self-center shrink-0"
						on:click={() => onEdit(note.noteId, note.content)}><FaEdit /></button
					>
					<button
						type="button"
						class="btn-icon variant-filled btn-sm
				self-center shrink-0"
						on:click={() => onDelete(note.noteId)}><FaTrash /></button
					>
				</div>
			</li>
		{/each}
	</ul>
</div>
