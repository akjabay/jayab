import{Q as u}from"./QInput.12ca7d0b.js";import{d as T,h as Q,_ as O,r as o,A as P,D as f,E as M,G as a,C as q,H as n,j as i,J as U,M as h,I as l,Q as p,aw as B,L as C}from"./index.92eb8bda.js";import{Q as H}from"./QCardSection.b00a13b0.js";import{u as R,Q as F}from"./use-dark.ecf38b9d.js";import{Q as G}from"./QCardActions.b7f8084b.js";import{Q as b}from"./QCard.6a86b0c3.js";import{Q as j}from"./QPage.22378cf4.js";import{a as V}from"./index.191899c2.js";import{M as Y}from"./MainTitleComp.e992e00d.js";import{C as z}from"./CityComp.d0d8ac6d.js";import"./use-form.c87ee303.js";import"./focus-manager.32f8d49a.js";import"./axios.a466877b.js";import"./QSeparator.1669020d.js";import"./selection.aecaed73.js";import"./focusout.7593105c.js";import"./format.801e7424.js";import"./QDialog.081ad832.js";import"./use-transition.76624cdd.js";/*! vue-countdown v2.1.0 | (c) 2018-present Chen Fengyuan | MIT */const c=1e3,y=60*c,g=60*y,w=24*g,S="abort",E="end",I="progress",N="start",k="visibilitychange";var J=T({name:"VueCountdown",props:{autoStart:{type:Boolean,default:!0},emitEvents:{type:Boolean,default:!0},interval:{type:Number,default:1e3,validator:t=>t>=0},now:{type:Function,default:()=>Date.now()},tag:{type:String,default:"span"},time:{type:Number,default:0,validator:t=>t>=0},transform:{type:Function,default:t=>t}},emits:[S,E,I,N],data(){return{counting:!1,endTime:0,totalMilliseconds:0,requestId:0}},computed:{days(){return Math.floor(this.totalMilliseconds/w)},hours(){return Math.floor(this.totalMilliseconds%w/g)},minutes(){return Math.floor(this.totalMilliseconds%g/y)},seconds(){return Math.floor(this.totalMilliseconds%y/c)},milliseconds(){return Math.floor(this.totalMilliseconds%c)},totalDays(){return this.days},totalHours(){return Math.floor(this.totalMilliseconds/g)},totalMinutes(){return Math.floor(this.totalMilliseconds/y)},totalSeconds(){return Math.floor(this.totalMilliseconds/c)}},watch:{$props:{deep:!0,immediate:!0,handler(){this.totalMilliseconds=this.time,this.endTime=this.now()+this.time,this.autoStart&&this.start()}}},mounted(){document.addEventListener(k,this.handleVisibilityChange)},beforeUnmount(){document.removeEventListener(k,this.handleVisibilityChange),this.pause()},methods:{start(){this.counting||(this.counting=!0,this.emitEvents&&this.$emit(N),document.visibilityState==="visible"&&this.continue())},continue(){if(!this.counting)return;const t=Math.min(this.totalMilliseconds,this.interval);if(t>0){let e,r;const m=d=>{e||(e=d),r||(r=d);const $=d-e;$>=t||$+(d-r)/2>=t?this.progress():this.requestId=requestAnimationFrame(m),r=d};this.requestId=requestAnimationFrame(m)}else this.end()},pause(){cancelAnimationFrame(this.requestId)},progress(){!this.counting||(this.totalMilliseconds-=this.interval,this.emitEvents&&this.totalMilliseconds>0&&this.$emit(I,{days:this.days,hours:this.hours,minutes:this.minutes,seconds:this.seconds,milliseconds:this.milliseconds,totalDays:this.totalDays,totalHours:this.totalHours,totalMinutes:this.totalMinutes,totalSeconds:this.totalSeconds,totalMilliseconds:this.totalMilliseconds}),this.continue())},abort(){!this.counting||(this.pause(),this.counting=!1,this.emitEvents&&this.$emit(S))},end(){!this.counting||(this.pause(),this.totalMilliseconds=0,this.counting=!1,this.emitEvents&&this.$emit(E))},update(){this.counting&&(this.totalMilliseconds=Math.max(0,this.endTime-this.now()))},restart(){this.pause(),this.totalMilliseconds=this.time,this.endTime=this.now()+this.time,this.counting=!1,this.start()},handleVisibilityChange(){switch(document.visibilityState){case"visible":this.update(),this.continue();break;case"hidden":this.pause();break}}},render(){return Q(this.tag,this.$slots.default?[this.$slots.default(this.transform({days:this.days,hours:this.hours,minutes:this.minutes,seconds:this.seconds,milliseconds:this.milliseconds,totalDays:this.totalDays,totalHours:this.totalHours,totalMinutes:this.totalMinutes,totalSeconds:this.totalSeconds,totalMilliseconds:this.totalMilliseconds}))]:void 0)}});const K=T({name:"SignupPage",components:{MainTitleComp:Y,VueCountdown:J,CityComp:z},setup(){return{name:o(""),email:o(""),phone:o(""),address:o(""),password:o(""),confirmPassword:o(""),city:o({}),provinces:o([]),code:o(""),countDownTime:o(5*60*1e3),rules:o({}),form1:o(!0),form2:o(!1),user:o({}),disable:o(!1),loading:o(!1)}},methods:{...P(R,["setUser","setToken"]),onSelectCity(t){this.city=t},async register(){this.loading=!0;try{if(this.password!=this.confirmPassword)return this.$q.notify({type:"negative",message:this.$t("failed"),caption:this.$t("passwordsAreNotMatch")});const t=await V.auth.authSignup({name:this.name,email:this.email,phone:this.phone,address:this.address,password:this.password,cityId:this.city?this.city.id:""});t.data.errors?this.$q.notify({type:"negative",message:this.$t("failed"),caption:this.$t("failed")}):t.data.data.authSignup.id?(this.user=t.data.data.authSignup,this.form1=!1,this.form2=!1,this.form2=!0,this.$q.notify({type:"positive",message:this.$t("success"),caption:this.$t("successRegister")})):this.$q.notify({type:"negative",message:this.$t("failed"),caption:this.$t("failed")})}catch(t){this.loading=!1,console.log(t,"error on fecth data"),this.$q.notify({type:"negative",message:this.$t("failed"),caption:this.$t("failed")})}this.loading=!1},async codeVerify(){this.loading=!0;try{const t=await V.auth.authVerify({email:this.email,password:this.password,code:this.code});if(t.data.errors)this.$q.notify({type:"negative",message:this.$t("failed"),caption:this.$t("failed")});else if(t.data.data.authVerify.token){const e=t.data.data.authVerify.user;this.setUser(e),this.setToken(t.data.data.authVerify.token),this.$router.push({path:"/"})}else this.$q.notify({type:"negative",message:this.$t("failed"),caption:this.$t("failed")})}catch(t){console.log(t,"error on fecth data"),this.loading=!1,this.$q.notify({type:"negative",message:this.$t("failed"),caption:this.$t("failed")})}this.loading=!1},filterFn(t,e){e(()=>{if(t==="")this.filterOptions=options;else{const r=t.toLowerCase();this.filterOptions=options.filter(m=>m.name.toLowerCase().indexOf(r)>-1)}})},async fetchData(){try{const t=await V.main.getProvinces();if(t.status===200){const e=t.data.data;this.provinces=e}}catch(t){const e=new Error(t);console.log(e),this.$q.notify({type:"negative",message:this.$t("failed"),caption:this.$t("failed")})}}},mounted(){this.rules={required:t=>!!t||this.$t("required"),min3:t=>t.length>=3||this.$t("min3Character"),min8:t=>t.length>=8||this.$t("min8Character"),is11:t=>t.length==11||this.$t("is11Character"),email:(t,e)=>e.email(t)||this.$t("havetoBeValidEmail")},this.fetchData()}}),W={class:"row justify-center text-center q-mt-xl"},X={class:"col-12 col-md-4 col-sm-6 text-center"},Z={key:0,class:"q-py-sm q-mx-sm"},_={class:"col-12 text-center"},x={class:"col-12 text-center"},tt={class:"text-h5 text-center ad-font-color q-pa-sm q-mb-sm"},et={class:"text-h5 ad-font-color"};function st(t,e,r,m,d,$){const D=q("main-title-comp"),A=q("city-comp"),L=q("vue-countdown");return f(),M(j,null,{default:a(()=>[n("div",W,[n("div",X,[i(D,{title:t.$t("signup")},null,8,["title"]),t.form1?(f(),U("div",Z,[n("div",_,[i(A,{items:t.provinces,item:t.city,onOnSelectItem:t.onSelectCity},null,8,["items","item","onOnSelectItem"]),i(u,{outlined:"",class:"q-mt-sm",modelValue:t.name,"onUpdate:modelValue":e[0]||(e[0]=s=>t.name=s),rules:[t.rules.required,t.rules.min3],label:t.$t("inputName")},null,8,["modelValue","rules","label"]),i(u,{outlined:"",class:"q-mt-sm",modelValue:t.email,"onUpdate:modelValue":e[1]||(e[1]=s=>t.email=s),rules:[t.rules.required,t.rules.min3,t.rules.email],label:t.$t("inputEmail")},null,8,["modelValue","rules","label"]),i(u,{outlined:"",class:"col-8",type:"tel",maxlength:"11",modelValue:t.phone,"onUpdate:modelValue":e[2]||(e[2]=s=>t.phone=s),rules:[t.rules.required,t.rules.is11],label:t.$t("inputPhone")},null,8,["modelValue","rules","label"]),i(u,{outlined:"",class:"q-mt-sm",modelValue:t.password,"onUpdate:modelValue":e[3]||(e[3]=s=>t.password=s),rules:[t.rules.required,t.rules.min8],type:"password",label:t.$t("inputPassword")},null,8,["modelValue","rules","label"]),i(u,{outlined:"",class:"q-mt-sm",modelValue:t.confirmPassword,"onUpdate:modelValue":e[4]||(e[4]=s=>t.confirmPassword=s),rules:[t.rules.required,t.rules.min8],type:"password",label:t.$t("inputConfirmPassword")},null,8,["modelValue","rules","label"]),i(p,{loading:t.loading,onClick:t.register,class:"full-width q-mt-sm ad-primary-btn"},{default:a(()=>[h(l(t.$t("signup")),1)]),_:1},8,["loading","onClick"])])])):t.form2?(f(),M(b,{key:1,bordered:"",class:"q-pa-sm q-mx-sm",flat:""},{default:a(()=>[n("div",x,[n("div",tt,l(t.$t("verifyAccount")),1),i(H,{style:B("direction: "+t.$t("direction"))},{default:a(()=>[i(L,{time:t.countDownTime},{default:a(({minutes:s,seconds:v})=>[n("span",et,l(`${s}`.length==2?s:"0"+s)+": "+l(`${v}`.length==2?v:"0"+v),1)]),_:1},8,["time"])]),_:1},8,["style"]),i(u,{outlined:"",class:"q-mt-sm",modelValue:t.code,"onUpdate:modelValue":e[5]||(e[5]=s=>t.code=s),rules:[t.rules.required],label:t.$t("inputVerificationCode")},null,8,["modelValue","rules","label"]),i(p,{onClick:t.codeVerify,class:"full-width q-mt-sm ad-primary-btn"},{default:a(()=>[h(l(t.$t("submit")),1)]),_:1},8,["onClick"])]),i(G,null,{default:a(()=>[t.$t("direction")=="rtl"?(f(),M(F,{key:0})):C("",!0),i(p,{onClick:e[6]||(e[6]=s=>(t.form2=!1,t.form1=!0)),dense:"",flat:"",color:"primary"},{default:a(()=>[h(l(t.$t("back")),1)]),_:1})]),_:1}),i(b,{bordered:"",class:"q-pa-sm q-ma-sm",flat:""},{default:a(()=>[n("span",null,l(t.$t("didnotRecieveCode")),1),i(p,{"no-caps":"",dense:"",flat:"",disable:t.disable,loading:t.loading,class:"q-mx-xs",color:"primary",onClick:e[7]||(e[7]=s=>(t.register,t.disable=!0))},{default:a(()=>[h(l(t.$t("tryAgain")),1)]),_:1},8,["disable","loading"])]),_:1})]),_:1})):C("",!0),i(b,{bordered:"",class:"q-pa-sm q-ma-sm",flat:""},{default:a(()=>[n("span",null,l(t.$t("haveAnAccount")),1),i(p,{"no-caps":"",dense:"",flat:"",class:"q-mx-xs",color:"primary",onClick:e[8]||(e[8]=s=>t.$router.push("/accounts/login"))},{default:a(()=>[h(l(t.$t("login")),1)]),_:1})]),_:1})])])]),_:1})}var bt=O(K,[["render",st]]);export{bt as default};