import{ai as De,ab as E,U as Me,aC as Qe,ak as B,aD as j,aj as x,ag as F,am as X,al as L,$ as Ee,l as Pe,r as p,c as h,ay as Ie,w as Ae,a9 as Oe,aA as Te,y as Be,h as S,x as He,O as ee,g as je,d as Fe,_ as Le,D as C,J as k,H as $,K as te,j as s,G as f,N as _,L as Q,I as q,Q as P,M as Ve,F as ae,R as le,aw as Ne,E as oe}from"./index.758da505.js";import{Q as Re}from"./QCardSection.9e482b55.js";import{Q as re}from"./QSeparator.159b8493.js";import{e as Xe,a as ne,Q as Ye,b as ie,c as se,d as D}from"./selection.31cc2582.js";import{u as Ue,a as Ke,Q as Ge}from"./use-dark.d08f1f81.js";import{b as H,Q as Je}from"./format.0584e0b6.js";import{s as V,q as ue}from"./focusout.e509f8ae.js";import{Q as We}from"./QCardActions.e5c1e1cc.js";import{a as Ze}from"./QCard.37bf516d.js";import{Q as xe}from"./QDialog.49e4cb1e.js";import{a as et}from"./index.b6409fd5.js";const Y={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},tt=Object.keys(Y);Y.all=!0;function ce(t){const l={};for(const u of tt)t[u]===!0&&(l[u]=!0);return Object.keys(l).length===0?Y:(l.horizontal===!0?l.left=l.right=!0:l.left===!0&&l.right===!0&&(l.horizontal=!0),l.vertical===!0?l.up=l.down=!0:l.up===!0&&l.down===!0&&(l.vertical=!0),l.horizontal===!0&&l.vertical===!0&&(l.all=!0),l)}function de(t,l){return l.event===void 0&&t.target!==void 0&&t.target.draggable!==!0&&typeof l.handler=="function"&&t.target.nodeName.toUpperCase()!=="INPUT"&&(t.qClonedBy===void 0||t.qClonedBy.indexOf(l.uid)===-1)}function N(t,l,u){const m=X(t);let e,o=m.left-l.event.x,r=m.top-l.event.y,a=Math.abs(o),d=Math.abs(r);const c=l.direction;c.horizontal===!0&&c.vertical!==!0?e=o<0?"left":"right":c.horizontal!==!0&&c.vertical===!0?e=r<0?"up":"down":c.up===!0&&r<0?(e="up",a>d&&(c.left===!0&&o<0?e="left":c.right===!0&&o>0&&(e="right"))):c.down===!0&&r>0?(e="down",a>d&&(c.left===!0&&o<0?e="left":c.right===!0&&o>0&&(e="right"))):c.left===!0&&o<0?(e="left",a<d&&(c.up===!0&&r<0?e="up":c.down===!0&&r>0&&(e="down"))):c.right===!0&&o>0&&(e="right",a<d&&(c.up===!0&&r<0?e="up":c.down===!0&&r>0&&(e="down")));let z=!1;if(e===void 0&&u===!1){if(l.event.isFirst===!0||l.event.lastDir===void 0)return{};e=l.event.lastDir,z=!0,e==="left"||e==="right"?(m.left-=o,a=0,o=0):(m.top-=r,d=0,r=0)}return{synthetic:z,payload:{evt:t,touch:l.event.mouse!==!0,mouse:l.event.mouse===!0,position:m,direction:e,isFirst:l.event.isFirst,isFinal:u===!0,duration:Date.now()-l.event.time,distance:{x:a,y:d},offset:{x:o,y:r},delta:{x:m.left-l.event.lastX,y:m.top-l.event.lastY}}}}let at=0;var ve=De({name:"touch-pan",beforeMount(t,{value:l,modifiers:u}){if(u.mouse!==!0&&E.has.touch!==!0)return;function m(o,r){u.mouse===!0&&r===!0?Ee(o):(u.stop===!0&&F(o),u.prevent===!0&&x(o))}const e={uid:"qvtp_"+at++,handler:l,modifiers:u,direction:ce(u),noop:Me,mouseStart(o){de(o,e)&&Qe(o)&&(B(e,"temp",[[document,"mousemove","move","notPassiveCapture"],[document,"mouseup","end","passiveCapture"]]),e.start(o,!0))},touchStart(o){if(de(o,e)){const r=o.target;B(e,"temp",[[r,"touchmove","move","notPassiveCapture"],[r,"touchcancel","end","passiveCapture"],[r,"touchend","end","passiveCapture"]]),e.start(o)}},start(o,r){if(E.is.firefox===!0&&j(t,!0),e.lastEvt=o,r===!0||u.stop===!0){if(e.direction.all!==!0&&(r!==!0||e.modifiers.mouseAllDir!==!0&&e.modifiers.mousealldir!==!0)){const c=o.type.indexOf("mouse")>-1?new MouseEvent(o.type,o):new TouchEvent(o.type,o);o.defaultPrevented===!0&&x(c),o.cancelBubble===!0&&F(c),Object.assign(c,{qKeyEvent:o.qKeyEvent,qClickOutside:o.qClickOutside,qAnchorHandled:o.qAnchorHandled,qClonedBy:o.qClonedBy===void 0?[e.uid]:o.qClonedBy.concat(e.uid)}),e.initialEvent={target:o.target,event:c}}F(o)}const{left:a,top:d}=X(o);e.event={x:a,y:d,time:Date.now(),mouse:r===!0,detected:!1,isFirst:!0,isFinal:!1,lastX:a,lastY:d}},move(o){if(e.event===void 0)return;const r=X(o),a=r.left-e.event.x,d=r.top-e.event.y;if(a===0&&d===0)return;e.lastEvt=o;const c=e.event.mouse===!0,z=()=>{m(o,c);let y;u.preserveCursor!==!0&&u.preservecursor!==!0&&(y=document.documentElement.style.cursor||"",document.documentElement.style.cursor="grabbing"),c===!0&&document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),Xe(),e.styleCleanup=w=>{if(e.styleCleanup=void 0,y!==void 0&&(document.documentElement.style.cursor=y),document.body.classList.remove("non-selectable"),c===!0){const I=()=>{document.body.classList.remove("no-pointer-events--children")};w!==void 0?setTimeout(()=>{I(),w()},50):I()}else w!==void 0&&w()}};if(e.event.detected===!0){e.event.isFirst!==!0&&m(o,e.event.mouse);const{payload:y,synthetic:w}=N(o,e,!1);y!==void 0&&(e.handler(y)===!1?e.end(o):(e.styleCleanup===void 0&&e.event.isFirst===!0&&z(),e.event.lastX=y.position.left,e.event.lastY=y.position.top,e.event.lastDir=w===!0?void 0:y.direction,e.event.isFirst=!1));return}if(e.direction.all===!0||c===!0&&(e.modifiers.mouseAllDir===!0||e.modifiers.mousealldir===!0)){z(),e.event.detected=!0,e.move(o);return}const g=Math.abs(a),b=Math.abs(d);g!==b&&(e.direction.horizontal===!0&&g>b||e.direction.vertical===!0&&g<b||e.direction.up===!0&&g<b&&d<0||e.direction.down===!0&&g<b&&d>0||e.direction.left===!0&&g>b&&a<0||e.direction.right===!0&&g>b&&a>0?(e.event.detected=!0,e.move(o)):e.end(o,!0))},end(o,r){if(e.event!==void 0){if(L(e,"temp"),E.is.firefox===!0&&j(t,!1),r===!0)e.styleCleanup!==void 0&&e.styleCleanup(),e.event.detected!==!0&&e.initialEvent!==void 0&&e.initialEvent.target.dispatchEvent(e.initialEvent.event);else if(e.event.detected===!0){e.event.isFirst===!0&&e.handler(N(o===void 0?e.lastEvt:o,e).payload);const{payload:a}=N(o===void 0?e.lastEvt:o,e,!0),d=()=>{e.handler(a)};e.styleCleanup!==void 0?e.styleCleanup(d):d()}e.event=void 0,e.initialEvent=void 0,e.lastEvt=void 0}}};if(t.__qtouchpan=e,u.mouse===!0){const o=u.mouseCapture===!0||u.mousecapture===!0?"Capture":"";B(e,"main",[[t,"mousedown","mouseStart",`passive${o}`]])}E.has.touch===!0&&B(e,"main",[[t,"touchstart","touchStart",`passive${u.capture===!0?"Capture":""}`],[t,"touchmove","noop","notPassiveCapture"]])},updated(t,l){const u=t.__qtouchpan;u!==void 0&&(l.oldValue!==l.value&&(typeof value!="function"&&u.end(),u.handler=l.value),u.direction=ce(l.modifiers))},beforeUnmount(t){const l=t.__qtouchpan;l!==void 0&&(l.event!==void 0&&l.end(),L(l,"main"),L(l,"temp"),E.is.firefox===!0&&j(t,!1),l.styleCleanup!==void 0&&l.styleCleanup(),delete t.__qtouchpan)}});const fe=["vertical","horizontal"],R={vertical:{offset:"offsetY",scroll:"scrollTop",dir:"down",dist:"y"},horizontal:{offset:"offsetX",scroll:"scrollLeft",dir:"right",dist:"x"}},me={prevent:!0,mouse:!0,mouseAllDir:!0},he=t=>t>=250?50:Math.ceil(t/5);var pe=Pe({name:"QScrollArea",props:{...Ue,thumbStyle:Object,verticalThumbStyle:Object,horizontalThumbStyle:Object,barStyle:[Array,String,Object],verticalBarStyle:[Array,String,Object],horizontalBarStyle:[Array,String,Object],contentStyle:[Array,String,Object],contentActiveStyle:[Array,String,Object],delay:{type:[String,Number],default:1e3},visible:{type:Boolean,default:null},tabindex:[String,Number],onScroll:Function},setup(t,{slots:l,emit:u}){const m=p(!1),e=p(!1),o=p(!1),r={vertical:p(0),horizontal:p(0)},a={vertical:{ref:p(null),position:p(0),size:p(0)},horizontal:{ref:p(null),position:p(0),size:p(0)}},{proxy:d}=je(),c=Ke(t,d.$q);let z=null,g;const b=p(null),y=h(()=>"q-scrollarea"+(c.value===!0?" q-scrollarea--dark":""));a.vertical.percentage=h(()=>{const n=a.vertical.size.value-r.vertical.value;if(n<=0)return 0;const i=H(a.vertical.position.value/n,0,1);return Math.round(i*1e4)/1e4}),a.vertical.thumbHidden=h(()=>(t.visible===null?o.value:t.visible)!==!0&&m.value===!1&&e.value===!1||a.vertical.size.value<=r.vertical.value+1),a.vertical.thumbStart=h(()=>a.vertical.percentage.value*(r.vertical.value-a.vertical.thumbSize.value)),a.vertical.thumbSize=h(()=>Math.round(H(r.vertical.value*r.vertical.value/a.vertical.size.value,he(r.vertical.value),r.vertical.value))),a.vertical.style=h(()=>({...t.thumbStyle,...t.verticalThumbStyle,top:`${a.vertical.thumbStart.value}px`,height:`${a.vertical.thumbSize.value}px`})),a.vertical.thumbClass=h(()=>"q-scrollarea__thumb q-scrollarea__thumb--v absolute-right"+(a.vertical.thumbHidden.value===!0?" q-scrollarea__thumb--invisible":"")),a.vertical.barClass=h(()=>"q-scrollarea__bar q-scrollarea__bar--v absolute-right"+(a.vertical.thumbHidden.value===!0?" q-scrollarea__bar--invisible":"")),a.horizontal.percentage=h(()=>{const n=a.horizontal.size.value-r.horizontal.value;if(n<=0)return 0;const i=H(Math.abs(a.horizontal.position.value)/n,0,1);return Math.round(i*1e4)/1e4}),a.horizontal.thumbHidden=h(()=>(t.visible===null?o.value:t.visible)!==!0&&m.value===!1&&e.value===!1||a.horizontal.size.value<=r.horizontal.value+1),a.horizontal.thumbStart=h(()=>a.horizontal.percentage.value*(r.horizontal.value-a.horizontal.thumbSize.value)),a.horizontal.thumbSize=h(()=>Math.round(H(r.horizontal.value*r.horizontal.value/a.horizontal.size.value,he(r.horizontal.value),r.horizontal.value))),a.horizontal.style=h(()=>({...t.thumbStyle,...t.horizontalThumbStyle,[d.$q.lang.rtl===!0?"right":"left"]:`${a.horizontal.thumbStart.value}px`,width:`${a.horizontal.thumbSize.value}px`})),a.horizontal.thumbClass=h(()=>"q-scrollarea__thumb q-scrollarea__thumb--h absolute-bottom"+(a.horizontal.thumbHidden.value===!0?" q-scrollarea__thumb--invisible":"")),a.horizontal.barClass=h(()=>"q-scrollarea__bar q-scrollarea__bar--h absolute-bottom"+(a.horizontal.thumbHidden.value===!0?" q-scrollarea__bar--invisible":""));const w=h(()=>a.vertical.thumbHidden.value===!0&&a.horizontal.thumbHidden.value===!0?t.contentStyle:t.contentActiveStyle),I=[[ve,n=>{J(n,"vertical")},void 0,{vertical:!0,...me}]],be=[[ve,n=>{J(n,"horizontal")},void 0,{horizontal:!0,...me}]];function U(){const n={};return fe.forEach(i=>{const v=a[i];n[i+"Position"]=v.position.value,n[i+"Percentage"]=v.percentage.value,n[i+"Size"]=v.size.value,n[i+"ContainerSize"]=r[i].value}),n}const K=Ie(()=>{const n=U();n.ref=d,u("scroll",n)},0);function G(n,i,v){if(fe.includes(n)===!1){console.error("[QScrollArea]: wrong first param of setScrollPosition (vertical/horizontal)");return}(n==="vertical"?ue:V)(b.value,i,v)}function ye({height:n,width:i}){let v=!1;r.vertical.value!==n&&(r.vertical.value=n,v=!0),r.horizontal.value!==i&&(r.horizontal.value=i,v=!0),v===!0&&A()}function ze({position:n}){let i=!1;a.vertical.position.value!==n.top&&(a.vertical.position.value=n.top,i=!0),a.horizontal.position.value!==n.left&&(a.horizontal.position.value=n.left,i=!0),i===!0&&A()}function ge({height:n,width:i}){a.horizontal.size.value!==i&&(a.horizontal.size.value=i,A()),a.vertical.size.value!==n&&(a.vertical.size.value=n,A())}function J(n,i){const v=a[i];if(n.isFirst===!0){if(v.thumbHidden.value===!0)return;g=v.position.value,e.value=!0}else if(e.value!==!0)return;n.isFinal===!0&&(e.value=!1);const M=R[i],T=r[i].value,we=(v.size.value-T)/(T-v.thumbSize.value),ke=n.distance[M.dist],$e=g+(n.direction===M.dir?1:-1)*ke*we;Z($e,i)}function W(n,i){const v=a[i];if(v.thumbHidden.value!==!0){const M=n[R[i].offset];if(M<v.thumbStart.value||M>v.thumbStart.value+v.thumbSize.value){const T=M-v.thumbSize.value/2;Z(T/r[i].value*v.size.value,i)}v.ref.value!==null&&v.ref.value.dispatchEvent(new MouseEvent(n.type,n))}}function Se(n){W(n,"vertical")}function Ce(n){W(n,"horizontal")}function A(){m.value=!0,z!==null&&clearTimeout(z),z=setTimeout(()=>{z=null,m.value=!1},t.delay),t.onScroll!==void 0&&K()}function Z(n,i){b.value[R[i].scroll]=n}function _e(){o.value=!0}function qe(){o.value=!1}let O=null;return Ae(()=>d.$q.lang.rtl,n=>{b.value!==null&&V(b.value,Math.abs(a.horizontal.position.value)*(n===!0?-1:1))}),Oe(()=>{O={top:a.vertical.position.value,left:a.horizontal.position.value}}),Te(()=>{if(O===null)return;const n=b.value;n!==null&&(V(n,O.left),ue(n,O.top))}),Be(K.cancel),Object.assign(d,{getScrollTarget:()=>b.value,getScroll:U,getScrollPosition:()=>({top:a.vertical.position.value,left:a.horizontal.position.value}),getScrollPercentage:()=>({top:a.vertical.percentage.value,left:a.horizontal.percentage.value}),setScrollPosition:G,setScrollPercentage(n,i,v){G(n,i*(a[n].size.value-r[n].value)*(n==="horizontal"&&d.$q.lang.rtl===!0?-1:1),v)}}),()=>S("div",{class:y.value,onMouseenter:_e,onMouseleave:qe},[S("div",{ref:b,class:"q-scrollarea__container scroll relative-position fit hide-scrollbar",tabindex:t.tabindex!==void 0?t.tabindex:void 0},[S("div",{class:"q-scrollarea__content absolute",style:w.value},He(l.default,[S(ne,{debounce:0,onResize:ge})])),S(Ye,{axis:"both",onScroll:ze})]),S(ne,{debounce:0,onResize:ye}),S("div",{class:a.vertical.barClass.value,style:[t.barStyle,t.verticalBarStyle],"aria-hidden":"true",onMousedown:Se}),S("div",{class:a.horizontal.barClass.value,style:[t.barStyle,t.horizontalBarStyle],"aria-hidden":"true",onMousedown:Ce}),ee(S("div",{ref:a.vertical.ref,class:a.vertical.thumbClass.value,style:a.vertical.style.value,"aria-hidden":"true"}),I),ee(S("div",{ref:a.horizontal.ref,class:a.horizontal.thumbClass.value,style:a.horizontal.style.value,"aria-hidden":"true"}),be)])}});const lt=Fe({name:"CityComp",props:{item:{type:Object,required:!1},items:{type:Array,required:!1,default:p([])}},setup(){return{secondItems:p([]),selectDialog:p(!1),loaded:p(!0)}},methods:{async onSelectParentItem(t){try{this.loaded=!1;const l=await et.main.getCities({province_id:t.id});if(l.status===200){const u=l.data.data;this.secondItems=u,this.secondItems.length>0&&(this.secondItems[0].parent=t)}}catch(l){console.log(l),this.$q.notify({type:"negative",message:this.$t("failed"),caption:this.$t("failed")})}this.loaded=!0},onSelectItem(t){this.$emit("on-select-item",t),this.secondItems=[],this.selectDialog=!1},onReset(){this.onSelectItem({}),this.selectDialog=!1}}}),ot={class:"q-pa-md"},rt={class:"row"},nt={key:0},it={key:1},st={key:0},ut={key:1},ct={class:"q-my-sm"},dt={class:"q-px-xs"},vt={class:"q-px-md text-bold"},ft={class:"q-px-xs"};function mt(t,l,u,m,e,o){return C(),k("div",ot,[$("div",rt,[$("div",{class:te(t.item&&t.item.name?"col-11":"col-12")},[s(P,{outline:"","no-caps":"",class:"full-width ad-secondary-btn",onClick:l[0]||(l[0]=r=>t.selectDialog=!0)},{default:f(()=>[t.item&&t.item.name?(C(),k("span",nt,[s(_,{class:"q-mx-sm",size:"xs",name:t.item.icon_url},null,8,["name"]),Q(" "+q(t.item.name)+" ",1),s(_,{class:"q-mr-xs",name:"check"})])):(C(),k("span",it,[Q(q(t.$t("chooseCity"))+" ",1),s(_,{class:"mr-1",name:"arrow_"+t.$t("left")},null,8,["name"])]))]),_:1})],2),t.item&&t.item.name?(C(),k("div",{key:0,class:te(t.item&&t.item.name?"col-1":"col-0")},[s(P,{onClick:t.onReset,class:"q-px-xs q-mx-none ad-font-color",flat:""},{default:f(()=>[s(_,{name:"fa fa-times"})]),_:1},8,["onClick"])],2)):Ve("",!0)]),s(xe,{modelValue:t.selectDialog,"onUpdate:modelValue":l[3]||(l[3]=r=>t.selectDialog=r),style:Ne("direction: "+t.$t("direction"))},{default:f(()=>[s(Ze,{class:"q-pa-none q-ma-none",style:{"min-width":"350px"}},{default:f(()=>[s(Re,null,{default:f(()=>[Q(q(t.$t("chooseCity")),1)]),_:1}),s(re),t.secondItems.length==0?(C(),k("div",st,[s(pe,{style:{height:"300px"}},{default:f(()=>[s(ie,null,{default:f(()=>[(C(!0),k(ae,null,le(t.items,(r,a)=>(C(),oe(se,{key:a,clickable:"",class:"pointer",onClick:d=>t.onSelectParentItem(r)},{default:f(()=>[s(D,{avatar:""},{default:f(()=>[$("span",null,q(a+1),1)]),_:2},1024),s(D,null,{default:f(()=>[s(_,{size:"xs",name:r.icon_url},null,8,["name"])]),_:2},1024),s(D,null,{default:f(()=>[Q(q(r.name),1)]),_:2},1024),s(D,{avatar:""},{default:f(()=>[s(_,{name:"arrow_"+t.$t("left")},null,8,["name"])]),_:1})]),_:2},1032,["onClick"]))),128))]),_:1})]),_:1})])):(C(),k("div",ut,[$("div",ct,[s(P,{flat:"",class:"ad-secondary-btn text-center",onClick:l[1]||(l[1]=r=>t.secondItems=[])},{default:f(()=>[s(_,{name:"arrow_"+t.$t("right")},null,8,["name"])]),_:1}),$("span",dt,[s(_,{size:"xs",name:t.secondItems[0].icon_url},null,8,["name"])]),$("span",vt,q(t.secondItems[0].parent.name),1)]),s(pe,{style:{height:"300px"}},{default:f(()=>[s(ie,null,{default:f(()=>[(C(!0),k(ae,null,le(t.secondItems,(r,a)=>(C(),oe(se,{clickable:"",key:a,class:"pointer",onClick:d=>t.onSelectItem(r)},{default:f(()=>[s(D,{avatar:""},{default:f(()=>[$("span",null,q(a+1),1)]),_:2},1024),s(D,{avatar:""},{default:f(()=>[$("span",ft,[s(_,{size:"xs",name:r.icon_url},null,8,["name"])])]),_:2},1024),s(D,null,{default:f(()=>[Q(q(r.name),1)]),_:2},1024),s(D,{avatar:""},{default:f(()=>[s(_,{name:"arrow_"+t.$t("left")},null,8,["name"])]),_:1})]),_:2},1032,["onClick"]))),128))]),_:1})]),_:1})])),s(re),s(We,null,{default:f(()=>[s(Ge),s(P,{flat:"",color:"red",onClick:t.onReset},{default:f(()=>[Q(q(t.$t("reset")),1)]),_:1},8,["onClick"]),s(P,{flat:"",onClick:l[2]||(l[2]=r=>t.selectDialog=!1)},{default:f(()=>[Q(q(t.$t("cancel")),1)]),_:1})]),_:1}),s(Je,{showing:!t.loaded},null,8,["showing"])]),_:1})]),_:1},8,["modelValue","style"])])}var kt=Le(lt,[["render",mt]]);export{kt as C,pe as Q,ve as T,ce as g,de as s};