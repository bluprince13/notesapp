<script lang="ts">
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import AddNoteForm from '../../components/addNoteForm.svelte';
	import FaTrash from '~icons/fa/trash';
	import { invalidateAll } from '$app/navigation';

	// https://www.skeleton.dev/utilities/modals
	const modal: ModalSettings = {
		type: 'component',
		component: {
			ref: AddNoteForm
		}
	};

	const onDelete = async (noteId: string) => {
		console.log(noteId);
		await fetch(`/api/notes/${noteId}`, {
			method: 'DELETE'
		});
		invalidateAll();
	};

	export let data;
	$: notes = data.notes;
</script>

<div>
	<button class="btn variant-filled-surface my-5" on:click={() => modalStore.trigger(modal)}
		>Add note</button
	>
	<ul class="list">
		{#each notes as note}
			<li>
				<div class="card p-4 flex-auto flex flex-row">
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
						on:click={() => onDelete(note.noteId)}><FaTrash /></button
					>
				</div>
			</li>
		{/each}
	</ul>
</div>
