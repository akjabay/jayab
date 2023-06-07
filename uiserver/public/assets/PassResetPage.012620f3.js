import{Q as n}from"./QInput.12ca7d0b.js";import{_ as $,d as g,r as i,A as y,D as u,E as p,G as o,C as q,H as l,j as t,J as w,M as d,I as r,Q as m,L as b}from"./index.92eb8bda.js";import{Q as f}from"./QCard.6a86b0c3.js";import{Q as v}from"./QPage.22378cf4.js";import{u as V}from"./use-dark.ecf38b9d.js";import{a as h}from"./index.191899c2.js";import{M as C}from"./MainTitleComp.e992e00d.js";import"./use-form.c87ee303.js";import"./focus-manager.32f8d49a.js";import"./axios.a466877b.js";const P=g({name:"PassResetPage",components:{MainTitleComp:C},setup(){return{email:i(""),password:i(""),confirmPassword:i(""),code:i(""),rules:i({}),form1:i(!0),form2:i(!1),loading:i(!1),disable:i(!1)}},methods:{...y(V,["setUser","setToken"]),async onSubmit(){this.loading=!0;try{if(!this.email||!/\S+@\S+\.\S+/.test(this.email))return this.loading=!1,this.$q.notify({type:"warning",message:this.$t("failed"),caption:this.$t("fillRequiredFields")});const e=await h.auth.authResetPassword({email:this.email});e.data.errors?this.$q.notify({type:"negative",message:this.$t("failed"),caption:this.$t("failed")}):e.data.data.authResetPassword.id?(this.user=e.data.data.authResetPassword,this.form1=!1,this.form2=!0,this.$q.notify({type:"positive",message:this.$t("success"),caption:this.$t("successRegister")})):this.$q.notify({type:"negative",message:this.$t("failed"),caption:this.$t("failed")})}catch(e){this.loading=!1,console.log(e,"error on fecth data"),this.$q.notify({type:"negative",message:this.$t("failed"),caption:this.$t("failed")})}this.loading=!1},async codeVerify(){this.loading=!0;try{if(this.password!=this.confirmPassword)return this.$q.notify({type:"negative",message:this.$t("failed"),caption:this.$t("passwordsAreNotMatch")});const e=await h.auth.authResetPasswordVerify({email:this.email,password:this.password,code:this.code});e.data.errors?this.$q.notify({type:"negative",message:this.$t("failed"),caption:this.$t("failed")}):e.data.data.authResetPasswordVerify.id?(this.$q.notify({type:"positive",message:this.$t("success"),caption:this.$t("successResetPassword")}),this.$router.push({path:"/accounts/login"})):this.$q.notify({type:"negative",message:this.$t("failed"),caption:this.$t("failed")})}catch(e){console.log(e,"error on fecth data"),this.loading=!1,this.$q.notify({type:"negative",message:this.$t("failed"),caption:this.$t("failed")})}this.loading=!1}},mounted(){this.rules={required:e=>!!e||"required",min3:e=>e.length>=3||"min3Character",min8:e=>e.length>=8||"min8Character",email:(e,s)=>s.email(e)||"havetoBeValidEmail"}}}),R={class:"row justify-center text-center q-mt-xl"},k={class:"col-12 col-md-4 col-sm-6 text-center"},A={key:0,class:"q-py-sm q-mx-sm"},Q={class:"col-12 text-center"},S={class:"col-12 text-center"},B={class:"text-h5 text-center q-pa-sm q-mb-sm"};function N(e,s,U,E,M,T){const c=q("main-title-comp");return u(),p(v,null,{default:o(()=>[l("div",R,[l("div",k,[t(c,{title:e.$t("passwordReset")},null,8,["title"]),e.form1?(u(),w("div",A,[l("div",Q,[t(n,{required:"",outlined:"",class:"q-mt-sm",modelValue:e.email,"onUpdate:modelValue":s[0]||(s[0]=a=>e.email=a),rules:[e.rules.required,e.rules.email],label:e.$t("inputEmail")},null,8,["modelValue","rules","label"]),t(m,{loading:e.loading,onClick:e.onSubmit,class:"full-width q-mt-sm ad-primary-btn"},{default:o(()=>[d(r(e.$t("submit")),1)]),_:1},8,["loading","onClick"])])])):e.form2?(u(),p(f,{key:1,bordered:"",class:"q-pa-sm q-mx-sm",flat:""},{default:o(()=>[l("div",S,[l("div",B,r(e.$t("verifyCodeAndReset")),1),t(n,{outlined:"",class:"q-mt-sm",modelValue:e.code,"onUpdate:modelValue":s[1]||(s[1]=a=>e.code=a),rules:[e.rules.required],label:e.$t("inputVerificationCode")},null,8,["modelValue","rules","label"]),t(n,{outlined:"",class:"q-mt-sm",modelValue:e.password,"onUpdate:modelValue":s[2]||(s[2]=a=>e.password=a),rules:[e.rules.required,e.rules.min8],type:"password",label:e.$t("inputPassword")},null,8,["modelValue","rules","label"]),t(n,{outlined:"",class:"q-mt-sm",modelValue:e.confirmPassword,"onUpdate:modelValue":s[3]||(s[3]=a=>e.confirmPassword=a),rules:[e.rules.required,e.rules.min8],type:"password",label:e.$t("inputConfirmPassword")},null,8,["modelValue","rules","label"]),t(m,{onClick:e.codeVerify,class:"full-width q-mt-sm ad-primary-btn"},{default:o(()=>[d(r(e.$t("submit")),1)]),_:1},8,["onClick"])]),t(f,{bordered:"",class:"q-pa-sm q-ma-sm",flat:""},{default:o(()=>[l("span",null,r(e.$t("didnotRecieveCode")),1),t(m,{"no-caps":"",dense:"",flat:"",disable:e.disable,loading:e.loading,class:"q-mx-xs",color:"primary",onClick:s[4]||(s[4]=a=>(e.onSubmit,e.disable=!0))},{default:o(()=>[d(r(e.$t("tryAgain")),1)]),_:1},8,["disable","loading"])]),_:1})]),_:1})):b("",!0),t(f,{bordered:"",class:"q-pa-sm q-ma-sm",flat:""},{default:o(()=>[l("span",null,r(e.$t("dontHaveAnAccount")),1),t(m,{"no-caps":"",dense:"",flat:"",class:"q-mx-xs",color:"primary",onClick:s[5]||(s[5]=a=>e.$router.push("/accounts/signup"))},{default:o(()=>[d(r(e.$t("signup")),1)]),_:1})]),_:1})])])]),_:1})}var O=$(P,[["render",N]]);export{O as default};