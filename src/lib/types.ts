export type ID = string;

// Basis. Alle folgenden haben diese Informationen
type Base = {
    id: ID;
    createdAt: number;
    updatedAt: number;
    deleted: boolean;
};

// Kategorien
export type Category = Base & {
    name: string;
    color: string;
};

// Herkunft Dokument -> viele für später erst relevant
export type SourceFormat = "markdown" | "html" | "pdf" | "docx" | "manual";

// weitere Informationen über Dokumentenursprung
export type DocumentSource = {
    format: SourceFormat;
    fileName?: string;
    importedAt: number;
};

// Dokument selber
export type Doc = Base & {
    title: string;
    markdown: string;
    source: DocumentSource;
};

// Markierung
export type Annotation = Base & {
    documentID: ID;
    from: number;
    to: number;
    text: string;
    contextBefore: string;
    contextAfter: string;
    // ein Array aus Strings
    categoryIds: ID[];
};
