
import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";

// const swaggerUi = require('swagger-ui-express');


// import "./style.css";
// import "virtual:svg-icons-register";
const app = createApp(App);
app.use(router);
app.mount("#app");

// app.component('Menubar',Menubar)
// app.component('ripple',Ripple)
