(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ceef5"],{6225:function(e,t,o){"use strict";o.r(t);o("4de4");var i=o("7a23"),c={class:"page--py"},a={ref:"recommedJobs",class:"section"},n={class:"container"},s=Object(i["createVNode"])("h3",{class:"section__title ps-3"},"推薦職位",-1),r=Object(i["createVNode"])("div",{class:"swiper-button-prev swiper-custom"},[Object(i["createVNode"])("button",{type:"button",class:"btn btn-lg rounded-circle iconBtnBox"},[Object(i["createVNode"])("i",{class:"bi bi-arrow-left actionIcon"})])],-1),l=Object(i["createVNode"])("div",{class:"swiper-button-next swiper-custom"},[Object(i["createVNode"])("button",{type:"button",class:"btn btn-lg rounded-circle iconBtnBox"},[Object(i["createVNode"])("i",{class:"bi bi-arrow-right actionIcon"})])],-1),b={ref:"jobsListContainer",class:"jobsListContainer container"},d=Object(i["createVNode"])("h3",{class:"section__title ps-3"},"全部職位",-1),h={key:0,class:"ps-3 mb-6 text-primary"},p=Object(i["createVNode"])("span",{class:"text-gray-dark"},"搜尋條件：",-1),u={class:"row"},f={key:0,class:"col-lg-6 col-12"},j={class:"jobListBox"},g={class:"d-flex justify-content-between align-items-center ps-3 mb-3"},m={class:"text-secondary fw-normal  text-nowrap"},y=Object(i["createVNode"])("option",{selected:"",value:"time"},"最新至最舊",-1),O=Object(i["createVNode"])("option",{value:"money"},"薪水高至低",-1),w={ref:"jobList",class:"allJobList"},J={key:0},B={key:1,class:"col-lg-6 col-12 d-lg-block d-none"},N={key:2,class:"col-12 d-flex justify-content-center"},v=Object(i["createVNode"])("img",{class:"img--searchNoJob",src:"https://storage.googleapis.com/vue-course-api.appspot.com/jordanttcdesign/1629385211015.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=F0Wk9lSjiNEPR9Oc2yUH%2FsytXi9oZAK9mQfxq5pEsNm%2FkYws1ORyXtgI3GxhfKA144%2F70tZX5321YS22Ta%2B9sdNPTtUUUIdWY1fQgSf95yMxikEYSVSpb%2FtKGlZvlcJy6kFokL6Ktv3CYncDq%2B1AVDPtZf7avLr8bdcDYoxsDgeSNoKESY%2BZIQDcLI6c3t%2BfROBH3NZkBTBrTa98P%2FeCywVqtNkfMfZpoewZyqptrn0rptafi6iQurKFCpTbOTvUAdiM0dnsHiEyzVwigDrN%2FNtaxR%2BwdTPDnAE2fS6QMx%2B2kjNa32GEjbkQ7fCcbYTPiQ0%2FQMDTpX8lfSwhG5knbA%3D%3D",alt:"找不到職位"},null,-1),C={class:"sideBtnBox"};function k(e,t,o,k,S,x){var V=Object(i["resolveComponent"])("GoodJobCard"),L=Object(i["resolveComponent"])("swiper-slide"),F=Object(i["resolveComponent"])("swiper"),P=Object(i["resolveComponent"])("JobListCard"),D=Object(i["resolveComponent"])("JobListSideJobBox"),E=Object(i["resolveComponent"])("PagenationModal"),T=Object(i["resolveComponent"])("FilterBtn"),M=Object(i["resolveComponent"])("UpTopBtn"),_=Object(i["resolveComponent"])("JobCollect");return Object(i["openBlock"])(),Object(i["createBlock"])(i["Fragment"],null,[Object(i["createVNode"])("div",c,[Object(i["createVNode"])("div",a,[Object(i["createVNode"])("div",n,[s,S.hotJobs.length>0?(Object(i["openBlock"])(),Object(i["createBlock"])(F,{key:0,"slides-per-view":S.swiperNum,"space-between":20,autoplay:S.swiperDetail.autoPlay,pagination:S.swiperDetail.pagination,navigation:S.swiperDetail.navigation},{default:Object(i["withCtx"])((function(){return[(Object(i["openBlock"])(!0),Object(i["createBlock"])(i["Fragment"],null,Object(i["renderList"])(S.hotJobs,(function(e){return Object(i["openBlock"])(),Object(i["createBlock"])(L,{key:e.id},{default:Object(i["withCtx"])((function(){return[Object(i["createVNode"])(V,{"good-job":e},null,8,["good-job"])]})),_:2},1024)})),128)),r,l]})),_:1},8,["slides-per-view","autoplay","pagination","navigation"])):Object(i["createCommentVNode"])("",!0)])],512),Object(i["createVNode"])("div",b,[d,""!==S.filterTxt?(Object(i["openBlock"])(),Object(i["createBlock"])("p",h,[p,Object(i["createTextVNode"])(Object(i["toDisplayString"])(S.filterTxt),1)])):Object(i["createCommentVNode"])("",!0),Object(i["createVNode"])("div",u,[S.jobsList.length>0?(Object(i["openBlock"])(),Object(i["createBlock"])("div",f,[Object(i["createVNode"])("div",j,[Object(i["createVNode"])("div",g,[Object(i["createVNode"])("p",m," 目前共 "+Object(i["toDisplayString"])(S.jobsList.length)+" 個職位 ",1),Object(i["withDirectives"])(Object(i["createVNode"])("select",{class:"form-select form-select-lg w-auto border-0 text-gray-dark",onChange:t[1]||(t[1]=function(e){return x.changeJobSort(e)}),"onUpdate:modelValue":t[2]||(t[2]=function(e){return S.sortWay=e})},[y,O],544),[[i["vModelSelect"],S.sortWay]])]),Object(i["createVNode"])("ul",w,[(Object(i["openBlock"])(!0),Object(i["createBlock"])(i["Fragment"],null,Object(i["renderList"])(S.nowPageJobs,(function(e){return Object(i["openBlock"])(),Object(i["createBlock"])(i["Fragment"],{key:e.id},[S.nowPageJobs.length>0?(Object(i["openBlock"])(),Object(i["createBlock"])("li",J,[Object(i["createVNode"])(P,{ref:"jobList__item--".concat(e.id),"job-list-item":e,onSelectJob:x.selectJob,onSearchByJobCategory:x.searchByJobCategory},null,8,["job-list-item","onSelectJob","onSearchByJobCategory"])])):Object(i["createCommentVNode"])("",!0)],64)})),128))],512)])])):Object(i["createCommentVNode"])("",!0),S.jobsList.length>0?(Object(i["openBlock"])(),Object(i["createBlock"])("div",B,[Object(i["createVNode"])(D,{ref:"jobSelectBox","select-job-item":S.jobItem,onSearchByJobCategory:x.searchByJobCategory},null,8,["select-job-item","onSearchByJobCategory"])])):Object(i["createCommentVNode"])("",!0),0===S.jobsList.length?(Object(i["openBlock"])(),Object(i["createBlock"])("div",N,[v])):Object(i["createCommentVNode"])("",!0)])],512),Object(i["createVNode"])(E,{"jobs-list":S.jobsList,onChangePage:x.changePage,onSearchByJobCategory:x.searchByJobCategory},null,8,["jobs-list","onChangePage","onSearchByJobCategory"])]),Object(i["createVNode"])("div",C,[Object(i["createVNode"])(T,{"tem-filter-data":S.filterData,onSendFilterData:x.filter,onGetFilterTxt:x.getFilterTxt},null,8,["tem-filter-data","onSendFilterData","onGetFilterTxt"]),Object(i["createVNode"])(M)]),Object(i["createVNode"])(_,{ref:"JobCollectModal",onReturnJobCollection:x.getJobCollect},null,8,["onReturnJobCollection"])],64)}o("159b"),o("a4d3"),o("e01a"),o("99af"),o("4e82"),o("d3b7"),o("6062"),o("3ca3"),o("ddb0");var S=o("cfb9"),x=o("34cf"),V=o("2220"),L=o("8a9c"),F=o("f234"),P=o("ac2f"),D=o("b936"),E=o("90ea"),T=o("a16a"),M=o("3cac"),_=o("d845"),I=o("171d"),W=o("6d3b"),H=o("d17a"),G=o("5dc8"),U=o("8343");W["a"].use([H["a"],G["a"],U["a"]]);var $={components:{PagenationModal:L["a"],GoodJobCard:F["a"],JobListCard:P["a"],Swiper:E["a"],SwiperSlide:T["a"],UpTopBtn:M["a"],FilterBtn:_["a"],JobListSideJobBox:D["a"],JobCollect:I["a"]},data:function(){return{fullWidth:0,fullHeight:0,products:[],jobsList:[],hotJobs:[],nowPageJobs:[],jobItem:{options:{company:{companyImagesUrl:[]},job:{}}},searchFilterMethods:{},searchByJobCategoryState:!1,pageNumber:1,sortWay:"time",formData:{},filterData:{keyword:"",city:"不限",industryCategory:"不限",jobCategory:"不限",workExp:"不限",education:"不限",workType:"不限",workTime:"不限",salaryLow:null,salaryHight:null,salaryInterView:!1},filterBoxState:!1,filterTxt:"",mountState:!1,swiperNum:1,swiperDetail:{autoPlay:{delay:2500,disableOnInteraction:!1},pagination:{clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},slidesPerView:this.swiperNum},jobCollectionList:[]}},watch:{fullWidth:function(e){this.swiperNum=e>991.75?3:e>767?2:1}},computed:{sortCompany:function(){var e=[];return this.products.length>1&&this.products.forEach((function(t){"企業"===t.description&&e.push(t)})),e}},methods:{getJobCollect:function(e){this.jobCollectionList=JSON.parse(JSON.stringify(e)),this.checkJobCollect()},checkJobCollect:function(){var e=this;this.nowPageJobs.length>0&&this.jobCollectionList.length>0&&this.nowPageJobs.forEach((function(t,o){var i=!1;e.jobCollectionList.forEach((function(e){e.jobs.forEach((function(e){e.id===t.id&&(i=!0)}))})),e.nowPageJobs[o].jobCollectCheck=i}))},openSideFilterBox:function(){this.filterBoxState?this.filterBoxState=!1:this.filterBoxState||(this.filterBoxState=!0)},searchByJobCategory:function(e){this.searchByJobCategoryState=!0;var t="不限",o="不限";this.$router.push("/search/?keyword=".concat(t,"&city=").concat(o,"&jobCategory=").concat(e))},changeJobSort:function(){"time"===this.sortWay?this.jobsList.sort((function(e,t){return t.options.job.create-e.options.job.create})):"money"===this.sortWay&&this.jobsList.sort((function(e,t){return t.price-e.price}))},changePage:function(e){this.pageNumber=e,this.getNowPageJobs()},filter:function(e){this.filterData=e,S["a"].emit("spinner-open"),this.classifyJob();var t=this.searchFilterMethods.filter(this.jobsList,this.filterData);this.jobsList=t,this.changePage(1),S["a"].emit("get-filter-txt"),S["a"].emit("filterBtn-close"),S["a"].emit("spinner-close")},getFilterTxt:function(e){this.filterTxt=e},cleanFilter:function(){this.searchFilterMethods.getFilterData(this.filterData),this.searchFilterMethods.cleanFilter(),this.filterData=this.searchFilterMethods.returnFilter()},selectJob:function(e){var t=this;this.fullWidth>991?!1===this.searchByJobCategoryState&&(this.nowPageJobs.forEach((function(o){o.id===e?(t.jobItem=o,t.$refs["jobList__item--".concat(o.id)].openSelectEffect()):o.id!==e&&t.$refs["jobList__item--".concat(o.id)].closeSelectEffect()})),this.$refs.jobSelectBox.toTop()):this.$router.push("/products-list/product/".concat(e))},selectJobFrist:function(e){var t=this;this.fullWidth>991&&(this.nowPageJobs.forEach((function(o){o.id===e?(t.jobItem=o,t.$refs["jobList__item--".concat(o.id)].openSelectEffect()):o.id!==e&&t.$refs["jobList__item--".concat(o.id)].closeSelectEffect()})),this.$refs.jobSelectBox.toTop())},getNowPageJobs:function(){var e=this,t=[];if(this.jobsList.length!==[]){var o=10*this.pageNumber-10;this.jobsList.forEach((function(i,c){o<=c&&c<10*e.pageNumber&&t.push(i)})),document.documentElement.scrollTop=0,this.jobItem=t[0]}this.nowPageJobs=JSON.parse(JSON.stringify(t)),this.checkJobCollect(),setTimeout((function(){e.nowPageJobs.length>0&&e.selectJobFrist(e.nowPageJobs[0].id)}),10)},sortHotJobs:function(){var e=this;if(this.hotJobs=[],this.jobsList.length>0){for(var t=this.jobsList.filter((function(e){return 1===e.options.job.promote})),o=new Set([]),i=0;o.size<6;i+=1){var c=Math.floor(Math.random()*t.length);o.add(c)}o.forEach((function(o){e.hotJobs.push(t[o])}))}},classifyJob:function(){var e=this;this.jobsList=[],this.changePage(1),this.products.forEach((function(t){if("職位"===t.description){var o=JSON.parse(JSON.stringify(t));e.sortCompany.forEach((function(e){o.options.company.companyName===e.title&&(o.options.company.companyLink=e.id)})),e.jobsList.push(o)}})),this.changeJobSort(),this.hotJobs.length||this.sortHotJobs(),this.getNowPageJobs()},getOgData:function(){var e=this;S["a"].emit("spinner-open");var t="".concat("https://vue3-course-api.hexschool.io","/api/").concat("jordanttcdesign","/products/all");this.$http.get(t).then((function(t){e.products=t.data.products,S["a"].emit("spinner-close"),e.classifyJob()})).catch((function(e){S["a"].emit("spinner-close"),S["a"].emit("alertMessage-open",e)}))}},created:function(){this.getOgData(),this.formData=V["a"],this.searchFilterMethods=x["a"],S["a"].emit("spinner-open-bg",1200)},mounted:function(){this.mountState=!0;var e=this;e.fullWidth=window.innerWidth,e.fullHeight=window.innerHeight,window.onresize=function(){e.fullWidth=window.innerWidth,e.fullHeight=window.innerHeight}}};$.render=k;t["default"]=$}}]);
//# sourceMappingURL=chunk-2d0ceef5.5685e702.js.map