(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-eb89b15c"],{"057f":function(t,e,o){var c=o("fc6a"),n=o("241c").f,r={}.toString,i="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],a=function(t){try{return n(t)}catch(e){return i.slice()}};t.exports.f=function(t){return i&&"[object Window]"==r.call(t)?a(t):n(c(t))}},"159b":function(t,e,o){var c=o("da84"),n=o("fdbc"),r=o("17c2"),i=o("9112");for(var a in n){var s=c[a],l=s&&s.prototype;if(l&&l.forEach!==r)try{i(l,"forEach",r)}catch(u){l.forEach=r}}},"17c2":function(t,e,o){"use strict";var c=o("b727").forEach,n=o("a640"),r=n("forEach");t.exports=r?[].forEach:function(t){return c(this,t,arguments.length>1?arguments[1]:void 0)}},"1dde":function(t,e,o){var c=o("d039"),n=o("b622"),r=o("2d00"),i=n("species");t.exports=function(t){return r>=51||!c((function(){var e=[],o=e.constructor={};return o[i]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"3cac":function(t,e,o){"use strict";var c=o("7a23"),n=Object(c["createVNode"])("i",{class:"jobIcon bi bi-arrow-up"},null,-1);function r(t,e,o,r,i,a){return Object(c["openBlock"])(),Object(c["createBlock"])("button",{ref:"upTopBtn",type:"btn",class:"d-none sideIconBtn upTopBtn btn btn-light",onClick:e[1]||(e[1]=function(){return a.toTop&&a.toTop.apply(a,arguments)})},[n],512)}var i={data:function(){return{fullWidth:0,fullHeight:0,scrollTop:0,swiperNum:1}},watch:{scrollTop:function(t){var e=this;t>500?(this.$refs.upTopBtn.classList.remove("d-none"),this.$refs.upTopBtn.classList.add("show")):(this.$refs.upTopBtn.classList.remove("show"),setTimeout((function(){e.$refs.upTopBtn.classList.add("d-none")}),100))}},methods:{toTop:function(){document.documentElement.scrollTop=0}},mounted:function(){var t=this;t.fullWidth=window.innerWidth,t.fullHeight=window.innerHeight,t.scrollTop=window.scrollY,window.onresize=function(){t.fullWidth=window.innerWidth,t.fullHeight=window.innerHeight},window.onscroll=function(){t.scrollTop=window.scrollY}}};i.render=r;e["a"]=i},"65f0":function(t,e,o){var c=o("861d"),n=o("e8b5"),r=o("b622"),i=r("species");t.exports=function(t,e){var o;return n(t)&&(o=t.constructor,"function"!=typeof o||o!==Array&&!n(o.prototype)?c(o)&&(o=o[i],null===o&&(o=void 0)):o=void 0),new(void 0===o?Array:o)(0===e?0:e)}},"746f":function(t,e,o){var c=o("428f"),n=o("5135"),r=o("e538"),i=o("9bf2").f;t.exports=function(t){var e=c.Symbol||(c.Symbol={});n(e,t)||i(e,t,{value:r.f(t)})}},8418:function(t,e,o){"use strict";var c=o("c04e"),n=o("9bf2"),r=o("5c6c");t.exports=function(t,e,o){var i=c(e);i in t?n.f(t,i,r(0,o)):t[i]=o}},"99af":function(t,e,o){"use strict";var c=o("23e7"),n=o("d039"),r=o("e8b5"),i=o("861d"),a=o("7b0b"),s=o("50c4"),l=o("8418"),u=o("65f0"),b=o("1dde"),d=o("b622"),f=o("2d00"),p=d("isConcatSpreadable"),m=9007199254740991,j="Maximum allowed index exceeded",y=f>=51||!n((function(){var t=[];return t[p]=!1,t.concat()[0]!==t})),g=b("concat"),h=function(t){if(!i(t))return!1;var e=t[p];return void 0!==e?!!e:r(t)},v=!y||!g;c({target:"Array",proto:!0,forced:v},{concat:function(t){var e,o,c,n,r,i=a(this),b=u(i,0),d=0;for(e=-1,c=arguments.length;e<c;e++)if(r=-1===e?i:arguments[e],h(r)){if(n=s(r.length),d+n>m)throw TypeError(j);for(o=0;o<n;o++,d++)o in r&&l(b,d,r[o])}else{if(d>=m)throw TypeError(j);l(b,d++,r)}return b.length=d,b}})},a4d3:function(t,e,o){"use strict";var c=o("23e7"),n=o("da84"),r=o("d066"),i=o("c430"),a=o("83ab"),s=o("4930"),l=o("fdbf"),u=o("d039"),b=o("5135"),d=o("e8b5"),f=o("861d"),p=o("825a"),m=o("7b0b"),j=o("fc6a"),y=o("c04e"),g=o("5c6c"),h=o("7c73"),v=o("df75"),O=o("241c"),x=o("057f"),w=o("7418"),N=o("06cf"),V=o("9bf2"),_=o("d1e7"),B=o("9112"),k=o("6eeb"),S=o("5692"),I=o("f772"),T=o("d012"),C=o("90e3"),E=o("b622"),D=o("e538"),L=o("746f"),J=o("d44e"),P=o("69f3"),$=o("b727").forEach,U=I("hidden"),A="Symbol",H="prototype",F=E("toPrimitive"),W=P.set,M=P.getterFor(A),Y=Object[H],z=n.Symbol,Q=r("JSON","stringify"),q=N.f,G=V.f,K=x.f,R=_.f,X=S("symbols"),Z=S("op-symbols"),tt=S("string-to-symbol-registry"),et=S("symbol-to-string-registry"),ot=S("wks"),ct=n.QObject,nt=!ct||!ct[H]||!ct[H].findChild,rt=a&&u((function(){return 7!=h(G({},"a",{get:function(){return G(this,"a",{value:7}).a}})).a}))?function(t,e,o){var c=q(Y,e);c&&delete Y[e],G(t,e,o),c&&t!==Y&&G(Y,e,c)}:G,it=function(t,e){var o=X[t]=h(z[H]);return W(o,{type:A,tag:t,description:e}),a||(o.description=e),o},at=l?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof z},st=function(t,e,o){t===Y&&st(Z,e,o),p(t);var c=y(e,!0);return p(o),b(X,c)?(o.enumerable?(b(t,U)&&t[U][c]&&(t[U][c]=!1),o=h(o,{enumerable:g(0,!1)})):(b(t,U)||G(t,U,g(1,{})),t[U][c]=!0),rt(t,c,o)):G(t,c,o)},lt=function(t,e){p(t);var o=j(e),c=v(o).concat(pt(o));return $(c,(function(e){a&&!bt.call(o,e)||st(t,e,o[e])})),t},ut=function(t,e){return void 0===e?h(t):lt(h(t),e)},bt=function(t){var e=y(t,!0),o=R.call(this,e);return!(this===Y&&b(X,e)&&!b(Z,e))&&(!(o||!b(this,e)||!b(X,e)||b(this,U)&&this[U][e])||o)},dt=function(t,e){var o=j(t),c=y(e,!0);if(o!==Y||!b(X,c)||b(Z,c)){var n=q(o,c);return!n||!b(X,c)||b(o,U)&&o[U][c]||(n.enumerable=!0),n}},ft=function(t){var e=K(j(t)),o=[];return $(e,(function(t){b(X,t)||b(T,t)||o.push(t)})),o},pt=function(t){var e=t===Y,o=K(e?Z:j(t)),c=[];return $(o,(function(t){!b(X,t)||e&&!b(Y,t)||c.push(X[t])})),c};if(s||(z=function(){if(this instanceof z)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=C(t),o=function(t){this===Y&&o.call(Z,t),b(this,U)&&b(this[U],e)&&(this[U][e]=!1),rt(this,e,g(1,t))};return a&&nt&&rt(Y,e,{configurable:!0,set:o}),it(e,t)},k(z[H],"toString",(function(){return M(this).tag})),k(z,"withoutSetter",(function(t){return it(C(t),t)})),_.f=bt,V.f=st,N.f=dt,O.f=x.f=ft,w.f=pt,D.f=function(t){return it(E(t),t)},a&&(G(z[H],"description",{configurable:!0,get:function(){return M(this).description}}),i||k(Y,"propertyIsEnumerable",bt,{unsafe:!0}))),c({global:!0,wrap:!0,forced:!s,sham:!s},{Symbol:z}),$(v(ot),(function(t){L(t)})),c({target:A,stat:!0,forced:!s},{for:function(t){var e=String(t);if(b(tt,e))return tt[e];var o=z(e);return tt[e]=o,et[o]=e,o},keyFor:function(t){if(!at(t))throw TypeError(t+" is not a symbol");if(b(et,t))return et[t]},useSetter:function(){nt=!0},useSimple:function(){nt=!1}}),c({target:"Object",stat:!0,forced:!s,sham:!a},{create:ut,defineProperty:st,defineProperties:lt,getOwnPropertyDescriptor:dt}),c({target:"Object",stat:!0,forced:!s},{getOwnPropertyNames:ft,getOwnPropertySymbols:pt}),c({target:"Object",stat:!0,forced:u((function(){w.f(1)}))},{getOwnPropertySymbols:function(t){return w.f(m(t))}}),Q){var mt=!s||u((function(){var t=z();return"[null]"!=Q([t])||"{}"!=Q({a:t})||"{}"!=Q(Object(t))}));c({target:"JSON",stat:!0,forced:mt},{stringify:function(t,e,o){var c,n=[t],r=1;while(arguments.length>r)n.push(arguments[r++]);if(c=e,(f(e)||void 0!==t)&&!at(t))return d(e)||(e=function(t,e){if("function"==typeof c&&(e=c.call(this,t,e)),!at(e))return e}),n[1]=e,Q.apply(null,n)}})}z[H][F]||B(z[H],F,z[H].valueOf),J(z,A),T[U]=!0},a640:function(t,e,o){"use strict";var c=o("d039");t.exports=function(t,e){var o=[][t];return!!o&&c((function(){o.call(null,e||function(){throw 1},1)}))}},b727:function(t,e,o){var c=o("0366"),n=o("44ad"),r=o("7b0b"),i=o("50c4"),a=o("65f0"),s=[].push,l=function(t){var e=1==t,o=2==t,l=3==t,u=4==t,b=6==t,d=7==t,f=5==t||b;return function(p,m,j,y){for(var g,h,v=r(p),O=n(v),x=c(m,j,3),w=i(O.length),N=0,V=y||a,_=e?V(p,w):o||d?V(p,0):void 0;w>N;N++)if((f||N in O)&&(g=O[N],h=x(g,N,v),t))if(e)_[N]=h;else if(h)switch(t){case 3:return!0;case 5:return g;case 6:return N;case 2:s.call(_,g)}else switch(t){case 4:return!1;case 7:s.call(_,g)}return b?-1:l||u?u:_}};t.exports={forEach:l(0),map:l(1),filter:l(2),some:l(3),every:l(4),find:l(5),findIndex:l(6),filterOut:l(7)}},c76f:function(t,e,o){"use strict";o.r(e);var c=o("7a23"),n={class:"container-fuild"},r={key:0,class:"container companyPage"},i={class:"row"},a={class:"col-lg-9 col-12"},s={class:"companyInfoBox box--shadow mb-3  position-relative"},l=Object(c["createVNode"])("button",{class:"collectBtn btn btn-outline-gray-line position-absolute pageState",type:"button"},[Object(c["createVNode"])("i",{class:"jobIcon bi bi-bookmark-fill"})],-1),u={class:"d-flex flex-md-row flex-column align-items-md-stretch align-items-center"},b={class:"companyInfoBox__logoImgBox mb-md-0 mb-4 me-md-4"},d={class:"companyInfoBox__txtBox d-flex flex-column justify-content-between\n              align-items-md-start align-items-center pt-3"},f={class:"page__title mb-3"},p={class:"d-flex flex-md-row flex-column justify-content-between\n                align-items-end w-100"},m={class:"align-self-md-stretch align-self-center"},j={class:"page__txt mb-3"},y=Object(c["createVNode"])("span",null,[Object(c["createVNode"])("i",{class:"jobIcon--sm me-1 bi bi-geo-alt"})],-1),g={class:"page__txt"},h=Object(c["createVNode"])("span",null,[Object(c["createVNode"])("i",{class:"jobIcon--sm me-1 bi bi-building"})],-1),v={class:"subTxt text-secondary"},O={class:"jobContentBox box--shadow mb-3"},x=Object(c["createVNode"])("h3",{class:"section__title--sub"},[Object(c["createVNode"])("span",{class:"title__icon"}),Object(c["createTextVNode"])("公司照片")],-1),w={class:"d-flex justify-content-between flex-md-row flex-column"},N={class:"jobContentBox  box--shadow  mb-3"},V=Object(c["createVNode"])("h3",{class:"section__title--sub"},[Object(c["createVNode"])("span",{class:"title__icon"}),Object(c["createTextVNode"])("公司簡介")],-1),_={class:"jobContentBox  box--shadow  mb-lg-0 mb-3"},B=Object(c["createVNode"])("h3",{class:"section__title--sub"},[Object(c["createVNode"])("span",{class:"title__icon"}),Object(c["createTextVNode"])("公司職位")],-1),k={class:"companyJobList d-flex flex-wrap justify-content-between"},S=Object(c["createVNode"])("button",{class:"collectBtn btn  position-absolute",type:"button"},[Object(c["createVNode"])("i",{class:"jobIcon bi bi-bookmark-fill"})],-1),I={class:"mb-3"},T={class:"d-flex"},C={class:"jobList__item__imgBox me-3"},E={class:"jobList__item__txtBox\n                  flex-grow-1 d-flex flex-column justify-content-between"},D={class:"mb-3 d-flex flex-column"},L={class:"page__txt  subTxt mb-2 me-7"},J={class:"d-flex justify-content-between align-items-center"},P={key:0,class:"text-primary"},$={key:1,class:"text-primary"},U={class:"subTxt text-secondary"},A=Object(c["createStaticVNode"])('<div class="col-lg-3 col-12"><div class="jobSubBox box--shadow  mb-3"><h5 class="list__title">瀏覽紀錄</h5><ul><li class="list__item"><a class="mb-2">UI Designer</a><a>六角學院</a></li><li class="list__item"><a class="mb-2">UI Designer</a><a>六角學院</a></li><li class="list__item"><a class="mb-2">UI Designer</a><a>六角學院</a></li><li class="list__item"><a class="mb-2">UI Designer</a><a>六角學院</a></li></ul></div></div>',1),H={key:1,class:"cantFoundProduct"},F=Object(c["createVNode"])("h5",null,"找不到產品",-1),W={class:"sideBtnBox"};function M(t,e,o,M,Y,z){var Q=Object(c["resolveComponent"])("router-link"),q=Object(c["resolveComponent"])("UpTopBtn");return Object(c["openBlock"])(),Object(c["createBlock"])(c["Fragment"],null,[Object(c["createVNode"])("div",n,[Y.isExist?(Object(c["openBlock"])(),Object(c["createBlock"])("div",r,[Object(c["createVNode"])("div",i,[Object(c["createVNode"])("div",a,[Object(c["createVNode"])("div",s,[l,Object(c["createVNode"])("div",u,[Object(c["createVNode"])("div",b,[Object(c["createVNode"])("img",{class:"logoImg",src:Y.companyItem.imageUrl,alt:Y.companyItem.title+"logo"},null,8,["src","alt"])]),Object(c["createVNode"])("div",d,[Object(c["createVNode"])("h2",f,Object(c["toDisplayString"])(Y.companyItem.title),1),Object(c["createVNode"])("div",p,[Object(c["createVNode"])("div",m,[Object(c["createVNode"])("p",j,[y,Object(c["createTextVNode"])(Object(c["toDisplayString"])(Y.companyItem.options.companyAddressCity)+"，"+Object(c["toDisplayString"])(Y.companyItem.options.companyAddressDetail),1)]),Object(c["createVNode"])("p",g,[h,Object(c["createTextVNode"])(" "+Object(c["toDisplayString"])(Y.companyItem.category),1)])]),Object(c["createVNode"])("div",null,[Object(c["createVNode"])("p",v,Object(c["toDisplayString"])(t.$filters.date(Y.companyItem.options.create)),1)])])])])]),Object(c["createVNode"])("div",O,[x,Object(c["createVNode"])("div",w,[(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(Y.companyItem.imagesUrl,(function(t,e){return Object(c["openBlock"])(),Object(c["createBlock"])("img",{class:"companyPage__companyImage mb-md-0 mb-2",src:t,alt:Y.companyItem.title+"公司圖片"+e,key:e},null,8,["src","alt"])})),128))])]),Object(c["createVNode"])("div",N,[V,Object(c["createVNode"])("div",{class:"page__txt",innerHTML:Y.companyItem.content},null,8,["innerHTML"])]),Object(c["createVNode"])("div",_,[B,Object(c["createVNode"])("ul",k,[(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(Y.companyJobs,(function(e){return Object(c["openBlock"])(),Object(c["createBlock"])("li",{"data-id":e.id,key:e.id,class:"jobList__item d-flex flex-column align-items-start\n                  mb-4 "},[S,Object(c["createVNode"])("div",I,[Object(c["createVNode"])("button",{type:"button",class:"jobTag btn",onClick:function(t){return z.searchByJobCategory(e.category)}},Object(c["toDisplayString"])(e.category),9,["onClick"])]),Object(c["createVNode"])("div",T,[Object(c["createVNode"])("div",C,[Object(c["createVNode"])("img",{class:"jobImg",src:e.imageUrl,alt:e.title+"職位圖片"},null,8,["src","alt"])]),Object(c["createVNode"])("div",E,[Object(c["createVNode"])("div",D,[Object(c["createVNode"])(Q,{class:"jobList__item__title text-dark mb-3 me-7 pe-auto",to:"/products-list/product/".concat(e.id)},{default:Object(c["withCtx"])((function(){return[Object(c["createTextVNode"])(Object(c["toDisplayString"])(e.title),1)]})),_:2},1032,["to"]),Object(c["createVNode"])("p",L,Object(c["toDisplayString"])(e.options.company.companyName),1)]),Object(c["createVNode"])("div",J,[e.options.job.salaryInterView?Object(c["createCommentVNode"])("",!0):(Object(c["openBlock"])(),Object(c["createBlock"])("p",P,Object(c["toDisplayString"])(e.price)+" / 月薪 ",1)),e.options.job.salaryInterView?(Object(c["openBlock"])(),Object(c["createBlock"])("p",$," 薪資面議 ")):Object(c["createCommentVNode"])("",!0),Object(c["createVNode"])("p",U,Object(c["toDisplayString"])(t.$filters.date(e.options.job.create)),1)])])])],8,["data-id"])})),128))])])]),A])])):0==Y.isExist?(Object(c["openBlock"])(),Object(c["createBlock"])("div",H,[F])):Object(c["createCommentVNode"])("",!0)]),Object(c["createVNode"])("div",W,[Object(c["createVNode"])(q)])],64)}o("99af"),o("159b"),o("a4d3"),o("e01a");var Y=o("cfb9"),z=o("3cac"),Q={components:{UpTopBtn:z["a"]},data:function(){return{companyItem:{imagesUrl:[],imageUrl:"",options:{company:{},job:{}}},companyJobs:[],jobsList:[],isExist:null}},methods:{searchByJobCategory:function(t){var e="不限",o="不限";this.$router.push("/search/?keyword=".concat(e,"&city=").concat(o,"&jobCategory=").concat(t))},getCompanyData:function(){var t=this;Y["a"].emit("spinner-open");var e=this.$route.params.id,o="".concat("https://vue3-course-api.hexschool.io","/api/").concat("jordanttcdesign","/product/").concat(e);this.$http.get(o).then((function(e){e.data.success?(t.isExist=!0,t.companyItem=e.data.product):t.isExist=!1,Y["a"].emit("spinner-close"),t.getJobs()})).catch((function(t){console.log(t)}))},getJobs:function(){var t=this;Y["a"].emit("spinner-open");var e="".concat("https://vue3-course-api.hexschool.io","/api/").concat("jordanttcdesign","/products/all");this.$http.get(e).then((function(e){t.jobsList=[],t.jobsList=e.data.products,t.findCompanyJobs()})).catch((function(t){console.log(t)})),Y["a"].emit("spinner-close")},findCompanyJobs:function(){var t=this;Y["a"].emit("spinner-open"),this.jobsList.forEach((function(e){"職位"===e.description&&e.options.company.companyName===t.companyItem.title&&(console.log(e.options.company.companyName),t.companyJobs.push(e))})),Y["a"].emit("spinner-close")}},created:function(){this.getCompanyData()},mounted:function(){}};Q.render=M;e["default"]=Q},e01a:function(t,e,o){"use strict";var c=o("23e7"),n=o("83ab"),r=o("da84"),i=o("5135"),a=o("861d"),s=o("9bf2").f,l=o("e893"),u=r.Symbol;if(n&&"function"==typeof u&&(!("description"in u.prototype)||void 0!==u().description)){var b={},d=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof d?new u(t):void 0===t?u():u(t);return""===t&&(b[e]=!0),e};l(d,u);var f=d.prototype=u.prototype;f.constructor=d;var p=f.toString,m="Symbol(test)"==String(u("test")),j=/^Symbol\((.*)\)[^)]+$/;s(f,"description",{configurable:!0,get:function(){var t=a(this)?this.valueOf():this,e=p.call(t);if(i(b,t))return"";var o=m?e.slice(7,-1):e.replace(j,"$1");return""===o?void 0:o}}),c({global:!0,forced:!0},{Symbol:d})}},e538:function(t,e,o){var c=o("b622");e.f=c},e8b5:function(t,e,o){var c=o("c6b6");t.exports=Array.isArray||function(t){return"Array"==c(t)}}}]);
//# sourceMappingURL=chunk-eb89b15c.545d894b.js.map