(function(e){function n(n){for(var c,r,a=n[0],i=n[1],d=n[2],h=0,f=[];h<a.length;h++)r=a[h],Object.prototype.hasOwnProperty.call(u,r)&&u[r]&&f.push(u[r][0]),u[r]=0;for(c in i)Object.prototype.hasOwnProperty.call(i,c)&&(e[c]=i[c]);l&&l(n);while(f.length)f.shift()();return o.push.apply(o,d||[]),t()}function t(){for(var e,n=0;n<o.length;n++){for(var t=o[n],c=!0,r=1;r<t.length;r++){var a=t[r];0!==u[a]&&(c=!1)}c&&(o.splice(n--,1),e=i(i.s=t[0]))}return e}var c={},r={app:0},u={app:0},o=[];function a(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-2d0e2700":"22245123","chunk-2d21a587":"bbe49ba7","chunk-2b5a757d":"6d2c5049","chunk-44050fa5":"22b83c93","chunk-4017ee06":"f400494b","chunk-4541b833":"e0b74071","chunk-75a1f296":"e460b4c5","chunk-5aa770e3":"fd764667","chunk-7343c7d5":"46c9d245","chunk-a967f9c2":"04904b8c","chunk-6fa979b2":"bd557a16","chunk-7b2cbe6e":"88918bdc","chunk-a3d6d12e":"078b95fc","chunk-a900bcc2":"b1712b26","chunk-b140c15a":"d9d87a19","chunk-ef3108a0":"7ee01273","chunk-f8609186":"5a833969"}[e]+".js"}function i(n){if(c[n])return c[n].exports;var t=c[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-2b5a757d":1,"chunk-4017ee06":1,"chunk-4541b833":1,"chunk-75a1f296":1,"chunk-7343c7d5":1,"chunk-a967f9c2":1};r[e]?n.push(r[e]):0!==r[e]&&t[e]&&n.push(r[e]=new Promise((function(n,t){for(var c="css/"+({}[e]||e)+"."+{"chunk-2d0e2700":"31d6cfe0","chunk-2d21a587":"31d6cfe0","chunk-2b5a757d":"65ed672a","chunk-44050fa5":"31d6cfe0","chunk-4017ee06":"ff9c8474","chunk-4541b833":"6436a355","chunk-75a1f296":"6436a355","chunk-5aa770e3":"31d6cfe0","chunk-7343c7d5":"b2971b02","chunk-a967f9c2":"b04e0db3","chunk-6fa979b2":"31d6cfe0","chunk-7b2cbe6e":"31d6cfe0","chunk-a3d6d12e":"31d6cfe0","chunk-a900bcc2":"31d6cfe0","chunk-b140c15a":"31d6cfe0","chunk-ef3108a0":"31d6cfe0","chunk-f8609186":"31d6cfe0"}[e]+".css",u=i.p+c,o=document.getElementsByTagName("link"),a=0;a<o.length;a++){var d=o[a],h=d.getAttribute("data-href")||d.getAttribute("href");if("stylesheet"===d.rel&&(h===c||h===u))return n()}var f=document.getElementsByTagName("style");for(a=0;a<f.length;a++){d=f[a],h=d.getAttribute("data-href");if(h===c||h===u)return n()}var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",l.onload=n,l.onerror=function(n){var c=n&&n.target&&n.target.src||u,o=new Error("Loading CSS chunk "+e+" failed.\n("+c+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=c,delete r[e],l.parentNode.removeChild(l),t(o)},l.href=u;var s=document.getElementsByTagName("head")[0];s.appendChild(l)})).then((function(){r[e]=0})));var c=u[e];if(0!==c)if(c)n.push(c[2]);else{var o=new Promise((function(n,t){c=u[e]=[n,t]}));n.push(c[2]=o);var d,h=document.createElement("script");h.charset="utf-8",h.timeout=120,i.nc&&h.setAttribute("nonce",i.nc),h.src=a(e);var f=new Error;d=function(n){h.onerror=h.onload=null,clearTimeout(l);var t=u[e];if(0!==t){if(t){var c=n&&("load"===n.type?"missing":n.type),r=n&&n.target&&n.target.src;f.message="Loading chunk "+e+" failed.\n("+c+": "+r+")",f.name="ChunkLoadError",f.type=c,f.request=r,t[1](f)}u[e]=void 0}};var l=setTimeout((function(){d({type:"timeout",target:h})}),12e4);h.onerror=h.onload=d,document.head.appendChild(h)}return Promise.all(n)},i.m=e,i.c=c,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var c in e)i.d(t,c,function(n){return e[n]}.bind(null,c));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/vue-2021-finalwork/dist/",i.oe=function(e){throw console.error(e),e};var d=window["webpackJsonp"]=window["webpackJsonp"]||[],h=d.push.bind(d);d.push=n,d=d.slice();for(var f=0;f<d.length;f++)n(d[f]);var l=h;o.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},3173:function(e,n,t){},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var c=t("7a23"),r=t("7bb1"),u=t("3aa8"),o=t("cbdf"),a=t("9457"),i=t("bc3a"),d=t.n(i),h=t("2106"),f=t.n(h);function l(e){var n=new Date(1e3*e);return n.toLocaleDateString()}function s(e,n,t,r,u,o){var a=Object(c["y"])("router-view"),i=Object(c["y"])("spinner");return Object(c["t"])(),Object(c["d"])(c["a"],null,[Object(c["h"])(a),Object(c["h"])(i)],64)}var b={class:"container-fuild"},p={class:"spinner",ref:"spinner"},k=Object(c["h"])("div",{class:"double-bounce1"},null,-1),m=Object(c["h"])("div",{class:"double-bounce2"},null,-1),v=Object(c["h"])("div",{class:"double-bounce3"},null,-1);function g(e,n,t,r,u,o){return Object(c["t"])(),Object(c["d"])("div",b,[Object(c["h"])("div",p,[k,m,v],512)])}var O=t("e89f"),y={methods:{spinnerOpen:function(){this.$refs.spinner.classList.add("spinner--open")},spinnerClose:function(){this.$refs.spinner.classList.remove("spinner--open")}},created:function(){var e=this;O["a"].on("spinner-close",(function(){e.spinnerClose()})),O["a"].on("spinner-open",(function(){e.spinnerOpen()}))}};t("8d33");y.render=g;var j=y,w={components:{Spinner:j},created:function(){}};t("7fb5");w.render=s;var P=w,S=(t("d3b7"),t("3ca3"),t("ddb0"),t("6c02")),_=[{path:"/",component:function(){return Promise.all([t.e("chunk-44050fa5"),t.e("chunk-5aa770e3")]).then(t.bind(null,"2bc2"))},children:[{path:"home",component:function(){return Promise.all([t.e("chunk-2d21a587"),t.e("chunk-2b5a757d")]).then(t.bind(null,"bb51"))}},{path:"products-list",component:function(){return t.e("chunk-7b2cbe6e").then(t.bind(null,"6225"))}},{path:"products-list/product/:id",component:function(){return t.e("chunk-a3d6d12e").then(t.bind(null,"658f"))}},{path:"products-list/company/:id",component:function(){return t.e("chunk-b140c15a").then(t.bind(null,"c76f"))}},{path:"cart-checkout",component:function(){return t.e("chunk-6fa979b2").then(t.bind(null,"ff2e"))}},{path:"apply-job",name:"ApplyJob",component:function(){return t.e("chunk-a900bcc2").then(t.bind(null,"54fc"))}},{path:"add-company",name:"AddCompany",component:function(){return Promise.all([t.e("chunk-44050fa5"),t.e("chunk-2d21a587"),t.e("chunk-4017ee06"),t.e("chunk-4541b833")]).then(t.bind(null,"7f9d"))}},{path:"add-job",name:"AddJob",component:function(){return Promise.all([t.e("chunk-44050fa5"),t.e("chunk-2d21a587"),t.e("chunk-4017ee06"),t.e("chunk-75a1f296")]).then(t.bind(null,"2c4b"))}}]},{path:"/admin/dashboard",component:function(){return t.e("chunk-f8609186").then(t.bind(null,"459d"))},children:[{path:"products-list",component:function(){return Promise.all([t.e("chunk-44050fa5"),t.e("chunk-7343c7d5")]).then(t.bind(null,"6c8b"))}},{path:"orders-list",component:function(){return Promise.all([t.e("chunk-44050fa5"),t.e("chunk-a967f9c2")]).then(t.bind(null,"eb32"))}}]},{path:"/admin",component:function(){return t.e("chunk-ef3108a0").then(t.bind(null,"1337"))}},{path:"/:pathMatch(.*)*",component:function(){return t.e("chunk-2d0e2700").then(t.bind(null,"7f61"))}}],C=Object(S["a"])({history:Object(S["b"])(),routes:_}),E=C;Object(r["e"])("email",u["a"]),Object(r["e"])("required",u["c"]),Object(r["e"])("min",u["b"]),Object(r["d"])({generateMessage:Object(o["a"])({zh_TW:a}),validateOnInput:!0}),Object(o["b"])("zh_TW");var A=Object(c["c"])(P);A.config.globalProperties.$filters={date:l},A.component("Form",r["c"]),A.component("Field",r["b"]),A.component("ErrorMessage",r["a"]),A.use(E),A.use(f.a,d.a),A.mount("#app")},"7fb5":function(e,n,t){"use strict";t("3173")},"803e":function(e,n,t){},"8d33":function(e,n,t){"use strict";t("803e")},e89f:function(e,n,t){"use strict";var c=t("14b7"),r=Object(c["a"])();n["a"]=r}});
//# sourceMappingURL=app.a9458c14.js.map