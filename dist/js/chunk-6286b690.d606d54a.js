(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6286b690"],{2532:function(e,t,o){"use strict";var c=o("23e7"),a=o("5a34"),i=o("1d80"),r=o("ab13");c({target:"String",proto:!0,forced:!r("includes")},{includes:function(e){return!!~String(i(this)).indexOf(a(e),arguments.length>1?arguments[1]:void 0)}})},4239:function(e,t,o){"use strict";var c=o("7a23"),a={class:"container"},i={class:"d-flex justify-content-center pt-5"},r={"aria-label":"Page navigation"},s={class:"pagination"},n=Object(c["createVNode"])("span",{"aria-hidden":"true"},"«",-1),l=Object(c["createVNode"])("span",{"aria-hidden":"true"},"»",-1);function b(e,t,o,b,d,u){return Object(c["openBlock"])(),Object(c["createBlock"])("div",a,[Object(c["createVNode"])("div",i,[Object(c["createVNode"])("nav",r,[Object(c["createVNode"])("ul",s,[Object(c["createVNode"])("li",{class:["page-item",{disabled:!d.paginationData.has_pre}]},[Object(c["createVNode"])("button",{type:"button",class:"page-link","aria-label":"Previous",onClick:t[1]||(t[1]=function(e){return u.changePage("pre")})},[n])],2),(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(d.paginationData.total_pages,(function(e){return Object(c["openBlock"])(),Object(c["createBlock"])("li",{key:e,class:"page-item"},[Object(c["createVNode"])("button",{class:"page-link","data-num":e,onClick:function(t){return u.jumpPage(e)}},Object(c["toDisplayString"])(e),9,["data-num","onClick"])])})),128)),Object(c["createVNode"])("li",{class:["page-item",{disabled:!d.paginationData.has_next}]},[Object(c["createVNode"])("button",{type:"button",class:"page-link","aria-label":"Next",onClick:t[2]||(t[2]=function(e){return u.changePage("next")})},[l])],2)])])])])}var d={props:["jobsList"],name:"pagination",data:function(){return{paginationData:{total_pages:[],current_page:1,has_pre:!1,has_next:!1}}},methods:{jumpPage:function(e){this.paginationData.current_page=e,this.checkPagination()},changePage:function(e){console.log(e),"next"===e&&this.paginationData.has_next?this.paginationData.current_page+=1:"pre"===e&&this.paginationData.has_pre&&(this.paginationData.current_page-=1),this.checkPagination()},checkPagination:function(){this.paginationData.total_pages=[];for(var e=Math.ceil(this.temList.length/10),t=1;t<=e;t+=1)this.paginationData.total_pages.push(t);e>this.paginationData.current_page&&this.paginationData.current_page>1?(this.paginationData.has_next=!0,this.paginationData.has_pre=!0):1===this.paginationData.current_page?(this.paginationData.has_next=!0,this.paginationData.has_pre=!1):this.paginationData.current_page===e&&(this.paginationData.has_next=!1,this.paginationData.has_pre=!0),this.$emit("change-page",this.paginationData.current_page)}},watch:{jobsList:{deep:!0,handler:function(e){this.paginationData.current_page=1,this.temList=e,this.checkPagination()}}},created:function(){this.temList=this.jobsList},mounted:function(){}};d.render=b;t["a"]=d},"44e7":function(e,t,o){var c=o("861d"),a=o("c6b6"),i=o("b622"),r=i("match");e.exports=function(e){var t;return c(e)&&(void 0!==(t=e[r])?!!t:"RegExp"==a(e))}},"5a34":function(e,t,o){var c=o("44e7");e.exports=function(e){if(c(e))throw TypeError("The method doesn't accept regular expressions");return e}},6225:function(e,t,o){"use strict";o.r(t);var c=o("7a23"),a={ref:"recommedJobs",class:"section"},i={class:"container"},r=Object(c["createVNode"])("h3",{class:"section__title ps-3"},"推薦職位",-1),s=Object(c["createVNode"])("div",{class:"swiper-button-prev swiper-custom"},[Object(c["createVNode"])("button",{type:"button",class:"btn btn-lg rounded-circle iconBtnBox"},[Object(c["createVNode"])("i",{class:"bi bi-arrow-left actionIcon"})])],-1),n=Object(c["createVNode"])("div",{class:"swiper-button-next swiper-custom"},[Object(c["createVNode"])("button",{type:"button",class:"btn btn-lg rounded-circle iconBtnBox"},[Object(c["createVNode"])("i",{class:"bi bi-arrow-right actionIcon"})])],-1),l={ref:"jobsListContainer",class:"jobsListContainer container"},b=Object(c["createVNode"])("h3",{class:"section__title ps-3"},"全部職位",-1),d={key:0,class:"ps-3 mb-4 text-primary"},u=Object(c["createVNode"])("span",{class:"text-gray-dark"},"搜尋條件：",-1),p={key:1,class:"row"},j={class:"col-lg-6 col-12"},m={class:"jobListBox"},f={class:"d-flex justify-content-between align-items-center ps-3 mb-3"},h={class:"text-secondary fw-normal  text-nowrap"},O=Object(c["createVNode"])("option",{selected:"",value:"time"},"最新至最舊",-1),y=Object(c["createVNode"])("option",{value:"money"},"薪水高至低",-1),g={ref:"jobList",class:"allJobList"},V=Object(c["createVNode"])("button",{class:"collectBtn btn btn-outline-gray-line position-absolute",type:"button"},[Object(c["createVNode"])("i",{class:"jobIcon bi bi-bookmark-fill"})],-1),N={class:"list__item__tagBox mb-3"},k={class:"d-flex w-100 flex-md-row flex-column"},v={class:"list__item__imgBox"},x=Object(c["createVNode"])("div",{class:"img-cover d-md-none"},null,-1),w={class:"list__item__logoImgBox"},D={class:"list__item__txtBox\n                  flex-grow-1 d-flex flex-column\n                  justify-content-between"},_={class:"mb-3 d-flex flex-column align-items-start"},B={class:"d-flex justify-content-between align-items-center"},L={key:0,class:"text-primary"},C={key:1,class:"text-primary"},F={class:"subTxt text-secondary"},T={class:"col-lg-6 col-12 d-lg-block d-none"},I={key:0,ref:"jobSelectBox",class:"sideJobBox sideJobBox--sticky box--shadow "},S={class:"d-flex justify-content-between align-items-center mb-3"},J={class:"mb-3"},E={class:"d-flex"},M=Object(c["createTextVNode"])("開新頁面"),P=Object(c["createVNode"])("button",{class:"collectBtn btn btn-outline-gray-line",type:"button"},[Object(c["createVNode"])("i",{class:"jobIcon bi bi-bookmark-fill"})],-1),H={class:"pb-5 border-bottom border-gray-line"},W={class:"d-flex mb-3"},U={class:"sideJobBox__imgBox"},$={class:"logoImageBox"},G={class:"sideJobBox__txtBox"},A={class:"d-flex"},z={class:"page__txt me-5 subTxt"},K=Object(c["createVNode"])("span",null,[Object(c["createVNode"])("i",{class:"jobIcon--sm me-1 bi bi-geo-alt"})],-1),R={class:"page__txt subTxt"},q=Object(c["createVNode"])("span",null,[Object(c["createVNode"])("i",{class:"jobIcon--sm me-1 bi bi-people"})],-1),Q={class:"d-flex justify-content-between align-items-center"},X={key:0,class:"text-primary fw-bold"},Y={key:1,class:"text-primary fw-bold"},Z={class:"d-flex align-items-center "},ee={class:"subTxt text-secondary me-2"},te=Object(c["createTextVNode"])("申請"),oe={class:"sideJobBox__section"},ce=Object(c["createVNode"])("h3",{class:"section__title--sub"},[Object(c["createVNode"])("span",{class:"title__icon"}),Object(c["createTextVNode"])("職位內容")],-1),ae={class:"mb-3"},ie=Object(c["createVNode"])("i",{class:"jobIcon--sm me-1 bi bi-journal"},null,-1),re={class:"mb-3"},se=Object(c["createVNode"])("span",null,[Object(c["createVNode"])("i",{class:"jobIcon--sm me-1 bi bi-clock"})],-1),ne={class:"mb-3"},le=Object(c["createVNode"])("span",null,[Object(c["createVNode"])("i",{class:"jobIcon--sm me-1 bi bi-building"})],-1),be={class:"mb-3"},de=Object(c["createVNode"])("span",null,[Object(c["createVNode"])("i",{class:"jobIcon--sm me-1 bi bi-card-list"})],-1),ue=Object(c["createVNode"])("p",{class:"mb-3"},"工作內容：",-1),pe={class:"sideJobBox__section"},je=Object(c["createVNode"])("h3",{class:"section__title--sub"},[Object(c["createVNode"])("span",{class:"title__icon"}),Object(c["createTextVNode"])("應徵條件")],-1),me={class:"mb-3"},fe=Object(c["createVNode"])("span",null,[Object(c["createVNode"])("i",{class:"jobIcon--sm me-1 bi bi-book"})],-1),he={class:"mb-3"},Oe=Object(c["createVNode"])("span",null,[Object(c["createVNode"])("i",{class:"jobIcon--sm me-1 bi bi-briefcase"})],-1),ye=Object(c["createVNode"])("p",{class:"mb-3"},"其他條件：",-1),ge={class:"sideJobBox__section"},Ve=Object(c["createVNode"])("h3",{class:"section__title--sub"},[Object(c["createVNode"])("span",{class:"title__icon"}),Object(c["createTextVNode"])("申請方法")],-1),Ne={class:"mb-3"},ke=Object(c["createVNode"])("span",null,[Object(c["createVNode"])("i",{class:"jobIcon--sm me-1 bi bi-person"})],-1),ve={class:"mb-3"},xe=Object(c["createVNode"])("span",null,[Object(c["createVNode"])("i",{class:"jobIcon--sm me-1 bi bi-envelope"})],-1),we={class:"mb-3"},De=Object(c["createVNode"])("span",null,[Object(c["createVNode"])("i",{class:"jobIcon--sm me-1 bi bi-phone"})],-1),_e=Object(c["createVNode"])("p",{class:"mb-3"},"申請備註：",-1),Be={class:"sideBtnBox"},Le={class:"filterContent"},Ce={class:"d-flex justify-content-between align-items-center mb-4"},Fe=Object(c["createVNode"])("h3",{class:"subTitle text-dark"},"搜尋條件設定",-1),Te={class:"d-flex"},Ie=Object(c["createVNode"])("i",{class:"text-dark bi bi-x-lg"},null,-1),Se={key:0,ref:"searchFilterForm",class:"searchFilterForm"},Je={class:"row"},Ee={class:"col-md-6 col-12 mb-3"},Me={class:"inputGroup--item"},Pe=Object(c["createVNode"])("label",{for:"searchFilterForm-keyword",class:"form-label inputItem__title"},"關鍵字",-1),He={class:"col-6 mb-md-0 mb-3"},We={class:"inputGroup--item"},Ue=Object(c["createVNode"])("label",{for:"searchFilterForm-city",class:"form-label inputItem__title"},"地區",-1),$e=Object(c["createVNode"])("option",{disabled:""},"請選擇地區",-1),Ge=Object(c["createVNode"])("option",{selected:"",value:"不限"},"不限",-1),Ae={class:"col-6 mb-3"},ze={class:"inputGroup--item"},Ke=Object(c["createVNode"])("label",{for:"searchFilterForm-industry",class:"form-label inputItem__title"},"產業類別",-1),Re=Object(c["createVNode"])("option",{disabled:""},"請選擇產業類別",-1),qe=Object(c["createVNode"])("option",{selected:"",value:"不限"},"不限",-1),Qe={class:"col-6 mb-md-0 mb-3"},Xe={class:"inputGroup--item"},Ye=Object(c["createVNode"])("label",{for:"searchFilterForm-jobCategory",class:"form-label inputItem__title"},"職位類別",-1),Ze=Object(c["createVNode"])("option",{disabled:""},"請選擇職位類別",-1),et=Object(c["createVNode"])("option",{selected:"",value:"不限"},"不限",-1),tt={class:"col-6  mb-3"},ot={class:"inputGroup--item"},ct=Object(c["createVNode"])("label",{for:"searchFilterForm-workExp",class:"form-label inputItem__title"},"工作經驗",-1),at=Object(c["createVNode"])("option",{disabled:""},"請選擇工作經驗",-1),it={class:"col-6 mb-md-0 mb-3"},rt={class:"inputGroup--item"},st=Object(c["createVNode"])("label",{for:"searchFilterForm-education",class:"form-label inputItem__title"},"學歷要求",-1),nt=Object(c["createVNode"])("option",{disabled:""},"請選擇學歷要求",-1),lt={class:"col-6  mb-3"},bt={class:"inputGroup--item"},dt=Object(c["createVNode"])("label",{for:"searchFilterForm-workType",class:"form-label inputItem__title"},"工作性質",-1),ut=Object(c["createVNode"])("option",{disabled:""},"請選擇工作性質",-1),pt=Object(c["createVNode"])("option",{selected:"",value:"不限"},"不限",-1),jt={class:"col-6 mb-md-0 mb-3"},mt={class:"inputGroup--item"},ft=Object(c["createVNode"])("label",{for:"searchFilterForm-workTime",class:"form-label inputItem__title"},"工作時段",-1),ht=Object(c["createVNode"])("option",{disabled:""},"請選擇工作時段",-1),Ot=Object(c["createVNode"])("option",{selected:"",value:"不限"},"不限",-1),yt={class:"col-md-9 col-12 mb-md-0 mb-3"},gt={class:"inputGroup--item"},Vt=Object(c["createVNode"])("label",{for:"searchFilterForm-salary",class:"form-label inputItem__title"},"薪資待遇",-1),Nt={class:"d-flex align-items-center"},kt=Object(c["createVNode"])("p",{class:"px-2"},"至",-1),vt={class:"form-check py-2 px-3 d-flex justify-content-center align-items-center"},xt=Object(c["createVNode"])("label",{class:"form-check-label text-nowrap",for:"searchFilterForm-salaryInterview"}," 面議 ",-1),wt={class:"col-md-3 col-12"},Dt={class:"d-flex justify-content-end align-items-end h-100"},_t=Object(c["createVNode"])("i",{class:"jobIcon bi bi-funnel"},null,-1);function Bt(e,t,o,Bt,Lt,Ct){var Ft=Object(c["resolveComponent"])("GoodJobCard"),Tt=Object(c["resolveComponent"])("swiper-slide"),It=Object(c["resolveComponent"])("swiper"),St=Object(c["resolveComponent"])("router-link"),Jt=Object(c["resolveComponent"])("PagenationModal"),Et=Object(c["resolveComponent"])("UpTopBtn");return Object(c["openBlock"])(),Object(c["createBlock"])(c["Fragment"],null,[Object(c["createVNode"])("div",a,[Object(c["createVNode"])("div",i,[r,Lt.hotJobs.length>0?(Object(c["openBlock"])(),Object(c["createBlock"])(It,{key:0,"slides-per-view":Lt.swiperNum,"space-between":20,autoplay:{delay:2500,disableOnInteraction:!1},pagination:{clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}},{default:Object(c["withCtx"])((function(){return[(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(Lt.hotJobs,(function(e){return Object(c["openBlock"])(),Object(c["createBlock"])(Tt,{key:e.id},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(Ft,{"good-job":e},null,8,["good-job"])]})),_:2},1024)})),128)),s,n]})),_:1},8,["slides-per-view","navigation"])):Object(c["createCommentVNode"])("",!0)])],512),Object(c["createVNode"])("div",l,[b,""!==Lt.filterTxt?(Object(c["openBlock"])(),Object(c["createBlock"])("p",d,[u,Object(c["createTextVNode"])(Object(c["toDisplayString"])(Lt.filterTxt),1)])):Object(c["createCommentVNode"])("",!0),Lt.jobsList.length?(Object(c["openBlock"])(),Object(c["createBlock"])("div",p,[Object(c["createVNode"])("div",j,[Object(c["createVNode"])("div",m,[Object(c["createVNode"])("div",f,[Object(c["createVNode"])("p",h,"總共 "+Object(c["toDisplayString"])(Lt.jobsList.length)+" 個職位",1),Object(c["withDirectives"])(Object(c["createVNode"])("select",{class:"form-select form-select-lg w-auto border-0 text-gray-dark",onChange:t[1]||(t[1]=function(e){return Ct.changeJobSort(e)}),"onUpdate:modelValue":t[2]||(t[2]=function(e){return Lt.sortWay=e})},[O,y],544),[[c["vModelSelect"],Lt.sortWay]])]),Object(c["createVNode"])("ul",g,[(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(Lt.nowPageJobs,(function(t){return Object(c["openBlock"])(),Object(c["createBlock"])(c["Fragment"],null,[Lt.mountState?(Object(c["openBlock"])(),Object(c["createBlock"])("li",{key:t.id,onClick:function(e){return Ct.selectJob(t.id)},"data-id":t.id,ref:"list__item--".concat(t.id),class:"list__item d-flex box--shadow flex-column align-items-start pe-auto"},[V,Object(c["createVNode"])("div",N,[Object(c["createVNode"])("button",{type:"button",class:"jobTag btn",onClick:function(e){return Ct.searchByJobCategory(t.category)}},Object(c["toDisplayString"])(t.category),9,["onClick"])]),Object(c["createVNode"])("div",k,[Object(c["createVNode"])("div",v,[Object(c["createVNode"])("img",{class:"jobImage",src:t.imageUrl,alt:""},null,8,["src"]),x,Object(c["createVNode"])("div",w,[Object(c["createVNode"])("img",{class:"logoImg",src:t.options.company.companyLogoUrl,alt:""},null,8,["src"])])]),Object(c["createVNode"])("div",D,[Object(c["createVNode"])("div",_,[Object(c["createVNode"])(St,{class:"list__item__title text-dark mb-3 me-7 pe-auto",to:"/products-list/product/".concat(t.id)},{default:Object(c["withCtx"])((function(){return[Object(c["createTextVNode"])(Object(c["toDisplayString"])(t.title),1)]})),_:2},1032,["to"]),Object(c["createVNode"])(St,{class:"page__link subTxt  mb-2 me-7 pe-auto",to:"/products-list/company/".concat(t.options.company.companyLink)},{default:Object(c["withCtx"])((function(){return[Object(c["createTextVNode"])(Object(c["toDisplayString"])(t.options.company.companyName),1)]})),_:2},1032,["to"])]),Object(c["createVNode"])("div",B,[t.options.job.salaryInterView?Object(c["createCommentVNode"])("",!0):(Object(c["openBlock"])(),Object(c["createBlock"])("p",L,Object(c["toDisplayString"])(t.price)+" / 月薪 ",1)),t.options.job.salaryInterView?(Object(c["openBlock"])(),Object(c["createBlock"])("p",C,"薪資面議")):Object(c["createCommentVNode"])("",!0),Object(c["createVNode"])("p",F,Object(c["toDisplayString"])(e.$filters.date(t.options.job.create)),1)])])])],8,["onClick","data-id"])):Object(c["createCommentVNode"])("",!0)],64)})),256))],512)])]),Object(c["createVNode"])("div",T,[Lt.mountState?(Object(c["openBlock"])(),Object(c["createBlock"])("div",I,[Object(c["createVNode"])("div",S,[Object(c["createVNode"])("div",J,[Object(c["createVNode"])("button",{type:"button",class:"jobTag btn",onClick:t[3]||(t[3]=function(e){return Ct.searchByJobCategory(Lt.jobItem.category)})},Object(c["toDisplayString"])(Lt.jobItem.category),1)]),Object(c["createVNode"])("div",E,[Object(c["createVNode"])(St,{class:"btn btn-outline-gray-line btn-bg text-dark d-flex align-items-center me-2",type:"button",to:"/products-list/product/".concat(Lt.jobItem.id)},{default:Object(c["withCtx"])((function(){return[M]})),_:1},8,["to"]),P])]),Object(c["createVNode"])("div",H,[Object(c["createVNode"])("div",W,[Object(c["createVNode"])("div",U,[Object(c["createVNode"])("img",{class:"jobImage",src:Lt.jobItem.imageUrl,alt:""},null,8,["src"]),Object(c["createVNode"])("div",$,[Object(c["createVNode"])("img",{class:"logoImage",src:Lt.jobItem.options.company.companyLogoUrl,alt:""},null,8,["src"])])]),Object(c["createVNode"])("div",G,[Object(c["createVNode"])("div",null,[Object(c["createVNode"])(St,{class:"sideJobBox__title mb-3 d-block",type:"button",to:"/products-list/product/".concat(Lt.jobItem.id)},{default:Object(c["withCtx"])((function(){return[Object(c["createTextVNode"])(Object(c["toDisplayString"])(Lt.jobItem.title),1)]})),_:1},8,["to"]),Object(c["createVNode"])(St,{class:"page__txt page__link subTxt  mb-4 d-block",type:"button",to:"/products-list/company/".concat(Lt.jobItem.options.company.companyLink)},{default:Object(c["withCtx"])((function(){return[Object(c["createTextVNode"])(Object(c["toDisplayString"])(Lt.jobItem.options.company.companyName),1)]})),_:1},8,["to"])]),Object(c["createVNode"])("div",A,[Object(c["createVNode"])("p",z,[K,Object(c["createTextVNode"])(Object(c["toDisplayString"])(Lt.jobItem.options.company.companyAddressCity),1)]),Object(c["createVNode"])("p",R,[q,Object(c["createTextVNode"])("需求人數："+Object(c["toDisplayString"])(Lt.jobItem.num),1)])])])]),Object(c["createVNode"])("div",Q,[Lt.jobItem.options.job.salaryInterView?Object(c["createCommentVNode"])("",!0):(Object(c["openBlock"])(),Object(c["createBlock"])("p",X,Object(c["toDisplayString"])(Lt.jobItem.price)+" / 月薪 ",1)),Lt.jobItem.options.job.salaryInterView?(Object(c["openBlock"])(),Object(c["createBlock"])("p",Y," 薪資面議 ")):Object(c["createCommentVNode"])("",!0),Object(c["createVNode"])("div",Z,[Object(c["createVNode"])("p",ee,Object(c["toDisplayString"])(e.$filters.date(Lt.jobItem.options.job.create)),1),Object(c["createVNode"])(St,{class:"btn--applyJob btn btn-primary btn-bg d-flex align-items-center me-2",type:"button",to:"/apply-job/".concat(Lt.jobItem.id)},{default:Object(c["withCtx"])((function(){return[te]})),_:1},8,["to"])])])]),Object(c["createVNode"])("div",oe,[ce,Object(c["createVNode"])("p",ae,[ie,Object(c["createTextVNode"])("工作性質："+Object(c["toDisplayString"])(Lt.jobItem.options.job.workType),1)]),Object(c["createVNode"])("p",re,[se,Object(c["createTextVNode"])("工作時間："+Object(c["toDisplayString"])(Lt.jobItem.options.job.workTime),1)]),Object(c["createVNode"])("p",ne,[le,Object(c["createTextVNode"])("產業類別："+Object(c["toDisplayString"])(Lt.jobItem.options.company.industryCategory),1)]),Object(c["createVNode"])("p",be,[de,Object(c["createTextVNode"])("工作類別："+Object(c["toDisplayString"])(Lt.jobItem.category),1)]),ue,Object(c["createVNode"])("div",{class:"page__txt",innerHTML:Lt.jobItem.content},null,8,["innerHTML"])]),Object(c["createVNode"])("div",pe,[je,Object(c["createVNode"])("p",me,[fe,Object(c["createTextVNode"])("學歷要求："+Object(c["toDisplayString"])(Lt.jobItem.options.job.education),1)]),Object(c["createVNode"])("p",he,[Oe,Object(c["createTextVNode"])("工作經驗："+Object(c["toDisplayString"])(Lt.jobItem.options.job.workExp),1)]),ye,Object(c["createVNode"])("div",{class:"page__txt",innerHTML:Lt.jobItem.options.job.otherRequirement},null,8,["innerHTML"])]),Object(c["createVNode"])("div",ge,[Ve,Object(c["createVNode"])("p",Ne,[ke,Object(c["createTextVNode"])("職位聯絡人："+Object(c["toDisplayString"])(Lt.jobItem.options.company.companyContact),1)]),Object(c["createVNode"])("p",ve,[xe,Object(c["createTextVNode"])("聯絡信箱："+Object(c["toDisplayString"])(Lt.jobItem.options.company.companyEmail),1)]),Object(c["createVNode"])("p",we,[De,Object(c["createTextVNode"])("聯絡電話："+Object(c["toDisplayString"])(Lt.jobItem.options.company.companyTel),1)]),_e,Object(c["createVNode"])("div",{class:"page__txt",innerHTML:Lt.jobItem.options.job.otherApplyInfo},null,8,["innerHTML"])])],512)):Object(c["createCommentVNode"])("",!0)])])):Object(c["createCommentVNode"])("",!0)],512),Object(c["createVNode"])(Jt,{"jobs-list":Lt.jobsList,onChangePage:Ct.changePage},null,8,["jobs-list","onChangePage"]),Object(c["createVNode"])("div",Be,[Lt.filterBoxState?(Object(c["openBlock"])(),Object(c["createBlock"])("div",{key:0,class:["sideFilter searchFilterBox  box--shadow mb-md-5 mb-0 p-5",{active:Lt.filterBoxState}]},[Object(c["createVNode"])("div",Le,[Object(c["createVNode"])("div",Ce,[Fe,Object(c["createVNode"])("div",Te,[Object(c["createVNode"])("button",{type:"button",class:"btn btn-gray-light btn-lg btn--web",onClick:t[4]||(t[4]=function(){return Ct.cleanFilter&&Ct.cleanFilter.apply(Ct,arguments)})}," 清除全部 "),Object(c["createVNode"])("button",{type:"button",class:"btn d-md-none d-block",onClick:t[5]||(t[5]=function(){return Ct.openSideFilterBox&&Ct.openSideFilterBox.apply(Ct,arguments)})},[Ie])])]),Lt.mountState?(Object(c["openBlock"])(),Object(c["createBlock"])("div",Se,[Object(c["createVNode"])("div",Je,[Object(c["createVNode"])("div",Ee,[Object(c["createVNode"])("div",Me,[Pe,Object(c["withDirectives"])(Object(c["createVNode"])("input",{type:"text",class:"form-control",id:"searchFilterForm-keyword",placeholder:"職位關鍵字","aria-describedby":"關鍵字","onUpdate:modelValue":t[6]||(t[6]=function(e){return Lt.filterData.keyword=e})},null,512),[[c["vModelText"],Lt.filterData.keyword]])])]),Object(c["createVNode"])("div",He,[Object(c["createVNode"])("div",We,[Ue,Object(c["withDirectives"])(Object(c["createVNode"])("select",{class:"form-select","aria-label":"地區",id:"searchFilterForm-city","onUpdate:modelValue":t[7]||(t[7]=function(e){return Lt.filterData.city=e})},[$e,Ge,(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(Lt.formData.city,(function(e,t){return Object(c["openBlock"])(),Object(c["createBlock"])("option",{value:e,key:"地區"+t},Object(c["toDisplayString"])(e),9,["value"])})),128))],512),[[c["vModelSelect"],Lt.filterData.city]])])]),Object(c["createVNode"])("div",Ae,[Object(c["createVNode"])("div",ze,[Ke,Object(c["withDirectives"])(Object(c["createVNode"])("select",{class:"form-select","aria-label":"產業類別",id:"searchFilterForm-industry","onUpdate:modelValue":t[8]||(t[8]=function(e){return Lt.filterData.industryCategory=e})},[Re,qe,(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(Lt.formData.industryCategory,(function(e,t){return Object(c["openBlock"])(),Object(c["createBlock"])("option",{value:e,key:"產業類別"+t},Object(c["toDisplayString"])(e),9,["value"])})),128))],512),[[c["vModelSelect"],Lt.filterData.industryCategory]])])]),Object(c["createVNode"])("div",Qe,[Object(c["createVNode"])("div",Xe,[Ye,Object(c["withDirectives"])(Object(c["createVNode"])("select",{class:"form-select","aria-label":"職位類別",id:"searchFilterForm-jobCategory","onUpdate:modelValue":t[9]||(t[9]=function(e){return Lt.filterData.jobCategory=e})},[Ze,et,(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(Lt.formData.jobCategory,(function(e,t){return Object(c["openBlock"])(),Object(c["createBlock"])("option",{value:e,key:"職位類別"+t},Object(c["toDisplayString"])(e),9,["value"])})),128))],512),[[c["vModelSelect"],Lt.filterData.jobCategory]])])]),Object(c["createVNode"])("div",tt,[Object(c["createVNode"])("div",ot,[ct,Object(c["withDirectives"])(Object(c["createVNode"])("select",{class:"form-select","aria-label":"工作經驗",id:"searchFilterForm-workExp","onUpdate:modelValue":t[10]||(t[10]=function(e){return Lt.filterData.workExp=e})},[at,(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(Lt.formData.workExp,(function(e,t){return Object(c["openBlock"])(),Object(c["createBlock"])("option",{value:e,selected:"不限"===e,key:"工作經驗"+t},Object(c["toDisplayString"])(e),9,["value","selected"])})),128))],512),[[c["vModelSelect"],Lt.filterData.workExp]])])]),Object(c["createVNode"])("div",it,[Object(c["createVNode"])("div",rt,[st,Object(c["withDirectives"])(Object(c["createVNode"])("select",{class:"form-select","aria-label":"學歷要求",id:"searchFilterForm-education","onUpdate:modelValue":t[11]||(t[11]=function(e){return Lt.filterData.education=e})},[nt,(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(Lt.formData.education,(function(e,t){return Object(c["openBlock"])(),Object(c["createBlock"])("option",{value:e,selected:"不限"===e,key:"學歷要求"+t},Object(c["toDisplayString"])(e),9,["value","selected"])})),128))],512),[[c["vModelSelect"],Lt.filterData.education]])])]),Object(c["createVNode"])("div",lt,[Object(c["createVNode"])("div",bt,[dt,Object(c["withDirectives"])(Object(c["createVNode"])("select",{class:"form-select","aria-label":"工作性質",id:"searchFilterForm-workType","onUpdate:modelValue":t[12]||(t[12]=function(e){return Lt.filterData.workType=e})},[ut,pt,(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(Lt.formData.workType,(function(e,t){return Object(c["openBlock"])(),Object(c["createBlock"])("option",{value:e,key:"工作性質"+t},Object(c["toDisplayString"])(e),9,["value"])})),128))],512),[[c["vModelSelect"],Lt.filterData.workType]])])]),Object(c["createVNode"])("div",jt,[Object(c["createVNode"])("div",mt,[ft,Object(c["withDirectives"])(Object(c["createVNode"])("select",{class:"form-select","aria-label":"工作時段",id:"searchFilterForm-workTime","onUpdate:modelValue":t[13]||(t[13]=function(e){return Lt.filterData.workTime=e})},[ht,Ot,(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(Lt.formData.workTime,(function(e,t){return Object(c["openBlock"])(),Object(c["createBlock"])("option",{value:e,key:"工作時段"+t},Object(c["toDisplayString"])(e),9,["value"])})),128))],512),[[c["vModelSelect"],Lt.filterData.workTime]])])]),Object(c["createVNode"])("div",yt,[Object(c["createVNode"])("div",gt,[Vt,Object(c["createVNode"])("div",Nt,[Object(c["withDirectives"])(Object(c["createVNode"])("input",{type:"number",class:"form-control",id:"searchFilterForm-salary",placeholder:"最低","aria-describedby":"薪資待遇範圍起始","onUpdate:modelValue":t[14]||(t[14]=function(e){return Lt.filterData.salaryLow=e})},null,512),[[c["vModelText"],Lt.filterData.salaryLow,void 0,{number:!0}]]),kt,Object(c["withDirectives"])(Object(c["createVNode"])("input",{type:"number",class:"form-control",id:"searchFilterForm-salary-end",placeholder:"最高","aria-describedby":"薪資待遇範圍結束","onUpdate:modelValue":t[15]||(t[15]=function(e){return Lt.filterData.salaryHight=e})},null,512),[[c["vModelText"],Lt.filterData.salaryHight,void 0,{number:!0}]]),Object(c["createVNode"])("div",vt,[Object(c["withDirectives"])(Object(c["createVNode"])("input",{class:"form-check-input ms-0 me-2",type:"checkbox",value:"面議",id:"searchFilterForm-salaryInterview","onUpdate:modelValue":t[16]||(t[16]=function(e){return Lt.filterData.salaryInterView=e})},null,512),[[c["vModelCheckbox"],Lt.filterData.salaryInterView]]),xt])])])]),Object(c["createVNode"])("div",wt,[Object(c["createVNode"])("div",Dt,[Object(c["createVNode"])("button",{type:"button",class:"btn btn-primary btn--applyJob",onClick:t[17]||(t[17]=function(){return Ct.filterJobs&&Ct.filterJobs.apply(Ct,arguments)})}," 查詢 ")])])])],512)):Object(c["createCommentVNode"])("",!0)])],2)):Object(c["createCommentVNode"])("",!0),Lt.filterBoxState?(Object(c["openBlock"])(),Object(c["createBlock"])("div",{key:1,class:"bg-cover--dark",onClick:t[18]||(t[18]=function(){return Ct.openSideFilterBox&&Ct.openSideFilterBox.apply(Ct,arguments)})})):Object(c["createCommentVNode"])("",!0),Object(c["createVNode"])("button",{type:"button",class:"sideIconBtn btn btn-light mb-2",onClick:t[19]||(t[19]=function(){return Ct.openSideFilterBox&&Ct.openSideFilterBox.apply(Ct,arguments)})},[_t]),Object(c["createVNode"])(Et)])],64)}o("159b"),o("a4d3"),o("e01a"),o("99af"),o("4e82"),o("4de4"),o("fb6a"),o("d3b7"),o("6062"),o("3ca3"),o("ddb0");var Lt=o("e89f"),Ct=o("69e9"),Ft=o("4239"),Tt=o("f234"),It=o("90ea"),St=o("a16a"),Jt=o("2aee"),Et=o("3cac"),Mt=o("6d3b"),Pt=o("d17a"),Ht=o("5dc8"),Wt=o("8343");Mt["a"].use([Pt["a"],Ht["a"],Wt["a"]]);var Ut={components:{PagenationModal:Ft["a"],GoodJobCard:Tt["a"],Swiper:It["a"],SwiperSlide:St["a"],UpTopBtn:Et["a"]},data:function(){return{fullWidth:0,fullHeight:0,swiperNum:1,products:[],jobsList:[],hotJobs:[],nowPageJobs:[],jobItem:{options:{company:{companyImagesUrl:[]},job:{}}},searchFilterMethods:{},pageNumber:1,sortWay:"time",formData:{},filterData:{keyword:"",city:"不限",industryCategory:"不限",jobCategory:"不限",workExp:"不限",education:"不限",workType:"不限",workTime:"不限",salaryLow:null,salaryHight:null,salaryInterView:!1},filterBoxState:!1,filterTxt:"",mountState:!1}},watch:{fullWidth:function(e){this.swiperNum=e>768?3:e>576?2:1}},computed:{sortCompany:function(){var e=[];return this.products.length>1&&this.products.forEach((function(t){"企業"===t.description&&e.push(t)})),e}},methods:{openSideFilterBox:function(){this.filterBoxState?this.filterBoxState=!1:this.filterBoxState||(this.filterBoxState=!0)},searchByJobCategory:function(e){var t="不限",o="不限";this.$router.push("/search/?keyword=".concat(t,"&city=").concat(o,"&jobCategory=").concat(e))},changeJobSort:function(){"time"===this.sortWay?this.jobsList.sort((function(e,t){return t.options.job.create-e.options.job.create})):"money"===this.sortWay&&this.jobsList.sort((function(e,t){return t.price-e.price}))},changePage:function(e){this.pageNumber=e,this.getNowPageJobs()},filterJobs:function(){Lt["a"].emit("spinner-open"),this.classifyJob(),console.log(this.jobsList,this.filterData);var e=this.searchFilterMethods.filter(this.jobsList,this.filterData);console.log(e),this.jobsList=e,Lt["a"].emit("spinner-close"),this.changePage(1),this.getfilterTxt(),this.openSideFilterBox()},getfilterTxt:function(){var e=""===this.filterData.keyword?"":"".concat(this.filterData.keyword,"、"),t="不限"===this.filterData.city?"":"".concat(this.filterData.city,"、"),o="不限"===this.filterData.industryCategory?"":"".concat(this.filterData.industryCategory,"、"),c="不限"===this.filterData.jobCategory?"":"".concat(this.filterData.jobCategory,"、"),a="不限"===this.filterData.workExp?"":"".concat(this.filterData.workExp,"、"),i="不限"===this.filterData.education?"":"".concat(this.filterData.education,"、"),r="不限"===this.filterData.workType?"":"".concat(this.filterData.workType,"、"),s="不限"===this.filterData.workTime?"":"".concat(this.filterData.workTime,"、"),n=null===this.filterData.salaryLow?"":"最低薪資".concat(this.filterData.salaryLow,"、"),l=null===this.filterData.salaryHight?"":"最高薪資".concat(this.filterData.salaryHight,"、"),b=!1===this.filterData.salaryInterView?"":"薪資面議、",d=e+t+o+c+a+i+r+s+n+l+b;d.length>1?this.filterTxt=d.slice(0,d.length-1):this.filterTxt=d,console.log(this.filterTxt)},cleanFilter:function(){this.searchFilterMethods.getFilterData(this.filterData),this.searchFilterMethods.cleanFilter(),this.filterData=this.searchFilterMethods.returnFilter()},selectJob:function(e){var t=this;console.log(this.fullWidth),this.fullWidth>991?(this.nowPageJobs.forEach((function(o){t.$refs["list__item--".concat(o.id)].classList.remove("active"),o.id===e&&(t.jobItem=o,t.$refs["list__item--".concat(o.id)].classList.add("active"))})),this.$refs.jobSelectBox.scrollTop=0):this.$router.push("/products-list/product/".concat(e))},selectJobFrist:function(e){var t=this;this.fullWidth>991&&(this.nowPageJobs.forEach((function(o){t.$refs["list__item--".concat(o.id)].classList.remove("active"),o.id===e&&(t.jobItem=o,console.dir(t.$refs["list__item--".concat(e)]),t.$refs["list__item--".concat(e)].classList.add("active"))})),this.$refs.jobSelectBox.scrollTop=0)},getNowPageJobs:function(){var e=this,t=[];if(this.jobsList.length!==[]){var o=10*this.pageNumber-10;this.jobsList.forEach((function(c,a){o<=a&&a<10*e.pageNumber&&t.push(c)})),document.documentElement.scrollTop=0,this.jobItem=t[0]}this.nowPageJobs=t,setTimeout((function(){e.selectJobFrist(e.nowPageJobs[0].id)}),10)},sortHotJobs:function(){var e=this;if(this.hotJobs=[],this.jobsList.length>0){for(var t=this.jobsList.filter((function(e){return 1===e.options.job.promote})),o=new Set([]),c=0;o.size<6;c+=1){var a=Math.floor(Math.random()*t.length);o.add(a)}o.forEach((function(o){e.hotJobs.push(t[o])}))}},classifyJob:function(){var e=this;this.jobsList=[],this.changePage(1),this.products.forEach((function(t){if("職位"===t.description){var o=t;e.sortCompany.forEach((function(e){o.options.company.companyName===e.title&&(o.options.company.companyLink=e.id)})),e.jobsList.push(o)}})),this.changeJobSort(),this.sortHotJobs(),this.getNowPageJobs()},getOgData:function(){var e=this;Lt["a"].emit("spinner-open");var t="".concat("https://vue3-course-api.hexschool.io","/api/").concat("jordanttcdesign","/products/all");this.$http.get(t).then((function(t){e.products=t.data.products,Lt["a"].emit("spinner-close"),e.classifyJob()})).catch((function(e){console.log(e)}))}},created:function(){this.getOgData(),this.formData=Jt["a"],this.searchFilterMethods=Ct["a"]},mounted:function(){this.mountState=!0;var e=this;e.fullWidth=window.innerWidth,e.fullHeight=window.innerHeight,window.onresize=function(){e.fullWidth=window.innerWidth,e.fullHeight=window.innerHeight}}};Ut.render=Bt;t["default"]=Ut},"69e9":function(e,t,o){"use strict";o("4de4"),o("caad"),o("2532");var c={jobsList:[],filterData:{keyword:"",city:"不限",industryCategory:"不限",jobCategory:"不限",workExp:"不限",education:"不限",workType:"不限",workTime:"不限",salaryLow:null,salaryHight:null,salaryInterView:!1},filter:function(e,t){return this.getJobsList(e),this.getFilterData(t),this.startFilter(),this.jobsList},getJobsList:function(e){console.log(this.jobsList),this.jobsList=e,console.log(this.jobsList)},sendJobsList:function(){return this.jobsList},getFilterData:function(e){this.cleanFilter(),this.filterData=e},cleanFilter:function(){this.filterData={keyword:"",city:"不限",industryCategory:"不限",jobCategory:"不限",workExp:"不限",education:"不限",workType:"不限",workTime:"不限",salaryLow:null,salaryHight:null,salaryInterView:!1}},returnFilter:function(){return this.filterData},startFilter:function(){this.filterKeyword(this.filterData),this.filterCity(this.filterData),this.filterWorkTime(this.filterData),this.filterWorkType(this.filterData),this.filterWorkExp(this.filterData),this.filterEducation(this.filterData),this.filterJobCategory(this.filterData),this.filterIndustryCategory(this.filterData),this.filterSalary(this.filterData),this.filterSalaryInterView(this.filterData)},filterKeyword:function(e){var t=[];t=""!==e.keyword?this.jobsList.filter((function(t){var o=t.title+t.options.company.companyName,c=e.keyword.toLowerCase(),a=o.toLowerCase().includes(c);return a})):this.jobsList,this.jobsList=t},filterCity:function(e){var t=[];t="不限"!==e.city?this.jobsList.filter((function(t){return t.options.company.companyAddressCity===e.city})):this.jobsList,this.jobsList=t},filterWorkTime:function(e){var t=[];"不限"!==e.workTime?(console.log(e.workTime),t=this.jobsList.filter((function(t){return t.options.job.workTime===e.workTime}))):t=this.jobsList,this.jobsList=t},filterWorkExp:function(e){var t=[];t="不限"!==e.workExp?this.jobsList.filter((function(t){return t.options.job.workExp===e.workExp})):this.jobsList,this.jobsList=t},filterWorkType:function(e){var t=[];t="不限"!==e.workType?this.jobsList.filter((function(t){return t.options.job.workType===e.workType})):this.jobsList,this.jobsList=t},filterEducation:function(e){var t=[];t="不限"!==e.education?this.jobsList.filter((function(t){return t.options.job.education===e.education})):this.jobsList,this.jobsList=t},filterJobCategory:function(e){var t=[];t="不限"!==e.jobCategory?this.jobsList.filter((function(t){return t.category===e.jobCategory})):this.jobsList,this.jobsList=t},filterIndustryCategory:function(e){var t=[];t="不限"!==e.industryCategory?this.jobsList.filter((function(t){return t.options.company.industryCategory===e.industryCategory})):this.jobsList,this.jobsList=t},filterSalary:function(e){var t=[],o=e.salaryLow,c=e.salaryHight;null!==o&&null!==c?t=this.jobsList.filter((function(e){return e.price>o&&e.price<c})):null!==o||null!==c?null!==o?t=this.jobsList.filter((function(e){return e.price>o})):null!==c&&(t=this.jobsList.filter((function(e){return e.price<c}))):t=this.jobsList,this.jobsList=t},filterSalaryInterView:function(e){var t=[];e.salaryInterView?(console.log("只找面議"),t=this.jobsList.filter((function(e){return!0===e.options.job.salaryInterView}))):t=this.jobsList,this.jobsList=t}};t["a"]=c},ab13:function(e,t,o){var c=o("b622"),a=c("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(o){try{return t[a]=!1,"/./"[e](t)}catch(c){}}return!1}},caad:function(e,t,o){"use strict";var c=o("23e7"),a=o("4d64").includes,i=o("44d2");c({target:"Array",proto:!0},{includes:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}}),i("includes")},fb6a:function(e,t,o){"use strict";var c=o("23e7"),a=o("861d"),i=o("e8b5"),r=o("23cb"),s=o("50c4"),n=o("fc6a"),l=o("8418"),b=o("b622"),d=o("1dde"),u=d("slice"),p=b("species"),j=[].slice,m=Math.max;c({target:"Array",proto:!0,forced:!u},{slice:function(e,t){var o,c,b,d=n(this),u=s(d.length),f=r(e,u),h=r(void 0===t?u:t,u);if(i(d)&&(o=d.constructor,"function"!=typeof o||o!==Array&&!i(o.prototype)?a(o)&&(o=o[p],null===o&&(o=void 0)):o=void 0,o===Array||void 0===o))return j.call(d,f,h);for(c=new(void 0===o?Array:o)(m(h-f,0)),b=0;f<h;f++,b++)f in d&&l(c,b,d[f]);return c.length=b,c}})}}]);
//# sourceMappingURL=chunk-6286b690.d606d54a.js.map