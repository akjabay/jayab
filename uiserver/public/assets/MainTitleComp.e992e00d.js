import{Q as l}from"./use-dark.ecf38b9d.js";import{d as r,_ as p,D as o,J as s,H as n,K as a,I as d,j as i,Q as m,L as c}from"./index.92eb8bda.js";const f=r({name:"MainTitleComp",props:{title:String,toLink:{type:String,default:""}}}),$={class:"row q-py-lg"},u={key:0,class:"q-mx-xs ad-font-color"};function k(e,t,v,C,g,_){return o(),s("div",$,[n("div",{class:a("main-line main-line1-position"+(e.$t("direction")=="rtl"?"-rtl":""))},null,2),n("div",{class:a(`ad-blog-title ${e.$t("direction")==="rtl"?"q-mr-xl":"q-ml-xl"}`)}," \u2B25 "+d(e.title),3),i(l),e.toLink?(o(),s("div",u,[i(m,{flat:"","no-caps":"",dense:"",onClick:t[0]||(t[0]=q=>e.$router.push(e.toLink)),label:"viewAll"})])):c("",!0)])}var L=p(f,[["render",k]]);export{L as M};
