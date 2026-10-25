import { loadDocuments } from "#lib/storage.ts";
import type { Doc, SourceFormat } from "#lib/types.ts";

let initialized = false;

export const documents = $state<Doc[]>([]);

export function initDocuments() {
    if (initialized) return;

    initialized = true;
    documents.push(...loadDocuments());
}

export function addDocument(
    title: string,
    markdown: string,
    fileName: string,
    format: SourceFormat,
) {
    const now = Date.now();
    documents.push({
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
        deleted: false,
        title,
        markdown,
        source: {
            format: format,
            fileName: fileName,
            importedAt: now,
        },
    });
}

export function removeDocument(id: string) {
    const doc = documents.find((d) => d.id === id);
    if (doc) {
        doc.deleted = true;
        doc.updatedAt = Date.now();
    }
}
