"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[803],{4007:(e,t,n)=>{var r=n(4836);t.Z=void 0,function(e,t){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=o(t);if(n&&n.has(e))return n.get(e);var r={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var l in e)if("default"!==l&&Object.prototype.hasOwnProperty.call(e,l)){var c=a?Object.getOwnPropertyDescriptor(e,l):null;c&&(c.get||c.set)?Object.defineProperty(r,l,c):r[l]=e[l]}r.default=e,n&&n.set(e,r)}(n(7294));var a=r(n(4938)),l=n(5893);function o(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(o=function(e){return e?n:t})(e)}var c=(0,a.default)((0,l.jsx)("path",{d:"M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z"}),"WhatsApp");t.Z=c},3803:(e,t,n)=>{n.r(t),n.d(t,{default:()=>A});var r=n(7294),a=n(1354),l=n(9981);const o=(0,n(4345).Z)(),c=(0,a.Z)({defaultTheme:o,defaultClassName:"MuiBox-root",generateClassName:l.Z.generate});var i=n(2658),s=n(7896),u=n(9573),m=n(6011),f=n(3694),d=n(6926),p=n(8732),g=n(9542),h=n(6914),y=n(4007),E=n(9669),Z=n.n(E);function A(){const[e,t]=(0,r.useState)({}),[n,a]=(0,r.useState)("http://wa.me/919811572962?"),[l,o]=(0,r.useState)(""),[E,A]=(0,r.useState)("");return(0,r.useEffect)((()=>{const e=JSON.parse(localStorage.getItem("order"));t(e)}),[]),r.createElement("div",null,r.createElement(c,{textAlign:"center"},r.createElement(i.Z,{variant:"h2",color:"black",fontWeight:"bold"},"Order Summary")),r.createElement(s.Z,null,r.createElement(u.Z,null,r.createElement(m.Z,{style:{backgroundColor:"lightgreen"}},r.createElement(f.Z,null,r.createElement(d.Z,{align:"center",style:{width:"50%",fontSize:"3rem"}},"Item"),r.createElement(d.Z,{align:"center",style:{width:"50%",fontSize:"3rem"}},"Quantity"))),r.createElement(p.Z,null,Object.keys(e).map((t=>r.createElement(f.Z,{key:t},r.createElement(d.Z,{align:"center",style:{fontSize:"1.5rem"}},t),r.createElement(d.Z,{align:"center",style:{fontSize:"1.5rem"}},e[t]))))))),r.createElement(c,{textAlign:"center",margin:2},r.createElement(g.Z,{id:"outlined-required",label:"Name",InputLabelProps:{style:{fontSize:"1.2rem",textAlign:"center"}},sx:{width:"50%",fontSize:"1.5rem",margin:"1rem"},inputProps:{style:{fontSize:"1.5rem"}},onChange:function(e){o(e.target.value)}}),r.createElement("br",null),r.createElement(g.Z,{id:"outlined-required",label:"Address",InputLabelProps:{style:{fontSize:"1.2rem",textAlign:"center"}},sx:{width:"50%",fontSize:"1.5rem",margin:"1rem"},inputProps:{style:{fontSize:"1.5rem"}},onChange:function(e){A(e.target.value)}}),r.createElement("br",null),r.createElement(h.Z,{variant:"contained",onClick:async function(){let t="http://wa.me/919811572962?text=Hello!%0AI%20want%20to%20order%20the%20following%20items%20from%20your%20store%0A%0A";const n=""===l?"NoName":l,r=""===E?"NoAddress":E;t+="Name:%20"+n+"%0A",t+="Address:%20"+r+"%0A%0A";for(let n in e)null!==e[n]&&(t+=n+"%20"+e[n]+"%0A");t+="%0A%0AThank%20you!",a(t);const o=[];for(let t in e)null!==e[t]&&o.push({product:t,quantity:e[t]});const c={customer:{name:n,address:r},products:o};await async function(e){return Z().post("/store/order",e).then((e=>e.status)).catch((e=>{console.log(e)}))}(c).then((e=>{window.location.href=t})).catch((e=>{console.log(e)}))},color:"primary"},r.createElement(y.Z,{style:{fontSize:30,paddingRight:"0.5rem"}}),r.createElement(i.Z,{variant:"h5"},"Send to Whatsapp"))))}}}]);
//# sourceMappingURL=803.js.e81a957cd5ad.map