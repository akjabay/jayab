(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4a626e5e"],{"334b":function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var a=n("4360"),r=Object(a["a"])();function o(){var t=r.getters["auth/authGetter"].token,e=r.getters["auth/authGetter"].isUserLoggedIn;return t&&e?{headers:{authorization:t}}:{headers:{authorization:null}}}},6062:function(t,e,n){"use strict";var a=n("6d61"),r=n("6566");t.exports=a("Set",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),r)},ac01:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.loading?n("LoadingComponent",{attrs:{loading:t.loading}}):n("Chart",{attrs:{randomId:t.randomId,type:"bar",labels:t.labels,datasets:[{label:"پروژه ها",data:t.projects,backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(255, 159, 64, 0.2)","rgba(255, 205, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(54, 162, 235, 0.2)","rgba(153, 102, 255, 0.2)","rgba(201, 203, 207, 0.2)"],borderColor:["rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(54, 162, 235)","rgb(153, 102, 255)","rgb(201, 203, 207)"],hoverOffset:4}]}})],1)},r=[],o=n("2909"),i=n("1da1"),s=(n("96cf"),n("a9e3"),n("d3b7"),n("3ca3"),n("ddb0"),n("fb6a"),n("6062"),n("d81d"),n("159b"),n("4de4"),n("334b")),c={name:"ProjectBarChart",props:{randomId:{type:Number},labelRange:{type:Array}},data:function(){return{projects:[],labels:[],loading:!1}},components:{Chart:function(){return n.e("chunk-2d0de1c1").then(n.bind(null,"83f6"))},LoadingComponent:function(){return n.e("chunk-562bf569").then(n.bind(null,"4d774"))}},methods:{fetchData:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e,n,a,r,i=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.loading=!0,this.labels=[],this.projects=[],e={first_date:(new Date).toISOString().slice(0,-5),to_date:(new Date).toISOString().slice(0,-5)},this.labelRange&&(e.first_date=new Date((new Date).setMonth((new Date).getMonth()-this.labelRange[1])).toISOString().slice(0,-5),e.to_date=new Date((new Date).setMonth((new Date).getMonth()-this.labelRange[0])).toISOString().slice(0,-5)),n="",n+=' from_date: "'.concat(e.first_date,'" \n'),n+=' to_date: "'.concat(e.to_date,'" \n'),t.next=10,this.$axios.post("/graphql",{query:"query {\n            reportProduct(query: {\n              ".concat(n,"\n            }) {\n              date\n              amount\n              label\n            }\n          }")},Object(s["a"])());case 10:a=t.sent,a.data.errors?console.log(a.data.errors[0]):a.data.data.reportProduct&&(r=a.data.data.reportProduct,this.labels=Object(o["a"])(new Set(r.map((function(t){return t.date})))),this.labels.forEach((function(t){var e=r.filter((function(e){return e.date===t})).length;i.projects.push(e)}))),this.loading=!1;case 13:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},mounted:function(){this.fetchData()},watch:{labelRange:function(){this.fetchData()}}},u=c,d=n("2877"),l=Object(d["a"])(u,a,r,!1,null,null,null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-4a626e5e.e012f24e.js.map