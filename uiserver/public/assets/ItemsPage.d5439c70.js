import{d as _,r as o,B as F,_ as k,C as c,D as a,E as p,G as m,H as h,j as i,N as g,Q as f,J as y,L as v,K as P}from"./index.e3bb839c.js";import{Q as A}from"./QBtnGroup.323b7aa4.js";import{Q as O}from"./QPage.bcc29a0e.js";import{u as b,Q as $}from"./index.53176d0e.js";import{Q as q}from"./QInnerLoading.817d442a.js";import{F as D}from"./FilterComp.41bb0133.js";import{L as V}from"./ListComp.e7fdee06.js";import{P as M}from"./PaginationComp.05309bd3.js";import{E as B}from"./EmptyComp.f6009f5c.js";import{a as Q}from"./index.ad5a5923.js";import{M as S}from"./MapComp.26c1846c.js";import"./use-transition.ef594146.js";import"./QInput.01d67d73.js";import"./use-form.3b78d9ef.js";import"./focus-manager.32f8d49a.js";import"./QCardSection.d70113f2.js";import"./QSeparator.6f4dd93e.js";import"./selection.19156545.js";import"./focusout.1ff9a27a.js";import"./CityComp.1fb8f8be.js";import"./format.801e7424.js";import"./QCardActions.ac1a2785.js";import"./QCard.ecc37e14.js";import"./QDialog.b86ce403.js";import"./QImg.4d2abf6d.js";import"./axios.70926cff.js";import"./ClosePopup.25aa6c51.js";import"./ImageUploaderComp.cde73017.js";import"./SubTitleComp.91a8159d.js";const E=_({name:"ListPage",setup(){return{filterOptions:o({}),products:o([]),currentPage:o(1),pagination:o({limit:10,offset:0,total:1}),loaded:o(!1),filtering:o(!1)}},components:{FilterComp:D,ListComp:V,PaginationComp:M,EmptyComp:B},methods:{onResetFilter(){this.filterOptions={},this.$refs.filterComp.resetState()},onChangeFilter(t){this.filterOptions=t},async onChangePage(t){await this.fetchData({page:t}),this.currentPage=t},async fetchData(t=[]){try{const{page:e}=t;e&&(this.pagination.offset=(e-1)*this.pagination.limit);const d={};Object.keys(this.filterOptions).forEach(l=>{d[l]=this.filterOptions[l]});const s=await Q.product.productFindAll({limit:this.pagination.limit,offset:this.pagination.offset,sorting:"cteaedAt: -1",categoryId:this.filterOptions.category?this.filterOptions.category.id:"",latlng:this.filterOptions.city?this.filterOptions.city.lat_long:"",...d});if(s.status===200){const l=s.data.data.productFindAll.hits;this.products=l,this.pagination=s.data.data.productFindAll.pagination}this.loaded=!0}catch(e){console.log(e),this.$q.notify({type:"negative",message:this.$t("failed"),caption:this.$t("failed")})}}},computed:{...F(b,["user"])},mounted(){this.fetchData()}}),I={class:"row"},L={key:0},j={class:"row"},z={key:0},N={key:1};function R(t,e,d,s,l,C){const r=c("filter-comp"),n=c("list-comp"),u=c("pagination-comp"),w=c("empty-comp");return a(),p(O,null,{default:m(()=>[h("div",null,[h("div",I,[i($),i(f,{onClick:e[0]||(e[0]=x=>t.filtering=!t.filtering),outline:"",class:"q-ma-xs ad-font-color","no-caps":""},{default:m(()=>[t.filtering?(a(),p(g,{key:0,class:"",size:"1.5em",name:"fas fa-caret-up"})):(a(),p(g,{key:1,class:"",size:"1.5em",name:"fa fa-filter"}))]),_:1})]),t.filtering?(a(),y("div",L,[i(r,{ref:"filterComp",onOnChangeFilter:t.onChangeFilter,filterOptions:t.filterOptions},null,8,["onOnChangeFilter","filterOptions"]),h("div",j,[i($),i(f,{onClick:t.onResetFilter,outline:"",class:"q-ma-xs ad-font-color",label:t.$t("clean"),"no-caps":""},null,8,["onClick","label"]),i(f,{onClick:t.fetchData,class:"q-ma-xs ad-primary-btn",label:t.$t("search"),"no-caps":""},{default:m(()=>[i(g,{class:"q-pr-md",name:"fa fa-magnifying-glass"})]),_:1},8,["onClick","label"])])])):v("",!0)]),t.products.length>0?(a(),y("div",z,[i(n,{items:t.products},null,8,["items"]),i(u,{onSelectPage:t.onChangePage,currentPage:t.currentPage,pagination:t.pagination},null,8,["onSelectPage","currentPage","pagination"])])):(a(),y("div",N,[i(w)])),i(q,{showing:!t.loaded},null,8,["showing"])]),_:1})}var T=k(E,[["render",R]]);const G=_({name:"MapPage",setup(){return{filterOptions:o({}),products:o([]),currentPage:o(1),pagination:o({limit:10,offset:0,total:1}),loaded:o(!1),filtering:o(!1)}},components:{FilterComp:D,MapComp:S},methods:{onChangeView({maxDistance:t,center:e}){this.fetchData({maxDistance:t,center:e})},onResetFilter(){this.filterOptions={},this.$refs.filterComp.resetState()},onChangeFilter(t){this.filterOptions=t},async onChangePage(t){await this.fetchData({page:t}),this.currentPage=t},async fetchData(t=[]){try{const{page:e,maxDistance:d=1e5,center:s}=t;e&&(this.pagination.offset=(e-1)*this.pagination.limit);const l=s?s.join(","):this.filterOptions.city?this.filterOptions.city.lat_long:this.user&&this.user.city?this.user.city.lat_long:"",C={};Object.keys(this.filterOptions).forEach(n=>{C[n]=this.filterOptions[n]});const r=await Q.product.productFindAll({limit:this.pagination.limit,offset:this.pagination.offset,sorting:"cteaedAt: -1",categoryId:this.filterOptions.category?this.filterOptions.category.id:"",latlng:l,isMap:!0,maxDistance:d,...C});if(r.status===200){const n=r.data.data.productFindAll.hits;if(this.products=n,this.pagination=r.data.data.productFindAll.pagination,this.$refs.mapComponent.onAddingMarker({markers:this.products}),!s){const u=this.user&&this.user.city?this.user.city.lat_long:"",w=u?{latitude:u.split(",")[0],longitude:u.split(",")[1]}:{};this.$refs.mapComponent.setCurrentPositionMap({location:w})}}this.loaded=!0}catch(e){console.log(e),this.$q.notify({type:"negative",message:this.$t("failed"),caption:this.$t("failed")})}}},mounted(){this.fetchData()},computed:{...F(b,["user"])}}),H={class:"row"},J={key:0},K={class:"row"};function U(t,e,d,s,l,C){const r=c("filter-comp"),n=c("map-comp");return a(),p(O,null,{default:m(()=>[h("div",null,[h("div",H,[i($),i(f,{onClick:e[0]||(e[0]=u=>t.filtering=!t.filtering),outline:"",class:"q-ma-xs ad-font-color","no-caps":""},{default:m(()=>[t.filtering?(a(),p(g,{key:0,class:"",size:"1.5em",name:"fas fa-caret-up"})):(a(),p(g,{key:1,class:"",size:"1.5em",name:"fa fa-filter"}))]),_:1})]),t.filtering?(a(),y("div",J,[i(r,{ref:"filterComp",onOnChangeFilter:t.onChangeFilter,filterOptions:t.filterOptions},null,8,["onOnChangeFilter","filterOptions"]),h("div",K,[i($),i(f,{onClick:t.onResetFilter,outline:"",class:"q-ma-xs ad-font-color",label:t.$t("clean"),"no-caps":""},null,8,["onClick","label"]),i(f,{onClick:t.fetchData,class:"q-ma-xs ad-primary-btn",label:t.$t("search"),"no-caps":""},{default:m(()=>[i(g,{class:"q-pr-md",name:"fa fa-magnifying-glass"})]),_:1},8,["onClick","label"])])])):v("",!0)]),i(n,{ref:"mapComponent",liteMode:!0,onOnChangeView:t.onChangeView},null,8,["onOnChangeView"]),i(q,{showing:!t.loaded},null,8,["showing"])]),_:1})}var W=k(G,[["render",U]]);const X=_({name:"ItemsPage",setup(){return{view:o("list")}},components:{ListPage:T,MapPage:W},methods:{onClickToView(){this.view=this.view==="list"?"map":"list",this.$router.replace("/items/"+this.view)}},computed:{},mounted(){const t=this.$route.params.view;["list","map"].includes(t)&&(this.view=t)}}),Y={class:"row justify-center q-my-xs"};function Z(t,e,d,s,l,C){const r=c("list-page"),n=c("map-page");return a(),p(O,null,{default:m(()=>[h("div",Y,[i(A,{push:""},{default:m(()=>[i(f,{outline:t.view==="list",class:P(t.view==="list"?"ad-font-color":""),onClick:t.onClickToView,label:t.$t("list"),icon:"list"},null,8,["outline","class","onClick","label"]),i(f,{outline:t.view==="map",class:P(t.view==="map"?"ad-font-color":""),onClick:t.onClickToView,label:t.$t("map"),icon:"map"},null,8,["outline","class","onClick","label"])]),_:1})]),t.view==="list"?(a(),p(r,{key:0})):t.view==="map"?(a(),p(n,{key:1})):v("",!0)]),_:1})}var Dt=k(X,[["render",Z]]);export{Dt as default};
