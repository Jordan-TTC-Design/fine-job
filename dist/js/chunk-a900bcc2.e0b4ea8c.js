(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a900bcc2"],{"1dde":function(e,t,o){var n=o("d039"),r=o("b622"),a=o("2d00"),c=r("species");e.exports=function(e){return a>=51||!n((function(){var t=[],o=t.constructor={};return o[c]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"54fc":function(e,t,o){"use strict";o.r(t);o("b0c0"),o("a434");var n=o("7a23"),r={class:"container"},a={class:"row justify-content-center"},c={class:"col-6"},l=Object(n["h"])("h2",{class:"text-center"},"申請職位",-1),s={class:"mb-3"},i=Object(n["h"])("label",{for:"costumerInfoName",class:"form-label"},"姓名",-1),u={class:"mb-3"},f=Object(n["h"])("label",{for:"costumerInfoEmail",class:"form-label"},"Email",-1),m={class:"mb-3"},d=Object(n["h"])("label",{for:"costumerInfoTel",class:"form-label"},"電話",-1),b={class:"mb-3"},h=Object(n["h"])("label",{for:"costumerInfoAddress",class:"form-label"},"地址",-1),p={class:"mb-3"},g=Object(n["h"])("label",{for:"costumerInfoMessage",class:"form-label"},"留言",-1),v={class:"mb-3"},j=Object(n["h"])("label",{for:"costumerInfoPersonalImg",class:"form-label"},"求職照片",-1),O={class:"input-group"},I={class:"imageBtnBox"},y={key:0},k={class:"form-group"},x={for:"imageUrl"},V={class:"input-group"},w={class:"mb-3"},U=Object(n["h"])("label",{for:"costumerInfoCV",class:"form-label"},"履歷連結",-1),C=Object(n["h"])("button",{type:"submit",class:"btn btn-primary"},"送出資料",-1);function A(e,t,o,A,F,S){var E=Object(n["y"])("Field"),T=Object(n["y"])("ErrorMessage"),M=Object(n["y"])("Form");return Object(n["t"])(),Object(n["d"])("div",r,[Object(n["h"])("div",a,[Object(n["h"])("div",c,[l,Object(n["h"])(M,{ref:"customerInfoForm",onSubmit:S.checkCart},{default:Object(n["K"])((function(e){var o=e.errors;return[Object(n["h"])("div",s,[i,Object(n["h"])(E,{id:"costumerInfoName",name:"姓名",type:"text",class:["form-control",{"is-invalid":o["姓名"]}],placeholder:"請輸入姓名",rules:"required",modelValue:F.form.user.name,"onUpdate:modelValue":t[1]||(t[1]=function(e){return F.form.user.name=e}),ref:"costumerInfoName"},null,8,["class","modelValue"]),Object(n["h"])(T,{name:"姓名",class:"invalid-feedback"})]),Object(n["h"])("div",u,[f,Object(n["h"])(E,{id:"costumerInfoEmail",name:"Email",type:"text",class:["form-control",{"is-invalid":o["Email"]}],placeholder:"請輸入Email",rules:"email|required",modelValue:F.form.user.email,"onUpdate:modelValue":t[2]||(t[2]=function(e){return F.form.user.email=e}),ref:"costumerInfoName"},null,8,["class","modelValue"]),Object(n["h"])(T,{name:"Email",class:"invalid-feedback"})]),Object(n["h"])("div",m,[d,Object(n["h"])(E,{id:"costumerInfoTel",name:"電話",type:"number",class:["form-control",{"is-invalid":o["電話"]}],placeholder:"請輸入電話",rules:"required",modelValue:F.form.user.tel,"onUpdate:modelValue":t[3]||(t[3]=function(e){return F.form.user.tel=e}),ref:"costumerInfoTel"},null,8,["class","modelValue"]),Object(n["h"])(T,{name:"電話",class:"invalid-feedback"})]),Object(n["h"])("div",b,[h,Object(n["h"])(E,{id:"costumerInfoAddress",name:"地址",type:"text",class:["form-control",{"is-invalid":o["地址"]}],placeholder:"請輸入地址",rules:"required",modelValue:F.form.user.address,"onUpdate:modelValue":t[4]||(t[4]=function(e){return F.form.user.address=e}),ref:"costumerInfoAddress"},null,8,["class","modelValue"]),Object(n["h"])(T,{name:"地址",class:"invalid-feedback"})]),Object(n["h"])("div",p,[g,Object(n["h"])(E,{id:"costumerInfoMessage",name:"留言",type:"text",class:["form-control",{"is-invalid":o["留言"]}],placeholder:"請輸入",modelValue:F.form.message,"onUpdate:modelValue":t[5]||(t[5]=function(e){return F.form.message=e}),ref:"costumerInfoMessage",cols:"30",rows:"10"},null,8,["class","modelValue"]),Object(n["h"])(T,{name:"留言",class:"invalid-feedback"})]),Object(n["h"])("div",v,[j,Object(n["h"])("div",O,[Object(n["h"])("input",{id:"costumerInfoPersonalImg",name:"求職照片",type:"file",class:["form-control",{"is-invalid":o["求職照片"]}],placeholder:"請選擇照片上傳",ref:"costumerInfoPersonalImg"},null,2),Object(n["h"])("button",{type:"button",class:"btn btn-primary",onClick:t[6]||(t[6]=function(e){return S.checkFile(e)})}," 上傳照片 ")])]),Object(n["h"])("div",I,[Object(n["h"])("button",{type:"button",class:"btn btn-outline-primary btn-sm d-block w-100 my-2",onClick:t[7]||(t[7]=function(e){return S.addImageUrl()})}," 新增圖片 ")]),F.form.options.imagesUrl.length>0?(Object(n["t"])(),Object(n["d"])("div",y,[(Object(n["t"])(!0),Object(n["d"])(n["a"],null,Object(n["x"])(F.form.options.imagesUrl,(function(e,r){return Object(n["t"])(),Object(n["d"])("div",{key:"costumerInfoImgs"+r},[Object(n["h"])("div",k,[Object(n["h"])("label",x,"請選擇第 "+Object(n["B"])(r+1)+" 張圖片檔案",1),Object(n["h"])("div",V,[Object(n["h"])("input",{id:"costumerInfoImgs"+r,name:"求職照片",type:"file",class:["form-control",{"is-invalid":o["求職照片".concat(r)]}],placeholder:"請選擇照片上傳",ref:"costumerInfoImgs"+r},null,10,["id"]),Object(n["h"])("button",{type:"button",class:"btn btn-outline-primary",onClick:t[8]||(t[8]=function(e){return S.checkFile(e)}),"data-id":r,"data-action":"uploadImgs"}," 上傳照片 ",8,["data-id"]),Object(n["h"])("button",{type:"button",class:"btn btn-outline-primary",onClick:function(e){return F.form.options.imagesUrl.splice(r,1)}}," 刪除圖片 ",8,["onClick"])])]),Object(n["h"])("p",null,"連結："+Object(n["B"])(e),1),Object(n["h"])("img",{class:"img-fluid",alt:"",src:e},null,8,["src"])])})),128))])):Object(n["e"])("",!0),Object(n["h"])("div",w,[U,Object(n["h"])(E,{id:"costumerInfoCV",name:"履歷連結",type:"text",class:["form-control",{"is-invalid":o["履歷連結"]}],placeholder:"請輸入履歷連結",modelValue:F.form.options.cvLink,"onUpdate:modelValue":t[9]||(t[9]=function(e){return F.form.options.cvLink=e}),ref:"costumerInfoCV"},null,8,["class","modelValue"]),Object(n["h"])(T,{name:"履歷連結",class:"invalid-feedback"})]),C]})),_:1},8,["onSubmit"])])])])}o("9911"),o("99af");var F=o("e89f"),S={data:function(){return{form:{user:{name:"",email:"",tel:"",address:""},message:"",options:{pageAction:"apply-job",nowjobTitle:"待業",personalImg:null,imagesUrl:[]}},token:"",cartState:!1,isLogin:!1}},methods:{checkFile:function(e){var t=e.target.dataset.action,o=e.target.dataset.id;console.log(t);var n=this.$refs.costumerInfoPersonalImg.files[0],r=new FormData;r.append("PersonalImg",n),this.uploadFile(r,t,o)},uploadFile:function(e,t,o){var n=this;this.$http({method:"POST",url:"https://api.imgur.com/3/image",data:e,headers:{Authorization:"Client-ID ef6e862acf052df"},mimeType:"multipart/form-data"}).then((function(e){console.log(e.data),"uploadImgs"!==t?n.options.personalImg=e.data.data.link:n.options.imagesUrl[o]=e.data.data.link})).catch((function(e){console.log(e)}))},checkCart:function(){var e=this,t="".concat("https://vue3-course-api.hexschool.io","/api/").concat("jordanttcdesign","/cart");this.$http.get(t).then((function(t){t.data.data.carts?(e.cartState=!0,e.sendForm()):e.cartState=!1})).catch((function(e){console.log(e)}))},sendForm:function(){var e=this,t="".concat("https://vue3-course-api.hexschool.io","/api/").concat("jordanttcdesign","/order");if(!1===this.cartState)console.log("沒東西");else{var o={data:this.form};this.$http.post(t,o).then((function(t){console.log("".concat(t.data.message)),console.log(t),e.$router.push("/")})).catch((function(e){console.log(e)}))}},addImageUrl:function(){this.form.options.imagesUrl.push("")},deleteImageUrl:function(){this.form.options.imagesUrl.pop()}},created:function(){},mounted:function(){F["a"].emit("close-cart")}};S.render=A;t["default"]=S},"65f0":function(e,t,o){var n=o("861d"),r=o("e8b5"),a=o("b622"),c=a("species");e.exports=function(e,t){var o;return r(e)&&(o=e.constructor,"function"!=typeof o||o!==Array&&!r(o.prototype)?n(o)&&(o=o[c],null===o&&(o=void 0)):o=void 0),new(void 0===o?Array:o)(0===t?0:t)}},8418:function(e,t,o){"use strict";var n=o("c04e"),r=o("9bf2"),a=o("5c6c");e.exports=function(e,t,o){var c=n(t);c in e?r.f(e,c,a(0,o)):e[c]=o}},"857a":function(e,t,o){var n=o("1d80"),r=/"/g;e.exports=function(e,t,o,a){var c=String(n(e)),l="<"+t;return""!==o&&(l+=" "+o+'="'+String(a).replace(r,"&quot;")+'"'),l+">"+c+"</"+t+">"}},9911:function(e,t,o){"use strict";var n=o("23e7"),r=o("857a"),a=o("af03");n({target:"String",proto:!0,forced:a("link")},{link:function(e){return r(this,"a","href",e)}})},"99af":function(e,t,o){"use strict";var n=o("23e7"),r=o("d039"),a=o("e8b5"),c=o("861d"),l=o("7b0b"),s=o("50c4"),i=o("8418"),u=o("65f0"),f=o("1dde"),m=o("b622"),d=o("2d00"),b=m("isConcatSpreadable"),h=9007199254740991,p="Maximum allowed index exceeded",g=d>=51||!r((function(){var e=[];return e[b]=!1,e.concat()[0]!==e})),v=f("concat"),j=function(e){if(!c(e))return!1;var t=e[b];return void 0!==t?!!t:a(e)},O=!g||!v;n({target:"Array",proto:!0,forced:O},{concat:function(e){var t,o,n,r,a,c=l(this),f=u(c,0),m=0;for(t=-1,n=arguments.length;t<n;t++)if(a=-1===t?c:arguments[t],j(a)){if(r=s(a.length),m+r>h)throw TypeError(p);for(o=0;o<r;o++,m++)o in a&&i(f,m,a[o])}else{if(m>=h)throw TypeError(p);i(f,m++,a)}return f.length=m,f}})},a434:function(e,t,o){"use strict";var n=o("23e7"),r=o("23cb"),a=o("a691"),c=o("50c4"),l=o("7b0b"),s=o("65f0"),i=o("8418"),u=o("1dde"),f=u("splice"),m=Math.max,d=Math.min,b=9007199254740991,h="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!f},{splice:function(e,t){var o,n,u,f,p,g,v=l(this),j=c(v.length),O=r(e,j),I=arguments.length;if(0===I?o=n=0:1===I?(o=0,n=j-O):(o=I-2,n=d(m(a(t),0),j-O)),j+o-n>b)throw TypeError(h);for(u=s(v,n),f=0;f<n;f++)p=O+f,p in v&&i(u,f,v[p]);if(u.length=n,o<n){for(f=O;f<j-n;f++)p=f+n,g=f+o,p in v?v[g]=v[p]:delete v[g];for(f=j;f>j-n+o;f--)delete v[f-1]}else if(o>n)for(f=j-n;f>O;f--)p=f+n-1,g=f+o-1,p in v?v[g]=v[p]:delete v[g];for(f=0;f<o;f++)v[f+O]=arguments[f+2];return v.length=j-n+o,u}})},af03:function(e,t,o){var n=o("d039");e.exports=function(e){return n((function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3}))}},b0c0:function(e,t,o){var n=o("83ab"),r=o("9bf2").f,a=Function.prototype,c=a.toString,l=/^\s*function ([^ (]*)/,s="name";n&&!(s in a)&&r(a,s,{configurable:!0,get:function(){try{return c.call(this).match(l)[1]}catch(e){return""}}})},e8b5:function(e,t,o){var n=o("c6b6");e.exports=Array.isArray||function(e){return"Array"==n(e)}}}]);
//# sourceMappingURL=chunk-a900bcc2.e0b4ea8c.js.map