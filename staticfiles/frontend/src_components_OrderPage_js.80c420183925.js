/*! For license information please see src_components_OrderPage_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_components_OrderPage_js"],{"./src/api/getCategory.js":(e,t,o)=>{o.r(t),o.d(t,{default:()=>a});var n=o("./node_modules/axios/lib/axios.js");async function a(){return n.default.get("/store/category").then((e=>e.data)).catch((e=>{console.log(e)}))}},"./src/components/OrderPage.js":(e,t,o)=>{o.r(t),o.d(t,{default:()=>y});var n=o("./node_modules/react/index.js"),a=o.n(n),r=o("./node_modules/@material-ui/core/esm/Grid/Grid.js"),s=o("./node_modules/@material-ui/core/esm/Box/Box.js"),l=o("./node_modules/@material-ui/core/esm/Button/Button.js"),d=o("./node_modules/@material-ui/core/esm/Typography/Typography.js"),i=o("./node_modules/react-router-dom/dist/index.js"),c=o("./node_modules/axios/lib/axios.js"),m=o("./src/components/Sidebar.js"),u=o("./src/components/images/logo.jpg"),f=o("./node_modules/@mui/material/Card/Card.js"),p=o("./node_modules/@mui/material/CardMedia/CardMedia.js"),g=o("./src/api/getCategory.js"),x=o("./src/components/Loading.js");const j=(0,n.lazy)((()=>o.e("src_components_CategoryList_js").then(o.bind(o,"./src/components/CategoryList.js"))));c.default.defaults.xsrfHeaderName="X-CSRFToken",c.default.defaults.xsrfCookieName="csrftoken";const y=()=>{const[e,t]=(0,n.useState)([]),[o,c]=(0,n.useState)({}),[y,h]=(0,n.useState)([]);return(0,n.useEffect)((()=>{(0,g.default)().then((e=>{t(e)})).catch((e=>{console.log(e)}))}),[]),0===e.length?a().createElement(x.default,null):a().createElement("div",{style:{overflowX:"hidden",padding:"5px"}},a().createElement(r.default,{container:!0,spacing:1},a().createElement(r.default,{item:!0,xs:4},a().createElement(f.default,null,a().createElement(p.default,{component:"img",image:u.default,title:"Logo",sx:{backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"center",margin:"0 auto",borderRadius:"2px",shadow:"2px 2px 5px #000000"}})),a().createElement(m.default,{info:e}),a().createElement(s.default,{textAlign:"center"},a().createElement(i.Link,{to:{pathname:"/final",state:o},style:{textDecoration:"none"}},a().createElement(l.default,{variant:"contained",color:"primary",onClick:()=>{(()=>{let e=o;for(let t in e)(e[t][0]<"0"||e[t][0]>"9")&&delete e[t];c(e)})(),((e,t)=>{if(!t){let t=localStorage.getItem(e);return JSON.parse(t)}localStorage.setItem(e,JSON.stringify(t))})("order",o)}},a().createElement(d.default,{variant:"h3"},"Confirm Order"))))),a().createElement(r.default,{item:!0,xs:8},a().createElement("div",{style:{maxHeight:"100vh",overflowX:"hidden"}},e.map((e=>a().createElement(j,{key:e.id,item:e,data:o,padding:2,style:{color:"blue"}})))))))}},"./src/components/Sidebar.js":(e,t,o)=>{o.r(t),o.d(t,{default:()=>s});var n=o("./node_modules/react/index.js"),a=o.n(n),r=o("./src/components/SidebarLink.js");o("./src/components/images/logo.jpg");class s extends n.Component{render(){return a().createElement("div",null,a().createElement("div",{className:"sidebar"},this.props.info.map((e=>a().createElement(r.default,{key:e.id,text:e.name})))))}}},"./src/components/SidebarLink.js":(e,t,o)=>{o.r(t),o.d(t,{default:()=>s});var n=o("./node_modules/react/index.js"),a=o.n(n),r=o("./node_modules/@mui/material/Button/Button.js");class s extends n.Component{constructor(e){super(e)}render(){return a().createElement("div",{className:"link",style:{display:"flex",flexDirection:"column",justifyContent:"center"}},a().createElement(r.default,{onClick:()=>{document.getElementById(this.props.text).scrollIntoView({behavior:"smooth"})},style:{textDecoration:"none",color:"white",fontSize:"2rem",fontStyle:"italic"}},this.props.text))}}},"./src/components/images/logo.jpg":(e,t,o)=>{o.r(t),o.d(t,{default:()=>n});const n=o.p+"d8fff34a5b1c4107126f8c84374b0894.jpg"}}]);
//# sourceMappingURL=src_components_OrderPage_js.js.20415455c905.map