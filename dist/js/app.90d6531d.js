(function(e){function n(n){for(var t,r,a=n[0],i=n[1],d=n[2],f=0,l=[];f<a.length;f++)r=a[f],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&l.push(o[r][0]),o[r]=0;for(t in i)Object.prototype.hasOwnProperty.call(i,t)&&(e[t]=i[t]);h&&h(n);while(l.length)l.shift()();return u.push.apply(u,d||[]),c()}function c(){for(var e,n=0;n<u.length;n++){for(var c=u[n],t=!0,r=1;r<c.length;r++){var a=c[r];0!==o[a]&&(t=!1)}t&&(u.splice(n--,1),e=i(i.s=c[0]))}return e}var t={},r={app:0},o={app:0},u=[];function a(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-22538f50":"3e47cb25","chunk-2d0e2700":"dc7d56f6","chunk-3f45b3c0":"332c074c","chunk-5adcf89b":"6c66c98f","chunk-7a83aad5":"069c03ff","chunk-36bc09db":"78363c68","chunk-4f1be782":"f7a26846","chunk-1b206243":"05326a8c","chunk-1b27410b":"d027fc17","chunk-559822e0":"5f61231f","chunk-4602e660":"ac9aa70f","chunk-4e77551a":"2c90fbd5","chunk-730abc1b":"254f52a1","chunk-ae07bb52":"9c4cfd71","chunk-d95e67dc":"96ee6cac","chunk-e2f33cf8":"1906b7f8","chunk-0793a9a1":"4091d579","chunk-6fddc428":"3b820e86","chunk-a11716cc":"2ca12981","chunk-1583955a":"644c9b13","chunk-876b42fc":"1bbd0322","chunk-eb89b15c":"ad6e3036"}[e]+".js"}function i(n){if(t[n])return t[n].exports;var c=t[n]={i:n,l:!1,exports:{}};return e[n].call(c.exports,c,c.exports,i),c.l=!0,c.exports}i.e=function(e){var n=[],c={"chunk-36bc09db":1,"chunk-4f1be782":1,"chunk-1b206243":1,"chunk-1b27410b":1,"chunk-4602e660":1,"chunk-4e77551a":1,"chunk-730abc1b":1,"chunk-6fddc428":1};r[e]?n.push(r[e]):0!==r[e]&&c[e]&&n.push(r[e]=new Promise((function(n,c){for(var t="css/"+({}[e]||e)+"."+{"chunk-22538f50":"31d6cfe0","chunk-2d0e2700":"31d6cfe0","chunk-3f45b3c0":"31d6cfe0","chunk-5adcf89b":"31d6cfe0","chunk-7a83aad5":"31d6cfe0","chunk-36bc09db":"b2971b02","chunk-4f1be782":"31cb015f","chunk-1b206243":"87a11c0e","chunk-1b27410b":"87a11c0e","chunk-559822e0":"31d6cfe0","chunk-4602e660":"f411a5be","chunk-4e77551a":"fe90e5d2","chunk-730abc1b":"ae501bb7","chunk-ae07bb52":"31d6cfe0","chunk-d95e67dc":"31d6cfe0","chunk-e2f33cf8":"31d6cfe0","chunk-0793a9a1":"31d6cfe0","chunk-6fddc428":"6680f48e","chunk-a11716cc":"31d6cfe0","chunk-1583955a":"31d6cfe0","chunk-876b42fc":"31d6cfe0","chunk-eb89b15c":"31d6cfe0"}[e]+".css",o=i.p+t,u=document.getElementsByTagName("link"),a=0;a<u.length;a++){var d=u[a],f=d.getAttribute("data-href")||d.getAttribute("href");if("stylesheet"===d.rel&&(f===t||f===o))return n()}var l=document.getElementsByTagName("style");for(a=0;a<l.length;a++){d=l[a],f=d.getAttribute("data-href");if(f===t||f===o)return n()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=n,h.onerror=function(n){var t=n&&n.target&&n.target.src||o,u=new Error("Loading CSS chunk "+e+" failed.\n("+t+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=t,delete r[e],h.parentNode.removeChild(h),c(u)},h.href=o;var b=document.getElementsByTagName("head")[0];b.appendChild(h)})).then((function(){r[e]=0})));var t=o[e];if(0!==t)if(t)n.push(t[2]);else{var u=new Promise((function(n,c){t=o[e]=[n,c]}));n.push(t[2]=u);var d,f=document.createElement("script");f.charset="utf-8",f.timeout=120,i.nc&&f.setAttribute("nonce",i.nc),f.src=a(e);var l=new Error;d=function(n){f.onerror=f.onload=null,clearTimeout(h);var c=o[e];if(0!==c){if(c){var t=n&&("load"===n.type?"missing":n.type),r=n&&n.target&&n.target.src;l.message="Loading chunk "+e+" failed.\n("+t+": "+r+")",l.name="ChunkLoadError",l.type=t,l.request=r,c[1](l)}o[e]=void 0}};var h=setTimeout((function(){d({type:"timeout",target:f})}),12e4);f.onerror=f.onload=d,document.head.appendChild(f)}return Promise.all(n)},i.m=e,i.c=t,i.d=function(e,n,c){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:c})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var c=Object.create(null);if(i.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var t in e)i.d(c,t,function(n){return e[n]}.bind(null,t));return c},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/vue-2021-finalwork/dist/",i.oe=function(e){throw console.error(e),e};var d=window["webpackJsonp"]=window["webpackJsonp"]||[],f=d.push.bind(d);d.push=n,d=d.slice();for(var l=0;l<d.length;l++)n(d[l]);var h=f;u.push([0,"chunk-vendors"]),c()})({0:function(e,n,c){e.exports=c("56d7")},"56d7":function(e,n,c){"use strict";c.r(n);c("e260"),c("e6cf"),c("cca6"),c("a79d");var t=c("7a23"),r=c("3730"),o=c.n(r),u=c("7bb1"),a=c("3aa8"),i=c("cbdf"),d=c("9457"),f=c("bc3a"),l=c.n(f),h=c("2106"),b=c.n(h);function s(e){var n=new Date(1e3*e);return n.toLocaleDateString()}function p(e,n,c,r,o,u){var a=Object(t["resolveComponent"])("router-view"),i=Object(t["resolveComponent"])("spinner");return Object(t["openBlock"])(),Object(t["createBlock"])(t["Fragment"],null,[o.isRouterAlive?(Object(t["openBlock"])(),Object(t["createBlock"])(a,{key:0})):Object(t["createCommentVNode"])("",!0),Object(t["createVNode"])(i)],64)}var k={class:"container-fuild"},m={class:"spinner",ref:"spinner"},v=Object(t["createVNode"])("div",{class:"double-bounce1"},null,-1),g=Object(t["createVNode"])("div",{class:"double-bounce2"},null,-1),O=Object(t["createVNode"])("div",{class:"double-bounce3"},null,-1);function j(e,n,c,r,o,u){return Object(t["openBlock"])(),Object(t["createBlock"])("div",k,[Object(t["createVNode"])("div",m,[v,g,O],512)])}var y=c("e89f"),P={methods:{spinnerOpen:function(){this.$refs.spinner.classList.add("spinner--open")},spinnerClose:function(){this.$refs.spinner.classList.remove("spinner--open")}},created:function(){var e=this;y["a"].on("spinner-close",(function(){e.spinnerClose()})),y["a"].on("spinner-open",(function(){e.spinnerOpen()}))}};c("8d33");P.render=j;var w=P,A={components:{Spinner:w},provide:function(){return{reload:this.reload}},data:function(){return{isRouterAlive:!0}},methods:{reload:function(){var e=this;console.log("reload occure"),this.isRouterAlive=!1,this.$nextTick((function(){e.isRouterAlive=!0}))}},created:function(){}};c("ff8b");A.render=p;var C=A,N=(c("d3b7"),c("3ca3"),c("ddb0"),c("6c02")),S=[{path:"/",component:function(){return c.e("chunk-3f45b3c0").then(c.bind(null,"2bc2"))},children:[{path:"",component:function(){return Promise.all([c.e("chunk-e2f33cf8"),c.e("chunk-0793a9a1"),c.e("chunk-6fddc428")]).then(c.bind(null,"bb51"))}},{path:"products-list",component:function(){return Promise.all([c.e("chunk-e2f33cf8"),c.e("chunk-0793a9a1"),c.e("chunk-a11716cc")]).then(c.bind(null,"6225"))}},{path:"products-list/product/:id",component:function(){return c.e("chunk-5adcf89b").then(c.bind(null,"658f"))}},{path:"products-list/company/:id",component:function(){return c.e("chunk-eb89b15c").then(c.bind(null,"c76f"))}},{path:"search-list",component:function(){return Promise.all([c.e("chunk-e2f33cf8"),c.e("chunk-876b42fc")]).then(c.bind(null,"c837"))}},{path:"search/",component:function(){return Promise.all([c.e("chunk-e2f33cf8"),c.e("chunk-1583955a")]).then(c.bind(null,"0f2b"))}},{path:"cart-checkout",component:function(){return c.e("chunk-ae07bb52").then(c.bind(null,"ff2e"))}},{path:"apply-job/:id",name:"ApplyJob",component:function(){return Promise.all([c.e("chunk-7a83aad5"),c.e("chunk-559822e0"),c.e("chunk-4602e660")]).then(c.bind(null,"54fc"))}},{path:"add-company",name:"AddCompany",component:function(){return Promise.all([c.e("chunk-7a83aad5"),c.e("chunk-559822e0"),c.e("chunk-4e77551a")]).then(c.bind(null,"7f9d"))}},{path:"add-job",name:"AddJob",component:function(){return Promise.all([c.e("chunk-7a83aad5"),c.e("chunk-559822e0"),c.e("chunk-730abc1b")]).then(c.bind(null,"2c4b"))}}]},{path:"/admin/dashboard",component:function(){return c.e("chunk-22538f50").then(c.bind(null,"459d"))},children:[{path:"products-list",component:function(){return Promise.all([c.e("chunk-7a83aad5"),c.e("chunk-36bc09db")]).then(c.bind(null,"6c8b"))}},{path:"orders-list",component:function(){return Promise.all([c.e("chunk-7a83aad5"),c.e("chunk-4f1be782"),c.e("chunk-1b27410b")]).then(c.bind(null,"eb32"))}},{path:"applies-list",component:function(){return Promise.all([c.e("chunk-7a83aad5"),c.e("chunk-4f1be782"),c.e("chunk-1b206243")]).then(c.bind(null,"fbaf"))}}]},{path:"/admin",component:function(){return c.e("chunk-d95e67dc").then(c.bind(null,"1337"))}},{path:"/:pathMatch(.*)*",component:function(){return c.e("chunk-2d0e2700").then(c.bind(null,"7f61"))}}],_=Object(N["a"])({history:Object(N["b"])(),routes:S}),E=_;Object(u["e"])("email",a["a"]),Object(u["e"])("required",a["c"]),Object(u["e"])("min",a["b"]),Object(u["d"])({generateMessage:Object(i["a"])({zh_TW:d}),validateOnInput:!0}),Object(i["b"])("zh_TW");var T=Object(t["createApp"])(C);T.use(o.a),T.config.globalProperties.$filters={date:s},T.component("Form",u["c"]),T.component("Field",u["b"]),T.component("ErrorMessage",u["a"]),T.use(E),T.use(b.a,l.a),T.mount("#app")},"803e":function(e,n,c){},"8d33":function(e,n,c){"use strict";c("803e")},"9f16":function(e,n,c){},e89f:function(e,n,c){"use strict";var t=c("14b7"),r=Object(t["a"])();n["a"]=r},ff8b:function(e,n,c){"use strict";c("9f16")}});
//# sourceMappingURL=app.90d6531d.js.map