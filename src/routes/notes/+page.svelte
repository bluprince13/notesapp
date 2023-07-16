<script lang="ts">
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import AddNoteForm from '../../components/addNoteForm.svelte';

	// https://www.skeleton.dev/utilities/modals
	const modal: ModalSettings = {
		type: 'component',
		component: {
			ref: AddNoteForm
		}
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
				<div class="card p-4 flex-auto">{note.content}</div>
			</li>
		{/each}
	</ul>
</div>
