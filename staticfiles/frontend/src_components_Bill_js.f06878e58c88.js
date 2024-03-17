/*! For license information please see src_components_Bill_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_components_Bill_js"],{"./src/components/Bill.js":(e,t,a)=>{a.r(t),a.d(t,{default:()=>x});var l=a("./node_modules/react/index.js"),n=a("./node_modules/axios/index.js"),r=a.n(n),i=a("./node_modules/@mui/material/IconButton/IconButton.js"),d=a("./node_modules/@mui/material/TextField/TextField.js"),o=a("./node_modules/@mui/icons-material/Delete.js"),u=a("./node_modules/@mui/icons-material/Edit.js"),m=a("./node_modules/@mui/material/Typography/Typography.js"),s=a("./node_modules/@mui/material/Autocomplete/Autocomplete.js"),c=a("./node_modules/@mui/material/Button/Button.js"),p=a("./node_modules/@mui/material/TableContainer/TableContainer.js"),f=a("./node_modules/@mui/material/Paper/Paper.js"),g=a("./node_modules/@mui/material/Table/Table.js"),h=a("./node_modules/@mui/material/TableHead/TableHead.js"),E=a("./node_modules/@mui/material/TableRow/TableRow.js"),b=a("./node_modules/@mui/material/TableCell/TableCell.js"),y=a("./node_modules/@mui/material/TableBody/TableBody.js"),j=a("./node_modules/@mui/system/esm/Box/Box.js");function v(){return v=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e},v.apply(this,arguments)}const x=()=>{const[e,t]=(0,l.useState)([]),[a,n]=(0,l.useState)([]),[x,_]=(0,l.useState)({}),[T,C]=(0,l.useState)(0),[k,B]=(0,l.useState)(1),[P,S]=(0,l.useState)(0),[I,w]=(0,l.useState)(!1),[q,O]=(0,l.useState)(0);return(0,l.useEffect)((()=>{r().get("/store/products").then((e=>{t(e.data)})).catch((e=>{console.log(e)}))}),[]),l.createElement("div",{style:{margin:"0px",padding:"5px",backgroundColor:"white",height:"100vh"}},l.createElement("div",{style:{display:"flex",justifyContent:"center"}},l.createElement(m.default,{variant:"h2"},"Bill")),l.createElement(j.default,{sx:{display:"flex",alignItems:"center",justifyContent:"center"}},l.createElement(s.default,{id:"free-solo-demo",freeSolo:!0,getOptionLabel:e=>e.name||"",renderOption:(e,t)=>l.createElement("li",v({},e,{key:t.id}),l.createElement(m.default,{noWrap:!0},t.name)),options:e.map((e=>e)),renderInput:e=>l.createElement(d.default,v({},e,{label:"Search",margin:"normal",variant:"outlined"})),sx:{width:300},onChange:(e,t)=>{t&&_(t)}}),l.createElement(d.default,{id:"outlined-basic",label:"Quantity",variant:"outlined",type:"number",InputProps:{inputProps:{min:1}},value:k,onChange:e=>{e.target.value>0&&B(e.target.value)},style:{position:"relative",top:"4px"}}),l.createElement(c.default,{variant:"contained",sx:{marginLeft:"10px"},onClick:e=>{e.preventDefault(),x.id&&(a.some((e=>e.id===x.id))?alert("Item already added"):(x.quantity=parseInt(k),n([...a,x]),S(P+x.price*k)))}},"Add")),l.createElement(j.default,null,l.createElement(p.default,{component:f.default},l.createElement(g.default,{sx:{minWidth:650,border:"1px solid #ddd"},"aria-label":"simple table"},l.createElement(h.default,null,l.createElement(E.default,{sx:{backgroundColor:"#f9f9f9",border:"1px solid #ddd"}},l.createElement(b.default,{align:"center"},"ID"),l.createElement(b.default,null,"Product Name"),l.createElement(b.default,{align:"right"},"Price"),l.createElement(b.default,{align:"right"},"Quantity"),l.createElement(b.default,{align:"right"},"Total"),l.createElement(b.default,{align:"right"},"Actions"))),l.createElement(y.default,null,a.length>0&&a.map(((e,t)=>l.createElement(E.default,{key:e.id,sx:{"&:last-child td, &:last-child th":{border:1}}},l.createElement(b.default,{padding:"checkbox",align:"center"},t+1),l.createElement(b.default,{component:"th",scope:"row"},e.name),l.createElement(b.default,{align:"right"},I&&q===t?l.createElement(d.default,{id:"standard-basic",label:"",variant:"standard",type:"number",InputProps:{inputProps:{min:1}},value:e.price,onChange:e=>{const l=[...a];l[t].price=e.target.value,n(l)},onBlur:()=>{w(!1),O(0)}}):e.price),l.createElement(b.default,{align:"right"},I&&q===t?l.createElement(d.default,{id:"standard-basic",label:"",variant:"standard",type:"number",InputProps:{inputProps:{min:1}},value:e.quantity,onChange:e=>{const l=[...a];l[t].quantity=e.target.value,n(l)},align:"right"}):e.quantity),l.createElement(b.default,{align:"right"},e.price*e.quantity),l.createElement(b.default,{align:"right"},l.createElement(i.default,{"aria-label":"delete",onClick:()=>{const e=[...a];e.splice(t,1),n(e)}},l.createElement(o.default,null)),l.createElement(i.default,{"aria-label":"edit",onClick:()=>{w(!0),O(t),_(e),B(e.quantity)}},l.createElement(u.default,null)))))),l.createElement(E.default,null,l.createElement(b.default,{colSpan:4,align:"right"},"Total"),l.createElement(b.default,{align:"right"},a.length>0&&a.reduce(((e,t)=>e+t.price*t.quantity),0))))))))}}}]);
//# sourceMappingURL=src_components_Bill_js.js.c96fcfc38149.map