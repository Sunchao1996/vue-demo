(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0468"],{"7GHg":function(e,r,t){"use strict";var o=t("mh1L");t.n(o).a},PFHA:function(e,r,t){"use strict";t.r(r);var o=t("Q2cO"),a=t.n(o),n=t("rerW"),s=t.n(n),c=t("Asgo"),u=t.n(c),i=t("Y+jS"),l=t("hrJr"),f={name:"ResourcesAdd",data:function(){return{chooseResourceParent:!1,labelPosition:"right",formData:{permissionName:"ResourcesAdd",resourceName:"",resourceCode:"",resourceWebUrl:"",resourceManagerUrl:"",resourceParentId:0,resourceParentName:""},formRules:{resourceName:[{required:!0,message:"资源名称不能为空!"}],resourceCode:[{required:!0,message:"资源代码不能为空!"},{validator:function(e,r,t){new u.a(function(e){Object(i.b)({resourcesCode:r}).then(function(r){!1===r.data&&t(new Error("代码已经存在")),e()})}).then(function(){t()})},trigger:"blur"}]},resourcesList:[],treeDefaultProps:{label:"resourceName",children:"children"},treeCheckedId:0}},watch:{"formData.resourceParentId":function(e,r){function t(e,r){if(e.id===r)return e.resourceName;if(e.children&&e.children.length>0){var o=!0,a=!1,n=void 0;try{for(var c,u=s()(e.children);!(o=(c=u.next()).done);o=!0){var i=t(c.value,r);if("-1"!==i)return i}}catch(e){a=!0,n=e}finally{try{!o&&u.return&&u.return()}finally{if(a)throw n}}return"-1"}return"-1"}if(0===e)return"";if(r!==e){var o=this.resourcesList,a=!0,n=!1,c=void 0;try{for(var u,i=s()(o);!(a=(u=i.next()).done);a=!0){var l=u.value;if(l.id===e){this.formData.resourceParentName=l.resourceName;break}if(this.formData.resourceParentName=t(l,e),"-1"!==this.formData.resourceParentName)break}}catch(e){n=!0,c=e}finally{try{!a&&i.return&&i.return()}finally{if(n)throw c}}}}},created:function(){this.resourcesList=this.$route.params.list},methods:{goBack:function(){this.$router.go(-1)},checkResource:function(e,r,t){this.treeCheckedId=e.id},changeParentId:function(){this.formData.resourceParentId=this.treeCheckedId,this.chooseResourceParent=!1},submitForm:function(){var e=this;this.$refs.resourceAddForm.validate(function(r){console.log(void 0===r?"undefined":a()(r)),console.log(r),r&&new u.a(function(r,t){Object(i.a)(e.formData).then(function(r){e.$router.replace({name:"Resources"})})}).catch(function(e){Object(l.Message)({message:"失败",type:"error",duration:5e3})})})}}},d=(t("7GHg"),t("ZrdR")),m=Object(d.a)(f,function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"app-container"},[t("el-row",[t("el-col",{attrs:{offset:6,span:12}},[t("el-form",{ref:"resourceAddForm",attrs:{"label-position":e.labelPosition,"label-width":"100px",model:e.formData}},[t("el-form-item",{attrs:{label:"资源名称",prop:"resourceName",rules:e.formRules.resourceName}},[t("el-input",{model:{value:e.formData.resourceName,callback:function(r){e.$set(e.formData,"resourceName",r)},expression:"formData.resourceName"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"资源代码",prop:"resourceCode",rules:e.formRules.resourceCode}},[t("el-input",{model:{value:e.formData.resourceCode,callback:function(r){e.$set(e.formData,"resourceCode",r)},expression:"formData.resourceCode"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"父资源"}},[t("el-col",{attrs:{span:20}},[t("el-input",{attrs:{disabled:!0},model:{value:e.formData.resourceParentName,callback:function(r){e.$set(e.formData,"resourceParentName",r)},expression:"formData.resourceParentName"}})],1),e._v(" "),t("el-col",{attrs:{offset:0,span:4}},[t("el-button",{attrs:{type:"primary"},on:{click:function(r){e.chooseResourceParent=!0}}},[e._v("选择")])],1)],1),e._v(" "),t("el-form-item",{attrs:{label:"web路径"}},[t("el-input",{model:{value:e.formData.resourceWebUrl,callback:function(r){e.$set(e.formData,"resourceWebUrl",r)},expression:"formData.resourceWebUrl"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"manage路径"}},[t("el-input",{model:{value:e.formData.resourceManagerUrl,callback:function(r){e.$set(e.formData,"resourceManagerUrl",r)},expression:"formData.resourceManagerUrl"}})],1),e._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("立即创建")]),e._v(" "),t("el-button",{on:{click:e.goBack}},[e._v("返回")])],1)],1)],1)],1),e._v(" "),t("el-dialog",{attrs:{title:"选择",visible:e.chooseResourceParent,width:"30%"},on:{"update:visible":function(r){e.chooseResourceParent=r}}},[t("el-tree",{attrs:{data:e.resourcesList,props:e.treeDefaultProps,"check-on-click-node":!0},on:{"node-click":e.checkResource}}),e._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(r){e.chooseResourceParent=!1}}},[e._v("取 消")]),e._v(" "),t("el-button",{attrs:{type:"primary"},on:{click:e.changeParentId}},[e._v("确 定")])],1)],1)],1)},[],!1,null,"13e7242c",null);m.options.__file="add.vue";r.default=m.exports},"Y+jS":function(e,r,t){"use strict";t.d(r,"e",function(){return a}),t.d(r,"b",function(){return n}),t.d(r,"a",function(){return s}),t.d(r,"c",function(){return c}),t.d(r,"d",function(){return u}),t.d(r,"f",function(){return i});var o=t("t3Un");function a(e){return Object(o.a)({url:"/sys/resources/list",method:"get",params:e})}function n(e){return Object(o.a)({url:"/sys/resources/checkCode",method:"get",params:e})}function s(e){return Object(o.a)({url:"/sys/resources/add",method:"post",data:e})}function c(e){return Object(o.a)({url:"/sys/resources/delete",method:"get",params:e})}function u(e){return Object(o.a)({url:"/sys/resources/getById",method:"get",params:e})}function i(e){return Object(o.a)({url:"/sys/resources/update",method:"post",data:e})}},mh1L:function(e,r,t){}}]);