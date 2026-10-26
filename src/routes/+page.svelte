<script lang="ts">
	import CategoryPalette from '#lib/components/CategoryPalette.svelte';
	import DocumentPanel from '#lib/components/DocumentPanel.svelte';
	import DocumentColumns from '#lib/components/DocumentColumns.svelte';
	import { categories, initCategories } from '#lib/state/categories.svelte.ts';
	import { documents, initDocuments } from '#lib/state/documents.svelte.ts';
	import { saveCategories } from '#lib/storage.ts';
	import { saveDocuments } from '#lib/storage.ts';

	initCategories();
	initDocuments();

	$effect(() => {
		saveCategories($state.snapshot(categories));
	});

	$effect(() => {
		saveDocuments($state.snapshot(documents));
	});
</script>

<h1>Logikketten</h1>
<CategoryPalette />
<DocumentPanel />
<DocumentColumns />
