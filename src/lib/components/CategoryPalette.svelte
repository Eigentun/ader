<script lang="ts">
	import { categories, addCategory, removeCategory } from '#lib/state/categories.svelte.ts';

	let newName = $state('');
	let newColor = $state('#2AEB38');

	const active = $derived(
		categories.filter((c) => {
			return c.deleted === false;
		})
	);

	function add() {
		// Kategorie nicht erstelle, sollte sie nur aus Leerzeichen bestehen oder leer sein
		if (!newName.trim()) return;
		// mögliche Leerzeichen entfernen bei Kategorie Name
		addCategory(newName.trim(), newColor);
		newName = '';
	}
</script>

<form
	onsubmit={(event) => {
		event.preventDefault();
		add();
	}}
>
	<input bind:value={newName} placeholder="New Category" />
	<input type="color" bind:value={newColor} />
	<button type="submit">Hinzufügen</button>
</form>

<ul>
	{#each active as category (category.id)}
		<li>
			<input type="color" bind:value={category.color} />
			<input bind:value={category.name} />
			<button onclick={() => removeCategory(category.id)}>Löschen</button>
		</li>
	{/each}
</ul>

<p>{active.length} Kategorien</p>
