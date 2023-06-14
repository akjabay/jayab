import{Q as j}from"./QImg.92ead9aa.js";import{Q as Y}from"./QCardSection.9e482b55.js";import{a as ee}from"./QCard.37bf516d.js";import{C as te}from"./CategoryComp.e7feb518.js";import{d as T,_ as z,C as ae,D as v,E as w,G as E,j as q,H as u,I as d,J as N,K as O,M as _,l as ne,aI as le,c as l,r as M,w as ie,aJ as L,aK as oe,Z as ue,h as S,g as re,Q as se}from"./index.758da505.js";import{Q as de}from"./QInput.5c706ea3.js";import{u as ce,a as me}from"./use-dark.d08f1f81.js";import{b as ge}from"./format.0584e0b6.js";const ve=T({name:"ProductCard",props:{product:Object},components:{CategoryComp:te}}),pe={class:"ad-box-t text-bold"},fe={class:"ad-low-opacity"},be={class:""},ye={class:"text-bold"},he={class:"q-px-xs ad-low-opacity"},Se={class:""},Ce={class:"ad-low-opacity"},$e={class:"text-bold"},Pe={class:"q-px-xs ad-low-opacity"},ke={class:"q-mt-sm ad-low-opacity"};function xe(e,o,C,c,x,i){const n=ae("category-comp");return v(),w(ee,{flat:"",class:"q-ma-sm ad-fixed-card ad-box-bordered"},{default:E(()=>[e.product&&e.product.images.length>0?(v(),w(j,{key:0,class:"text-pointer",onClick:o[0]||(o[0]=p=>e.$router.push("/products/"+e.product.pid)),style:{width:"236px","max-height":"177px"},src:e.$api.getImageUrl(e.$q.screen,e.product.images[0].url)},null,8,["src"])):(v(),w(j,{key:1,class:"text-pointer",onClick:o[1]||(o[1]=p=>e.$router.push("/products/"+e.product.pid)),style:{width:"236px","max-height":"177px"},src:"no-image.svg"})),q(Y,{class:""},{default:E(()=>[u("a",{onClick:o[2]||(o[2]=p=>e.$router.push("/products/"+e.product.pid)),class:"text-pointer"},[u("span",pe,d(e.product.name),1),u("span",fe," ("+d(e.product.area)+" "+d(e.$t("meter"))+") ",1)]),q(n,{class:"q-my-none",category:e.product.categoryId},null,8,["category"]),e.product.price?(v(),N("div",{key:0,class:O(["col-5",e.$t("direction")=="rtl"?"text-left":"text-right"])},[u("div",be,[u("span",ye,d(e.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")),1),u("span",he,d(e.$t("toman")),1)])],2)):_("",!0),e.product.pricePerMeter?(v(),N("div",{key:1,class:O(["col-5",e.$t("direction")=="rtl"?"text-left":"text-right"])},[u("div",Se,[u("span",Ce,d(e.$t("perMeter")+" "),1),u("span",$e,d(e.product.pricePerMeter.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")),1),u("span",Pe,d(e.$t("toman")),1)])],2)):_("",!0),u("div",ke,d(e.product.address),1)]),_:1})]),_:1})}var Oe=z(ve,[["render",xe]]);function k(e,o){return[!0,!1].includes(e)?e:o}var Be=ne({name:"QPagination",props:{...ce,modelValue:{type:Number,required:!0},min:{type:[Number,String],default:1},max:{type:[Number,String],required:!0},maxPages:{type:[Number,String],default:0,validator:e=>(typeof e=="string"?parseInt(e,10):e)>=0},inputStyle:[Array,String,Object],inputClass:[Array,String,Object],size:String,disable:Boolean,input:Boolean,iconPrev:String,iconNext:String,iconFirst:String,iconLast:String,toFn:Function,boundaryLinks:{type:Boolean,default:null},boundaryNumbers:{type:Boolean,default:null},directionLinks:{type:Boolean,default:null},ellipses:{type:Boolean,default:null},ripple:{type:[Boolean,Object],default:null},round:Boolean,rounded:Boolean,flat:Boolean,outline:Boolean,unelevated:Boolean,push:Boolean,glossy:Boolean,color:{type:String,default:"primary"},textColor:String,activeDesign:{type:String,default:"",values:e=>e===""||le.includes(e)},activeColor:String,activeTextColor:String,gutter:String,padding:{type:String,default:"3px 2px"}},emits:["update:modelValue"],setup(e,{emit:o}){const{proxy:C}=re(),{$q:c}=C,x=me(e,c),i=l(()=>parseInt(e.min,10)),n=l(()=>parseInt(e.max,10)),p=l(()=>parseInt(e.maxPages,10)),F=l(()=>g.value+" / "+n.value),K=l(()=>k(e.boundaryLinks,e.input)),f=l(()=>k(e.boundaryNumbers,!e.input)),A=l(()=>k(e.directionLinks,e.input)),B=l(()=>k(e.ellipses,!e.input)),$=M(null),g=l({get:()=>e.modelValue,set:t=>{if(t=parseInt(t,10),e.disable||isNaN(t))return;const a=ge(t,i.value,n.value);e.modelValue!==a&&o("update:modelValue",a)}});ie(()=>`${i.value}|${n.value}`,()=>{g.value=e.modelValue});const U=l(()=>"q-pagination row no-wrap items-center"+(e.disable===!0?" disabled":"")),V=l(()=>e.gutter in L?`${L[e.gutter]}px`:e.gutter||null),J=l(()=>V.value!==null?`--q-pagination-gutter-parent:-${V.value};--q-pagination-gutter-child:${V.value}`:null),P=l(()=>{const t=[e.iconFirst||c.iconSet.pagination.first,e.iconPrev||c.iconSet.pagination.prev,e.iconNext||c.iconSet.pagination.next,e.iconLast||c.iconSet.pagination.last];return c.lang.rtl===!0?t.reverse():t}),G=l(()=>({"aria-disabled":e.disable===!0?"true":"false",role:"navigation"})),D=l(()=>oe(e,"flat")),H=l(()=>({[D.value]:!0,round:e.round,rounded:e.rounded,padding:e.padding,color:e.color,textColor:e.textColor,size:e.size,ripple:e.ripple!==null?e.ripple:!0})),W=l(()=>{const t={[D.value]:!1};return e.activeDesign!==""&&(t[e.activeDesign]=!0),t}),Z=l(()=>({...W.value,color:e.activeColor||e.color,textColor:e.activeTextColor||e.textColor})),b=l(()=>{let t=Math.max(p.value,1+(B.value?2:0)+(f.value?2:0));const a={pgFrom:i.value,pgTo:n.value,ellipsesStart:!1,ellipsesEnd:!1,boundaryStart:!1,boundaryEnd:!1,marginalStyle:{minWidth:`${Math.max(2,String(n.value).length)}em`}};return p.value&&t<n.value-i.value+1&&(t=1+Math.floor(t/2)*2,a.pgFrom=Math.max(i.value,Math.min(n.value-t+1,e.modelValue-Math.floor(t/2))),a.pgTo=Math.min(n.value,a.pgFrom+t-1),f.value&&(a.boundaryStart=!0,a.pgFrom++),B.value&&a.pgFrom>i.value+(f.value?1:0)&&(a.ellipsesStart=!0,a.pgFrom++),f.value&&(a.boundaryEnd=!0,a.pgTo--),B.value&&a.pgTo<n.value-(f.value?1:0)&&(a.ellipsesEnd=!0,a.pgTo--)),a});function I(t){g.value=t}function R(t){g.value=g.value+t}const X=l(()=>{function t(){g.value=$.value,$.value=null}return{"onUpdate:modelValue":a=>{$.value=a},onKeyup:a=>{ue(a,13)===!0&&t()},onBlur:t}});function s(t,a,y){const m={"aria-label":a,"aria-current":"false",...H.value,...t};return y===!0&&Object.assign(m,{"aria-current":"true",...Z.value}),a!==void 0&&(e.toFn!==void 0?m.to=e.toFn(a):m.onClick=()=>{I(a)}),S(se,m)}return Object.assign(C,{set:I,setByOffset:R}),()=>{const t=[],a=[];let y;if(K.value===!0&&(t.push(s({key:"bls",disable:e.disable||e.modelValue<=i.value,icon:P.value[0]},i.value)),a.unshift(s({key:"ble",disable:e.disable||e.modelValue>=n.value,icon:P.value[3]},n.value))),A.value===!0&&(t.push(s({key:"bdp",disable:e.disable||e.modelValue<=i.value,icon:P.value[1]},e.modelValue-1)),a.unshift(s({key:"bdn",disable:e.disable||e.modelValue>=n.value,icon:P.value[2]},e.modelValue+1))),e.input!==!0){y=[];const{pgFrom:m,pgTo:Q,marginalStyle:h}=b.value;if(b.value.boundaryStart===!0){const r=i.value===e.modelValue;t.push(s({key:"bns",style:h,disable:e.disable,label:i.value},i.value,r))}if(b.value.boundaryEnd===!0){const r=n.value===e.modelValue;a.unshift(s({key:"bne",style:h,disable:e.disable,label:n.value},n.value,r))}b.value.ellipsesStart===!0&&t.push(s({key:"bes",style:h,disable:e.disable,label:"\u2026",ripple:!1},m-1)),b.value.ellipsesEnd===!0&&a.unshift(s({key:"bee",style:h,disable:e.disable,label:"\u2026",ripple:!1},Q+1));for(let r=m;r<=Q;r++)y.push(s({key:`bpg${r}`,style:h,disable:e.disable,label:r},r,r===e.modelValue))}return S("div",{class:U.value,...G.value},[S("div",{class:"q-pagination__content row no-wrap items-center",style:J.value},[...t,e.input===!0?S(de,{class:"inline",style:{width:`${F.value.length/1.5}em`},type:"number",dense:!0,value:$.value,disable:e.disable,dark:x.value,borderless:!0,inputClass:e.inputClass,inputStyle:e.inputStyle,placeholder:F.value,min:i.value,max:n.value,...X.value}):S("div",{class:"q-pagination__middle row justify-center"},y),...a])])}}});const Ve=T({name:"PaginationComp",props:{currentPage:Number,pagination:{type:Object,default:M({limit:10,offset:0,total:1})}},setup(){return{page:M(1)}},watch:{page:{handler(e){this.$emit("select-page",e)}}},components:{},methods:{},mounted(){this.currentPage&&(this.page=this.currentPage)}}),we={class:"row q-my-md justify-center"};function qe(e,o,C,c,x,i){return v(),N("div",we,[q(Be,{modelValue:e.page,"onUpdate:modelValue":o[0]||(o[0]=n=>e.page=n),max:Math.ceil(e.pagination.total/e.pagination.limit),"max-pages":4,style:{direction:"ltr"},"direction-links":"",flat:"",color:"grey","active-color":"primary"},null,8,["modelValue","max"])])}var _e=z(Ve,[["render",qe]]);export{_e as P,Oe as a};