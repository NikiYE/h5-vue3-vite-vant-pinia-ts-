import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { createHtmlPlugin } from "vite-plugin-html";
import path, { resolve } from "node:path";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";
import viteVConsole from "vite-plugin-vconsole";

// https://vitejs.dev/config/

export default ({ command, mode }) => {
  // 获取环境变量
  const env: Partial<ImportMetaEnv> = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [
      vue(),
      createHtmlPlugin({
        // 启用 Vite 最新语法模式
        viteNext: true,
        // 在这里写 entry 后，你将不需要在 `index.html` 内添加 script 标签，原有标签需要删除
        entry: "src/main.ts",
        // 是否压缩 html
        minify: true,
        // 需要注入 index.html ejs 模版的数据
        inject: {
          data: { title: "动态标题", buildTime: new Date().toLocaleString() },
        },
      }),
      Components({
        dts: true,
        dirs: ["src/components"],
        resolvers: [VantResolver()],
      }),
      AutoImport({
        imports: ["vue", "vue-router"],
        // 设置为在'src/'目录下生成解决ts报错，默认是当前目录('./'，即根目录)
        dts: "src/auto-import.d.ts",
        // 自动生成'eslintrc-auto-import.json'文件，在'.eslintrc.cjs'的'extends'中引入解决报错
        // 'vue-global-api'这个插件仅仅解决vue3 hook报错
        eslintrc: {
          enabled: true,
        },
      }),
      viteVConsole({
        entry: "src/main.ts",
        localEnabled: true,
        enabled: env.VITE_BUILD_VCONSOLE == "true", //开启 vconsole 功能 localhost:5173/#/login?debug=1
        //在登录页url中添加一个参数 'debug'，登录时如果检测到 debug === 1，则不隐藏 vconsole
        config: {
          maxLogNumber: 1000,
          theme: "dark",
        },
      }),
    ],
    define: {
      "process.env": env,
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${resolve(__dirname, "src/styles/index.scss")}";`,
        },
      },
    },
    build: {
      outDir: "dist", // 指定打包路径，默认为项目根目录下的 dist 目录
      sourcemap: env.VITE_BUILD_SOURCEMAP === "true",
      // minify默认esbuild，esbuild模式下terserOptions将失效
      // vite3变化：Terser 现在是一个可选依赖，如果你使用的是 build.minify: 'terser'，你需要手动安装它 `npm add -D terser`
      minify: "terser",
      terserOptions: {
        compress: {
          keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: env.VITE_BUILD_DROP_CONSOLE === "true", // 去除 console
          drop_debugger: true, // 去除 debugger
        },
      },
      chunkSizeWarningLimit: 1500, // chunk 大小警告的限制（以 kbs 为单位）
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      fs: {
        // 允许服务的目录
        allow: [".."], // '..' 表示上一级目录，允许访问 node_modules
      },
      host: "0.0.0.0", // 允许局域网访问
      // proxy: {
      //   '/api': {
      //     target: 'http://192.168.1.9:9090/zjdsj',  //  java 7:后端电脑本地/9 这里是你的后端服务器地址
      //     changeOrigin: true,  // 为了使服务器认为请求是从受信任的源发出的，需要更改源
      //     rewrite: (path) => path.replace(/^\/api/, '')  // 这将移除 /api 前缀
      //   },
      // },
      hmr: true, //热更新
    },
  });
};
