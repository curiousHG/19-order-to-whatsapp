/*! For license information please see src_components_FinalPage_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_components_FinalPage_js"],{"./node_modules/@mui/icons-material/WhatsApp.js":(e,t,a)=>{var l=a("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,function(e,t){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var a=o(t);if(a&&a.has(e))return a.get(e);var l={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if("default"!==r&&Object.prototype.hasOwnProperty.call(e,r)){var s=n?Object.getOwnPropertyDescriptor(e,r):null;s&&(s.get||s.set)?Object.defineProperty(l,r,s):l[r]=e[r]}l.default=e,a&&a.set(e,l)}(a("./node_modules/react/index.js"));var n=l(a("./node_modules/@mui/icons-material/utils/createSvgIcon.js")),r=a("./node_modules/react/jsx-runtime.js");function o(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,a=new WeakMap;return(o=function(e){return e?a:t})(e)}var s=(0,n.default)((0,r.jsx)("path",{d:"M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z"}),"WhatsApp");t.default=s},"./node_modules/@mui/material/Box/Box.js":(e,t,a)=>{a.r(t),a.d(t,{default:()=>o});var l=a("./node_modules/@mui/system/esm/createBox.js"),n=a("./node_modules/@mui/base/generateUtilityClass/ClassNameGenerator.js");const r=(0,a("./node_modules/@mui/material/styles/createTheme.js").default)(),o=(0,l.default)({defaultTheme:r,defaultClassName:"MuiBox-root",generateClassName:n.default.generate})},"./src/api/postCustomer.js":(e,t,a)=>{a.r(t),a.d(t,{default:()=>r});var l=a("./node_modules/axios/index.js"),n=a.n(l);async function r(e){return n().post("/store/customer",e).then((e=>e.data)).catch((e=>{console.log(e)}))}},"./src/api/postOrder.js":(e,t,a)=>{a.r(t),a.d(t,{default:()=>r});var l=a("./node_modules/axios/index.js"),n=a.n(l);async function r(e){return n().post("/store/order",e).then((e=>e.status)).catch((e=>{console.log(e)}))}},"./src/components/FinalPage.js":(e,t,a)=>{a.r(t),a.d(t,{default:()=>g});var l=a("./node_modules/react/index.js"),n=a("./node_modules/@mui/material/Box/Box.js"),r=a("./node_modules/@mui/material/Typography/Typography.js"),o=a("./node_modules/@mui/material/TableContainer/TableContainer.js"),s=a("./node_modules/@mui/material/Table/Table.js"),u=a("./node_modules/@mui/material/TableHead/TableHead.js"),d=a("./node_modules/@mui/material/TableRow/TableRow.js"),i=a("./node_modules/@mui/material/TableCell/TableCell.js"),m=a("./node_modules/@mui/material/TableBody/TableBody.js"),c=a("./node_modules/@mui/material/TextField/TextField.js"),f=a("./node_modules/@mui/material/Button/Button.js"),p=a("./node_modules/@mui/icons-material/WhatsApp.js"),y=(a("./src/api/postCustomer.js"),a("./src/api/postOrder.js"));function g(){const[e,t]=(0,l.useState)({}),[a,g]=(0,l.useState)("http://wa.me/919811572962?"),[h,j]=(0,l.useState)(""),[b,_]=(0,l.useState)("");return(0,l.useEffect)((()=>{const e=JSON.parse(localStorage.getItem("order"));t(e)}),[]),l.createElement("div",null,l.createElement(n.default,{textAlign:"center"},l.createElement(r.default,{variant:"h2",color:"black",fontWeight:"bold"},"Order Summary")),l.createElement(o.default,null,l.createElement(s.default,null,l.createElement(u.default,{style:{backgroundColor:"lightgreen"}},l.createElement(d.default,null,l.createElement(i.default,{align:"center",style:{width:"50%",fontSize:"3rem"}},"Item"),l.createElement(i.default,{align:"center",style:{width:"50%",fontSize:"3rem"}},"Quantity"))),l.createElement(m.default,null,Object.keys(e).map((t=>l.createElement(d.default,{key:t},l.createElement(i.default,{align:"center",style:{fontSize:"1.5rem"}},t),l.createElement(i.default,{align:"center",style:{fontSize:"1.5rem"}},e[t]))))))),l.createElement(n.default,{textAlign:"center",margin:2},l.createElement(c.default,{id:"outlined-required",label:"Name",InputLabelProps:{style:{fontSize:"1.2rem",textAlign:"center"}},sx:{width:"50%",fontSize:"1.5rem",margin:"1rem"},inputProps:{style:{fontSize:"1.5rem"}},onChange:function(e){j(e.target.value)}}),l.createElement("br",null),l.createElement(c.default,{id:"outlined-required",label:"Address",InputLabelProps:{style:{fontSize:"1.2rem",textAlign:"center"}},sx:{width:"50%",fontSize:"1.5rem",margin:"1rem"},inputProps:{style:{fontSize:"1.5rem"}},onChange:function(e){_(e.target.value)}}),l.createElement("br",null),l.createElement(f.default,{variant:"contained",onClick:async function(){let t="http://wa.me/919811572962?text=Hello!%0AI%20want%20to%20order%20the%20following%20items%20from%20your%20store%0A%0A";const a=""===h?"NoName":h,l=""===b?"NoAddress":b;t+="Name:%20"+a+"%0A",t+="Address:%20"+l+"%0A%0A";for(let a in e)null!==e[a]&&(t+=a+"%20"+e[a]+"%0A");t+="%0A%0AThank%20you!",g(t);const n=[];for(let t in e)null!==e[t]&&n.push({product:t,quantity:e[t]});const r={customer:{name:a,address:l},products:n};await(0,y.default)(r).then((e=>{window.location.href=t})).catch((e=>{console.log(e)}))},color:"primary"},l.createElement(p.default,{style:{fontSize:30,paddingRight:"0.5rem"}}),l.createElement(r.default,{variant:"h5"},"Send to Whatsapp"))))}}}]);
//# sourceMappingURL=src_components_FinalPage_js.js.map