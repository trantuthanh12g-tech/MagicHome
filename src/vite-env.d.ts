/// <reference types="vite/client" />

// Provide a safe augmentation for `import.meta.env` so the editor/TS server
// recognizes it even if the Vite types are not picked up automatically.
declare global {
	interface ImportMetaEnv {
		readonly [key: string]: any;
	}

	interface ImportMeta {
		readonly env: ImportMetaEnv;
	}
}

export {};