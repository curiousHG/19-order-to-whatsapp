"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[745],{8745:(e,t,n)=>{n.r(t),n.d(t,{default:()=>v});var a=n(6540),r=n(6266),l=n(1641),i=n(722),c=n(7034),o=n(8597),s=n(4073),d=n(973),u=n(6990),m=n(3198),p=n(538),g=n(4137),A=n(6627),E=n(6798),h=n(4774),b=n(3884),y=n(1545);function f(){return f=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},f.apply(this,arguments)}const v=()=>{const[e,t]=(0,a.useState)([]),[n,v]=(0,a.useState)([]),[x,C]=(0,a.useState)({}),[k,P]=(0,a.useState)(1),[S,q]=(0,a.useState)(0),[I,w]=(0,a.useState)(!1),[O,j]=(0,a.useState)(0);return(0,a.useEffect)((()=>{r.A.get("/store/products").then((e=>{t(e.data)})).catch((e=>{console.log(e)}))}),[]),a.createElement("div",{style:{margin:"0px",padding:"5px",backgroundColor:"white",height:"100vh"}},a.createElement("div",{style:{display:"flex",justifyContent:"center"}},a.createElement(s.A,{variant:"h4"},"Bill")),a.createElement(y.A,{sx:{display:"flex",alignItems:"center",justifyContent:"center"}},a.createElement(d.A,{id:"free-solo-demo",freeSolo:!0,getOptionLabel:e=>e.name||"",renderOption:(e,t)=>a.createElement("li",f({},e,{key:t.id}),a.createElement(s.A,{noWrap:!0},t.name)),options:e.map((e=>e)),renderInput:e=>a.createElement(i.A,f({},e,{label:"Search",margin:"normal",variant:"outlined"})),sx:{width:300},onChange:(e,t)=>{t&&C(t)}}),a.createElement(i.A,{id:"outlined-basic",label:"Quantity",variant:"outlined",type:"number",InputProps:{inputProps:{min:1}},value:k,onChange:e=>{e.target.value>0&&P(e.target.value)},style:{position:"relative",top:"4px"}}),a.createElement(u.A,{variant:"contained",sx:{marginLeft:"10px"},onClick:e=>{e.preventDefault(),x.id&&(n.some((e=>e.id===x.id))?alert("Item already added"):(x.quantity=parseInt(k),v([...n,x]),q(S+x.price*k)))}},"Add"),a.createElement(u.A,{variant:"contained",sx:{marginLeft:"10px"},onClick:e=>{e.preventDefault()}},"Print")),a.createElement(y.A,null,a.createElement(m.A,{component:p.A},a.createElement(g.A,{sx:{minWidth:650,border:"1px solid #ddd"},"aria-label":"simple table"},a.createElement(A.A,null,a.createElement(E.A,{sx:{backgroundColor:"#f9f9f9",border:"1px solid #ddd"}},a.createElement(h.A,null,"Product Name"),a.createElement(h.A,{align:"right"},"Price"),a.createElement(h.A,{align:"right"},"Quantity"),a.createElement(h.A,{align:"right"},"Total"),a.createElement(h.A,{align:"right"},"Actions"))),a.createElement(b.A,null,n.length>0&&n.map(((e,t)=>a.createElement(E.A,{key:e.id,sx:{"&:last-child td, &:last-child th":{border:1}}},a.createElement(h.A,{component:"th",scope:"row"},e.name),a.createElement(h.A,{align:"right"},I&&O===t?a.createElement(i.A,{id:"standard-basic",label:"",variant:"standard",type:"number",InputProps:{inputProps:{min:1}},value:e.price,onChange:e=>{const a=[...n];a[t].price=e.target.value,v(a)},onBlur:()=>{w(!1),j(0)}}):e.price),a.createElement(h.A,{align:"right"},I&&O===t?a.createElement(i.A,{id:"standard-basic",label:"",variant:"standard",type:"number",InputProps:{inputProps:{min:1}},value:e.quantity,onChange:e=>{const a=[...n];a[t].quantity=e.target.value,v(a)},align:"right"}):e.quantity),a.createElement(h.A,{align:"right"},e.price*e.quantity),a.createElement(h.A,{align:"right"},a.createElement(l.A,{"aria-label":"delete",onClick:()=>{const e=[...n];e.splice(t,1),v(e)}},a.createElement(c.A,null)),a.createElement(l.A,{"aria-label":"edit",onClick:()=>{w(!0),j(t),C(e),P(e.quantity)}},a.createElement(o.A,null)))))),a.createElement(E.A,null,a.createElement(h.A,{colSpan:4,align:"right"},"Total"),a.createElement(h.A,{align:"right"},n.length>0&&n.reduce(((e,t)=>e+t.price*t.quantity),0))))))))}}}]);
//# sourceMappingURL=745.js.a5da0c88d346.map