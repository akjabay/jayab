import{T as je,U as fe,c as N,a as b,h as x,d as U,V as Ke,r as q,y as Se,W as ve,q as Q,X as me,w as B,o as ie,j as W,g as $,Y as Ne,k as oe,Z as Ue,$ as F,t as Ge,a0 as Xe,a1 as Ye,a2 as Je,a3 as Ze,a4 as Be,a5 as Te,a6 as ue,a7 as et,a8 as tt,a9 as nt,z as le,aa as Ve,P as Pe,Q as te,ab as ot,ac as lt,ad as at,u as it,ae as ut,af as H,i as rt,ag as st,C as ct,_ as dt,G as he,K as ge,N as ft,J as vt}from"./index.9f5cea10.js";import{u as Ee,a as De}from"./request.cab34313.js";import{r as be,a as mt,b as ht,u as gt,c as bt,d as wt}from"./use-form.4fbf8fd2.js";import{u as $e,a as pt}from"./use-transition.ffbc195c.js";const xt=[null,document,document.body,document.scrollingElement,document.documentElement];function kt(e,n){let t=je(n);if(t===void 0){if(e==null)return window;t=e.closest(".scroll,.scroll-y,.overflow-auto")}return xt.includes(t)?window:t}function fn(e){return e===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:e.scrollTop}function vn(e){return e===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:e.scrollLeft}let z;function yt(){if(z!==void 0)return z;const e=document.createElement("p"),n=document.createElement("div");fe(e,{width:"100%",height:"200px"}),fe(n,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),n.appendChild(e),document.body.appendChild(n);const t=e.offsetWidth;n.style.overflow="scroll";let o=e.offsetWidth;return t===o&&(o=n.clientWidth),n.remove(),z=t-o,z}var Ct=N({name:"QBtnGroup",props:{unelevated:Boolean,outline:Boolean,flat:Boolean,rounded:Boolean,square:Boolean,push:Boolean,stretch:Boolean,glossy:Boolean,spread:Boolean},setup(e,{slots:n}){const t=b(()=>{const o=["unelevated","outline","flat","rounded","square","push","stretch","glossy"].filter(l=>e[l]===!0).map(l=>`q-btn-group--${l}`).join(" ");return`q-btn-group row no-wrap${o.length>0?" "+o:""}`+(e.spread===!0?" q-btn-group--spread":" inline")});return()=>x("div",{class:t.value},U(n.default))}});function qt(){if(window.getSelection!==void 0){const e=window.getSelection();e.empty!==void 0?e.empty():e.removeAllRanges!==void 0&&(e.removeAllRanges(),Ke.is.mobile!==!0&&e.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}const St={target:{default:!0},noParentEvent:Boolean,contextMenu:Boolean};function Bt({showing:e,avoidEmit:n,configureAnchorEl:t}){const{props:o,proxy:l,emit:i}=$(),a=q(null);let r=null;function d(u){return a.value===null?!1:u===void 0||u.touches===void 0||u.touches.length<=1}const c={};t===void 0&&(Object.assign(c,{hide(u){l.hide(u)},toggle(u){l.toggle(u),u.qAnchorHandled=!0},toggleKey(u){Se(u,13)===!0&&c.toggle(u)},contextClick(u){l.hide(u),ve(u),Q(()=>{l.show(u),u.qAnchorHandled=!0})},prevent:ve,mobileTouch(u){if(c.mobileCleanup(u),d(u)!==!0)return;l.hide(u),a.value.classList.add("non-selectable");const g=u.target;me(c,"anchor",[[g,"touchmove","mobileCleanup","passive"],[g,"touchend","mobileCleanup","passive"],[g,"touchcancel","mobileCleanup","passive"],[a.value,"contextmenu","prevent","notPassive"]]),r=setTimeout(()=>{r=null,l.show(u),u.qAnchorHandled=!0},300)},mobileCleanup(u){a.value.classList.remove("non-selectable"),r!==null&&(clearTimeout(r),r=null),e.value===!0&&u!==void 0&&qt()}}),t=function(u=o.contextMenu){if(o.noParentEvent===!0||a.value===null)return;let g;u===!0?l.$q.platform.is.mobile===!0?g=[[a.value,"touchstart","mobileTouch","passive"]]:g=[[a.value,"mousedown","hide","passive"],[a.value,"contextmenu","contextClick","notPassive"]]:g=[[a.value,"click","toggle","passive"],[a.value,"keyup","toggleKey","passive"]],me(c,"anchor",g)});function s(){Ne(c,"anchor")}function p(u){for(a.value=u;a.value.classList.contains("q-anchor--skip");)a.value=a.value.parentNode;t()}function w(){if(o.target===!1||o.target===""||l.$el.parentNode===null)a.value=null;else if(o.target===!0)p(l.$el.parentNode);else{let u=o.target;if(typeof o.target=="string")try{u=document.querySelector(o.target)}catch{u=void 0}u!=null?(a.value=u.$el||u,t()):(a.value=null,console.error(`Anchor: target "${o.target}" not found`))}}return B(()=>o.contextMenu,u=>{a.value!==null&&(s(),t(u))}),B(()=>o.target,()=>{a.value!==null&&s(),w()}),B(()=>o.noParentEvent,u=>{a.value!==null&&(u===!0?s():t())}),ie(()=>{w(),n!==!0&&o.modelValue===!0&&a.value===null&&i("update:modelValue",!1)}),W(()=>{r!==null&&clearTimeout(r),s()}),{anchorEl:a,canShow:d,anchorEvents:c}}function Tt(e,n){const t=q(null);let o;function l(r,d){const c=`${d!==void 0?"add":"remove"}EventListener`,s=d!==void 0?d:o;r!==window&&r[c]("scroll",s,oe.passive),window[c]("scroll",s,oe.passive),o=d}function i(){t.value!==null&&(l(t.value),t.value=null)}const a=B(()=>e.noParentEvent,()=>{t.value!==null&&(i(),n())});return W(a),{localScrollTarget:t,unconfigureScrollTarget:i,changeScrollEvent:l}}const Vt={modelValue:{type:Boolean,default:null},"onUpdate:modelValue":[Function,Array]},Pt=["beforeShow","show","beforeHide","hide"];function Et({showing:e,canShow:n,hideOnRouteChange:t,handleShow:o,handleHide:l,processOnMount:i}){const a=$(),{props:r,emit:d,proxy:c}=a;let s;function p(v){e.value===!0?g(v):w(v)}function w(v){if(r.disable===!0||v!==void 0&&v.qAnchorHandled===!0||n!==void 0&&n(v)!==!0)return;const k=r["onUpdate:modelValue"]!==void 0;k===!0&&(d("update:modelValue",!0),s=v,Q(()=>{s===v&&(s=void 0)})),(r.modelValue===null||k===!1)&&u(v)}function u(v){e.value!==!0&&(e.value=!0,d("beforeShow",v),o!==void 0?o(v):d("show",v))}function g(v){if(r.disable===!0)return;const k=r["onUpdate:modelValue"]!==void 0;k===!0&&(d("update:modelValue",!1),s=v,Q(()=>{s===v&&(s=void 0)})),(r.modelValue===null||k===!1)&&y(v)}function y(v){e.value!==!1&&(e.value=!1,d("beforeHide",v),l!==void 0?l(v):d("hide",v))}function T(v){r.disable===!0&&v===!0?r["onUpdate:modelValue"]!==void 0&&d("update:modelValue",!1):v===!0!==e.value&&(v===!0?u:y)(s)}B(()=>r.modelValue,T),t!==void 0&&Ue(a)===!0&&B(()=>c.$route.fullPath,()=>{t.value===!0&&e.value===!0&&g()}),i===!0&&ie(()=>{T(r.modelValue)});const V={show:w,hide:g,toggle:p};return Object.assign(c,V),V}const A=[];function mn(e){return A.find(n=>n.contentEl!==null&&n.contentEl.contains(e))}function He(e,n){do{if(e.$options.name==="QMenu"){if(e.hide(n),e.$props.separateClosePopup===!0)return F(e)}else if(e.__qPortal===!0){const t=F(e);return t!==void 0&&t.$options.name==="QPopupProxy"?(e.hide(n),t):e}e=F(e)}while(e!=null)}function hn(e,n,t){for(;t!==0&&e!==void 0&&e!==null;){if(e.__qPortal===!0){if(t--,e.$options.name==="QMenu"){e=He(e,n);continue}e.hide(n)}e=F(e)}}function Dt(e){for(e=e.parent;e!=null;){if(e.type.name==="QGlobalDialog")return!0;if(e.type.name==="QDialog"||e.type.name==="QMenu")return!1;e=e.parent}return!1}function $t(e,n,t,o){const l=q(!1),i=q(!1);let a=null;const r={},d=o==="dialog"&&Dt(e);function c(p){if(p===!0){be(r),i.value=!0;return}i.value=!1,l.value===!1&&(d===!1&&a===null&&(a=Je(!1,o)),l.value=!0,A.push(e.proxy),mt(r))}function s(p){if(i.value=!1,p!==!0)return;be(r),l.value=!1;const w=A.indexOf(e.proxy);w!==-1&&A.splice(w,1),a!==null&&(Ze(a),a=null)}return Ge(()=>{s(!0)}),e.proxy.__qPortal=!0,Xe(e.proxy,"contentEl",()=>n.value),{showPortal:c,hidePortal:s,portalIsActive:l,portalIsAccessible:i,renderPortal:()=>d===!0?t():l.value===!0?[x(Ye,{to:a},t())]:void 0}}function Ht(){let e;const n=$();function t(){e=void 0}return Be(t),W(t),{removeTick:t,registerTick(o){e=o,Q(()=>{e===o&&(Te(n)===!1&&e(),e=void 0)})}}}function At(){let e=null;const n=$();function t(){e!==null&&(clearTimeout(e),e=null)}return Be(t),W(t),{removeTimeout:t,registerTimeout(o,l){t(),Te(n)===!1&&(e=setTimeout(o,l))}}}const P=[];let M;function Mt(e){M=e.keyCode===27}function Ot(){M===!0&&(M=!1)}function _t(e){M===!0&&(M=!1,Se(e,27)===!0&&P[P.length-1](e))}function Ae(e){window[e]("keydown",Mt),window[e]("blur",Ot),window[e]("keyup",_t),M=!1}function Wt(e){ue.is.desktop===!0&&(P.push(e),P.length===1&&Ae("addEventListener"))}function we(e){const n=P.indexOf(e);n>-1&&(P.splice(n,1),P.length===0&&Ae("removeEventListener"))}const E=[];function Me(e){E[E.length-1](e)}function Lt(e){ue.is.desktop===!0&&(E.push(e),E.length===1&&document.body.addEventListener("focusin",Me))}function It(e){const n=E.indexOf(e);n>-1&&(E.splice(n,1),E.length===0&&document.body.removeEventListener("focusin",Me))}const{notPassiveCapture:j}=oe,D=[];function K(e){const n=e.target;if(n===void 0||n.nodeType===8||n.classList.contains("no-pointer-events")===!0)return;let t=A.length-1;for(;t>=0;){const o=A[t].$;if(o.type.name!=="QDialog")break;if(o.props.seamless!==!0)return;t--}for(let o=D.length-1;o>=0;o--){const l=D[o];if((l.anchorEl.value===null||l.anchorEl.value.contains(n)===!1)&&(n===document.body||l.innerRef.value!==null&&l.innerRef.value.contains(n)===!1))e.qClickOutside=!0,l.onClickOutside(e);else return}}function Rt(e){D.push(e),D.length===1&&(document.addEventListener("mousedown",K,j),document.addEventListener("touchstart",K,j))}function pe(e){const n=D.findIndex(t=>t===e);n>-1&&(D.splice(n,1),D.length===0&&(document.removeEventListener("mousedown",K,j),document.removeEventListener("touchstart",K,j)))}let xe,ke;function ye(e){const n=e.split(" ");return n.length!==2?!1:["top","center","bottom"].includes(n[0])!==!0?(console.error("Anchor/Self position must start with one of top/center/bottom"),!1):["left","middle","right","start","end"].includes(n[1])!==!0?(console.error("Anchor/Self position must end with one of left/middle/right/start/end"),!1):!0}function zt(e){return e?!(e.length!==2||typeof e[0]!="number"||typeof e[1]!="number"):!0}const ae={"start#ltr":"left","start#rtl":"right","end#ltr":"right","end#rtl":"left"};["left","middle","right"].forEach(e=>{ae[`${e}#ltr`]=e,ae[`${e}#rtl`]=e});function Ce(e,n){const t=e.split(" ");return{vertical:t[0],horizontal:ae[`${t[1]}#${n===!0?"rtl":"ltr"}`]}}function Ft(e,n){let{top:t,left:o,right:l,bottom:i,width:a,height:r}=e.getBoundingClientRect();return n!==void 0&&(t-=n[1],o-=n[0],i+=n[1],l+=n[0],a+=n[0],r+=n[1]),{top:t,bottom:i,height:r,left:o,right:l,width:a,middle:o+(l-o)/2,center:t+(i-t)/2}}function Qt(e,n,t){let{top:o,left:l}=e.getBoundingClientRect();return o+=n.top,l+=n.left,t!==void 0&&(o+=t[1],l+=t[0]),{top:o,bottom:o+1,height:1,left:l,right:l+1,width:1,middle:l,center:o}}function jt(e){return{top:0,center:e.offsetHeight/2,bottom:e.offsetHeight,left:0,middle:e.offsetWidth/2,right:e.offsetWidth}}function qe(e,n,t){return{top:e[t.anchorOrigin.vertical]-n[t.selfOrigin.vertical],left:e[t.anchorOrigin.horizontal]-n[t.selfOrigin.horizontal]}}function Kt(e){if(ue.is.ios===!0&&window.visualViewport!==void 0){const r=document.body.style,{offsetLeft:d,offsetTop:c}=window.visualViewport;d!==xe&&(r.setProperty("--q-pe-left",d+"px"),xe=d),c!==ke&&(r.setProperty("--q-pe-top",c+"px"),ke=c)}const{scrollLeft:n,scrollTop:t}=e.el,o=e.absoluteOffset===void 0?Ft(e.anchorEl,e.cover===!0?[0,0]:e.offset):Qt(e.anchorEl,e.absoluteOffset,e.offset);let l={maxHeight:e.maxHeight,maxWidth:e.maxWidth,visibility:"visible"};(e.fit===!0||e.cover===!0)&&(l.minWidth=o.width+"px",e.cover===!0&&(l.minHeight=o.height+"px")),Object.assign(e.el.style,l);const i=jt(e.el);let a=qe(o,i,e);if(e.absoluteOffset===void 0||e.offset===void 0)ne(a,o,i,e.anchorOrigin,e.selfOrigin);else{const{top:r,left:d}=a;ne(a,o,i,e.anchorOrigin,e.selfOrigin);let c=!1;if(a.top!==r){c=!0;const s=2*e.offset[1];o.center=o.top-=s,o.bottom-=s+2}if(a.left!==d){c=!0;const s=2*e.offset[0];o.middle=o.left-=s,o.right-=s+2}c===!0&&(a=qe(o,i,e),ne(a,o,i,e.anchorOrigin,e.selfOrigin))}l={top:a.top+"px",left:a.left+"px"},a.maxHeight!==void 0&&(l.maxHeight=a.maxHeight+"px",o.height>a.maxHeight&&(l.minHeight=l.maxHeight)),a.maxWidth!==void 0&&(l.maxWidth=a.maxWidth+"px",o.width>a.maxWidth&&(l.minWidth=l.maxWidth)),Object.assign(e.el.style,l),e.el.scrollTop!==t&&(e.el.scrollTop=t),e.el.scrollLeft!==n&&(e.el.scrollLeft=n)}function ne(e,n,t,o,l){const i=t.bottom,a=t.right,r=yt(),d=window.innerHeight-r,c=document.body.clientWidth;if(e.top<0||e.top+i>d)if(l.vertical==="center")e.top=n[o.vertical]>d/2?Math.max(0,d-i):0,e.maxHeight=Math.min(i,d);else if(n[o.vertical]>d/2){const s=Math.min(d,o.vertical==="center"?n.center:o.vertical===l.vertical?n.bottom:n.top);e.maxHeight=Math.min(i,s),e.top=Math.max(0,s-i)}else e.top=Math.max(0,o.vertical==="center"?n.center:o.vertical===l.vertical?n.top:n.bottom),e.maxHeight=Math.min(i,d-e.top);if(e.left<0||e.left+a>c)if(e.maxWidth=Math.min(a,c),l.horizontal==="middle")e.left=n[o.horizontal]>c/2?Math.max(0,c-a):0;else if(n[o.horizontal]>c/2){const s=Math.min(c,o.horizontal==="middle"?n.middle:o.horizontal===l.horizontal?n.right:n.left);e.maxWidth=Math.min(a,s),e.left=Math.max(0,s-e.maxWidth)}else e.left=Math.max(0,o.horizontal==="middle"?n.middle:o.horizontal===l.horizontal?n.left:n.right),e.maxWidth=Math.min(a,c-e.left)}var Nt=N({name:"QMenu",inheritAttrs:!1,props:{...St,...Vt,...Ee,...$e,persistent:Boolean,autoClose:Boolean,separateClosePopup:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,fit:Boolean,cover:Boolean,square:Boolean,anchor:{type:String,validator:ye},self:{type:String,validator:ye},offset:{type:Array,validator:zt},scrollTarget:{default:void 0},touchPosition:Boolean,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null}},emits:[...Pt,"click","escapeKey"],setup(e,{slots:n,emit:t,attrs:o}){let l=null,i,a,r;const d=$(),{proxy:c}=d,{$q:s}=c,p=q(null),w=q(!1),u=b(()=>e.persistent!==!0&&e.noRouteDismiss!==!0),g=De(e,s),{registerTick:y,removeTick:T}=Ht(),{registerTimeout:V}=At(),{transitionProps:v,transitionStyle:k}=pt(e),{localScrollTarget:m,changeScrollEvent:G,unconfigureScrollTarget:X}=Tt(e,ce),{anchorEl:S,canShow:Y}=Bt({showing:w}),{hide:L}=Et({showing:w,canShow:Y,handleShow:Le,handleHide:Ie,hideOnRouteChange:u,processOnMount:!0}),{showPortal:I,hidePortal:R,renderPortal:h}=$t(d,p,ze,"menu"),C={anchorEl:S,innerRef:p,onClickOutside(f){if(e.persistent!==!0&&w.value===!0)return L(f),(f.type==="touchstart"||f.target.classList.contains("q-dialog__backdrop"))&&le(f),!0}},O=b(()=>Ce(e.anchor||(e.cover===!0?"center middle":"bottom start"),s.lang.rtl)),Oe=b(()=>e.cover===!0?O.value:Ce(e.self||"top start",s.lang.rtl)),_e=b(()=>(e.square===!0?" q-menu--square":"")+(g.value===!0?" q-menu--dark q-dark":"")),We=b(()=>e.autoClose===!0?{onClick:Re}:{}),re=b(()=>w.value===!0&&e.persistent!==!0);B(re,f=>{f===!0?(Wt(Z),Rt(C)):(we(Z),pe(C))});function J(){ht(()=>{let f=p.value;f&&f.contains(document.activeElement)!==!0&&(f=f.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||f.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||f.querySelector("[autofocus], [data-autofocus]")||f,f.focus({preventScroll:!0}))})}function Le(f){if(l=e.noRefocus===!1?document.activeElement:null,Lt(de),I(),ce(),i=void 0,f!==void 0&&(e.touchPosition||e.contextMenu)){const ee=et(f);if(ee.left!==void 0){const{top:Fe,left:Qe}=S.value.getBoundingClientRect();i={left:ee.left-Qe,top:ee.top-Fe}}}a===void 0&&(a=B(()=>s.screen.width+"|"+s.screen.height+"|"+e.self+"|"+e.anchor+"|"+s.lang.rtl,_)),e.noFocus!==!0&&document.activeElement.blur(),y(()=>{_(),e.noFocus!==!0&&J()}),V(()=>{s.platform.is.ios===!0&&(r=e.autoClose,p.value.click()),_(),I(!0),t("show",f)},e.transitionDuration)}function Ie(f){T(),R(),se(!0),l!==null&&(f===void 0||f.qClickOutside!==!0)&&(((f&&f.type.indexOf("key")===0?l.closest('[tabindex]:not([tabindex^="-"])'):void 0)||l).focus(),l=null),V(()=>{R(!0),t("hide",f)},e.transitionDuration)}function se(f){i=void 0,a!==void 0&&(a(),a=void 0),(f===!0||w.value===!0)&&(It(de),X(),pe(C),we(Z)),f!==!0&&(l=null)}function ce(){(S.value!==null||e.scrollTarget!==void 0)&&(m.value=kt(S.value,e.scrollTarget),G(m.value,_))}function Re(f){r!==!0?(He(c,f),t("click",f)):r=!1}function de(f){re.value===!0&&e.noFocus!==!0&&nt(p.value,f.target)!==!0&&J()}function Z(f){t("escapeKey"),L(f)}function _(){const f=p.value;f===null||S.value===null||Kt({el:f,offset:e.offset,anchorEl:S.value,anchorOrigin:O.value,selfOrigin:Oe.value,absoluteOffset:i,fit:e.fit,cover:e.cover,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function ze(){return x(tt,v.value,()=>w.value===!0?x("div",{role:"menu",...o,ref:p,tabindex:-1,class:["q-menu q-position-engine scroll"+_e.value,o.class],style:[o.style,k.value],...We.value},U(n.default)):null)}return W(se),Object.assign(c,{focus:J,updatePosition:_}),h}});const Ut=Object.keys(Ve),Gt=e=>Ut.reduce((n,t)=>{const o=e[t];return o!==void 0&&(n[t]=o),n},{});var gn=N({name:"QBtnDropdown",props:{...Ve,...$e,modelValue:Boolean,split:Boolean,dropdownIcon:String,contentClass:[Array,String,Object],contentStyle:[Array,String,Object],cover:Boolean,persistent:Boolean,noRouteDismiss:Boolean,autoClose:Boolean,menuAnchor:{type:String,default:"bottom end"},menuSelf:{type:String,default:"top end"},menuOffset:Array,disableMainBtn:Boolean,disableDropdown:Boolean,noIconAnimation:Boolean,toggleAriaLabel:String},emits:["update:modelValue","click","beforeShow","show","beforeHide","hide"],setup(e,{slots:n,emit:t}){const{proxy:o}=$(),l=q(e.modelValue),i=q(null),a=gt(),r=b(()=>{const m={"aria-expanded":l.value===!0?"true":"false","aria-haspopup":"true","aria-controls":a,"aria-label":e.toggleAriaLabel||o.$q.lang.label[l.value===!0?"collapse":"expand"](e.label)};return(e.disable===!0||e.split===!1&&e.disableMainBtn===!0||e.disableDropdown===!0)&&(m["aria-disabled"]="true"),m}),d=b(()=>"q-btn-dropdown__arrow"+(l.value===!0&&e.noIconAnimation===!1?" rotate-180":"")+(e.split===!1?" q-btn-dropdown__arrow-container":"")),c=b(()=>ot(e)),s=b(()=>Gt(e));B(()=>e.modelValue,m=>{i.value!==null&&i.value[m?"show":"hide"]()}),B(()=>e.split,k);function p(m){l.value=!0,t("beforeShow",m)}function w(m){t("show",m),t("update:modelValue",!0)}function u(m){l.value=!1,t("beforeHide",m)}function g(m){t("hide",m),t("update:modelValue",!1)}function y(m){t("click",m)}function T(m){lt(m),k(),t("click",m)}function V(m){i.value!==null&&i.value.toggle(m)}function v(m){i.value!==null&&i.value.show(m)}function k(m){i.value!==null&&i.value.hide(m)}return Object.assign(o,{show:v,hide:k,toggle:V}),ie(()=>{e.modelValue===!0&&v()}),()=>{const m=[x(Pe,{class:d.value,name:e.dropdownIcon||o.$q.iconSet.arrow.dropdown})];return e.disableDropdown!==!0&&m.push(x(Nt,{ref:i,id:a,class:e.contentClass,style:e.contentStyle,cover:e.cover,fit:!0,persistent:e.persistent,noRouteDismiss:e.noRouteDismiss,autoClose:e.autoClose,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,separateClosePopup:!0,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,onBeforeShow:p,onShow:w,onBeforeHide:u,onHide:g},n.default)),e.split===!1?x(te,{class:"q-btn-dropdown q-btn-dropdown--simple",...s.value,...r.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:y},{default:()=>U(n.label,[]).concat(m),loading:n.loading}):x(Ct,{class:"q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item",rounded:e.rounded,square:e.square,...c.value,glossy:e.glossy,stretch:e.stretch},()=>[x(te,{class:"q-btn-dropdown--current",...s.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:T},{default:n.label,loading:n.loading}),x(te,{class:"q-btn-dropdown__arrow-container q-anchor--skip",...r.value,...c.value,disable:e.disable===!0||e.disableDropdown===!0,rounded:e.rounded,color:e.color,textColor:e.textColor,dense:e.dense,size:e.size,padding:e.padding,ripple:e.ripple},()=>m)])}}});function Xt(e,n){const t=q(null),o=b(()=>e.disable===!0?null:x("span",{ref:t,class:"no-outline",tabindex:-1}));function l(i){const a=n.value;i!==void 0&&i.type.indexOf("key")===0?a!==null&&document.activeElement!==a&&a.contains(document.activeElement)===!0&&a.focus():t.value!==null&&(i===void 0||a!==null&&a.contains(i.target)===!0)&&t.value.focus()}return{refocusTargetEl:o,refocusTarget:l}}var Yt={xs:30,sm:35,md:40,lg:50,xl:60};const Jt={...Ee,...ut,...bt,modelValue:{required:!0,default:null},val:{},trueValue:{default:!0},falseValue:{default:!1},indeterminateValue:{default:null},checkedIcon:String,uncheckedIcon:String,indeterminateIcon:String,toggleOrder:{type:String,validator:e=>e==="tf"||e==="ft"},toggleIndeterminate:Boolean,label:String,leftLabel:Boolean,color:String,keepColor:Boolean,dense:Boolean,disable:Boolean,tabindex:[String,Number]},Zt=["update:modelValue"];function en(e,n){const{props:t,slots:o,emit:l,proxy:i}=$(),{$q:a}=i,r=De(t,a),d=q(null),{refocusTargetEl:c,refocusTarget:s}=Xt(t,d),p=at(t,Yt),w=b(()=>t.val!==void 0&&Array.isArray(t.modelValue)),u=b(()=>{const h=H(t.val);return w.value===!0?t.modelValue.findIndex(C=>H(C)===h):-1}),g=b(()=>w.value===!0?u.value>-1:H(t.modelValue)===H(t.trueValue)),y=b(()=>w.value===!0?u.value===-1:H(t.modelValue)===H(t.falseValue)),T=b(()=>g.value===!1&&y.value===!1),V=b(()=>t.disable===!0?-1:t.tabindex||0),v=b(()=>`q-${e} cursor-pointer no-outline row inline no-wrap items-center`+(t.disable===!0?" disabled":"")+(r.value===!0?` q-${e}--dark`:"")+(t.dense===!0?` q-${e}--dense`:"")+(t.leftLabel===!0?" reverse":"")),k=b(()=>{const h=g.value===!0?"truthy":y.value===!0?"falsy":"indet",C=t.color!==void 0&&(t.keepColor===!0||(e==="toggle"?g.value===!0:y.value!==!0))?` text-${t.color}`:"";return`q-${e}__inner relative-position non-selectable q-${e}__inner--${h}${C}`}),m=b(()=>{const h={type:"checkbox"};return t.name!==void 0&&Object.assign(h,{".checked":g.value,"^checked":g.value===!0?"checked":void 0,name:t.name,value:w.value===!0?t.val:t.trueValue}),h}),G=wt(m),X=b(()=>{const h={tabindex:V.value,role:e==="toggle"?"switch":"checkbox","aria-label":t.label,"aria-checked":T.value===!0?"mixed":g.value===!0?"true":"false"};return t.disable===!0&&(h["aria-disabled"]="true"),h});function S(h){h!==void 0&&(le(h),s(h)),t.disable!==!0&&l("update:modelValue",Y(),h)}function Y(){if(w.value===!0){if(g.value===!0){const h=t.modelValue.slice();return h.splice(u.value,1),h}return t.modelValue.concat([t.val])}if(g.value===!0){if(t.toggleOrder!=="ft"||t.toggleIndeterminate===!1)return t.falseValue}else if(y.value===!0){if(t.toggleOrder==="ft"||t.toggleIndeterminate===!1)return t.trueValue}else return t.toggleOrder!=="ft"?t.trueValue:t.falseValue;return t.indeterminateValue}function L(h){(h.keyCode===13||h.keyCode===32)&&le(h)}function I(h){(h.keyCode===13||h.keyCode===32)&&S(h)}const R=n(g,T);return Object.assign(i,{toggle:S}),()=>{const h=R();t.disable!==!0&&G(h,"unshift",` q-${e}__native absolute q-ma-none q-pa-none`);const C=[x("div",{class:k.value,style:p.value,"aria-hidden":"true"},h)];c.value!==null&&C.push(c.value);const O=t.label!==void 0?it(o.default,[t.label]):U(o.default);return O!==void 0&&C.push(x("div",{class:`q-${e}__label q-anchor--skip`},O)),x("div",{ref:d,class:v.value,...X.value,onClick:S,onKeydown:L,onKeyup:I},C)}}var tn=N({name:"QToggle",props:{...Jt,icon:String,iconColor:String},emits:Zt,setup(e){function n(t,o){const l=b(()=>(t.value===!0?e.checkedIcon:o.value===!0?e.indeterminateIcon:e.uncheckedIcon)||e.icon),i=b(()=>t.value===!0?e.iconColor:null);return()=>[x("div",{class:"q-toggle__track"}),x("div",{class:"q-toggle__thumb absolute flex flex-center no-wrap"},l.value!==void 0?[x(Pe,{name:l.value,color:i.value})]:void 0)]}return en("toggle",n)}});function nn(){return rt(st)}const on=ct({name:"DarkComp",components:{},props:{isDense:Boolean},setup(){const e=nn();return{isDark:q(e.dark.isActive)}},methods:{onToggle:function(){(this.isDark==!1||this.isDark==!0)&&(this.$q.dark.set(this.isDark),localStorage.setItem("mode",this.isDark))}},mounted(){}}),ln={class:"q-px-md"},an={key:0,class:"text-primary"};function un(e,n,t,o,l,i){return he(),ge("div",ln,[e.isDense?ft("",!0):(he(),ge("span",an,"dark Mode")),vt(tn,{modelValue:e.isDark,"onUpdate:modelValue":n[0]||(n[0]=a=>e.isDark=a),onClick:e.onToggle,icon:"dark_mode"},null,8,["modelValue","onClick"])])}var bn=dt(on,[["render",un]]);export{bn as D,gn as Q,fn as a,vn as b,yt as c,mn as d,hn as e,kt as g};
