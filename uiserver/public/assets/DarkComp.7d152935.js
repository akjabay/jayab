import{l as V,ae as k,r as f,c as u,af as $,w as h,o as I,h as s,N as M,p as H,Q as c,g as j,ag as O,i as P,ah as x,d as R,_ as T,D as v,J as D,I as L,M as N,j as p}from"./index.758da505.js";import{Q as z}from"./QBtnGroup.5701ca84.js";import{Q as U}from"./QMenu.d44f46b3.js";import{u as W}from"./use-transition.f0850e0a.js";import{u as E}from"./use-form.dadb0a3a.js";import{Q as G}from"./QToggle.ad15b1a4.js";const J=Object.keys(k),K=e=>J.reduce((t,a)=>{const l=e[a];return l!==void 0&&(t[a]=l),t},{});var se=V({name:"QBtnDropdown",props:{...k,...W,modelValue:Boolean,split:Boolean,dropdownIcon:String,contentClass:[Array,String,Object],contentStyle:[Array,String,Object],cover:Boolean,persistent:Boolean,noRouteDismiss:Boolean,autoClose:Boolean,menuAnchor:{type:String,default:"bottom end"},menuSelf:{type:String,default:"top end"},menuOffset:Array,disableMainBtn:Boolean,disableDropdown:Boolean,noIconAnimation:Boolean,toggleAriaLabel:String},emits:["update:modelValue","click","beforeShow","show","beforeHide","hide"],setup(e,{slots:t,emit:a}){const{proxy:l}=j(),i=f(e.modelValue),o=f(null),r=E(),m=u(()=>{const n={"aria-expanded":i.value===!0?"true":"false","aria-haspopup":"true","aria-controls":r,"aria-label":e.toggleAriaLabel||l.$q.lang.label[i.value===!0?"collapse":"expand"](e.label)};return(e.disable===!0||e.split===!1&&e.disableMainBtn===!0||e.disableDropdown===!0)&&(n["aria-disabled"]="true"),n}),B=u(()=>"q-btn-dropdown__arrow"+(i.value===!0&&e.noIconAnimation===!1?" rotate-180":"")+(e.split===!1?" q-btn-dropdown__arrow-container":"")),b=u(()=>$(e)),g=u(()=>K(e));h(()=>e.modelValue,n=>{o.value!==null&&o.value[n?"show":"hide"]()}),h(()=>e.split,d);function C(n){i.value=!0,a("beforeShow",n)}function S(n){a("show",n),a("update:modelValue",!0)}function q(n){i.value=!1,a("beforeHide",n)}function y(n){a("hide",n),a("update:modelValue",!1)}function A(n){a("click",n)}function Q(n){O(n),d(),a("click",n)}function _(n){o.value!==null&&o.value.toggle(n)}function w(n){o.value!==null&&o.value.show(n)}function d(n){o.value!==null&&o.value.hide(n)}return Object.assign(l,{show:w,hide:d,toggle:_}),I(()=>{e.modelValue===!0&&w()}),()=>{const n=[s(M,{class:B.value,name:e.dropdownIcon||l.$q.iconSet.arrow.dropdown})];return e.disableDropdown!==!0&&n.push(s(U,{ref:o,id:r,class:e.contentClass,style:e.contentStyle,cover:e.cover,fit:!0,persistent:e.persistent,noRouteDismiss:e.noRouteDismiss,autoClose:e.autoClose,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,separateClosePopup:!0,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,onBeforeShow:C,onShow:S,onBeforeHide:q,onHide:y},t.default)),e.split===!1?s(c,{class:"q-btn-dropdown q-btn-dropdown--simple",...g.value,...m.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:A},{default:()=>H(t.label,[]).concat(n),loading:t.loading}):s(z,{class:"q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item",rounded:e.rounded,square:e.square,...b.value,glossy:e.glossy,stretch:e.stretch},()=>[s(c,{class:"q-btn-dropdown--current",...g.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:Q},{default:t.label,loading:t.loading}),s(c,{class:"q-btn-dropdown__arrow-container q-anchor--skip",...m.value,...b.value,disable:e.disable===!0||e.disableDropdown===!0,rounded:e.rounded,color:e.color,textColor:e.textColor,dense:e.dense,size:e.size,padding:e.padding,ripple:e.ripple},()=>n)])}}});function F(){return P(x)}const X=R({name:"DarkComp",components:{},props:{isDense:Boolean},setup(){const e=F();return{isDark:f(e.dark.isActive)}},methods:{onToggle:function(){(this.isDark==!1||this.isDark==!0)&&(this.$q.dark.set(this.isDark),localStorage.setItem("mode",this.isDark))}},mounted(){}}),Y={class:"q-px-md"},Z={key:0,class:""};function ee(e,t,a,l,i,o){return v(),D("div",Y,[e.isDense?N("",!0):(v(),D("span",Z,L(e.$t("darkMode")),1)),p(G,{modelValue:e.isDark,"onUpdate:modelValue":t[0]||(t[0]=r=>e.isDark=r),onClick:e.onToggle,icon:"dark_mode"},null,8,["modelValue","onClick"])])}var re=T(X,[["render",ee]]);export{re as D,se as Q};
