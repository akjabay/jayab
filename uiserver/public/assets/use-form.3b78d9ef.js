import{c as a,h as d}from"./index.e3bb839c.js";let i,s=0;const n=new Array(256);for(let t=0;t<256;t++)n[t]=(t+256).toString(16).substring(1);const c=(()=>{const t=typeof crypto!="undefined"?crypto:typeof window!="undefined"?window.crypto||window.msCrypto:void 0;if(t!==void 0){if(t.randomBytes!==void 0)return t.randomBytes;if(t.getRandomValues!==void 0)return r=>{const o=new Uint8Array(r);return t.getRandomValues(o),o}}return r=>{const o=[];for(let e=r;e>0;e--)o.push(Math.floor(Math.random()*256));return o}})(),u=4096;function m(){(i===void 0||s+16>u)&&(s=0,i=c(u));const t=Array.prototype.slice.call(i,s,s+=16);return t[6]=t[6]&15|64,t[8]=t[8]&63|128,n[t[0]]+n[t[1]]+n[t[2]]+n[t[3]]+"-"+n[t[4]]+n[t[5]]+"-"+n[t[6]]+n[t[7]]+"-"+n[t[8]]+n[t[9]]+"-"+n[t[10]]+n[t[11]]+n[t[12]]+n[t[13]]+n[t[14]]+n[t[15]]}const y={name:String};function p(t={}){return(r,o,e)=>{r[o](d("input",{class:"hidden"+(e||""),...t.value}))}}function l(t){return a(()=>t.name||t.for)}export{y as a,p as b,l as c,m as u};
