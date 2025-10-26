/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLARITY_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
