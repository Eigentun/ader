import type { Category } from "#lib/types.ts";
import { loadCategories } from "#lib/storage.ts";

let initialized = false;

export const categories = $state<Category[]>([]);

export function initCategories() {
    if (initialized) return;
    // Flag: nur ein mal laden
    initialized = true;
    categories.push(...loadCategories());
}

export function addCategory(name: string, color: string) {
    const now = Date.now();
    categories.push({
        id: crypto.randomUUID(),
        name: name,
        color: color,
        createdAt: now,
        updatedAt: now,
        deleted: false,
    });
}

export function removeCategory(id: string) {
    const category = categories.find((c) => c.id === id);
    if (category) {
        category.deleted = true;
        category.updatedAt = Date.now();
    }
}
