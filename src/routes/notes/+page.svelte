<script>
	export let data;
	$: notes = data.notes;
</script>

<div>
	<ul class="list">
		{#each notes as note}
			<li>
				<div class="card p-4 flex-auto">{note.content}</div>
			</li>
		{/each}
	</ul>
</div>
