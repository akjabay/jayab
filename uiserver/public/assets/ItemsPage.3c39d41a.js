import{d as v,r as n,B as b,_ as y,C as f,D as l,E as m,G as h,J as w,j as e,H as g,Q as u,K as $,N as C,L as P}from"./index.92eb8bda.js";import{Q as j}from"./QBtnGroup.fb2721f3.js";import{u as k,Q}from"./use-dark.ecf38b9d.js";import{Q as _}from"./QPage.22378cf4.js";import{Q as F}from"./QInnerLoading.a43836d5.js";import{L as A}from"./ListComp.d238504a.js";import{P as V}from"./PaginationComp.77bf341b.js";import{E as M}from"./EmptyComp.53d9e691.js";import{a as D}from"./index.191899c2.js";import{M as q}from"./MapComp.b07a4e8b.js";import{F as B}from"./FilterComp.001d0d9a.js";import"./use-transition.76624cdd.js";import"./QImg.19909024.js";import"./QCardSection.b00a13b0.js";import"./QCard.6a86b0c3.js";import"./QInput.12ca7d0b.js";import"./use-form.c87ee303.js";import"./focus-manager.32f8d49a.js";import"./format.801e7424.js";import"./axios.a466877b.js";import"./QSeparator.1669020d.js";import"./QCardActions.b7f8084b.js";import"./QDialog.081ad832.js";import"./focusout.7593105c.js";import"./ClosePopup.868af168.js";import"./ImageUploaderComp.9277cdeb.js";import"./SubTitleComp.385bd45c.js";import"./CityComp.d0d8ac6d.js";import"./selection.aecaed73.js";const E=v({name:"ListPage",props:{filterOptions:Object},setup(){return{products:n([]),currentPage:n(1),pagination:n({limit:10,offset:0,total:1}),loaded:n(!1),filtering:n(!1)}},components:{ListComp:A,PaginationComp:V,EmptyComp:M},methods:{async onChangePage(t){await this.fetchData({page:t}),this.currentPage=t},async fetchData(t=[]){try{const{page:i}=t;i&&(this.pagination.offset=(i-1)*this.pagination.limit);const p={};Object.keys(this.filterOptions).forEach(o=>{typeof this.filterOptions[o]=="object"&&Object.keys(this.filterOptions[o]).includes("min")?p[o]=`${this.filterOptions[o].min},${this.filterOptions[o].max}`:p[o]=this.filterOptions[o]});const a=await D.product.productFindAll({limit:this.pagination.limit,offset:this.pagination.offset,sorting:"cteaedAt: -1",categoryId:this.filterOptions.category?this.filterOptions.category.id:"",latlng:this.filterOptions.city?this.filterOptions.city.lat_long:"",...p});if(a.status===200){const o=a.data.data.productFindAll.hits;this.products=o,this.pagination=a.data.data.productFindAll.pagination}this.loaded=!0}catch(i){console.log(i),this.$q.notify({type:"negative",message:this.$t("failed"),caption:this.$t("failed")})}}},computed:{...b(k,["user"])},mounted(){this.fetchData()}}),I={key:0},L={key:1};function S(t,i,p,a,o,d){const r=f("list-comp"),s=f("pagination-comp"),c=f("empty-comp");return l(),m(_,null,{default:h(()=>[t.products.length>0?(l(),w("div",I,[e(r,{items:t.products},null,8,["items"]),e(s,{onSelectPage:t.onChangePage,currentPage:t.currentPage,pagination:t.pagination},null,8,["onSelectPage","currentPage","pagination"])])):(l(),w("div",L,[e(c)])),e(F,{showing:!t.loaded},null,8,["showing"])]),_:1})}var N=y(E,[["render",S]]);const z=v({name:"MapPage",props:{filterOptions:Object},setup(){return{products:n([]),currentPage:n(1),pagination:n({limit:10,offset:0,total:1}),loaded:n(!1),filtering:n(!1)}},components:{MapComp:q},methods:{onChangeView({maxDistance:t,center:i}){this.fetchData({maxDistance:t,center:i})},async onChangePage(t){await this.fetchData({page:t}),this.currentPage=t},async fetchData(t=[]){try{const{page:i,maxDistance:p=1e5,center:a}=t;i&&(this.pagination.offset=(i-1)*this.pagination.limit);const o=a?a.join(","):this.filterOptions.city?this.filterOptions.city.lat_long:this.user&&this.user.city?this.user.city.lat_long:"",d={};Object.keys(this.filterOptions).forEach(s=>{typeof this.filterOptions[s]=="object"&&Object.keys(this.filterOptions[s]).includes("min")?d[s]=`${this.filterOptions[s].min},${this.filterOptions[s].max}`:d[s]=this.filterOptions[s]});const r=await D.product.productFindAll({limit:this.pagination.limit,offset:this.pagination.offset,sorting:"cteaedAt: -1",categoryId:this.filterOptions.category?this.filterOptions.category.id:"",latlng:o,isMap:!0,maxDistance:p,...d});if(r.status===200){const s=r.data.data.productFindAll.hits;if(this.products=s,this.pagination=r.data.data.productFindAll.pagination,this.$refs.mapComponent.onAddingMarker({markers:this.products}),!a){const c=this.user&&this.user.city?this.user.city.lat_long:"",O=c?{latitude:c.split(",")[0],longitude:c.split(",")[1]}:{};this.$refs.mapComponent.setCurrentPositionMap({location:O})}}this.loaded=!0}catch(i){console.log(i),this.$q.notify({type:"negative",message:this.$t("failed"),caption:this.$t("failed")})}}},mounted(){this.fetchData()},computed:{...b(k,["user"])}});function T(t,i,p,a,o,d){const r=f("map-comp");return l(),m(_,null,{default:h(()=>[e(r,{ref:"mapComponent",liteMode:!0,onOnChangeView:t.onChangeView},null,8,["onOnChangeView"]),e(F,{showing:!t.loaded},null,8,["showing"])]),_:1})}var G=y(z,[["render",T]]);const R=v({name:"ItemsPage",setup(){return{filtering:n(!1),view:n("list"),filterOptions:n({})}},components:{ListPage:N,MapPage:G,FilterComp:B},methods:{onResetFilter(){this.filterOptions={},this.$refs.filterComp.resetState()},onChangeFilter(t){this.filterOptions=t},onClickToView(t){this.view!==t&&(this.view=this.view==="list"?"map":"list",this.$router.replace("/items/"+this.view))},fetchData(){this.view==="list"?this.$refs.listComp.fetchData():this.view==="map"&&this.$refs.mapComp.fetchData()}},computed:{},mounted(){const t=this.$route.params.view;["list","map"].includes(t)&&(this.view=t)}}),H={class:"row justify-center q-my-sm"},J=g("div",{class:"col-md-2 col-sm-2 col-xs-2"},null,-1),K={class:"col-md-8 col-sm-8 col-xs-8 text-center"},U={key:0},W={class:"row"};function X(t,i,p,a,o,d){const r=f("filter-comp"),s=f("list-page"),c=f("map-page");return l(),m(_,null,{default:h(()=>[g("div",H,[J,g("div",K,[e(j,{push:"",class:""},{default:h(()=>[e(u,{outline:t.view==="list",class:$(t.view==="list"?"ad-font-color":""),onClick:i[0]||(i[0]=O=>t.onClickToView("list")),label:t.$t("list"),icon:"list"},null,8,["outline","class","label"]),e(u,{outline:t.view==="map",class:$(t.view==="map"?"ad-font-color":""),onClick:i[1]||(i[1]=O=>t.onClickToView("map")),label:t.$t("map"),icon:"map"},null,8,["outline","class","label"])]),_:1})]),g("div",{class:$(["col-md-2 col-sm-2 col-xs-2",t.$t("direction")==="rtl"?"text-left":"text-right"])},[e(u,{onClick:i[2]||(i[2]=O=>t.filtering=!t.filtering),outline:"",class:"ad-font-color q-mx-xs","no-caps":""},{default:h(()=>[t.filtering?(l(),m(C,{key:0,class:"",size:"1.5em",name:"fas fa-caret-up"})):(l(),m(C,{key:1,class:"",size:"1.5em",name:"fa fa-filter"}))]),_:1})],2)]),t.filtering?(l(),w("div",U,[e(r,{ref:"filterComp",onOnChangeFilter:t.onChangeFilter,filterOptions:t.filterOptions},null,8,["onOnChangeFilter","filterOptions"]),g("div",W,[e(Q),e(u,{onClick:t.onResetFilter,outline:"",class:"q-ma-xs ad-font-color",label:t.$t("clean"),"no-caps":""},null,8,["onClick","label"]),e(u,{onClick:t.fetchData,class:"q-ma-xs ad-primary-btn",label:t.$t("search"),"no-caps":""},{default:h(()=>[e(C,{class:"q-pr-md",name:"fa fa-magnifying-glass"})]),_:1},8,["onClick","label"])])])):P("",!0),t.view==="list"?(l(),m(s,{key:1,ref:"listComp",filterOptions:t.filterOptions},null,8,["filterOptions"])):t.view==="map"?(l(),m(c,{key:2,ref:"mapComp",filterOptions:t.filterOptions},null,8,["filterOptions"])):P("",!0)]),_:1})}var kt=y(R,[["render",X]]);export{kt as default};
