import{l as I,i as ie,m as A,n as ee,c as d,h as g,p as V,g as te,q as re,t as de,r as w,u as fe,v as x,w as R,a as me,x as pe,y as ve,z as he,d as oe,A as ue,B as ge,_ as se,C as F,D as v,E as C,G as r,j as s,H as c,I as h,J as _,K as q,L as Q,Q as z,M as T,N as ye,O as E,P as W}from"./index.92eb8bda.js";import{Q as $e,a as X,b as be,c as K,d as B}from"./selection.aecaed73.js";import{g as G}from"./focusout.7593105c.js";import{u as Z,Q as ne}from"./use-dark.ecf38b9d.js";import{Q as ce}from"./QImg.19909024.js";import{D as qe,Q as we}from"./DarkComp.70867288.js";import{C as J}from"./ClosePopup.868af168.js";import{a as ke}from"./index.191899c2.js";import"./focus-manager.32f8d49a.js";import"./QBtnGroup.fb2721f3.js";import"./use-transition.76624cdd.js";import"./use-form.c87ee303.js";import"./QToggle.cb4ae876.js";import"./axios.a466877b.js";var Ce=I({name:"QPageContainer",setup(e,{slots:t}){const{proxy:{$q:i}}=te(),l=ie(ee,A);if(l===A)return console.error("QPageContainer needs to be child of QLayout"),A;re(de,!0);const n=d(()=>{const f={};return l.header.space===!0&&(f.paddingTop=`${l.header.size}px`),l.right.space===!0&&(f[`padding${i.lang.rtl===!0?"Left":"Right"}`]=`${l.right.size}px`),l.footer.space===!0&&(f.paddingBottom=`${l.footer.size}px`),l.left.space===!0&&(f[`padding${i.lang.rtl===!0?"Right":"Left"}`]=`${l.left.size}px`),f});return()=>g("div",{class:"q-page-container",style:n.value},V(t.default))}}),Se=I({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:t,emit:i}){const{proxy:{$q:l}}=te(),n=w(null),f=w(l.screen.height),m=w(e.container===!0?0:l.screen.width),u=w({position:0,direction:"down",inflectionPoint:0}),k=w(0),y=w(fe.value===!0?0:G()),U=d(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),D=d(()=>e.container===!1?{minHeight:l.screen.height+"px"}:null),N=d(()=>y.value!==0?{[l.lang.rtl===!0?"left":"right"]:`${y.value}px`}:null),$=d(()=>y.value!==0?{[l.lang.rtl===!0?"right":"left"]:0,[l.lang.rtl===!0?"left":"right"]:`-${y.value}px`,width:`calc(100% + ${y.value}px)`}:null);function S(a){if(e.container===!0||document.qScrollPrevented!==!0){const p={position:a.position.top,direction:a.direction,directionChanged:a.directionChanged,inflectionPoint:a.inflectionPoint.top,delta:a.delta.top};u.value=p,e.onScroll!==void 0&&i("scroll",p)}}function M(a){const{height:p,width:L}=a;let P=!1;f.value!==p&&(P=!0,f.value=p,e.onScrollHeight!==void 0&&i("scrollHeight",p),H()),m.value!==L&&(P=!0,m.value=L),P===!0&&e.onResize!==void 0&&i("resize",a)}function O({height:a}){k.value!==a&&(k.value=a,H())}function H(){if(e.container===!0){const a=f.value>k.value?G():0;y.value!==a&&(y.value=a)}}let o=null;const b={instances:{},view:d(()=>e.view),isContainer:d(()=>e.container),rootRef:n,height:f,containerHeight:k,scrollbarWidth:y,totalWidth:d(()=>m.value+y.value),rows:d(()=>{const a=e.view.toLowerCase().split(" ");return{top:a[0].split(""),middle:a[1].split(""),bottom:a[2].split("")}}),header:x({size:0,offset:0,space:!1}),right:x({size:300,offset:0,space:!1}),footer:x({size:0,offset:0,space:!1}),left:x({size:300,offset:0,space:!1}),scroll:u,animate(){o!==null?clearTimeout(o):document.body.classList.add("q-body--layout-animate"),o=setTimeout(()=>{o=null,document.body.classList.remove("q-body--layout-animate")},155)},update(a,p,L){b[a][p]=L}};if(re(ee,b),G()>0){let L=function(){a=null,p.classList.remove("hide-scrollbar")},P=function(){if(a===null){if(p.scrollHeight>l.screen.height)return;p.classList.add("hide-scrollbar")}else clearTimeout(a);a=setTimeout(L,300)},j=function(ae){a!==null&&ae==="remove"&&(clearTimeout(a),L()),window[`${ae}EventListener`]("resize",P)},a=null;const p=document.body;R(()=>e.container!==!0?"add":"remove",j),e.container!==!0&&j("add"),me(()=>{j("remove")})}return()=>{const a=pe(t.default,[g($e,{onScroll:S}),g(X,{onResize:M})]),p=g("div",{class:U.value,style:D.value,ref:e.container===!0?void 0:n,tabindex:-1},a);return e.container===!0?g("div",{class:"q-layout-container overflow-hidden",ref:n},[g(X,{onResize:O}),g("div",{class:"absolute-full",style:N.value},[g("div",{class:"scroll",style:$.value},[p])])]):p}}}),Le=I({name:"QToolbarTitle",props:{shrink:Boolean},setup(e,{slots:t}){const i=d(()=>"q-toolbar__title ellipsis"+(e.shrink===!0?" col-shrink":""));return()=>g("div",{class:i.value},V(t.default))}}),Y=I({name:"QItemLabel",props:{overline:Boolean,caption:Boolean,header:Boolean,lines:[Number,String]},setup(e,{slots:t}){const i=d(()=>parseInt(e.lines,10)),l=d(()=>"q-item__label"+(e.overline===!0?" q-item__label--overline text-overline":"")+(e.caption===!0?" q-item__label--caption text-caption":"")+(e.header===!0?" q-item__label--header":"")+(i.value===1?" ellipsis":"")),n=d(()=>e.lines!==void 0&&i.value>1?{overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":i.value}:null);return()=>g("div",{style:n.value,class:l.value},V(t.default))}}),le=I({name:"QToolbar",props:{inset:Boolean},setup(e,{slots:t}){const i=d(()=>"q-toolbar row no-wrap items-center"+(e.inset===!0?" q-toolbar--inset":""));return()=>g("div",{class:i.value,role:"toolbar"},V(t.default))}}),Qe=I({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:t,emit:i}){const{proxy:{$q:l}}=te(),n=ie(ee,A);if(n===A)return console.error("QHeader needs to be child of QLayout"),A;const f=w(parseInt(e.heightHint,10)),m=w(!0),u=d(()=>e.reveal===!0||n.view.value.indexOf("H")>-1||l.platform.is.ios&&n.isContainer.value===!0),k=d(()=>{if(e.modelValue!==!0)return 0;if(u.value===!0)return m.value===!0?f.value:0;const o=f.value-n.scroll.value.position;return o>0?o:0}),y=d(()=>e.modelValue!==!0||u.value===!0&&m.value!==!0),U=d(()=>e.modelValue===!0&&y.value===!0&&e.reveal===!0),D=d(()=>"q-header q-layout__section--marginal "+(u.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(y.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),N=d(()=>{const o=n.rows.value.top,b={};return o[0]==="l"&&n.left.space===!0&&(b[l.lang.rtl===!0?"right":"left"]=`${n.left.size}px`),o[2]==="r"&&n.right.space===!0&&(b[l.lang.rtl===!0?"left":"right"]=`${n.right.size}px`),b});function $(o,b){n.update("header",o,b)}function S(o,b){o.value!==b&&(o.value=b)}function M({height:o}){S(f,o),$("size",o)}function O(o){U.value===!0&&S(m,!0),i("focusin",o)}R(()=>e.modelValue,o=>{$("space",o),S(m,!0),n.animate()}),R(k,o=>{$("offset",o)}),R(()=>e.reveal,o=>{o===!1&&S(m,e.modelValue)}),R(m,o=>{n.animate(),i("reveal",o)}),R(n.scroll,o=>{e.reveal===!0&&S(m,o.direction==="up"||o.position<=e.revealOffset||o.position-o.inflectionPoint<100)});const H={};return n.instances.header=H,e.modelValue===!0&&$("size",f.value),$("space",e.modelValue),$("offset",k.value),ve(()=>{n.instances.header===H&&(n.instances.header=void 0,$("size",0),$("offset",0),$("space",!1))}),()=>{const o=he(t.default,[]);return e.elevated===!0&&o.push(g("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),o.push(g(X,{debounce:0,onResize:M})),g("header",{class:D.value,style:N.value,onFocusin:O},o)}}});const _e=oe({name:"AppHeader",props:{},components:{DarkComp:qe},setup(){return{isBackExists:w(!1)}},methods:{...ue(Z,["clearAuth","tryAutoLogin","setUser"]),onItemClick(e){this.$router.push(e)},onLogout(){this.clearAuth(),this.$router.push("/accounts/login")},isRouteActive(e,t=[]){return this.$route.matched[1].path==e||t.includes(this.$route.path)?"active":""},async fetchData(){if(this.isUserLoggedIn)try{const e=await ke.auth.authFindMe();if(e.data.errors)this.$q.notify({type:"warning",message:this.$t("failed"),caption:this.$t("userNotFound")});else if(e.data.data.authFindMe.id){const t=e.data.data.authFindMe;this.setUser(t)}}catch{this.$q.notify({type:"negative",message:this.$t("failed"),caption:this.$t("failed")})}}},computed:{...ge(Z,["isUserLoggedIn","user"])},mounted(){this.isBackExists=this.$router.options&&this.$router.options.history&&this.$router.options.history.state&&this.$router.options.history.state.back},beforeMount(){}}),ze={key:0,class:"row"},Be={key:3},Re={key:4},Ae={key:0},Ie={class:"row justify-center"};function He(e,t,i,l,n,f){const m=F("dark-comp");return v(),C(Qe,{reveal:"",bordered:"",class:q(e.$q.dark.isActive?"ad-toolbar-dark":"ad-toolbar")},{default:r(()=>[s(le,null,{default:r(()=>[s(Le,{onClick:t[0]||(t[0]=u=>e.$router.push("/")),class:"text-pointer"},{default:r(()=>[s(ce,{class:"q-mx-sm",width:"40px",src:"icons/favicon-128x128.png"}),c("span",null,h(e.$t("jayab")),1)]),_:1}),e.$q.screen.gt.xs?(v(),_("div",ze,[c("div",{class:q(["ad-secondary-btn q-pa-sm q-mx-sm pointer text-body1",e.isRouteActive("/")]),onClick:t[1]||(t[1]=u=>e.$router.push("/"))},h(e.$t("home")),3),c("div",{class:q(["ad-secondary-btn q-pa-sm q-mx-sm pointer text-body1",e.isRouteActive("/items",["/items/list","/items/map"])]),onClick:t[2]||(t[2]=u=>e.$router.push("/items/list"))},h(e.$t("publicProducts")),3),e.user&&(e.user.permissions.find(u=>u.codename==="write product")||e.user.is_superuser===1)?(v(),_("div",{key:0,class:q(["ad-secondary-btn q-pa-sm q-mx-sm pointer text-body1",e.isRouteActive("/accounts/plus",["/accounts/plus/manage-map","/accounts/plus/manage-list"])]),onClick:t[3]||(t[3]=u=>e.$router.push("/accounts/plus"))},h(e.$t("manage")),3)):Q("",!0)])):Q("",!0),e.$q.screen.gt.xs?(v(),C(ne,{key:1})):Q("",!0),e.$q.screen.gt.xs?(v(),C(ne,{key:2})):Q("",!0),c("div",null,[s(m,{isDense:!0})]),e.isUserLoggedIn?(v(),_("div",Re,[s(we,{class:"q-ml-xs q-pl-xs",flat:"",round:""},{label:r(()=>[e.user?(v(),_("div",Ae,[s(ye,{size:"sm",name:"account_circle"})])):Q("",!0)]),default:r(()=>[s(be,null,{default:r(()=>[E((v(),C(K,{clickable:"",onClick:t[4]||(t[4]=u=>e.onItemClick("/accounts/profile/"+e.user.username))},{default:r(()=>[s(B,{avatar:""},{default:r(()=>[s(W,{icon:"person"})]),_:1}),s(B,null,{default:r(()=>[s(Y,null,{default:r(()=>[T(h(e.user.name),1)]),_:1})]),_:1})]),_:1})),[[J]]),E((v(),C(K,{clickable:"",onClick:t[5]||(t[5]=u=>e.onItemClick("/accounts/subscription"))},{default:r(()=>[s(B,{avatar:""},{default:r(()=>[s(W,{icon:"fa fa-plus-square"})]),_:1}),s(B,null,{default:r(()=>[s(Y,null,{default:r(()=>[T(h(e.$t("plusSubscription")),1)]),_:1})]),_:1})]),_:1})),[[J]]),E((v(),C(K,{clickable:"",onClick:e.onLogout},{default:r(()=>[s(B,{avatar:""},{default:r(()=>[s(W,{icon:"logout"})]),_:1}),s(B,null,{default:r(()=>[s(Y,null,{default:r(()=>[T(h(e.$t("logout")),1)]),_:1})]),_:1})]),_:1},8,["onClick"])),[[J]])]),_:1})]),_:1})])):(v(),_("div",Be,[s(z,{class:"ad-secondary-btn q-mx-xs",outline:"",to:"/accounts/login"},{default:r(()=>[T(h(e.$t("login")),1)]),_:1}),s(z,{class:"ad-primary-btn",to:"/accounts/signup"},{default:r(()=>[T(h(e.$t("signup")),1)]),_:1})]))]),_:1}),e.$q.screen.lt.sm?(v(),C(le,{key:0,class:"text-primary justify-center"},{default:r(()=>[c("div",Ie,[c("div",{class:q(["ad-secondary-btn q-pa-sm q-mx-sm pointer text-body1",e.isRouteActive("/")]),onClick:t[6]||(t[6]=u=>e.$router.push("/"))},h(e.$t("home")),3),c("div",{class:q(["ad-secondary-btn q-pa-sm q-mx-sm pointer text-body1",e.isRouteActive("/items",["/items/list","/items/map"])]),onClick:t[7]||(t[7]=u=>e.$router.push("/items/list"))},h(e.$t("publicProducts")),3),e.user&&(e.user.permissions.find(u=>u.codename==="write product")||e.user.is_superuser===1)?(v(),_("div",{key:0,class:q(["ad-secondary-btn q-pa-sm q-mx-sm pointer text-body1",e.isRouteActive("/accounts/plus",["/accounts/plus/manage-map","/accounts/plus/manage-list"])]),onClick:t[8]||(t[8]=u=>e.$router.push("/accounts/plus"))},h(e.$t("manage")),3)):Q("",!0)])]),_:1})):Q("",!0)]),_:1},8,["class"])}var Pe=se(_e,[["render",He]]);const Te=oe({name:"AppFooter",components:{},setup(){return{}},methods:{onScroll(e=[]){const{id:t}=e,i=document.getElementById(t);i?i.scrollIntoView({behavior:"smooth"}):this.$router.push("/")},onOpenUrl(e){window.open(e,"_blank")}},mounted(){}}),xe={class:"q-pt-md q-mt-md"},Fe=c("hr",{class:"line-style-two"},null,-1),Ve={class:""},Ue={class:"row q-pb-md"},De={class:"col-md-3 col-sm-3 col-xs-3"},Ne={class:""},Me={class:"col-md-3 col-sm-3 col-xs-3"},Oe={class:"col-md-6 col-sm-6 col-xs-6"},je={class:"col-7 q-pt-sm text-bold"},Ee=c("div",{class:"q-pt-sm"},"Built By AraTech Group",-1),We=[Ee];function Ke(e,t,i,l,n,f){return v(),_("div",xe,[Fe,c("div",Ve,[s(ce,{class:"q-mx-sm",width:"40px",src:"icons/favicon-128x128.png"})]),c("div",Ue,[c("div",De,[c("div",Ne,[s(z,{flat:"","no-caps":"",onClick:t[0]||(t[0]=m=>e.$router.push("/")),label:e.$t("home")},null,8,["label"])]),c("div",null,[s(z,{flat:"","no-caps":"",onClick:t[1]||(t[1]=m=>e.$router.push("/products")),label:e.$t("products")},null,8,["label"])])]),c("div",Me,[c("div",null,[s(z,{flat:"","no-caps":"",onClick:t[2]||(t[2]=m=>e.onScroll({id:"aboutUs"})),label:e.$t("aboutUs")},null,8,["label"])])]),c("div",Oe,[c("div",{class:q(["q-pa-sm q-gutter-sm",e.$t("direction")==="rtl"?"text-left":"text-right"])},[s(z,{round:"",type:"a",target:"blank",href:"https://t.me/jayab",icon:"telegram",style:{color:"#30a4da"}}),s(z,{round:"",type:"a",target:"blank",href:"https://instagram.com/jayab",icon:"fa fa-brands fa-instagram",style:{color:"#f74c04"}})],2)])]),c("div",{class:q(["row q-pa-md",e.$q.dark.isActive?"":"bg-grey-3"])},[c("div",je,h(e.$t("copyRight"))+" - "+h(new Date().getFullYear()),1),c("div",{class:q(["col-5",e.$t("direction")=="rtl"?"text-left":"text-right"])},We,2)],2)])}var Ge=se(Te,[["render",Ke]]);const Je=oe({name:"MainLayout",components:{AppHeader:Pe,AppFooter:Ge},setup(){return w(!1),{}},computed:{},methods:{...ue(Z,["tryAutoLogin"]),onSetLocals(){const e=localStorage.getItem("locale");e?this.$i18n.locale=e:this.$i18n.locale="fa-IR";const t=localStorage.getItem("mode");t&&this.$q.dark.set(t=="true")}},created(){this.tryAutoLogin(),this.onSetLocals()}});function Ye(e,t,i,l,n,f){const m=F("app-header"),u=F("router-view"),k=F("app-footer");return v(),C(Se,{view:"lHh Lpr lFf",class:"ad-layout"},{default:r(()=>[s(m),s(Ce,{class:"ad-page"},{default:r(()=>[s(u),s(k)]),_:1})]),_:1})}var ft=se(Je,[["render",Ye]]);export{ft as default};
