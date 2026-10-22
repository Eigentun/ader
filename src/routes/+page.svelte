<script lang="ts">
	import CategoryPalette from '#lib/components/CategoryPalette.svelte';
	import { categories, initCategories } from '#lib/state/categories.svelte.ts';
	import { saveCategories } from '#lib/storage.ts';

	initCategories();

	$effect(() => {
		saveCategories($state.snapshot(categories));
	});
</script>

<h1>Logikketten</h1>
<CategoryPalette />
