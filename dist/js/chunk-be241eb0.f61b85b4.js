(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-be241eb0"],{"04d1":function(e,t,o){var c=o("342f"),a=c.match(/firefox\/(\d+)/i);e.exports=!!a&&+a[1]},2220:function(e,t,o){"use strict";var c={industryCategory:["批發、零售、傳直銷業","文教相關業","大眾傳播相關業","旅遊、休閒、運動業","一般服務業","電子資訊、軟體、半導體相關業","一般製造業","農林漁牧水電資源業","運輸物流及倉儲","政治宗教及社福相關業","金融投顧及保險業","法律、會計、顧問、研發、設計業","建築營造及不動產相關業","醫療保健及環境衛生業","礦業及土石採取業","住宿、餐飲服務業"],jobCategory:["經營、人資類","行政、總務、法務類","財會、金融專業類","行銷、企劃、專案管理類","客服、門市、業務、貿易類","餐飲、旅遊、美容美髮類","資訊軟體系統類","操作、技術、維修類","資材、物流、運輸類","營建、製圖類","傳播藝術、設計類","文字、傳媒類","醫療、保健服務類","學術、教育、輔導類","研發類","生產製造、品管、環衛類","軍警消、保全類","其他類"],city:["基隆市","台北市","新北市","桃園市","新竹縣","新竹市","苗栗縣","台中市","彰化市","南投縣","雲林縣","嘉義縣","台南市","台南市","屏東縣","宜蘭縣"],education:["不限","高中職","大學","碩士","博士"],candidateEducation:["國中小","高中職","大學","碩士","博士"],workExp:["不限","一年以下","1~3年","3~5年","5年以上"],candidateWorkExp:["無工作經驗","一年以下","1~3年","3~5年","5年以上"],workTime:["日班","夜班","假日班"],workType:["全職","兼職","實習"]};t["a"]=c},"4de4":function(e,t,o){"use strict";var c=o("23e7"),a=o("b727").filter,r=o("1dde"),n=r("filter");c({target:"Array",proto:!0,forced:!n},{filter:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}})},"4e82":function(e,t,o){"use strict";var c=o("23e7"),a=o("1c0b"),r=o("7b0b"),n=o("50c4"),i=o("d039"),s=o("addb"),l=o("a640"),b=o("04d1"),d=o("d998"),u=o("2d00"),p=o("512c"),j=[],m=j.sort,O=i((function(){j.sort(void 0)})),f=i((function(){j.sort(null)})),y=l("sort"),g=!i((function(){if(u)return u<70;if(!(b&&b>3)){if(d)return!0;if(p)return p<603;var e,t,o,c,a="";for(e=65;e<76;e++){switch(t=String.fromCharCode(e),e){case 66:case 69:case 70:case 72:o=3;break;case 68:case 71:o=4;break;default:o=2}for(c=0;c<47;c++)j.push({k:t+c,v:o})}for(j.sort((function(e,t){return t.v-e.v})),c=0;c<j.length;c++)t=j[c].k.charAt(0),a.charAt(a.length-1)!==t&&(a+=t);return"DGBEFHACIJK"!==a}})),h=O||!f||!y||!g,N=function(e){return function(t,o){return void 0===o?-1:void 0===t?1:void 0!==e?+e(t,o)||0:String(t)>String(o)?1:-1}};c({target:"Array",proto:!0,forced:h},{sort:function(e){void 0!==e&&a(e);var t=r(this);if(g)return void 0===e?m.call(t):m.call(t,e);var o,c,i=[],l=n(t.length);for(c=0;c<l;c++)c in t&&i.push(t[c]);i=s(i,N(e)),o=i.length,c=0;while(c<o)t[c]=i[c++];while(c<l)delete t[c++];return t}})},"512c":function(e,t,o){var c=o("342f"),a=c.match(/AppleWebKit\/(\d+)\./);e.exports=!!a&&+a[1]},5530:function(e,t,o){"use strict";o.d(t,"a",(function(){return r}));o("b64b"),o("a4d3"),o("4de4"),o("e439"),o("159b"),o("dbb4");function c(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function a(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);t&&(c=c.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,c)}return o}function r(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?a(Object(o),!0).forEach((function(t){c(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}},"5f67":function(e,t,o){},"7ee4":function(e,t,o){e.exports=o.p+"img/fineJobLogo-square.8fbb01f3.svg"},addb:function(e,t){var o=Math.floor,c=function(e,t){var n=e.length,i=o(n/2);return n<8?a(e,t):r(c(e.slice(0,i),t),c(e.slice(i),t),t)},a=function(e,t){var o,c,a=e.length,r=1;while(r<a){c=r,o=e[r];while(c&&t(e[c-1],o)>0)e[c]=e[--c];c!==r++&&(e[c]=o)}return e},r=function(e,t,o){var c=e.length,a=t.length,r=0,n=0,i=[];while(r<c||n<a)r<c&&n<a?i.push(o(e[r],t[n])<=0?e[r++]:t[n++]):i.push(r<c?e[r++]:t[n++]);return i};e.exports=c},b64b:function(e,t,o){var c=o("23e7"),a=o("7b0b"),r=o("df75"),n=o("d039"),i=n((function(){r(1)}));c({target:"Object",stat:!0,forced:i},{keys:function(e){return r(a(e))}})},bb51:function(e,t,o){"use strict";o.r(t);var c=o("7a23"),a=o("7ee4"),r=o.n(a),n={class:"page--py home"},i={class:"container-fuild"},s={class:"mainBanner bg-primary"},l={class:"container position-relative"},b={class:"mainBanner__innerBox"},d=Object(c["createVNode"])("img",{class:"mainBanner__img--bg",src:"https://i.imgur.com/PRGknSk.png",alt:""},null,-1),u=Object(c["createVNode"])("div",{class:"mainBanner__txtBox"},[Object(c["createVNode"])("h2",{class:"mainBanner__title mb-md-4 mb-2"},"立即搜尋職位"),Object(c["createVNode"])("h2",{class:"mainBanner__title mb-md-9 mb-6"},"Got Youself A Fine Job !")],-1),p={class:"bg-white rounded box-shadow p-md-6 p-4"},j={class:"mainBanner__searchBar d-flex flex-md-row flex-column\n        align-items-md-center align-items-stretch"},m=Object(c["createVNode"])("img",{class:"mainBanner__logo me-3",src:r.a,alt:""},null,-1),O={class:"d-flex justify-content-between align-items-md-end  align-items-stretch\n            flex-grow-1 flex-md-row flex-column"},f={class:"inputGroup--item flex-grow-1 me-md-4"},y=Object(c["createVNode"])("label",{for:"searchFilterTop-keyword",class:"form-label inputItem__title"},"關鍵字",-1),g={class:"inputGroup--item flex-grow-1 me-md-4 mb-md-0 mb-3"},h=Object(c["createVNode"])("label",{for:"searchFilterTop-city",class:"form-label inputItem__title"},"地區",-1),N=Object(c["createVNode"])("option",{disabled:""},"請選擇地區",-1),k=Object(c["createVNode"])("option",{selected:"",value:"不限"},"不限",-1),V={class:"container"},w={ref:"sectionHotJob",class:"sectionHotJob section--py border-bottom border-primary-light"},v=Object(c["createVNode"])("div",{class:"section__titleBox"},[Object(c["createVNode"])("h3",{class:"titleBox__title"},"熱門職位"),Object(c["createVNode"])("p",{class:"titleBox__tag"},"推薦")],-1),B={class:"row flex-wrap"},x={class:"col-lg-6 col-12 mb-lg-0 mb-4"},_={class:"card__btnBox"},C=Object(c["createVNode"])("i",{class:"jobIcon bi bi-bookmark-fill"},null,-1),J={class:"txtBox"},D={key:0,class:"jobTag"},S={key:1,class:"jobTag"},L={class:"col-lg-6 col-12"},T={class:"row"},H={class:"card__btnBox"},I=Object(c["createVNode"])("i",{class:"jobIcon bi bi-bookmark-fill"},null,-1),P={class:"txtBox"},F={key:0,class:"jobTag"},E={key:1,class:"jobTag"},W={class:"section--newJob section--py"},M=Object(c["createVNode"])("div",{class:"section__titleBox"},[Object(c["createVNode"])("h3",{class:"titleBox__title"},"最新職位"),Object(c["createVNode"])("p",{class:"titleBox__tag"},"推薦")],-1),A=Object(c["createVNode"])("div",{class:"swiper-button-prev swiper-custom"},[Object(c["createVNode"])("button",{type:"button",class:"btn btn-lg rounded-circle iconBtnBox"},[Object(c["createVNode"])("i",{class:"bi bi-arrow-left actionIcon"})])],-1),U=Object(c["createVNode"])("div",{class:"swiper-button-next swiper-custom"},[Object(c["createVNode"])("button",{type:"button",class:"btn btn-lg rounded-circle iconBtnBox"},[Object(c["createVNode"])("i",{class:"bi bi-arrow-right actionIcon"})])],-1),G={class:"bg-white"},$={class:"container"},z={key:0,class:"weeklyCompany section--py"},K={class:"row d-flex flex-lg-row flex-column"},q=Object(c["createVNode"])("div",{class:"col-12"},[Object(c["createVNode"])("div",{class:"section__titleBox"},[Object(c["createVNode"])("h3",{class:"titleBox__title"},"本週推薦企業"),Object(c["createVNode"])("p",{class:"titleBox__tag"},"推薦")])],-1),R={class:"col-lg-3 col-12 mb-lg-0 mb-md-6 mb-4"},Y={class:"weeklyCompany__infoBox"},Z={class:"logoImgBox mb-4"},Q={class:"txtBox d-flex flex-column justify-content-between"},X={class:"mb-lg-4 mb-2"},ee=Object(c["createVNode"])("span",null,[Object(c["createVNode"])("i",{class:"jobIcon--sm me-1 bi bi-geo-alt"})],-1),te={class:"mb-lg-6 mb-2"},oe=Object(c["createVNode"])("span",null,[Object(c["createVNode"])("i",{class:"jobIcon--sm me-1 bi bi-building"})],-1),ce=Object(c["createTextVNode"])("查看完整企業資料"),ae={class:"col-lg-9 col-12"},re=Object(c["createVNode"])("h5",{class:"page__title mb-3"},"公司簡介",-1),ne={class:"weeklyCompany__companyContentBox"},ie={class:"imgBox"},se=Object(c["createVNode"])("h5",{class:"page__title mb-3"},"現有職位",-1),le={class:"weeklyCompany__jobList"},be={class:"list__item__title mb-3"},de={class:"d-flex justify-content-between"},ue={key:0,class:"subTxt"},pe={key:1,class:"subTxt"},je={class:"subTxt"},me={class:"hotCategory section--py"},Oe=Object(c["createVNode"])("div",{class:"section__titleBox"},[Object(c["createVNode"])("h3",{class:"titleBox__title"},"熱門職位類別")],-1),fe={class:"row hotCategoryList"},ye={class:"hotCategoryBox p-md-5 p-3 d-flex"},ge={class:"d-flex flex-column justify-content-between"},he={class:"mb-3"},Ne={class:"subTxt mb-md-6 mb-3"},ke=Object(c["createTextVNode"])(" 查看更多職位 "),Ve=Object(c["createVNode"])("i",{class:"jobIcon ms-2 bi bi-arrow-right-circle"},null,-1),we={class:"container"},ve={class:"section--py"},Be={class:"addCompanyBanner rounded p-5"},xe={class:"d-flex flex-column  mb-md-0 mb-6"},_e=Object(c["createVNode"])("div",null,[Object(c["createVNode"])("h3",{class:"text-white mb-2"},"Find Job 免費刊登職位中"),Object(c["createVNode"])("h3",{class:"text-white mb-5"},"立即註冊加入，讓我們幫您找人才！")],-1),Ce=Object(c["createVNode"])("button",{type:"button",class:"btn btn-light me-2"},"聯絡我們",-1),Je=Object(c["createTextVNode"])("即刻前往註冊服務"),De=Object(c["createVNode"])("img",{class:"img-cover-top",src:"https://i.imgur.com/GLgg4Fw.png",alt:""},null,-1),Se=Object(c["createVNode"])("img",{class:"img-cover-bottom",src:"https://i.imgur.com/hIzL1Kk.png",alt:""},null,-1),Le=Object(c["createVNode"])("img",{class:"addCompanyBanner__mainImg",src:"https://i.imgur.com/iZmelSd.png",alt:""},null,-1),Te={class:"cooperationCompany"},He=Object(c["createVNode"])("div",{class:"section__titleBox justify-content-center"},[Object(c["createVNode"])("h3",{class:"titleBox__title text-dark"},"優質合作企業")],-1),Ie={class:"row"},Pe={class:"bg-white py-md-4 px-md-6 py-2 px-4 rounded mb-md-5 mb-3"},Fe={class:"sideBtnBox"};function Ee(e,t,o,a,r,Ee){var We=Object(c["resolveComponent"])("router-link"),Me=Object(c["resolveComponent"])("GoodJobCard"),Ae=Object(c["resolveComponent"])("swiper-slide"),Ue=Object(c["resolveComponent"])("swiper"),Ge=Object(c["resolveComponent"])("UpTopBtn"),$e=Object(c["resolveComponent"])("JobCollect");return Object(c["openBlock"])(),Object(c["createBlock"])(c["Fragment"],null,[Object(c["createVNode"])("div",n,[Object(c["createVNode"])("div",i,[Object(c["createVNode"])("div",s,[Object(c["createVNode"])("div",l,[Object(c["createVNode"])("div",b,[d,u,Object(c["createVNode"])("div",p,[Object(c["createVNode"])("form",j,[m,Object(c["createVNode"])("div",O,[Object(c["createVNode"])("div",f,[y,Object(c["withDirectives"])(Object(c["createVNode"])("input",{type:"text",class:"form-control",id:"searchFilterTop-keyword",placeholder:"職位關鍵字","aria-describedby":"關鍵字","onUpdate:modelValue":t[1]||(t[1]=function(e){return r.filterData.keyword=e})},null,512),[[c["vModelText"],r.filterData.keyword]])]),Object(c["createVNode"])("div",g,[h,Object(c["withDirectives"])(Object(c["createVNode"])("select",{class:"form-select","aria-label":"地區",id:"searchFilterTop-city","onUpdate:modelValue":t[2]||(t[2]=function(e){return r.filterData.city=e})},[N,k,(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(r.formData.city,(function(e,t){return Object(c["openBlock"])(),Object(c["createBlock"])("option",{value:e,key:"地區".concat(t)},Object(c["toDisplayString"])(e),9,["value"])})),128))],512),[[c["vModelSelect"],r.filterData.city]])]),Object(c["createVNode"])("button",{class:"btn btn-primary",type:"button",onClick:t[3]||(t[3]=function(){return Ee.toSearchJob&&Ee.toSearchJob.apply(Ee,arguments)})}," 搜尋職位 ")])])])])])]),Object(c["createVNode"])("div",V,[Object(c["createVNode"])("div",w,[v,Object(c["createVNode"])("div",B,[Object(c["createVNode"])("div",x,[this.sortHotJobs[0]?(Object(c["openBlock"])(),Object(c["createBlock"])("div",{key:0,class:"card--hotJob card--lg",style:{"background-image":"url(".concat(Ee.sortHotJobs[0]["imageUrl"]," )")}},[Object(c["createVNode"])("div",_,[Object(c["createVNode"])("button",{class:"btn--circle btn btn-outline-light",type:"button",onClick:t[4]||(t[4]=function(e){return Ee.collectJob(Ee.sortHotJobs[0])})},[C])]),Object(c["createVNode"])("div",J,[Object(c["createVNode"])(We,{class:"card__title mb-3  d-block putPointer",to:"/products-list/product/".concat(Ee.sortHotJobs[0].id)},{default:Object(c["withCtx"])((function(){return[Object(c["createTextVNode"])(Object(c["toDisplayString"])(Ee.sortHotJobs[0].title),1)]})),_:1},8,["to"]),Object(c["createVNode"])(We,{class:"card__txt mb-3 d-block putPointer",to:"/products-list/company/".concat(Ee.sortHotJobs[0].options.company.companyLink)},{default:Object(c["withCtx"])((function(){return[Object(c["createTextVNode"])(Object(c["toDisplayString"])(Ee.sortHotJobs[0].options.company.companyName),1)]})),_:1},8,["to"]),Ee.sortHotJobs[0].options.job.salaryInterView?Object(c["createCommentVNode"])("",!0):(Object(c["openBlock"])(),Object(c["createBlock"])("p",D,Object(c["toDisplayString"])(Ee.sortHotJobs[0].price)+" / 月薪 ",1)),Ee.sortHotJobs[0].options.job.salaryInterView?(Object(c["openBlock"])(),Object(c["createBlock"])("p",S," 薪資面議 ")):Object(c["createCommentVNode"])("",!0)])],4)):Object(c["createCommentVNode"])("",!0)]),Object(c["createVNode"])("div",L,[Object(c["createVNode"])("div",T,[(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(Ee.sortHotJobs,(function(e,t){return Object(c["openBlock"])(),Object(c["createBlock"])(c["Fragment"],{key:e.id},[t>=1&&t<=4?(Object(c["openBlock"])(),Object(c["createBlock"])("div",{key:0,class:["col-md-6 col-12 mb-4",{"mb-lg-0":t>2}]},[Ee.sortHotJobs[t]?(Object(c["openBlock"])(),Object(c["createBlock"])("div",{key:0,class:"card--hotJob card--sm",style:{"background-image":"url(".concat(Ee.sortHotJobs[t]["imageUrl"]," )")}},[Object(c["createVNode"])("div",H,[Object(c["createVNode"])("button",{class:"btn--circle btn btn-outline-light",type:"button",onClick:function(t){return Ee.collectJob(e)}},[I],8,["onClick"])]),Object(c["createVNode"])("div",P,[Object(c["createVNode"])(We,{class:"card__title d-block putPointer",to:"/products-list/product/".concat(Ee.sortHotJobs[t].id)},{default:Object(c["withCtx"])((function(){return[Object(c["createTextVNode"])(Object(c["toDisplayString"])(Ee.sortHotJobs[t].title),1)]})),_:2},1032,["to"]),Object(c["createVNode"])(We,{class:"card__txt d-block putPointer",to:"/products-list/company\n                            /".concat(Ee.sortHotJobs[t].options.company.companyLink)},{default:Object(c["withCtx"])((function(){return[Object(c["createTextVNode"])(Object(c["toDisplayString"])(Ee.sortHotJobs[t].options.company.companyName),1)]})),_:2},1032,["to"]),Ee.sortHotJobs[t].options.job.salaryInterView?Object(c["createCommentVNode"])("",!0):(Object(c["openBlock"])(),Object(c["createBlock"])("p",F,Object(c["toDisplayString"])(Ee.sortHotJobs[t].price)+" / 月薪 ",1)),Ee.sortHotJobs[t].options.job.salaryInterView?(Object(c["openBlock"])(),Object(c["createBlock"])("p",E," 薪資面議 ")):Object(c["createCommentVNode"])("",!0)])],4)):Object(c["createCommentVNode"])("",!0)],2)):Object(c["createCommentVNode"])("",!0)],64)})),128))])])])],512),Object(c["createVNode"])("div",W,[M,r.dataOk?(Object(c["openBlock"])(),Object(c["createBlock"])(Ue,{key:0,"slides-per-view":r.swiperNum,"space-between":20,autoplay:r.swiperDetail.autoPlay,pagination:r.swiperDetail.pagination,navigation:r.swiperDetail.navigation},{default:Object(c["withCtx"])((function(){return[(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(Ee.sortNewJobs,(function(e){return Object(c["openBlock"])(),Object(c["createBlock"])(Ae,{key:e.id},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(Me,{"good-job":e},null,8,["good-job"])]})),_:2},1024)})),128)),A,U]})),_:1},8,["slides-per-view","autoplay","pagination","navigation"])):Object(c["createCommentVNode"])("",!0)])]),Object(c["createVNode"])("div",G,[Object(c["createVNode"])("div",$,[r.dataOk?(Object(c["openBlock"])(),Object(c["createBlock"])("div",z,[Object(c["createVNode"])("div",K,[q,Object(c["createVNode"])("div",R,[Object(c["createVNode"])("div",Y,[Object(c["createVNode"])("div",Z,[Object(c["createVNode"])("img",{class:"logoImg",src:Ee.weeklyCompany.imageUrl,alt:""},null,8,["src"])]),Object(c["createVNode"])("div",Q,[Object(c["createVNode"])(We,{class:"page__title mb-4 putPointer",to:"/products-list/company/".concat(Ee.weeklyCompany.id)},{default:Object(c["withCtx"])((function(){return[Object(c["createTextVNode"])(Object(c["toDisplayString"])(Ee.weeklyCompany.title),1)]})),_:1},8,["to"]),Object(c["createVNode"])("p",X,[ee,Object(c["createTextVNode"])(Object(c["toDisplayString"])(Ee.weeklyCompany.options.companyAddressCity)+"，"+Object(c["toDisplayString"])(Ee.weeklyCompany.options.companyAddressDetail),1)]),Object(c["createVNode"])("p",te,[oe,Object(c["createTextVNode"])(" "+Object(c["toDisplayString"])(Ee.weeklyCompany.category),1)]),Object(c["createVNode"])(We,{class:"btn--goToCompany btn btn-outline-gray-line text-dark\n                    align-self-md-end align-self-center",to:"/products-list/company/".concat(Ee.weeklyCompany.id)},{default:Object(c["withCtx"])((function(){return[ce]})),_:1},8,["to"])])])]),Object(c["createVNode"])("div",ae,[re,Object(c["createVNode"])("div",ne,[Object(c["createVNode"])("div",{class:"companyContent mb-3",innerHTML:Ee.weeklyCompany.content},null,8,["innerHTML"]),Object(c["createVNode"])("div",ie,[r.dataOk?(Object(c["openBlock"])(),Object(c["createBlock"])(Ue,{key:0,"slides-per-view":1,"space-between":20,autoplay:r.companySwiperDetail.autoPlay,pagination:r.companySwiperDetail.pagination,loop:!0},{default:Object(c["withCtx"])((function(){return[(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(Ee.weeklyCompany.imagesUrl,(function(e){return Object(c["openBlock"])(),Object(c["createBlock"])(Ae,{key:e},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])("img",{class:"imgBox__img",src:e,alt:""},null,8,["src"])]})),_:2},1024)})),128))]})),_:1},8,["autoplay","pagination"])):Object(c["createCommentVNode"])("",!0)])]),se,Object(c["createVNode"])("div",le,[(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(Ee.weeklyCompany.jobsList,(function(t,o){return Object(c["openBlock"])(),Object(c["createBlock"])(c["Fragment"],{key:t.id},[o<4?(Object(c["openBlock"])(),Object(c["createBlock"])(We,{key:0,class:"list__item",to:"/products-list/product/".concat(t.id)},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])("p",be,Object(c["toDisplayString"])(t.title),1),Object(c["createVNode"])("div",de,[t.options.job.salaryInterView?Object(c["createCommentVNode"])("",!0):(Object(c["openBlock"])(),Object(c["createBlock"])("p",ue,Object(c["toDisplayString"])(t.price)+" / 月薪 ",1)),t.options.job.salaryInterView?(Object(c["openBlock"])(),Object(c["createBlock"])("p",pe,"薪資面議")):Object(c["createCommentVNode"])("",!0),Object(c["createVNode"])("p",je,Object(c["toDisplayString"])(e.$filters.date(t.options.job.create)),1)])]})),_:2},1032,["to"])):Object(c["createCommentVNode"])("",!0)],64)})),128))])])])])):Object(c["createCommentVNode"])("",!0),Object(c["createVNode"])("div",me,[Oe,Object(c["createVNode"])("ul",fe,[(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(Ee.sortJobCategory,(function(e,t){return Object(c["openBlock"])(),Object(c["createBlock"])(c["Fragment"],{key:e.categoryName},[t<7?(Object(c["openBlock"])(),Object(c["createBlock"])("li",{key:0,class:["list__item",{"col-lg-6 col-12":0===t,"col-lg-3 col-6":t>0,"mb-4":t<3,"mb-lg-0 mb-4":t>=3}]},[Object(c["createVNode"])("div",ye,[Object(c["createVNode"])("div",ge,[Object(c["createVNode"])("p",he,Object(c["toDisplayString"])(e.categoryName),1),Object(c["createVNode"])("p",Ne,"目前共： "+Object(c["toDisplayString"])(e.jobNum)+" 職位",1),Object(c["createVNode"])("p",{class:"seeMoreBtn",onClick:function(t){return Ee.searchByJobCategory(e.categoryName)}},[ke,Ve],8,["onClick"])]),Object(c["createVNode"])("img",{class:{"d-none":t>0},src:"https://i.imgur.com/fJ55SNe.png",alt:""},null,2)])],2)):Object(c["createCommentVNode"])("",!0)],64)})),128))])])])]),Object(c["createVNode"])("div",we,[Object(c["createVNode"])("div",ve,[Object(c["createVNode"])("div",Be,[Object(c["createVNode"])("div",xe,[_e,Object(c["createVNode"])("div",null,[Ce,Object(c["createVNode"])(We,{class:"btn btn-primary",to:"/add-company"},{default:Object(c["withCtx"])((function(){return[Je]})),_:1})])]),De,Se,Le])]),Object(c["createVNode"])("div",Te,[He,Object(c["createVNode"])("ul",Ie,[(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(Ee.sortCompany,(function(e,t){return Object(c["openBlock"])(),Object(c["createBlock"])(c["Fragment"],{key:e.id},[t>0&&t<13?(Object(c["openBlock"])(),Object(c["createBlock"])("li",{key:0,class:["col-lg-2 col-md-4 col-6",{"d-lg-block d-none":t>0&&t>10,"d-lg-block d-md-none":10===t}]},[Object(c["createVNode"])("div",Pe,[Object(c["createVNode"])(We,{to:"/products-list/company/".concat(e.id)},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])("img",{class:"w-100",src:e.imageUrl,alt:""},null,8,["src"])]})),_:2},1032,["to"])])],2)):Object(c["createCommentVNode"])("",!0)],64)})),128))])])])])]),Object(c["createVNode"])("div",Fe,[Object(c["createVNode"])(Ge)]),Object(c["createVNode"])($e,{ref:"JobCollectModal"},null,512)],64)}var We=o("5530"),Me=(o("4de4"),o("159b"),o("a4d3"),o("e01a"),o("d3b7"),o("6062"),o("3ca3"),o("ddb0"),o("4e82"),o("99af"),o("cfb9")),Ae=o("2220"),Ue=o("f234"),Ge=o("3cac"),$e=o("171d"),ze=o("90ea"),Ke=o("a16a"),qe=(o("5f67"),o("6d3b")),Re=o("d17a"),Ye=o("5dc8"),Ze=o("8343");qe["a"].use([Re["a"],Ye["a"],Ze["a"]]);var Qe={components:{GoodJobCard:Ue["a"],Swiper:ze["a"],SwiperSlide:Ke["a"],UpTopBtn:Ge["a"],JobCollect:$e["a"]},data:function(){return{fullWidth:0,fullHeight:0,scrollTop:0,products:[],jobsList:[],sortWay:"time",dataOk:!1,formData:{},filterData:{keyword:"",city:"不限",industryCategory:"不限",jobCategory:"不限",workExp:"不限",education:"不限",workType:"不限",workTime:"不限",salaryLow:null,salaryHight:null,salaryInterView:!1},swiperNum:1,swiperDetail:{autoPlay:{delay:2500,disableOnInteraction:!1},pagination:{clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},slidesPerView:this.swiperNum},companySwiperDetail:{autoPlay:{delay:2e3,disableOnInteraction:!1},pagination:{clickable:!0}}}},watch:{fullWidth:function(e){this.swiperNum=e>991.75?3:e>767?2:1}},computed:{weeklyCompany:function(){var e=this.sortCompany.filter((function(e){return"台北健身宮"===e.title})),t=Object(We["a"])(Object(We["a"])({},e[0]),{},{jobsList:[]});return t.jobsList=this.jobsList.filter((function(e){return"台北健身宮"===e.options.company.companyName})),t},sortCompany:function(){var e=[];return this.products.length>1&&this.products.forEach((function(t){"企業"===t.description&&e.push(t)})),e},sortHotJobs:function(){var e=[];if(this.jobsList.length>0){for(var t=this.jobsList.filter((function(e){return 1===e.options.job.promote})),o=new Set([]),c=0;o.size<6;c+=1){var a=Math.floor(Math.random()*t.length);o.add(a)}o.forEach((function(o){e.push(t[o])}))}return e},sortNewJobs:function(){var e=[];if(this.jobsList.length>0)for(var t=0;t<6;t+=1)e.push(this.jobsList[t]);return e},sortJobCategory:function(){var e=[];return this.formData.jobCategory.forEach((function(t){var o={categoryName:t,jobNum:0};e.push(o)})),e.length>0&&this.jobsList.forEach((function(t){e.forEach((function(o,c){t.category===o.categoryName&&(e[c].jobNum+=1)}))})),e.sort((function(e,t){return t.jobNum-e.jobNum})),e}},methods:{collectJob:function(e){Me["a"].emit("open-collect-modal",e)},toSearchJob:function(){var e=this.filterData.keyword||"不限",t=this.filterData.city,o=this.filterData.jobCategory;this.$router.push("/search/?keyword=".concat(e,"&city=").concat(t,"&jobCategory=").concat(o))},searchByJobCategory:function(e){var t="不限",o="不限";this.$router.push("/search/?keyword=".concat(t,"&city=").concat(o,"&jobCategory=").concat(e))},changeJobSort:function(){"time"===this.sortWay?this.jobsList.sort((function(e,t){return t.options.job.create-e.options.job.create})):"money"===this.sortWay&&this.jobsList.sort((function(e,t){return t.price-e.price}))},classifyJob:function(){var e=this;this.products.forEach((function(t){if("職位"===t.description){var o=t;e.sortCompany.forEach((function(e){o.options.company.companyName===e.title&&(o.options.company.companyLink=e.id)})),e.jobsList.push(o)}})),this.changeJobSort(),this.dataOk=!0},getOgData:function(){var e=this;this.cleanList(),Me["a"].emit("spinner-open");var t="".concat("https://vue3-course-api.hexschool.io","/api/").concat("jordanttcdesign","/products/all");this.$http.get(t).then((function(t){e.products=t.data.products,Me["a"].emit("spinner-close"),e.classifyJob()})).catch((function(e){console.log(e)}))},cleanList:function(){this.jobsList=[]}},created:function(){this.formData=Ae["a"],this.getOgData(),Me["a"].emit("spinner-open-bg",1500)},mounted:function(){var e=this;e.fullWidth=window.innerWidth,e.fullHeight=window.innerHeight,window.onresize=function(){e.fullWidth=window.innerWidth,e.fullHeight=window.innerHeight}}};Qe.render=Ee;t["default"]=Qe},d998:function(e,t,o){var c=o("342f");e.exports=/MSIE|Trident/.test(c)},dbb4:function(e,t,o){var c=o("23e7"),a=o("83ab"),r=o("56ef"),n=o("fc6a"),i=o("06cf"),s=o("8418");c({target:"Object",stat:!0,sham:!a},{getOwnPropertyDescriptors:function(e){var t,o,c=n(e),a=i.f,l=r(c),b={},d=0;while(l.length>d)o=a(c,t=l[d++]),void 0!==o&&s(b,t,o);return b}})},e439:function(e,t,o){var c=o("23e7"),a=o("d039"),r=o("fc6a"),n=o("06cf").f,i=o("83ab"),s=a((function(){n(1)})),l=!i||s;c({target:"Object",stat:!0,forced:l,sham:!i},{getOwnPropertyDescriptor:function(e,t){return n(r(e),t)}})}}]);
//# sourceMappingURL=chunk-be241eb0.f61b85b4.js.map