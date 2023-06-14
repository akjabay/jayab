import{l as h,w as R,o as y,y as p,U as z,g as k,V as S,r as w,u as A,W as T,h as g,c as b,p as B,X as j,Y as N,Z as I,$ as K,z as M,a0 as V}from"./index.758da505.js";import{a as F,b as W,c as H}from"./focusout.e509f8ae.js";import{u as C,a as O}from"./use-dark.d08f1f81.js";const{passive:E}=S,U=["both","horizontal","vertical"];var J=h({name:"QScrollObserver",props:{axis:{type:String,validator:e=>U.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:v}){const t={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let n=null,o,d;R(()=>e.scrollTarget,()=>{a(),f()});function c(){n!==null&&n();const u=Math.max(0,W(o)),m=H(o),r={top:u-t.position.top,left:m-t.position.left};if(e.axis==="vertical"&&r.top===0||e.axis==="horizontal"&&r.left===0)return;const q=Math.abs(r.top)>=Math.abs(r.left)?r.top<0?"up":"down":r.left<0?"left":"right";t.position={top:u,left:m},t.directionChanged=t.direction!==q,t.delta=r,t.directionChanged===!0&&(t.direction=q,t.inflectionPoint=t.position),v("scroll",{...t})}function f(){o=F(d,e.scrollTarget),o.addEventListener("scroll",i,E),i(!0)}function a(){o!==void 0&&(o.removeEventListener("scroll",i,E),o=void 0)}function i(u){if(u===!0||e.debounce===0||e.debounce==="0")c();else if(n===null){const[m,r]=e.debounce?[setTimeout(c,e.debounce),clearTimeout]:[requestAnimationFrame(c),cancelAnimationFrame];n=()=>{r(m),n=null}}}const{proxy:s}=k();return R(()=>s.$q.lang.rtl,c),y(()=>{d=s.$el.parentNode,f()}),p(()=>{n!==null&&n(),a()}),Object.assign(s,{trigger:i,getPosition:()=>t}),z}});function X(){const e=w(!A.value);return e.value===!1&&y(()=>{e.value=!0}),e}const _=typeof ResizeObserver!="undefined",L=_===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var ee=h({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:v}){let t=null,n,o={width:-1,height:-1};function d(a){a===!0||e.debounce===0||e.debounce==="0"?c():t===null&&(t=setTimeout(c,e.debounce))}function c(){if(t!==null&&(clearTimeout(t),t=null),n){const{offsetWidth:a,offsetHeight:i}=n;(a!==o.width||i!==o.height)&&(o={width:a,height:i},v("resize",o))}}const{proxy:f}=k();if(_===!0){let a;const i=s=>{n=f.$el.parentNode,n?(a=new ResizeObserver(d),a.observe(n),c()):s!==!0&&T(()=>{i(!0)})};return y(()=>{i()}),p(()=>{t!==null&&clearTimeout(t),a!==void 0&&(a.disconnect!==void 0?a.disconnect():n&&a.unobserve(n))}),z}else{let s=function(){t!==null&&(clearTimeout(t),t=null),i!==void 0&&(i.removeEventListener!==void 0&&i.removeEventListener("resize",d,S.passive),i=void 0)},u=function(){s(),n&&n.contentDocument&&(i=n.contentDocument.defaultView,i.addEventListener("resize",d,S.passive),c())};const a=X();let i;return y(()=>{T(()=>{n=f.$el,n&&u()})}),p(s),f.trigger=d,()=>{if(a.value===!0)return g("object",{style:L.style,tabindex:-1,type:"text/html",data:L.url,"aria-hidden":"true",onLoad:u})}}}}),te=h({name:"QItemSection",props:{avatar:Boolean,thumbnail:Boolean,side:Boolean,top:Boolean,noWrap:Boolean},setup(e,{slots:v}){const t=b(()=>`q-item__section column q-item__section--${e.avatar===!0||e.side===!0||e.thumbnail===!0?"side":"main"}`+(e.top===!0?" q-item__section--top justify-start":" justify-center")+(e.avatar===!0?" q-item__section--avatar":"")+(e.thumbnail===!0?" q-item__section--thumbnail":"")+(e.noWrap===!0?" q-item__section--nowrap":""));return()=>g("div",{class:t.value},B(v.default))}}),ne=h({name:"QItem",props:{...C,...j,tag:{type:String,default:"div"},active:{type:Boolean,default:null},clickable:Boolean,dense:Boolean,insetLevel:Number,tabindex:[String,Number],focused:Boolean,manualFocus:Boolean},emits:["click","keyup"],setup(e,{slots:v,emit:t}){const{proxy:{$q:n}}=k(),o=O(e,n),{hasLink:d,linkAttrs:c,linkClass:f,linkTag:a,navigateOnClick:i}=N(),s=w(null),u=w(null),m=b(()=>e.clickable===!0||d.value===!0||e.tag==="label"),r=b(()=>e.disable!==!0&&m.value===!0),q=b(()=>"q-item q-item-type row no-wrap"+(e.dense===!0?" q-item--dense":"")+(o.value===!0?" q-item--dark":"")+(d.value===!0&&e.active===null?f.value:e.active===!0?` q-item--active${e.activeClass!==void 0?` ${e.activeClass}`:""}`:"")+(e.disable===!0?" disabled":"")+(r.value===!0?" q-item--clickable q-link cursor-pointer "+(e.manualFocus===!0?"q-manual-focusable":"q-focusable q-hoverable")+(e.focused===!0?" q-manual-focusable--focused":""):"")),P=b(()=>{if(e.insetLevel===void 0)return null;const l=n.lang.rtl===!0?"Right":"Left";return{["padding"+l]:16+e.insetLevel*56+"px"}});function Q(l){r.value===!0&&(u.value!==null&&(l.qKeyEvent!==!0&&document.activeElement===s.value?u.value.focus():document.activeElement===u.value&&s.value.focus()),i(l))}function $(l){if(r.value===!0&&I(l,13)===!0){K(l),l.qKeyEvent=!0;const x=new MouseEvent("click",l);x.qKeyEvent=!0,s.value.dispatchEvent(x)}t("keyup",l)}function D(){const l=M(v.default,[]);return r.value===!0&&l.unshift(g("div",{class:"q-focus-helper",tabindex:-1,ref:u})),l}return()=>{const l={ref:s,class:q.value,style:P.value,role:"listitem",onClick:Q,onKeyup:$};return r.value===!0?(l.tabindex=e.tabindex||"0",Object.assign(l,c.value)):m.value===!0&&(l["aria-disabled"]="true"),g(a.value,l,D())}}}),ie=h({name:"QList",props:{...C,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean,tag:{type:String,default:"div"}},setup(e,{slots:v}){const t=k(),n=O(e,t.proxy.$q),o=b(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(n.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>g(e.tag,{class:o.value},B(v.default))}});function ae(){if(window.getSelection!==void 0){const e=window.getSelection();e.empty!==void 0?e.empty():e.removeAllRanges!==void 0&&(e.removeAllRanges(),V.is.mobile!==!0&&e.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}export{J as Q,ee as a,ie as b,ne as c,te as d,ae as e};
