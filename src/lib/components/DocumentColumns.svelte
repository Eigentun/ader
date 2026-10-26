<script lang="ts">
	import { documents } from '#lib/state/documents.svelte.ts';
	import { openDocumentIds } from '#lib/state/layout.svelte.ts';

	// map + filter nochmal genauer nachschauen
	const openDocs = $derived(
		openDocumentIds
			.map((id) => documents.find((d) => d.id === id))
			.filter((doc) => doc !== undefined)
			.filter((doc) => !doc.deleted)
	);
</script>

<section class="document-columns">
	{#each openDocs as doc (doc.id)}
		<section>
			<h2>{doc.title}</h2>
			<pre>{doc.markdown}</pre>
		</section>
	{/each}
</section>

<style>
	.document-columns {
		display: flex;
	}

	.document-columns > section {
		flex: 0 0 24rem;
		overflow-y: auto;
		height: 80vh;
	}

	pre {
		white-space: pre-wrap;
	}
</style>
