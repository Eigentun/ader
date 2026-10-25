import type { Category } from "#lib/types.ts";
import type { Doc } from "#lib/types.ts";

const keyCategories = "adern:categories";
const keyDocuments = "adern:documents";

// Kategorien

type StoredCategories = {
    version: 1;
    categories: Category[];
};

export function loadCategories(): Category[] {
    try {
        const raw = localStorage.getItem(keyCategories);
        if (!raw) return [];
        // Auge legen
        const data = JSON.parse(raw) as StoredCategories;
        return data.categories;
    } catch {
        return [];
    }
}

export function saveCategories(categories: Category[]) {
    const data: StoredCategories = { version: 1, categories: categories };
    // Local Storage nimmt nur Strings. Wie wandeln die Daten hier in einen String im JSON Format um.
    localStorage.setItem(keyCategories, JSON.stringify(data));
}

// Dokumente

type StoredDocuments = {
    version: 1;
    documents: Doc[];
};

export function loadDocuments(): Doc[] {
    try {
        const raw = localStorage.getItem(keyDocuments);
        if (!raw) return [];
        const data = JSON.parse(raw) as StoredDocuments;
        return data.documents;
    } catch {
        return [];
    }
}

export function saveDocuments(documents: Doc[]) {
    const data: StoredDocuments = { version: 1, documents: documents };
    localStorage.setItem(keyDocuments, JSON.stringify(data));
}
