import { createApp } from "vue";
import App from "./App.vue";
import store from "@/store";
import router from "@/router"; // 导入路由
import "@vant/touch-emulator";
import "amfe-flexible"; //rem
import "@/styles/index.scss";

// import { showToast } from "vant";
import "vant/es/toast/style";

// // Dialog
// import { showDialog } from 'vant';
// import 'vant/es/dialog/style';

// // Notify
// import { showNotify } from 'vant';
// import 'vant/es/notify/style';

// // ImagePreview
// import { showImagePreview } from 'vant';
// import 'vant/es/image-preview/style';

// import VConsole from "vconsole";
// // 根据条件初始化 vConsole
// if (process.env.VITE_BUILD_VCONSOLE === "true") {
//   new VConsole();
// }
const app = createApp(App);

app.use(store);
app.use(router);
app.mount("#app");
