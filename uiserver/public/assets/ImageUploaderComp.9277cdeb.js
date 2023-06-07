import{d as u,r as c,_ as I,D as i,J as o,E as N,N as r,L as f,j as l,G as g,H as p,I as y,K as w,ar as b,as as k}from"./index.92eb8bda.js";import{Q as x}from"./QImg.19909024.js";import{Q as C}from"./QCard.6a86b0c3.js";import{a as h}from"./index.191899c2.js";const $=u({name:"ImageUploaderComp",props:{circleBorder:{type:Boolean,default:!1},imageIdx:{type:String,default:"0"},boxLength:{type:Number,default:0},fetchedImage:{type:String||Number}},components:{},setup(){return{image:c(null),fileNewName:c(null)}},methods:{chooseImage(){this.$refs.fileInput.click()},async onSelectImage(){const a=this.$refs.fileInput.files;if(a&&a[0]){const m=new FileReader;m.onload=s=>{this.image=s.target.result},m.readAsDataURL(a[0]),this.$emit("input",a[0]);const n=new FormData;n.append("image",a[0]);const d=await h.main.upload({fd:n});if(d.data.success){const s=d.data.files.map(t=>t.filename);this.fileNewName=s[0],this.$emit("image-inputs",this.fileNewName)}}},async deleteImage(){this.fileNewName&&(this.$emit("remove-image-input",this.fileNewName),await h.main.uploadDeleteFile({filename:this.fileNewName}),this.fileNewName=null,this.image=null,this.$refs.fileInput.value=null)},async deleteUploadBox(){await this.deleteImage(),this.$emit("delete-image-box",this.imageIdx)}},mounted(){this.fetchedImage&&this.fetchedImage.slice(0,5)=="image"&&(this.image=this.fetchedImage,this.fileNewName=this.fetchedImage)}}),v=e=>(b("data-v-7b365365"),e=e(),k(),e),_={class:"text-right"},B={key:0},S={class:"text-center"},U=v(()=>p("br",null,null,-1)),q={key:0,class:"text-caption"};function D(e,a,m,n,d,s){return i(),o("div",_,[e.imageIdx!=1?(i(),N(r,{key:0,onClick:e.deleteUploadBox,class:"text-pointer text-red",color:"red",size:"sm",name:"mdi-minus-circle"},null,8,["onClick"])):f("",!0),l(C,{flat:"",style:{width:"100px",height:"100px",overflow:"hidden"},class:w(["pointer q-mx-xs q-mb-xs q-px-sm",(e.image?"q-py-xs ":"q-py-lg ")+(!e.image&&e.circleBorder?"ad-profile-box":"ad-image-box")])},{default:g(()=>[e.image?(i(),o("div",B,[l(x,{onClick:e.deleteImage,width:"90",height:"80",src:e.image.slice(0,5)==="image"?e.$api.defaults.baseURL+"/public/wsm/"+e.image:e.image},{default:g(()=>[l(r,{size:"md",class:"text-red",name:"mdi-delete"})]),_:1},8,["onClick","src"])])):(i(),o("div",{key:1,class:"text-primary text-center centering",onClick:a[0]||(a[0]=(...t)=>e.chooseImage&&e.chooseImage(...t))},[p("span",S,[l(r,{size:"md",color:"primary",name:"mdi-image"}),U,e.boxLength==1?(i(),o("span",q,y(e.$t("addImage")),1)):f("",!0)])])),p("input",{hidden:"",ref:"fileInput",accept:"image/*",type:"file",onInput:a[1]||(a[1]=(...t)=>e.onSelectImage&&e.onSelectImage(...t))},null,544)]),_:1},8,["class"])])}var R=I($,[["render",D],["__scopeId","data-v-7b365365"]]);export{R as I};