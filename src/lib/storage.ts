import type { Category } from "#lib/types.ts";

const KEY = "adern:categories";

type StoredCategories = {
    version: 1;
    categories: Category[];
};

export function loadCategories(): Category[] {
    try {
        const raw = localStorage.getItem(KEY);
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
    localStorage.setItem(KEY, JSON.stringify(data));
}
