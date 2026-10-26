<script lang="ts">
	import { documents, addDocument, removeDocument } from '#lib/state/documents.svelte.ts';
	import { isOpen, toggleDocument } from '#lib/state/layout.svelte.ts';

	const active = $derived(
		documents.filter((d) => {
			return d.deleted === false;
		})
	);

	async function onFiles(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		const files = input.files;
		if (!files) return;

		// Was passiert hier wenn Filetype nicht dabei oder falsch geschrieben ist?

		const formatSuffix = (fileSuffix: string) => {
			switch (fileSuffix) {
				case 'md':
				case 'markdown':
					return 'markdown';
				case 'html':
				case 'htm':
					return 'html';
				case 'pdf':
					return 'pdf';
				case 'docx':
					return 'docx';
				default:
					return 'manual';
			}
		};

		for (const file of files) {
			const fileContent = await file.text();
			const fullFileName = file.name;
			const fileName = fullFileName.replace(/\.[^/.]+$/, '');
			const fileSuffix = fullFileName.split('.').pop()?.toLowerCase() ?? '.md';

			// Switch result 'suffix' übergeben.
			const suffix = formatSuffix(fileSuffix);

			addDocument(fileName, fileContent, fullFileName, suffix);
		}
		input.value = '';
	}
</script>

<input type="file" accept=".md, .markdown" multiple onchange={onFiles} />

<ul>
	{#each active as doc (doc.id)}
		<li>
			<input type="checkbox" checked={isOpen(doc.id)} onchange={() => toggleDocument(doc.id)} />
			<h3>{doc.title}</h3>
			<button onclick={() => removeDocument(doc.id)}>Löschen</button>
		</li>
	{/each}
</ul>

<p>{active.length} Dokumente</p>

<style>
	li {
		border: 1px solid black;
		align-items: center;
		display: flex;
		gap: 20px;
		flex-grow: unset;
	}
</style>
