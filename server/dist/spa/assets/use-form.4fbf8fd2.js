import{a as f,h as l}from"./index.9f5cea10.js";let r=[],s=[];function d(t){s=s.filter(e=>e!==t)}function y(t){d(t),s.push(t)}function F(t){d(t),s.length===0&&r.length>0&&(r[r.length-1](),r=[])}function g(t){s.length===0?t():r.push(t)}function h(t){r=r.filter(e=>e!==t)}let a,u=0;const n=new Array(256);for(let t=0;t<256;t++)n[t]=(t+256).toString(16).substring(1);const m=(()=>{const t=typeof crypto!="undefined"?crypto:typeof window!="undefined"?window.crypto||window.msCrypto:void 0;if(t!==void 0){if(t.randomBytes!==void 0)return t.randomBytes;if(t.getRandomValues!==void 0)return e=>{const o=new Uint8Array(e);return t.getRandomValues(o),o}}return e=>{const o=[];for(let i=e;i>0;i--)o.push(Math.floor(Math.random()*256));return o}})(),c=4096;function w(){(a===void 0||u+16>c)&&(u=0,a=m(c));const t=Array.prototype.slice.call(a,u,u+=16);return t[6]=t[6]&15|64,t[8]=t[8]&63|128,n[t[0]]+n[t[1]]+n[t[2]]+n[t[3]]+"-"+n[t[4]]+n[t[5]]+"-"+n[t[6]]+n[t[7]]+"-"+n[t[8]]+n[t[9]]+"-"+n[t[10]]+n[t[11]]+n[t[12]]+n[t[13]]+n[t[14]]+n[t[15]]}const v={name:String};function x(t={}){return(e,o,i)=>{e[o](l("input",{class:"hidden"+(i||""),...t.value}))}}function b(t){return f(()=>t.name||t.for)}export{y as a,g as b,v as c,x as d,h as e,b as f,F as r,w as u};
