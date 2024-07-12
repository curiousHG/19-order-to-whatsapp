/*! For license information please see src_components_BillPage_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_components_BillPage_js"],{"./src/components/BillPage.js":(e,t,a)=>{a.r(t),a.d(t,{default:()=>x});var l=a("./node_modules/react/index.js"),n=a.n(l),r=a("./node_modules/axios/lib/axios.js"),i=a("./node_modules/@mui/material/IconButton/IconButton.js"),d=a("./node_modules/@mui/material/TextField/TextField.js"),o=a("./node_modules/@mui/icons-material/Delete.js"),u=a("./node_modules/@mui/icons-material/Edit.js"),s=a("./node_modules/@mui/material/Typography/Typography.js"),m=a("./node_modules/@mui/material/Autocomplete/Autocomplete.js"),c=a("./node_modules/@mui/material/Button/Button.js"),p=a("./node_modules/@mui/material/TableContainer/TableContainer.js"),f=a("./node_modules/@mui/material/Paper/Paper.js"),g=a("./node_modules/@mui/material/Table/Table.js"),b=a("./node_modules/@mui/material/TableHead/TableHead.js"),h=a("./node_modules/@mui/material/TableRow/TableRow.js"),E=a("./node_modules/@mui/material/TableCell/TableCell.js"),y=a("./node_modules/@mui/material/TableBody/TableBody.js"),j=a("./node_modules/@mui/system/esm/Box/Box.js");function v(){return v=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e},v.apply(this,arguments)}const x=()=>{const[e,t]=(0,l.useState)([]),[a,x]=(0,l.useState)([]),[_,C]=(0,l.useState)({}),[T,P]=(0,l.useState)(1),[k,B]=(0,l.useState)(0),[S,I]=(0,l.useState)(!1),[w,q]=(0,l.useState)(0);return(0,l.useEffect)((()=>{r.default.get("/store/products").then((e=>{t(e.data)})).catch((e=>{console.log(e)}))}),[]),n().createElement("div",{style:{margin:"0px",padding:"5px",backgroundColor:"white",height:"100vh"}},n().createElement("div",{style:{display:"flex",justifyContent:"center"}},n().createElement(s.default,{variant:"h4"},"Bill")),n().createElement(j.default,{sx:{display:"flex",alignItems:"center",justifyContent:"center"}},n().createElement(m.default,{id:"free-solo-demo",freeSolo:!0,getOptionLabel:e=>e.name||"",renderOption:(e,t)=>n().createElement("li",v({},e,{key:t.id}),n().createElement(s.default,{noWrap:!0},t.name)),options:e.map((e=>e)),renderInput:e=>n().createElement(d.default,v({},e,{label:"Search",margin:"normal",variant:"outlined"})),sx:{width:300},onChange:(e,t)=>{t&&C(t)}}),n().createElement(d.default,{id:"outlined-basic",label:"Quantity",variant:"outlined",type:"number",InputProps:{inputProps:{min:1}},value:T,onChange:e=>{e.target.value>0&&P(e.target.value)},style:{position:"relative",top:"4px"}}),n().createElement(c.default,{variant:"contained",sx:{marginLeft:"10px"},onClick:e=>{e.preventDefault(),_.id&&(a.some((e=>e.id===_.id))?alert("Item already added"):(_.quantity=parseInt(T),x([...a,_]),B(k+_.price*T)))}},"Add"),n().createElement(c.default,{variant:"contained",sx:{marginLeft:"10px"},onClick:e=>{e.preventDefault()}},"Print")),n().createElement(j.default,null,n().createElement(p.default,{component:f.default},n().createElement(g.default,{sx:{minWidth:650,border:"1px solid #ddd"},"aria-label":"simple table"},n().createElement(b.default,null,n().createElement(h.default,{sx:{backgroundColor:"#f9f9f9",border:"1px solid #ddd"}},n().createElement(E.default,null,"Product Name"),n().createElement(E.default,{align:"right"},"Price"),n().createElement(E.default,{align:"right"},"Quantity"),n().createElement(E.default,{align:"right"},"Total"),n().createElement(E.default,{align:"right"},"Actions"))),n().createElement(y.default,null,a.length>0&&a.map(((e,t)=>n().createElement(h.default,{key:e.id,sx:{"&:last-child td, &:last-child th":{border:1}}},n().createElement(E.default,{component:"th",scope:"row"},e.name),n().createElement(E.default,{align:"right"},S&&w===t?n().createElement(d.default,{id:"standard-basic",label:"",variant:"standard",type:"number",InputProps:{inputProps:{min:1}},value:e.price,onChange:e=>{const l=[...a];l[t].price=e.target.value,x(l)},onBlur:()=>{I(!1),q(0)}}):e.price),n().createElement(E.default,{align:"right"},S&&w===t?n().createElement(d.default,{id:"standard-basic",label:"",variant:"standard",type:"number",InputProps:{inputProps:{min:1}},value:e.quantity,onChange:e=>{const l=[...a];l[t].quantity=e.target.value,x(l)},align:"right"}):e.quantity),n().createElement(E.default,{align:"right"},e.price*e.quantity),n().createElement(E.default,{align:"right"},n().createElement(i.default,{"aria-label":"delete",onClick:()=>{const e=[...a];e.splice(t,1),x(e)}},n().createElement(o.default,null)),n().createElement(i.default,{"aria-label":"edit",onClick:()=>{I(!0),q(t),C(e),P(e.quantity)}},n().createElement(u.default,null)))))),n().createElement(h.default,null,n().createElement(E.default,{colSpan:4,align:"right"},"Total"),n().createElement(E.default,{align:"right"},a.length>0&&a.reduce(((e,t)=>e+t.price*t.quantity),0))))))))}}}]);
//# sourceMappingURL=src_components_BillPage_js.js.map