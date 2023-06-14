import{Q as q}from"./QCard.37bf516d.js";import{M as T}from"./MainTitleComp.b5d88647.js";import{d as _,r as $,_ as u,C as i,D as a,J as c,H as o,F as I,R as S,j as e,N as C,I as m,L as k,ar as x,as as F,Q as y,G as v,E as O}from"./index.758da505.js";import{Q}from"./format.0584e0b6.js";import{a as N}from"./index.b6409fd5.js";import{E as M}from"./EmptyComp.de87cb4a.js";import{S as P}from"./SubTitleComp.29d95159.js";import{Q as A}from"./QSeparator.159b8493.js";import{Q as B}from"./use-dark.d08f1f81.js";import{F as j}from"./FilterComp.7309b231.js";import"./use-transition.f0850e0a.js";import"./axios.0e7880b2.js";import"./QInput.5c706ea3.js";import"./use-form.dadb0a3a.js";import"./focus-manager.32f8d49a.js";import"./CityComp.e4e85926.js";import"./QCardSection.9e482b55.js";import"./selection.31cc2582.js";import"./focusout.e509f8ae.js";import"./QCardActions.e5c1e1cc.js";import"./QDialog.49e4cb1e.js";const D=_({name:"CategoriesComp",props:{},components:{EmptyComp:M},setup(){return{categories:$([]),loaded:$(!1)}},methods:{async fetchData(){try{const t=await N.main.categoryFindAll();if(t.data.errors)this.$q.notify({type:"warning",message:this.$t("failed"),caption:this.$t("userNotFound")});else if(t.data.data.categoryFindAll){const s=t.data.data.categoryFindAll;this.categories=s.filter(n=>n.en_name!=="root"&&n.parent_id!=="root"),this.loaded=!0}}catch(t){console.log(t,"error on fecth data"),this.$q.notify({type:"negative",message:this.$t("failed"),caption:this.$t("failed")})}}},mounted(){this.fetchData()}}),E={class:""},L={key:0},R={class:"row justify-center"},V=["onClick"],G={key:1};function J(t,s,n,p,h,f){const r=i("empty-comp");return a(),c("div",E,[t.categories&&t.categories.length>0?(a(),c("div",L,[o("div",R,[(a(!0),c(I,null,S(t.categories,(l,d)=>(a(),c("div",{key:d,class:"col-6 col-md-2 col-sm-3 col-xs-4 q-my-sm"},[o("div",{onClick:g=>t.$router.push("/categories/"+l.id),class:"fixed-width-box ad-box-bordered q-pa-sm text-center pointer"},[e(C,{class:"q-pa-md border-radius-inherit",size:"xl",name:"fa-solid "+l.icon_url,color:d%3==0?"primary":d%3==1?"secondary":"accent"},null,8,["name","color"]),o("div",null,m(l[t.$i18n.locale.split("-")[0]+"_name"]),1)],8,V)]))),128))])])):(a(),c("div",G,[e(r)])),e(Q,{showing:!t.loaded},null,8,["showing"])])}var z=u(D,[["render",J],["__scopeId","data-v-648ac686"]]);const H=_({name:"AboutCompanyComp",props:{},components:{SubTitleComp:P},setup(){return{}}}),U={class:"q-px-md q-mb-md"},K={class:""},W={class:""};function X(t,s,n,p,h,f){const r=i("sub-title-comp");return a(),c("div",U,[e(r,{title:t.$t("introduce")},null,8,["title"]),o("div",K,m(t.$t("introduceCompanyText1")),1),e(r,{title:t.$t("companyGoals")},null,8,["title"]),o("div",W,m(t.$t("introduceCompanyText2")),1)])}var Y=u(H,[["render",X]]);const Z=_({name:"MainIntroComp",props:{},setup:()=>({randomText:$("")}),methods:{randomNum(t){return Math.floor(Math.random()*t)},async phraseChanger(){const t=["\u0647\u0645\u0647","\u0645\u0631\u062F\u0645","\u062C\u0648\u0627\u0646\u0627\u0646","\u062F\u0648\u0633\u062A","\u0647\u0645\u0633\u0631","\u062E\u0627\u0646\u0648\u0627\u062F\u0647","\u062F\u0627\u0646\u0634\u062C\u0648"];for(;;){let s=t[this.randomNum(t.length)];s=s===this.randomText?t[this.randomNum(t.length)]:s,this.randomText="";for(const n of s.split(""))await new Promise(p=>setTimeout(p,100)),this.randomText=this.randomText+n;await new Promise(n=>setTimeout(n,s.length*500))}},init(){this.phraseChanger()}},mounted(){this.init()}}),b=t=>(x("data-v-36606fbe"),t=t(),F(),t),tt={class:"row q-py-md justify-center"},et={class:"col text-center q-py-md"},ot={class:"text-bold"},st=b(()=>o("br",null,null,-1)),nt={class:"text-bold ad-font-color"},at={class:"text-bold random-word q-mx-md ad-font-color"},rt=b(()=>o("span",{class:"spliting"},"|",-1));function it(t,s,n,p,h,f){return a(),c("div",null,[o("div",tt,[o("div",et,[o("h2",null,[o("span",ot,m(t.$t("home")),1),k(),st,o("span",nt,m(t.$t("for")),1),o("span",at,m(t.randomText),1),rt])])]),e(A)])}var ct=u(Z,[["render",it],["__scopeId","data-v-36606fbe"]]);const lt=_({name:"SearchComp",props:{category:Object},components:{FilterComp:j},setup:()=>({filterOptions:$({})}),methods:{onResetFilter(){this.filterOptions={},this.$refs.filterComp.resetState()},onChangeFilter(t){this.filterOptions=t},onClickToSearch(){const t=JSON.stringify(this.filterOptions);this.$router.push({path:"/items/list",query:{filterOptions:t}})}}}),pt={class:""},mt={class:"row"};function dt(t,s,n,p,h,f){const r=i("filter-comp");return a(),c("div",pt,[e(r,{ref:"filterComp",onOnChangeFilter:t.onChangeFilter,filterOptions:t.filterOptions},null,8,["onOnChangeFilter","filterOptions"]),o("div",mt,[e(B),e(y,{onClick:t.onResetFilter,outline:"",class:"q-ma-xs ad-font-color",label:t.$t("clean"),"no-caps":""},null,8,["onClick","label"]),e(y,{onClick:t.onClickToSearch,class:"q-ma-xs ad-primary-btn",label:t.$t("search"),"no-caps":""},{default:v(()=>[e(C,{class:"q-pr-md",name:"fa fa-magnifying-glass"})]),_:1},8,["onClick","label"])])])}var _t=u(lt,[["render",dt],["__scopeId","data-v-111691d0"]]);const ut=_({name:"IndexPage",setup(){return{}},components:{MainTitleComp:T,AboutCompanyComp:Y,CategoriesComp:z,MainIntroComp:ct,SearchComp:_t}});function ht(t,s,n,p,h,f){const r=i("main-intro-comp"),l=i("main-title-comp"),d=i("search-comp"),g=i("categories-comp"),w=i("about-company-comp");return a(),O(q,null,{default:v(()=>[e(r),e(l,{title:t.$t("search")},null,8,["title"]),e(d,{class:"q-my-sm"}),e(l,{title:t.$t("categoriesTitle")},null,8,["title"]),e(g,{class:"q-my-sm"}),e(l,{id:"aboutUs",title:t.$t("aboutCompany")},null,8,["title"]),e(w)]),_:1})}var Bt=u(ut,[["render",ht]]);export{Bt as default};