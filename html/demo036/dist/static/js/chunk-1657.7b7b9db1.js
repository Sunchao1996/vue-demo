(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-1657"],{"1I7K":function(t,e,a){"use strict";var r=a("AYiW");a.n(r).a},"8UjW":function(t,e,a){},AYiW:function(t,e,a){},JhLU:function(t,e,a){"use strict";a.d(e,"f",function(){return o}),a.d(e,"h",function(){return s}),a.d(e,"g",function(){return n}),a.d(e,"a",function(){return u}),a.d(e,"d",function(){return l}),a.d(e,"b",function(){return i}),a.d(e,"c",function(){return c}),a.d(e,"e",function(){return m});var r=a("t3Un");function o(t){return Object(r.a)({url:"/sys/user/list",method:"post",data:t})}function s(t){return Object(r.a)({url:"/sys/user/updateStatus",method:"post",data:t})}function n(t){return Object(r.a)({url:"/sys/user/updateResetPwd",method:"post",data:t})}function u(t){return Object(r.a)({url:"/sys/user/checkUserCode",method:"post",data:{userName:t}})}function l(t){return Object(r.a)({url:"/sys/user/addUser",method:"post",data:t})}function i(t){return Object(r.a)({url:"/sys/user/deleteUser",method:"post",data:{id:t}})}function c(t){return Object(r.a)({url:"/sys/user/getById",method:"post",data:{id:t}})}function m(t){return Object(r.a)({url:"/sys/user/updateUser",method:"post",data:t})}},PLwA:function(t,e,a){"use strict";var r={name:"PanThumb",props:{image:{type:String,required:!0},zIndex:{type:Number,default:1},width:{type:String,default:"150px"},height:{type:String,default:"150px"}}},o=(a("WOds"),a("ZrdR")),s=Object(o.a)(r,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"pan-item",style:{zIndex:this.zIndex,height:this.height,width:this.width}},[e("div",{staticClass:"pan-info"},[e("div",{staticClass:"pan-info-roles-container"},[this._t("default")],2)]),this._v(" "),e("img",{staticClass:"pan-thumb",attrs:{src:this.image}})])},[],!1,null,"115ed215",null);s.options.__file="index.vue";e.a=s.exports},WOds:function(t,e,a){"use strict";var r=a("8UjW");a.n(r).a},XVEU:function(t,e,a){"use strict";a.d(e,"e",function(){return o}),a.d(e,"a",function(){return s}),a.d(e,"b",function(){return n}),a.d(e,"c",function(){return u}),a.d(e,"d",function(){return l}),a.d(e,"f",function(){return i});var r=a("t3Un");function o(t){return Object(r.a)({url:"/sys/roles/list",method:"get",params:t})}function s(t){return Object(r.a)({url:"/sys/roles/add",method:"post",data:t})}function n(t){return Object(r.a)({url:"/sys/roles/checkRoleCode",method:"post",data:{roleCode:t}})}function u(t){return Object(r.a)({url:"/sys/roles/delete",method:"post",data:{roleId:t}})}function l(t){return Object(r.a)({url:"/sys/roles/get",method:"post",data:{roleId:t}})}function i(t){return Object(r.a)({url:"/sys/roles/update",method:"post",data:t})}},wDJT:function(t,e,a){"use strict";a.r(e);var r=a("rerW"),o=a.n(r),s=a("6ZY3"),n=a.n(s),u=a("JhLU"),l=a("XVEU"),i=a("hrJr"),c=a("Zjr4"),m=a("PLwA"),d={name:"UsersUpdate",components:{"my-upload":c.a,PanThumb:m.a},data:function(){var t=this;return{oldUserName:"",formSubmit:!0,avatarComponentShow:!1,labelPosition:"right",checkRolesId:[],userRolesAllId:[],formData:{id:"",userName:"",userMobile:"",userStatus:0,userRealName:"",userAvatar:"",roles:"",userIntroduction:"",imgDataUrl:""},formRules:{userName:[{required:!0,message:"用户名不能为空!"},{validator:function(e,a,r){void 0!==t.oldUserName&&a!==t.oldUserName?Object(u.a)(a).then(function(t){!1===t.data?r(new Error("用户名已经存在")):r()}).catch(function(t){r(new Error("校验失败~"))}):r()},trigger:"blur"}],userRealName:[{required:!0,message:"姓名不能为空!"}]}}},watch:{},created:function(){var t=this;Object(l.e)({}).then(function(e){t.formSubmit=!0;var a=!0,r=!1,s=void 0;try{for(var l,i=o()(e.data);!(a=(l=i.next()).done);a=!0){var c=l.value;t.userRolesAllId.push({key:""+c.id,label:c.roleName})}}catch(t){r=!0,s=t}finally{try{!a&&i.return&&i.return()}finally{if(r)throw s}}var m=t.$route.params.id;Object(u.c)(m).then(function(e){t.formSubmit=!0,t.formData=n()({},t.formData,e.data),t.formData.imgDataUrl=t.formData.userAvatar,t.oldUserName=t.formData.userName,t.checkRolesId=t.formData.roles.split("@")}).catch(function(){t.formSubmit=!1})}).catch(function(){t.formSubmit=!1,Object(i.Message)({message:"获取角色列表失败",type:"error",duration:5e3})})},methods:{cropSuccess:function(t,e){this.formData.userAvatar=t,this.formData.imgDataUrl=t},chooseAvatar:function(){this.avatarComponentShow=!0},goBack:function(){this.$router.go(-1)},submitForm:function(){var t=this;this.$refs.userUpdateForm.validate(function(e){e&&t.formSubmit&&Object(u.e)(t.formData).then(function(){t.$router.replace({name:"Users"})}).catch(function(){console.log("修改用户失败")})})},roleChanage:function(t,e,a){this.formData.roles=this.checkRolesId.join("@")}}},f=(a("1I7K"),a("ZrdR")),h=Object(f.a)(d,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("el-row",[a("el-col",{attrs:{offset:5,span:14}},[a("el-form",{ref:"userUpdateForm",attrs:{"label-position":t.labelPosition,"label-width":"100px",model:t.formData}},[a("el-form-item",{attrs:{label:"用户名",prop:"userName",rules:t.formRules.userName}},[a("el-input",{attrs:{disabled:!0},model:{value:t.formData.userName,callback:function(e){t.$set(t.formData,"userName",e)},expression:"formData.userName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"真实姓名",prop:"userRealName",rules:t.formRules.userRealName}},[a("el-input",{model:{value:t.formData.userRealName,callback:function(e){t.$set(t.formData,"userRealName",e)},expression:"formData.userRealName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"是否启用"}},[a("el-col",{attrs:{span:20}},[a("el-radio",{attrs:{label:0},model:{value:t.formData.userStatus,callback:function(e){t.$set(t.formData,"userStatus",e)},expression:"formData.userStatus"}},[t._v("启用")]),t._v(" "),a("el-radio",{attrs:{label:1},model:{value:t.formData.userStatus,callback:function(e){t.$set(t.formData,"userStatus",e)},expression:"formData.userStatus"}},[t._v("禁用")])],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"手机号"}},[a("el-input",{model:{value:t.formData.userMobile,callback:function(e){t.$set(t.formData,"userMobile",e)},expression:"formData.userMobile"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"头像"}},[a("el-col",{attrs:{span:3}},[a("el-button",{attrs:{type:"primary"},on:{click:t.chooseAvatar}},[t._v("选择")])],1),t._v(" "),a("el-col",{attrs:{offset:1,span:4}},[a("pan-thumb",{attrs:{image:t.formData.imgDataUrl,width:"60px",height:"60px"}})],1),t._v(" "),a("my-upload",{attrs:{field:"img",width:200,height:200,"img-format":"png"},on:{"crop-success":t.cropSuccess},model:{value:t.avatarComponentShow,callback:function(e){t.avatarComponentShow=e},expression:"avatarComponentShow"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"简介"}},[a("el-input",{model:{value:t.formData.userIntroduction,callback:function(e){t.$set(t.formData,"userIntroduction",e)},expression:"formData.userIntroduction"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"用户角色"}},[a("el-transfer",{staticStyle:{"text-align":"left",display:"inline-block"},attrs:{filterable:"",titles:["未选中角色","选中角色"],"button-texts":["移除","添加"],format:{noChecked:"${total}",hasChecked:"${checked}/${total}"},data:t.userRolesAllId},on:{change:t.roleChanage},model:{value:t.checkRolesId,callback:function(e){t.checkRolesId=e},expression:"checkRolesId"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.submitForm}},[t._v("立即更新")]),t._v(" "),a("el-button",{on:{click:t.goBack}},[t._v("返回")])],1)],1)],1)],1)],1)},[],!1,null,"3e3fac97",null);h.options.__file="update.vue";e.default=h.exports}}]);