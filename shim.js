/* eslint-disable */

// add a polyfill for URL, otherwise we get a "not implemented" error
// see https://github.com/facebook/react-native/issues/16434
// import { URL, URLSearchParams } from "whatwg-url";

if (typeof __dirname === "undefined") {
  global.__dirname = "/";
}

if (typeof __filename === "undefined") {
  global.__filename = "";
}

// if (typeof process === "undefined") {
//   global.process = require("process");
// } else {
//   const bProcess = require("process");
//   for (const p in bProcess) {
//     if (!(p in process)) {
//       process[p] = bProcess[p];
//     }
//   }
// }

process.browser = false;

if (typeof Buffer === "undefined") {
  global.Buffer = require("buffer").Buffer;
}

// global.location = global.location || { port: 80 }
const isDev = typeof __DEV__ === "boolean" && __DEV__;
process.env.NODE_ENV = isDev ? "development" : "production";
if (typeof localStorage !== "undefined") {
  localStorage.debug = isDev ? "*" : "";
}

// If using the crypto shim, uncomment the following line to ensure
// crypto is loaded first, so it can populate global.crypto
// require("crypto");

// if (!global.window.EventSource) {
//   global.window.EventSource = require("eventsource");
// }
// global.URL = URL;
// global.URLSearchParams = URLSearchParams;

// // Fix some fucked up issue where keystore calls are returning [object Blob]???
// // https://github.com/jhen0409/react-native-debugger/issues/382#issuecomment-544226529

// if (!window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
//   global.XMLHttpRequest =
//     global.originalXMLHttpRequest || global.XMLHttpRequest;
//   global.FormData = global.originalFormData || global.FormData;
// }

// if (window.FETCH_SUPPORT) {
//   window.FETCH_SUPPORT.blob = false;
// } else {
//   global.Blob = global.originalBlob || global.Blob;
//   global.FileReader = global.originalFileReader || global.FileReader;
// }
