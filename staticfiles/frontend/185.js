"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[185],{2185:(e,t,n)=>{n.r(t),n.d(t,{default:()=>x});var a=n(7294),r=n(9669),l=n.n(r),i=n(6867),c=n(9542),o=n(1733),d=n(7957),s=n(2658),u=n(546),m=n(6914),p=n(7896),g=n(6501),E=n(9573),h=n(6011),Z=n(3694),b=n(6926),y=n(8732),f=n(8377);function v(){return v=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},v.apply(this,arguments)}const x=()=>{const[e,t]=(0,a.useState)([]),[n,r]=(0,a.useState)([]),[x,C]=(0,a.useState)({}),[k,S]=(0,a.useState)(1),[P,I]=(0,a.useState)(0),[q,w]=(0,a.useState)(!1),[O,j]=(0,a.useState)(0);return(0,a.useEffect)((()=>{l().get("/store/products").then((e=>{t(e.data)})).catch((e=>{console.log(e)}))}),[]),a.createElement("div",{style:{margin:"0px",padding:"5px",backgroundColor:"white",height:"100vh"}},a.createElement("div",{style:{display:"flex",justifyContent:"center"}},a.createElement(s.Z,{variant:"h2"},"Bill")),a.createElement(f.Z,{sx:{display:"flex",alignItems:"center",justifyContent:"center"}},a.createElement(u.Z,{id:"free-solo-demo",freeSolo:!0,getOptionLabel:e=>e.name||"",renderOption:(e,t)=>a.createElement("li",v({},e,{key:t.id}),a.createElement(s.Z,{noWrap:!0},t.name)),options:e.map((e=>e)),renderInput:e=>a.createElement(c.Z,v({},e,{label:"Search",margin:"normal",variant:"outlined"})),sx:{width:300},onChange:(e,t)=>{t&&C(t)}}),a.createElement(c.Z,{id:"outlined-basic",label:"Quantity",variant:"outlined",type:"number",InputProps:{inputProps:{min:1}},value:k,onChange:e=>{e.target.value>0&&S(e.target.value)},style:{position:"relative",top:"4px"}}),a.createElement(m.Z,{variant:"contained",sx:{marginLeft:"10px"},onClick:e=>{e.preventDefault(),x.id&&(n.some((e=>e.id===x.id))?alert("Item already added"):(x.quantity=parseInt(k),r([...n,x]),I(P+x.price*k)))}},"Add")),a.createElement(f.Z,null,a.createElement(p.Z,{component:g.Z},a.createElement(E.Z,{sx:{minWidth:650,border:"1px solid #ddd"},"aria-label":"simple table"},a.createElement(h.Z,null,a.createElement(Z.Z,{sx:{backgroundColor:"#f9f9f9",border:"1px solid #ddd"}},a.createElement(b.Z,{align:"center"},"ID"),a.createElement(b.Z,null,"Product Name"),a.createElement(b.Z,{align:"right"},"Price"),a.createElement(b.Z,{align:"right"},"Quantity"),a.createElement(b.Z,{align:"right"},"Total"),a.createElement(b.Z,{align:"right"},"Actions"))),a.createElement(y.Z,null,n.length>0&&n.map(((e,t)=>a.createElement(Z.Z,{key:e.id,sx:{"&:last-child td, &:last-child th":{border:1}}},a.createElement(b.Z,{padding:"checkbox",align:"center"},t+1),a.createElement(b.Z,{component:"th",scope:"row"},e.name),a.createElement(b.Z,{align:"right"},q&&O===t?a.createElement(c.Z,{id:"standard-basic",label:"",variant:"standard",type:"number",InputProps:{inputProps:{min:1}},value:e.price,onChange:e=>{const a=[...n];a[t].price=e.target.value,r(a)},onBlur:()=>{w(!1),j(0)}}):e.price),a.createElement(b.Z,{align:"right"},q&&O===t?a.createElement(c.Z,{id:"standard-basic",label:"",variant:"standard",type:"number",InputProps:{inputProps:{min:1}},value:e.quantity,onChange:e=>{const a=[...n];a[t].quantity=e.target.value,r(a)},align:"right"}):e.quantity),a.createElement(b.Z,{align:"right"},e.price*e.quantity),a.createElement(b.Z,{align:"right"},a.createElement(i.Z,{"aria-label":"delete",onClick:()=>{const e=[...n];e.splice(t,1),r(e)}},a.createElement(o.Z,null)),a.createElement(i.Z,{"aria-label":"edit",onClick:()=>{w(!0),j(t),C(e),S(e.quantity)}},a.createElement(d.Z,null)))))),a.createElement(Z.Z,null,a.createElement(b.Z,{colSpan:4,align:"right"},"Total"),a.createElement(b.Z,{align:"right"},n.length>0&&n.reduce(((e,t)=>e+t.price*t.quantity),0))))))))}}}]);
//# sourceMappingURL=185.js.map