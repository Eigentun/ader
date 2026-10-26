export const openDocumentIds = $state<string[]>([]);

export function isOpen(id: string): boolean {
    // includes returned schon ein boolean
    return openDocumentIds.includes(id);
}

export function openDocument(id: string) {
    if (isOpen(id)) return;

    openDocumentIds.push(id);
}

export function closeDocument(id: string) {
    const idPosition = openDocumentIds.indexOf(id);

    // nur einmal checken notwendig
    if (idPosition === -1) return;

    openDocumentIds.splice(idPosition, 1);
}

export function toggleDocument(id: string) {
    if (isOpen(id)) {
        closeDocument(id);
    } else {
        openDocument(id);
    }
}
