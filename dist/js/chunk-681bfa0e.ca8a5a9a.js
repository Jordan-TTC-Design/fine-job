(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-681bfa0e"],{"107c":function(e,t,o){var c=o("d039");e.exports=c((function(){var e=RegExp("(?<a>b)","string".charAt(5));return"b"!==e.exec("b").groups.a||"bc"!=="b".replace(e,"$<a>c")}))},1320:function(e,t,o){"use strict";var c=o("7a23"),n={key:0,class:"imgPopModalContainer"},a={class:"imgPopModalBox"},i=Object(c["createVNode"])("i",{class:"bi bi-x actionIcon"},null,-1),l={key:0,class:"changeImgBtnBox"},s=Object(c["createVNode"])("i",{class:"bi bi-arrow-left actionIcon"},null,-1),r=Object(c["createVNode"])("i",{class:"bi bi-arrow-right actionIcon"},null,-1);function d(e,t,o,d,p,b){return p.imgPopModalState?(Object(c["openBlock"])(),Object(c["createBlock"])("div",n,[Object(c["createVNode"])("div",{class:"img-cover",onClick:t[1]||(t[1]=function(){return b.closeModal&&b.closeModal.apply(b,arguments)})}),Object(c["createVNode"])("div",a,[Object(c["createVNode"])("img",{class:"imgPopModalBox__img",src:p.imgPopUrl,alt:"展示圖片"},null,8,["src"]),Object(c["createVNode"])("button",{type:"button",class:"closeBtn btn btn-lg btn-outline-light rounded-circle iconBtnBox",onClick:t[2]||(t[2]=function(){return b.closeModal&&b.closeModal.apply(b,arguments)})},[i]),p.changeBtnState?(Object(c["openBlock"])(),Object(c["createBlock"])("div",l,[Object(c["createVNode"])("button",{type:"button",class:"changeImgBtnBox__pre btn btn-lg rounded-circle iconBtnBox",onClick:t[3]||(t[3]=function(){return b.preImg&&b.preImg.apply(b,arguments)})},[s]),Object(c["createVNode"])("button",{type:"button",class:"changeImgBtnBox__next btn btn-lg rounded-circle iconBtnBox",onClick:t[4]||(t[4]=function(){return b.nextImg&&b.nextImg.apply(b,arguments)})},[r])])):Object(c["createCommentVNode"])("",!0)])])):Object(c["createCommentVNode"])("",!0)}o("a4d3"),o("e01a"),o("d3b7"),o("d28b"),o("3ca3"),o("ddb0");function p(e){return p="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},p(e)}var b=o("cfb9"),m={data:function(){return{imgPopUrl:"",imgPopUrlObj:{},imgPopModalState:!1,nowNumber:0,changeBtnState:!0}},methods:{preImg:function(){this.nowNumber<this.imgPopUrlObj.length&&this.nowNumber>0?(this.nowNumber-=1,this.imgPopUrl=this.imgPopUrlObj[this.nowNumber]):0===this.nowNumber&&(this.nowNumber=this.imgPopUrlObj.length-1,this.imgPopUrl=this.imgPopUrlObj[this.nowNumber])},nextImg:function(){this.nowNumber<this.imgPopUrlObj.length-1?(this.nowNumber+=1,this.imgPopUrl=this.imgPopUrlObj[this.nowNumber]):this.nowNumber===this.imgPopUrlObj.length-1&&(this.nowNumber=0,this.imgPopUrl=this.imgPopUrlObj[this.nowNumber])},closeModal:function(){this.imgPopModalState=!1},openModal:function(){this.imgPopModalState=!0}},created:function(){var e=this;b["a"].on("imgPopModal-open",(function(t){e.openModal();var o=p(t);"object"===o?(e.imgPopUrlObj=t,e.imgPopUrl=e.imgPopUrlObj[e.nowNumber],e.changeBtnState=!0):"string"===o&&(e.imgPopUrl=t,e.changeBtnState=!1)}))}};o("749a");m.render=d;t["a"]=m},"14c3":function(e,t,o){var c=o("c6b6"),n=o("9263");e.exports=function(e,t){var o=e.exec;if("function"===typeof o){var a=o.call(e,t);if("object"!==typeof a)throw TypeError("RegExp exec method returned something other than an Object or null");return a}if("RegExp"!==c(e))throw TypeError("RegExp#exec called on incompatible receiver");return n.call(e,t)}},"346e":function(e,t,o){"use strict";var c=o("7a23"),n={ref:"companyCollectModal",class:"companyCollectModal modal fade",id:"companyCollectModal","aria-hidden":"true","aria-labelledby":"companyCollectModalLabel",tabindex:"-1"},a={class:"modal-dialog modal-dialog-centered modal-sm"},i={class:"modal-content"},l={class:"modal-body"},s=Object(c["createStaticVNode"])('<div class="d-flex justify-content-between mb-4"><div><h3 class="section__title--sub mb-2"><span class="title__icon"></span>取消收藏</h3></div><button type="button" class="btn-close" data-bs-dismiss="companyCollectModal" aria-label="Close"></button></div><p class="text-center mb-4">請問您確定要取消收藏?</p>',2),r={class:"text-center mb-6 text-primary "},d={class:"d-flex"},p=Object(c["createVNode"])("button",{class:"btn btn-gray-light me-2 flex-grow-1","data-bs-toggle":"companyCollectModal","data-bs-dismiss":"companyCollectModal"}," 返回 ",-1);function b(e,t,o,b,m,u){return Object(c["openBlock"])(),Object(c["createBlock"])("div",n,[Object(c["createVNode"])("div",a,[Object(c["createVNode"])("div",i,[Object(c["createVNode"])("div",l,[s,Object(c["createVNode"])("p",r,Object(c["toDisplayString"])(m.sentCompany.title),1),Object(c["createVNode"])("div",d,[p,Object(c["createVNode"])("button",{type:"submit",class:"btn btn-primary flex-grow-1",onClick:t[1]||(t[1]=function(e){return u.deleteCompanyFromLocal(m.sentCompany.id)})}," 確定 ")])])])])],512)}o("159b"),o("a434");var m=o("cfb9"),u=o("7c2b"),g=o.n(u),y={emits:["return-company-collection"],data:function(){return{companyModal:{},companyCollection:[],sentCompany:{},companyJobList:[]}},methods:{openModal:function(){this.companyModal.show()},closeModal:function(){this.companyModal.hide()},toggleCollectCompany:function(e){var t=this.companyCollection.some((function(t){return t.id===e}));!1===t?this.saveCompanyToLocal():this.openModal()},saveCompanyToLocal:function(){var e={title:this.sentCompany.title,id:this.sentCompany.id,category:this.sentCompany.category,logoImageUrl:this.sentCompany.imageUrl,imagesUrl:this.sentCompany.imagesUrl,time:"".concat(Math.floor(Date.now()/1e3)),jobList:[]};this.companyCollection.push(e);var t=JSON.stringify(this.companyCollection);localStorage.setItem("fineJob-companyCollection",t),this.getLocalCompanyStorage()},deleteCompanyFromLocal:function(e){var t=this;this.companyCollection.forEach((function(o,c){o.id===e&&t.companyCollection.splice(c,1)}));var o=JSON.stringify(this.companyCollection);localStorage.setItem("fineJob-companyCollection",o),this.getLocalCompanyStorage(),this.closeModal()},getLocalCompanyStorage:function(){var e=JSON.parse(localStorage.getItem("fineJob-companyCollection"));e&&(this.companyCollection=e),this.returnCompanyCollection()},returnCompanyCollection:function(){this.$emit("return-company-collection",this.companyCollection)},emitOpenCollectModal:function(e){this.sentCompany=e.companyInfo,this.companyJobList=e.companyJobList,this.toggleCollectCompany(this.sentCompany.id)}},created:function(){this.getLocalCompanyStorage()},mounted:function(){this.companyModal=new g.a(this.$refs.companyCollectModal),m["a"].on("open-collect-company-modal",this.emitOpenCollectModal)},unmounted:function(){this.companyModal.dispose(),m["a"].off("open-collect-company-modal",this.emitOpenCollectModal)}};y.render=b;t["a"]=y},"466d":function(e,t,o){"use strict";var c=o("d784"),n=o("825a"),a=o("50c4"),i=o("1d80"),l=o("8aa5"),s=o("14c3");c("match",(function(e,t,o){return[function(t){var o=i(this),c=void 0==t?void 0:t[e];return void 0!==c?c.call(t,o):new RegExp(t)[e](String(o))},function(e){var c=o(t,this,e);if(c.done)return c.value;var i=n(this),r=String(e);if(!i.global)return s(i,r);var d=i.unicode;i.lastIndex=0;var p,b=[],m=0;while(null!==(p=s(i,r))){var u=String(p[0]);b[m]=u,""===u&&(i.lastIndex=l(r,a(i.lastIndex),d)),m++}return 0===m?null:b}]}))},"749a":function(e,t,o){"use strict";o("74d9")},"74d9":function(e,t,o){},"8aa5":function(e,t,o){"use strict";var c=o("6547").charAt;e.exports=function(e,t,o){return t+(o?c(e,t).length:1)}},9263:function(e,t,o){"use strict";var c=o("ad6d"),n=o("9f7f"),a=o("5692"),i=o("7c73"),l=o("69f3").get,s=o("fce3"),r=o("107c"),d=RegExp.prototype.exec,p=a("native-string-replace",String.prototype.replace),b=d,m=function(){var e=/a/,t=/b*/g;return d.call(e,"a"),d.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),u=n.UNSUPPORTED_Y||n.BROKEN_CARET,g=void 0!==/()??/.exec("")[1],y=m||g||u||s||r;y&&(b=function(e){var t,o,n,a,s,r,y,f=this,j=l(f),h=j.raw;if(h)return h.lastIndex=f.lastIndex,t=b.call(h,e),f.lastIndex=h.lastIndex,t;var O=j.groups,x=u&&f.sticky,v=c.call(f),C=f.source,N=0,V=e;if(x&&(v=v.replace("y",""),-1===v.indexOf("g")&&(v+="g"),V=String(e).slice(f.lastIndex),f.lastIndex>0&&(!f.multiline||f.multiline&&"\n"!==e[f.lastIndex-1])&&(C="(?: "+C+")",V=" "+V,N++),o=new RegExp("^(?:"+C+")",v)),g&&(o=new RegExp("^"+C+"$(?!\\s)",v)),m&&(n=f.lastIndex),a=d.call(x?o:f,V),x?a?(a.input=a.input.slice(N),a[0]=a[0].slice(N),a.index=f.lastIndex,f.lastIndex+=a[0].length):f.lastIndex=0:m&&a&&(f.lastIndex=f.global?a.index+a[0].length:n),g&&a&&a.length>1&&p.call(a[0],o,(function(){for(s=1;s<arguments.length-2;s++)void 0===arguments[s]&&(a[s]=void 0)})),a&&O)for(a.groups=r=i(null),s=0;s<O.length;s++)y=O[s],r[y[0]]=a[y[1]];return a}),e.exports=b},"9f7f":function(e,t,o){var c=o("d039"),n=function(e,t){return RegExp(e,t)};t.UNSUPPORTED_Y=c((function(){var e=n("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=c((function(){var e=n("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},ac1f:function(e,t,o){"use strict";var c=o("23e7"),n=o("9263");c({target:"RegExp",proto:!0,forced:/./.exec!==n},{exec:n})},ad6d:function(e,t,o){"use strict";var c=o("825a");e.exports=function(){var e=c(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},c76f:function(e,t,o){"use strict";o.r(t);o("99af");var c=o("7a23"),n={class:"page--py"},a={class:"container-fuild"},i={key:0,class:"container companyPage"},l={class:"row"},s={class:"col-lg-9 col-12"},r={class:"companyInfoBox box--shadow mb-3  position-relative"},d=Object(c["createVNode"])("i",{class:"jobIcon bi bi-bookmark-fill me-1"},null,-1),p={class:"d-flex flex-md-row flex-column align-items-md-stretch align-items-center"},b={class:"companyInfoBox__logoImgBox mb-md-0 mb-4 me-md-4"},m={class:"companyInfoBox__txtBox d-flex flex-column justify-content-between\n              align-items-md-start align-items-center pt-3"},u={class:"page__title mb-3"},g={class:"d-flex flex-md-row flex-column justify-content-between\n                align-items-end w-100"},y={class:"align-self-md-stretch align-self-center"},f={class:"page__txt mb-3"},j=Object(c["createVNode"])("span",null,[Object(c["createVNode"])("i",{class:"jobIcon--sm me-1 bi bi-geo-alt"})],-1),h={class:"page__txt"},O=Object(c["createVNode"])("span",null,[Object(c["createVNode"])("i",{class:"jobIcon--sm me-1 bi bi-building"})],-1),x={class:"subTxt text-secondary"},v={class:"companyInfoBox box--shadow mb-3"},C=Object(c["createVNode"])("h3",{class:"section__title--sub"},[Object(c["createVNode"])("span",{class:"title__icon"}),Object(c["createTextVNode"])("公司照片")],-1),N={class:"d-flex justify-content-between flex-md-row flex-column"},V={class:"companyInfoBox  box--shadow  mb-3"},k=Object(c["createVNode"])("h3",{class:"section__title--sub"},[Object(c["createVNode"])("span",{class:"title__icon"}),Object(c["createTextVNode"])("公司簡介")],-1),I={class:"companyInfoBox  box--shadow  mb-lg-0 mb-3"},B=Object(c["createVNode"])("h3",{class:"section__title--sub"},[Object(c["createVNode"])("span",{class:"title__icon"}),Object(c["createTextVNode"])("公司職位")],-1),_={class:"companyJobList d-flex flex-wrap justify-content-between"},w=Object(c["createVNode"])("i",{class:"jobIcon bi bi-bookmark-fill"},null,-1),S={class:"mb-3"},L={class:"d-flex"},M={class:"jobList__item__imgBox me-3"},J={class:"jobList__item__txtBox\n                  flex-grow-1 d-flex flex-column justify-content-between"},R={class:"mb-3 d-flex flex-column"},P={class:"page__txt  subTxt mb-2 me-7"},U={class:"d-flex justify-content-between align-items-center"},T={key:0,class:"text-primary"},E={key:1,class:"text-primary"},D={class:"subTxt text-secondary"},$={class:"col-lg-3 col-12"},A={key:1,class:"cantFoundProduct"},F=Object(c["createVNode"])("h5",null,"找不到產品",-1),H={class:"sideBtnBox"};function K(e,t,o,K,Y,q){var z=Object(c["resolveComponent"])("router-link"),G=Object(c["resolveComponent"])("JobReadRecord"),Q=Object(c["resolveComponent"])("UpTopBtn"),W=Object(c["resolveComponent"])("ImgPopModal"),X=Object(c["resolveComponent"])("JobCollect"),Z=Object(c["resolveComponent"])("CompanyCollect");return Object(c["openBlock"])(),Object(c["createBlock"])(c["Fragment"],null,[Object(c["createVNode"])("div",n,[Object(c["createVNode"])("div",a,[Y.isExist?(Object(c["openBlock"])(),Object(c["createBlock"])("div",i,[Object(c["createVNode"])("div",l,[Object(c["createVNode"])("div",s,[Object(c["createVNode"])("div",r,[Object(c["createVNode"])("button",{class:["collectBtn--company btn btn-outline-gray-line",{active:Y.companyIsCollect}],type:"button",onClick:t[1]||(t[1]=function(e){return q.collectCompany(Y.companyItem)})},[d,Object(c["createTextVNode"])(Object(c["toDisplayString"])(this.companyIsCollect?"已關注":"關注公司"),1)],2),Object(c["createVNode"])("div",p,[Object(c["createVNode"])("div",b,[Object(c["createVNode"])("img",{class:"logoImg",src:Y.companyItem.imageUrl,alt:"".concat(Y.companyItem.title,"logo")},null,8,["src","alt"])]),Object(c["createVNode"])("div",m,[Object(c["createVNode"])("h2",u,Object(c["toDisplayString"])(Y.companyItem.title),1),Object(c["createVNode"])("div",g,[Object(c["createVNode"])("div",y,[Object(c["createVNode"])("p",f,[j,Object(c["createTextVNode"])(Object(c["toDisplayString"])(Y.companyItem.options.companyAddressCity)+"，"+Object(c["toDisplayString"])(Y.companyItem.options.companyAddressDetail),1)]),Object(c["createVNode"])("p",h,[O,Object(c["createTextVNode"])(" "+Object(c["toDisplayString"])(Y.companyItem.category),1)])]),Object(c["createVNode"])("div",null,[Object(c["createVNode"])("p",x,Object(c["toDisplayString"])(e.$filters.date(Y.companyItem.options.create)),1)])])])])]),Object(c["createVNode"])("div",v,[C,Object(c["createVNode"])("div",N,[(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(Y.companyItem.imagesUrl,(function(e,o){return Object(c["openBlock"])(),Object(c["createBlock"])("img",{class:"companyPage__companyImage mb-md-0 mb-2 putPointer",src:e,alt:"".concat(Y.companyItem.title,"公司圖片").concat(o),key:o,onClick:t[2]||(t[2]=function(e){return q.openImgModal(Y.companyItem.imagesUrl)})},null,8,["src","alt"])})),128))])]),Object(c["createVNode"])("div",V,[k,Object(c["createVNode"])("div",{class:"page__txt",innerHTML:Y.companyItem.content},null,8,["innerHTML"])]),Object(c["createVNode"])("div",I,[B,Object(c["createVNode"])("ul",_,[(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(Y.companyJobs,(function(t){return Object(c["openBlock"])(),Object(c["createBlock"])("li",{"data-id":t.id,key:t.id,class:"jobList__item d-flex flex-column align-items-start mb-4"},[Object(c["createVNode"])("button",{class:"collectBtn btn  position-absolute",type:"button",onClick:function(e){return q.collectJob(t)}},[w],8,["onClick"]),Object(c["createVNode"])("div",S,[Object(c["createVNode"])("button",{type:"button",class:"jobTag btn",onClick:function(e){return q.searchByJobCategory(t.category)}},Object(c["toDisplayString"])(t.category),9,["onClick"])]),Object(c["createVNode"])("div",L,[Object(c["createVNode"])("div",M,[Object(c["createVNode"])("img",{class:"jobImg",src:t.imageUrl,alt:"".concat(t.title,"職位圖片")},null,8,["src","alt"])]),Object(c["createVNode"])("div",J,[Object(c["createVNode"])("div",R,[Object(c["createVNode"])(z,{class:"jobList__item__title text-dark mb-3 me-7 pe-auto",to:"/products-list/product/".concat(t.id)},{default:Object(c["withCtx"])((function(){return[Object(c["createTextVNode"])(Object(c["toDisplayString"])(t.title),1)]})),_:2},1032,["to"]),Object(c["createVNode"])("p",P,Object(c["toDisplayString"])(t.options.company.companyName),1)]),Object(c["createVNode"])("div",U,[t.options.job.salaryInterView?Object(c["createCommentVNode"])("",!0):(Object(c["openBlock"])(),Object(c["createBlock"])("p",T,Object(c["toDisplayString"])(t.price)+" / 月薪 ",1)),t.options.job.salaryInterView?(Object(c["openBlock"])(),Object(c["createBlock"])("p",E," 薪資面議 ")):Object(c["createCommentVNode"])("",!0),Object(c["createVNode"])("p",D,Object(c["toDisplayString"])(e.$filters.date(t.options.job.create)),1)])])])],8,["data-id"])})),128))])])]),Object(c["createVNode"])("div",$,[Object(c["createVNode"])(G)])])])):0==Y.isExist?(Object(c["openBlock"])(),Object(c["createBlock"])("div",A,[F])):Object(c["createCommentVNode"])("",!0)])]),Object(c["createVNode"])("div",H,[Object(c["createVNode"])(Q)]),Object(c["createVNode"])(W),Object(c["createVNode"])(X,{ref:"jobCollectModal"},null,512),Object(c["createVNode"])(Z,{onReturnCompanyCollection:q.checkCompanyCollect},null,8,["onReturnCompanyCollection"])],64)}o("159b"),o("a4d3"),o("e01a");var Y=o("cfb9"),q=o("3cac"),z=o("1320"),G=o("f22c"),Q=o("171d"),W=o("346e"),X={components:{UpTopBtn:q["a"],ImgPopModal:z["a"],JobReadRecord:G["a"],JobCollect:Q["a"],CompanyCollect:W["a"]},data:function(){return{companyItem:{imagesUrl:[],imageUrl:"",options:{company:{},job:{}}},companyJobs:[],jobsList:[],isExist:null,companyIsCollect:!1,companyCollectionList:{}}},methods:{collectCompany:function(e){var t=[];this.companyJobs.forEach((function(e){t.push(e.id)}));var o={companyInfo:e,companyJobList:t};Y["a"].emit("open-collect-company-modal",o)},checkCompanyCollect:function(e){var t=this;this.companyCollectionList=e;var o=this.companyCollectionList.some((function(e){return e.id===t.companyItem.id}));this.companyIsCollect=!0===o},collectJob:function(e){Y["a"].emit("open-collect-modal",e)},openImgModal:function(e){Y["a"].emit("imgPopModal-open",e)},searchByJobCategory:function(e){var t="不限",o="不限";this.$router.push("/search/?keyword=".concat(t,"&city=").concat(o,"&jobCategory=").concat(e))},getCompanyData:function(){var e=this;Y["a"].emit("spinner-open");var t=this.$route.params.id,o="".concat("https://vue3-course-api.hexschool.io","/api/").concat("jordanttcdesign","/product/").concat(t);this.$http.get(o).then((function(t){t.data.success?(e.isExist=!0,e.companyItem=t.data.product,e.checkCompanyCollect(e.companyCollectionList)):e.isExist=!1,e.getJobs()})).catch((function(e){console.log(e)})),Y["a"].emit("spinner-close")},getJobs:function(){var e=this;Y["a"].emit("spinner-open");var t="".concat("https://vue3-course-api.hexschool.io","/api/").concat("jordanttcdesign","/products/all");this.$http.get(t).then((function(t){e.jobsList=[],e.jobsList=t.data.products,e.findCompanyJobs()})).catch((function(e){console.log(e)})),Y["a"].emit("spinner-close")},findCompanyJobs:function(){var e=this;Y["a"].emit("spinner-open"),this.jobsList.forEach((function(t){"職位"===t.description&&t.options.company.companyName===e.companyItem.title&&e.companyJobs.push(t)})),Y["a"].emit("spinner-close"),Y["a"].emit("check-job-read-local")}},created:function(){this.getCompanyData(),Y["a"].emit("spinner-open-bg",500)}};X.render=K;t["default"]=X},d28b:function(e,t,o){var c=o("746f");c("iterator")},d784:function(e,t,o){"use strict";o("ac1f");var c=o("6eeb"),n=o("9263"),a=o("d039"),i=o("b622"),l=o("9112"),s=i("species"),r=RegExp.prototype;e.exports=function(e,t,o,d){var p=i(e),b=!a((function(){var t={};return t[p]=function(){return 7},7!=""[e](t)})),m=b&&!a((function(){var t=!1,o=/a/;return"split"===e&&(o={},o.constructor={},o.constructor[s]=function(){return o},o.flags="",o[p]=/./[p]),o.exec=function(){return t=!0,null},o[p](""),!t}));if(!b||!m||o){var u=/./[p],g=t(p,""[e],(function(e,t,o,c,a){var i=t.exec;return i===n||i===r.exec?b&&!a?{done:!0,value:u.call(t,o,c)}:{done:!0,value:e.call(o,t,c)}:{done:!1}}));c(String.prototype,e,g[0]),c(r,p,g[1])}d&&l(r[p],"sham",!0)}},f22c:function(e,t,o){"use strict";var c=o("7a23"),n={class:"jobSubBox box--shadow mb-3"},a=Object(c["createVNode"])("h5",{class:"jobSubBox__title"},"瀏覽紀錄",-1),i={key:0,class:"list__item"},l={class:"list__item__time"},s={key:0,class:"list__item"},r=Object(c["createVNode"])("p",null,"尚無瀏覽紀錄",-1);function d(e,t,o,d,p,b){return Object(c["openBlock"])(),Object(c["createBlock"])("div",n,[a,Object(c["createVNode"])("ul",null,[(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(p.jobReadList,(function(t,o){return Object(c["openBlock"])(),Object(c["createBlock"])(c["Fragment"],{key:t.id},[o<6?(Object(c["openBlock"])(),Object(c["createBlock"])("li",i,[Object(c["createVNode"])("p",{class:"list__item__link mb-2 putPointer",onClick:function(e){return b.goToJobRead(t.id)}},Object(c["toDisplayString"])(t.title),9,["onClick"]),Object(c["createVNode"])("p",{class:"list__item__link--sub putPointer","aria-current":"page",onClick:function(e){return b.goToCompanyRead(t.companyId)}},Object(c["toDisplayString"])(t.company),9,["onClick"]),Object(c["createVNode"])("p",l,Object(c["toDisplayString"])(e.$filters.date(t.time)),1)])):Object(c["createCommentVNode"])("",!0)],64)})),128)),0===p.jobReadList.length?(Object(c["openBlock"])(),Object(c["createBlock"])("li",s,[r])):Object(c["createCommentVNode"])("",!0)])])}o("ac1f"),o("466d");var p=o("cfb9"),b={inject:["reload"],data:function(){return{jobReadList:[],sentJob:{},sentCompany:{}}},methods:{getLocalStorage:function(){var e=JSON.parse(localStorage.getItem("jobReadList"));e&&(this.jobReadList=e)},checkLocalJobRead:function(e){this.getLocalStorage(),this.jobReadList||(this.jobReadList=[]);var t=this.jobReadList.some((function(t){return t.id===e}));t||this.saveJobReadToLocal()},saveJobReadToLocal:function(){var e={title:this.sentJob.title,company:this.sentCompany.title,companyId:this.sentCompany.id,id:this.sentJob.id,time:this.sentJob.options.job.create};this.jobReadList.push(e);var t=JSON.stringify(this.jobReadList);localStorage.setItem("jobReadList",t)},goToJobRead:function(e){this.$route.path.match("/products-list/product/")?(this.$router.push("/products-list/product/".concat(e)),this.reload()):this.$router.push("/products-list/product/".concat(e))},goToCompanyRead:function(e){this.$route.path.match("/products-list/company/")?(this.$router.push("/products-list/company/".concat(e)),this.reload()):this.$router.push("/products-list/company/".concat(e))}},created:function(){var e=this;p["a"].on("check-job-read-local",(function(t){t?(e.sentJob=t.job,e.sentCompany=t.company,e.checkLocalJobRead(e.sentJob.id)):e.getLocalStorage()}))}};b.render=d;t["a"]=b},fce3:function(e,t,o){var c=o("d039");e.exports=c((function(){var e=RegExp(".","string".charAt(0));return!(e.dotAll&&e.exec("\n")&&"s"===e.flags)}))}}]);
//# sourceMappingURL=chunk-681bfa0e.ca8a5a9a.js.map