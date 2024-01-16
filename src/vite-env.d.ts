/// <reference types="vite/client" />

// eslint-disable-next-line @typescript-eslint/ no-explicit-any, @typescript-eslint/ban-types
const component: DefineComponent<{}, {}, any>;

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_API_BASE_URL: string;
  readonly VITE_BUILD_SOURCEMAP: string;
  readonly VITE_BUILD_DROP_CONSOLE: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
