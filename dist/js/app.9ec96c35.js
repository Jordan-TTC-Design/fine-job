(function(e){function n(n){for(var t,o,d=n[0],s=n[1],i=n[2],l=0,u=[];l<d.length;l++)o=d[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&u.push(a[o][0]),a[o]=0;for(t in s)Object.prototype.hasOwnProperty.call(s,t)&&(e[t]=s[t]);b&&b(n);while(u.length)u.shift()();return r.push.apply(r,i||[]),c()}function c(){for(var e,n=0;n<r.length;n++){for(var c=r[n],t=!0,o=1;o<c.length;o++){var d=c[o];0!==a[d]&&(t=!1)}t&&(r.splice(n--,1),e=s(s.s=c[0]))}return e}var t={},o={app:0},a={app:0},r=[];function d(e){return s.p+"js/"+({}[e]||e)+"."+{"chunk-10b85285":"b28dd0ce","chunk-2d0e2700":"9a0933e2","chunk-ba527bba":"7dbf6e80","chunk-3fa7bdb0":"b4dda6fb","chunk-6e5c17c3":"45e1d475","chunk-56ee46fd":"c6818d49","chunk-5c18a726":"54969933","chunk-d931836a":"ea92355c","chunk-558f066d":"3f24c55c","chunk-352648d9":"aa708e38","chunk-5cb034ae":"76b5e845","chunk-d9037c40":"3306aa32","chunk-6d816cea":"caa06305","chunk-19cc48be":"8130a2b2","chunk-2d0af81c":"d3c10226","chunk-38a277d6":"03f4c0dc","chunk-94d50b22":"8f16f866","chunk-2d0ceef5":"24f5592c","chunk-4252e85b":"a515d8ac","chunk-54f6b88d":"6a754eca","chunk-be241eb0":"88751904","chunk-b5517eee":"83db00f5","chunk-d95e67dc":"9d94dcd9","chunk-e2e796a8":"06415e06"}[e]+".js"}function s(n){if(t[n])return t[n].exports;var c=t[n]={i:n,l:!1,exports:{}};return e[n].call(c.exports,c,c.exports,s),c.l=!0,c.exports}s.e=function(e){var n=[],c={"chunk-6e5c17c3":1,"chunk-56ee46fd":1,"chunk-5c18a726":1,"chunk-d931836a":1,"chunk-352648d9":1,"chunk-5cb034ae":1,"chunk-d9037c40":1,"chunk-4252e85b":1,"chunk-be241eb0":1,"chunk-b5517eee":1};o[e]?n.push(o[e]):0!==o[e]&&c[e]&&n.push(o[e]=new Promise((function(n,c){for(var t="css/"+({}[e]||e)+"."+{"chunk-10b85285":"31d6cfe0","chunk-2d0e2700":"31d6cfe0","chunk-ba527bba":"31d6cfe0","chunk-3fa7bdb0":"31d6cfe0","chunk-6e5c17c3":"31cb015f","chunk-56ee46fd":"87a11c0e","chunk-5c18a726":"87a11c0e","chunk-d931836a":"b2971b02","chunk-558f066d":"31d6cfe0","chunk-352648d9":"f411a5be","chunk-5cb034ae":"fe90e5d2","chunk-d9037c40":"ae501bb7","chunk-6d816cea":"31d6cfe0","chunk-19cc48be":"31d6cfe0","chunk-2d0af81c":"31d6cfe0","chunk-38a277d6":"31d6cfe0","chunk-94d50b22":"31d6cfe0","chunk-2d0ceef5":"31d6cfe0","chunk-4252e85b":"ec158c72","chunk-54f6b88d":"31d6cfe0","chunk-be241eb0":"6680f48e","chunk-b5517eee":"ec158c72","chunk-d95e67dc":"31d6cfe0","chunk-e2e796a8":"31d6cfe0"}[e]+".css",a=s.p+t,r=document.getElementsByTagName("link"),d=0;d<r.length;d++){var i=r[d],l=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(l===t||l===a))return n()}var u=document.getElementsByTagName("style");for(d=0;d<u.length;d++){i=u[d],l=i.getAttribute("data-href");if(l===t||l===a)return n()}var b=document.createElement("link");b.rel="stylesheet",b.type="text/css",b.onload=n,b.onerror=function(n){var t=n&&n.target&&n.target.src||a,r=new Error("Loading CSS chunk "+e+" failed.\n("+t+")");r.code="CSS_CHUNK_LOAD_FAILED",r.request=t,delete o[e],b.parentNode.removeChild(b),c(r)},b.href=a;var h=document.getElementsByTagName("head")[0];h.appendChild(b)})).then((function(){o[e]=0})));var t=a[e];if(0!==t)if(t)n.push(t[2]);else{var r=new Promise((function(n,c){t=a[e]=[n,c]}));n.push(t[2]=r);var i,l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=d(e);var u=new Error;i=function(n){l.onerror=l.onload=null,clearTimeout(b);var c=a[e];if(0!==c){if(c){var t=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src;u.message="Loading chunk "+e+" failed.\n("+t+": "+o+")",u.name="ChunkLoadError",u.type=t,u.request=o,c[1](u)}a[e]=void 0}};var b=setTimeout((function(){i({type:"timeout",target:l})}),12e4);l.onerror=l.onload=i,document.head.appendChild(l)}return Promise.all(n)},s.m=e,s.c=t,s.d=function(e,n,c){s.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:c})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,n){if(1&n&&(e=s(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var c=Object.create(null);if(s.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var t in e)s.d(c,t,function(n){return e[n]}.bind(null,t));return c},s.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(n,"a",n),n},s.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},s.p="/fine-job/",s.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=n,i=i.slice();for(var u=0;u<i.length;u++)n(i[u]);var b=l;r.push([0,"chunk-vendors"]),c()})({0:function(e,n,c){e.exports=c("56d7")},"56d7":function(e,n,c){"use strict";c.r(n);c("e260"),c("e6cf"),c("cca6"),c("a79d");var t=c("7a23"),o=c("3730"),a=c.n(o),r=c("7bb1"),d=c("3aa8"),s=c("cbdf"),i=c("9457"),l=c("bc3a"),u=c.n(l),b=c("2106"),h=c.n(b);function p(e){var n=new Date(1e3*e);return n.toLocaleDateString()}function f(e,n,c,o,a,r){var d=Object(t["resolveComponent"])("router-view"),s=Object(t["resolveComponent"])("Spinner"),i=Object(t["resolveComponent"])("SpinnerBg");return Object(t["openBlock"])(),Object(t["createBlock"])(t["Fragment"],null,[a.isRouterAlive?(Object(t["openBlock"])(),Object(t["createBlock"])(d,{key:0})):Object(t["createCommentVNode"])("",!0),Object(t["createVNode"])(s),Object(t["createVNode"])(i)],64)}var k={ref:"spinner",class:"spinnerContainer"},v=Object(t["createStaticVNode"])('<div class="spinnerBox"><div class="personBox personBox--left"><div class="person__shadow person--left"></div><div class="person  person--left"><div class="person__eye"><div class="mask"><div class="eyeBall"></div></div></div><div class="person__eye"><div class="mask"><div class="eyeBall"></div></div></div></div><div class="person__talk person__talk--left"><div class="person__talk__dot talk__dot--animation"></div><div class="person__talk__dot talk__dot--animation double-bounce2"></div><div class="person__talk__dot talk__dot--animation double-bounce3"></div></div></div><div class="personBox personBox--right"><div class="person__talk person__talk--right"><div class="person__talk__dot talk__dot--animation double-bounce3"></div><div class="person__talk__dot talk__dot--animation double-bounce2"></div><div class="person__talk__dot talk__dot--animation"></div></div><div class="person__shadow person--right person__shadow--right"></div><div class="person person--right"><div class="person__eye"><div class="mask"><div class="eyeBall"></div></div></div><div class="person__eye"><div class="mask"><div class="eyeBall"></div></div></div></div></div></div>',1);function _(e,n,c,o,a,r){return Object(t["openBlock"])(),Object(t["createBlock"])("div",k,[v],512)}var m=c("cfb9"),O={methods:{spinnerOpen:function(){this.$refs.spinner.classList.add("spinner--open")},spinnerClose:function(){this.$refs.spinner.classList.remove("spinner--open")}},created:function(){var e=this;m["a"].on("spinner-close",(function(){e.spinnerClose()})),m["a"].on("spinner-open",(function(){e.spinnerOpen()}))}};O.render=_;var j=O,g=c("c52d"),y=c.n(g),N={ref:"spinnerBg",class:"spinnerContainer spinnerContainer--bg"},B=Object(t["createVNode"])("div",{class:"spinnerBox"},[Object(t["createVNode"])("div",{class:"personBox personBox--left"},[Object(t["createVNode"])("div",{class:"person__shadow person--left"}),Object(t["createVNode"])("div",{class:"person  person--left"},[Object(t["createVNode"])("div",{class:"person__eye"},[Object(t["createVNode"])("div",{class:"mask"},[Object(t["createVNode"])("div",{class:"eyeBall"})])]),Object(t["createVNode"])("div",{class:"person__eye"},[Object(t["createVNode"])("div",{class:"mask"},[Object(t["createVNode"])("div",{class:"eyeBall"})])])]),Object(t["createVNode"])("div",{class:"person__talk person__talk--left"},[Object(t["createVNode"])("div",{class:"person__talk__dot talk__dot--animation"}),Object(t["createVNode"])("div",{class:"person__talk__dot talk__dot--animation double-bounce2"}),Object(t["createVNode"])("div",{class:"person__talk__dot talk__dot--animation double-bounce3"})])]),Object(t["createVNode"])("div",{class:"personBox personBox--right"},[Object(t["createVNode"])("div",{class:"person__talk person__talk--right"},[Object(t["createVNode"])("div",{class:"person__talk__dot talk__dot--animation double-bounce3"}),Object(t["createVNode"])("div",{class:"person__talk__dot talk__dot--animation double-bounce2"}),Object(t["createVNode"])("div",{class:"person__talk__dot talk__dot--animation"})]),Object(t["createVNode"])("div",{class:"person__shadow person--right person__shadow--right"}),Object(t["createVNode"])("div",{class:"person person--right"},[Object(t["createVNode"])("div",{class:"person__eye"},[Object(t["createVNode"])("div",{class:"mask"},[Object(t["createVNode"])("div",{class:"eyeBall"})])]),Object(t["createVNode"])("div",{class:"person__eye"},[Object(t["createVNode"])("div",{class:"mask"},[Object(t["createVNode"])("div",{class:"eyeBall"})])])])])],-1),V=Object(t["createVNode"])("div",{class:"spinnerBg__logoBox"},[Object(t["createVNode"])("h1",null,[Object(t["createVNode"])("img",{class:"header__logo",src:y.a,alt:"Fine Job logo"})])],-1);function w(e,n,c,o,a,r){return Object(t["openBlock"])(),Object(t["createBlock"])("div",N,[B,V],512)}var P={methods:{spinnerOpen:function(e){var n=this;this.$refs.spinnerBg.classList.add("spinner--open--bg"),setTimeout((function(){n.spinnerClose()}),e)},spinnerClose:function(){this.$refs.spinnerBg.classList.remove("spinner--open--bg")}},created:function(){var e=this;m["a"].on("spinner-close-bg",(function(){e.spinnerClose()})),m["a"].on("spinner-open-bg",(function(n){e.spinnerOpen(n)}))}};P.render=w;var x=P,C={components:{Spinner:j,SpinnerBg:x},provide:function(){return{reload:this.reload}},data:function(){return{isRouterAlive:!0}},methods:{reload:function(){var e=this;console.log("reload occure"),this.isRouterAlive=!1,this.$nextTick((function(){e.isRouterAlive=!0}))}}};c("a4e5");C.render=f;var S=C,A=(c("d3b7"),c("3ca3"),c("ddb0"),c("6c02")),L=[{path:"/",component:function(){return c.e("chunk-e2e796a8").then(c.bind(null,"2bc2"))},children:[{path:"",component:function(){return Promise.all([c.e("chunk-ba527bba"),c.e("chunk-6d816cea"),c.e("chunk-94d50b22"),c.e("chunk-be241eb0")]).then(c.bind(null,"bb51"))}},{path:"products-list",component:function(){return Promise.all([c.e("chunk-ba527bba"),c.e("chunk-6d816cea"),c.e("chunk-19cc48be"),c.e("chunk-94d50b22"),c.e("chunk-2d0ceef5")]).then(c.bind(null,"6225"))}},{path:"collection",component:function(){return Promise.all([c.e("chunk-ba527bba"),c.e("chunk-6d816cea"),c.e("chunk-54f6b88d")]).then(c.bind(null,"b91f"))}},{path:"collection-folder/:id",component:function(){return Promise.all([c.e("chunk-ba527bba"),c.e("chunk-6d816cea"),c.e("chunk-19cc48be"),c.e("chunk-38a277d6")]).then(c.bind(null,"fda9"))}},{path:"products-list/product/:id",component:function(){return Promise.all([c.e("chunk-ba527bba"),c.e("chunk-6d816cea"),c.e("chunk-4252e85b")]).then(c.bind(null,"658f"))}},{path:"products-list/company/:id",component:function(){return Promise.all([c.e("chunk-ba527bba"),c.e("chunk-6d816cea"),c.e("chunk-b5517eee")]).then(c.bind(null,"c76f"))}},{path:"search/",component:function(){return Promise.all([c.e("chunk-ba527bba"),c.e("chunk-6d816cea"),c.e("chunk-19cc48be"),c.e("chunk-2d0af81c")]).then(c.bind(null,"0f2b"))}},{path:"apply-job/:id",component:function(){return Promise.all([c.e("chunk-ba527bba"),c.e("chunk-558f066d"),c.e("chunk-352648d9")]).then(c.bind(null,"54fc"))}},{path:"add-company",component:function(){return Promise.all([c.e("chunk-ba527bba"),c.e("chunk-558f066d"),c.e("chunk-5cb034ae")]).then(c.bind(null,"7f9d"))}},{path:"add-job",component:function(){return Promise.all([c.e("chunk-ba527bba"),c.e("chunk-558f066d"),c.e("chunk-d9037c40")]).then(c.bind(null,"2c4b"))}}]},{path:"/admin/dashboard",component:function(){return c.e("chunk-10b85285").then(c.bind(null,"459d"))},children:[{path:"products-list",component:function(){return Promise.all([c.e("chunk-ba527bba"),c.e("chunk-3fa7bdb0"),c.e("chunk-d931836a")]).then(c.bind(null,"6c8b"))}},{path:"orders-list",component:function(){return Promise.all([c.e("chunk-ba527bba"),c.e("chunk-3fa7bdb0"),c.e("chunk-6e5c17c3"),c.e("chunk-56ee46fd")]).then(c.bind(null,"eb32"))}},{path:"applies-list",component:function(){return Promise.all([c.e("chunk-ba527bba"),c.e("chunk-3fa7bdb0"),c.e("chunk-6e5c17c3"),c.e("chunk-5c18a726")]).then(c.bind(null,"fbaf"))}}]},{path:"/admin",component:function(){return c.e("chunk-d95e67dc").then(c.bind(null,"1337"))}},{path:"/:pathMatch(.*)*",component:function(){return c.e("chunk-2d0e2700").then(c.bind(null,"7f61"))}}],T=Object(A["a"])({history:Object(A["b"])(),routes:L}),E=T;Object(r["e"])("email",d["a"]),Object(r["e"])("required",d["c"]),Object(r["e"])("min",d["b"]),Object(r["d"])({generateMessage:Object(s["a"])({zh_TW:i}),validateOnInput:!0}),Object(s["b"])("zh_TW");var M=Object(t["createApp"])(S);M.use(a.a),M.config.globalProperties.$filters={date:p},M.component("Form",r["c"]),M.component("Field",r["b"]),M.component("ErrorMessage",r["a"]),M.use(E),M.use(h.a,u.a),M.mount("#app")},a4e5:function(e,n,c){"use strict";c("b73b")},b73b:function(e,n,c){},c52d:function(e,n,c){e.exports=c.p+"img/fineJobLogo-white.0ddd6ad0.svg"},cfb9:function(e,n,c){"use strict";var t=c("14b7"),o=Object(t["a"])();n["a"]=o}});
//# sourceMappingURL=app.9ec96c35.js.map