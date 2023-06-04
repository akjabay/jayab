import{Q as l}from"./QToggle.b725a832.js";import{u as m,Q as u}from"./index.53176d0e.js";import{_ as c,d as f,r as a,B as h,D as g,E as y,G as s,C as Q,H as n,j as o,M as $,I as v,N as M}from"./index.e3bb839c.js";import{Q as _}from"./QCardSection.d70113f2.js";import{Q as A}from"./QCard.ecc37e14.js";import{Q as C}from"./QDialog.b86ce403.js";import{Q as V}from"./QInnerLoading.817d442a.js";import{Q as w}from"./QPage.bcc29a0e.js";import{M as P}from"./MapComp.26c1846c.js";import{a as q}from"./index.ad5a5923.js";import"./use-form.3b78d9ef.js";import"./focusout.1ff9a27a.js";import"./focus-manager.32f8d49a.js";import"./use-transition.ef594146.js";import"./QSeparator.6f4dd93e.js";import"./QInput.01d67d73.js";import"./QCardActions.ac1a2785.js";import"./ClosePopup.25aa6c51.js";import"./FilterComp.41bb0133.js";import"./selection.19156545.js";import"./CityComp.1fb8f8be.js";import"./format.801e7424.js";import"./ImageUploaderComp.cde73017.js";import"./QImg.4d2abf6d.js";import"./SubTitleComp.91a8159d.js";import"./axios.70926cff.js";const b=f({name:"ManageMapPage",components:{MapComp:P},setup(){return{isActive:a(!1),loaded:a(!1),products:a([]),pagination:a({limit:10,offset:0,total:1})}},methods:{async fetch(){try{this.$route.query&&this.$route.query.adding&&(this.isActive=!0),(!this.user||!this.user.city)&&(this.$q.notify({type:"warning",message:this.$t("setCityIsRequired"),caption:this.$t("failed")}),this.$router.push("/accounts/profile/setting"));const t=await q.product.productFindMyProducts({sorting:"cteaedAt: -1",latlng:this.user&&this.user.city?this.user.city.lat_long:"",isMap:!0});if(t.status===200){const e=t.data.data.productFindMyProducts.hits;this.products=e,this.pagination=t.data.data.productFindMyProducts.pagination,this.$refs.map.onAddingMarker({markers:this.products});const i=this.user&&this.user.city?this.user.city.lat_long:"",d=i?{latitude:i.split(",")[0],longitude:i.split(",")[1]}:{};this.$refs.map.setCurrentPositionMap({location:d})}this.loaded=!0}catch(t){console.log(t),this.$q.notify({type:"negative",message:this.$t("failed"),caption:this.$t("failed")})}}},mounted(){this.fetch()},computed:{...h(m,["user"])}}),S={class:"text-center q-ma-sm ad-box-bordered"},k=n("div",null," \u0644\u0637\u0641\u0627 \u0645\u06A9\u0627\u0646 \u0645\u0644\u06A9 \u0645\u0648\u0631\u062F \u0646\u0638\u0631 \u062E\u0648\u062F \u0631\u0627 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F ",-1);function B(t,e,i,d,I,N){const p=Q("map-comp");return g(),y(w,null,{default:s(()=>[n("div",null,[n("div",S,[o(l,{class:"ad-font-color",modelValue:t.isActive,"onUpdate:modelValue":e[0]||(e[0]=r=>t.isActive=r)},{default:s(()=>[$(v("\u0627\u0641\u0632\u0648\u062F\u0646 \u0648 \u0648\u06CC\u0631\u0627\u06CC\u0634 \u0645\u0644\u06A9"))]),_:1},8,["modelValue"])]),o(C,{modelValue:t.isActive,"onUpdate:modelValue":e[1]||(e[1]=r=>t.isActive=r),seamless:"",position:"bottom"},{default:s(()=>[o(A,{style:{width:"350px"},class:"ad-box-bordered ad-font-color"},{default:s(()=>[o(_,{class:"row items-center no-wrap"},{default:s(()=>[k,o(u),o(M,{size:"lg",name:"fa fa-location"})]),_:1})]),_:1})]),_:1},8,["modelValue"]),o(p,{isAdding:t.isActive,ref:"map"},null,8,["isAdding"])]),o(V,{showing:!t.loaded},null,8,["showing"])]),_:1})}var nt=c(b,[["render",B]]);export{nt as default};
