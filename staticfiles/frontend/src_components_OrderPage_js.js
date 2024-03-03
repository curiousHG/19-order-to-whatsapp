/*! For license information please see src_components_OrderPage_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_components_OrderPage_js"],{"./src/api/getCategory.js":(e,t,o)=>{o.r(t),o.d(t,{default:()=>r});var n=o("./node_modules/axios/index.js"),a=o.n(n);async function r(){return a().get("/store/category").then((e=>e.data)).catch((e=>{console.log(e)}))}},"./src/components/OrderPage.js":(e,t,o)=>{o.r(t),o.d(t,{default:()=>y});var n=o("./node_modules/react/index.js"),a=o("./node_modules/@material-ui/core/esm/Grid/Grid.js"),r=o("./node_modules/@material-ui/core/esm/Box/Box.js"),s=o("./node_modules/@material-ui/core/esm/Button/Button.js"),l=o("./node_modules/@material-ui/core/esm/Typography/Typography.js"),d=o("./node_modules/react-router-dom/index.js"),c=o("./node_modules/axios/index.js"),i=o.n(c),m=o("./src/components/Sidebar.js"),u=o("./src/components/images/logo.jpg"),p=o("./node_modules/@mui/material/Card/Card.js"),f=o("./node_modules/@mui/material/CardMedia/CardMedia.js"),g=(o("./node_modules/react-dom/index.js"),o("./src/api/getCategory.js")),x=o("./src/components/Loading.js");const j=(0,n.lazy)((()=>o.e("src_components_CategoryList_js").then(o.bind(o,"./src/components/CategoryList.js"))));i().defaults.xsrfHeaderName="X-CSRFToken",i().defaults.xsrfCookieName="csrftoken";const y=()=>{const[e,t]=(0,n.useState)([]),[o,c]=(0,n.useState)({}),[i,y]=(0,n.useState)([]);return(0,n.useEffect)((()=>{(0,g.default)().then((e=>{t(e)})).catch((e=>{console.log(e)}))}),[]),0===e.length?n.createElement(x.default,null):n.createElement("div",{style:{overflowX:"hidden",padding:"5px"}},n.createElement(a.default,{container:!0,spacing:1},n.createElement(a.default,{item:!0,xs:4},n.createElement(p.default,null,n.createElement(f.default,{component:"img",image:u.default,title:"Logo",sx:{backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"center",margin:"0 auto",borderRadius:"2px",shadow:"2px 2px 5px #000000"}})),n.createElement(m.default,{info:e}),n.createElement(r.default,{textAlign:"center"},n.createElement(d.Link,{to:{pathname:"/final",state:o},style:{textDecoration:"none"}},n.createElement(s.default,{variant:"contained",color:"primary",onClick:()=>{(()=>{let e=o;for(let t in e)(e[t][0]<"0"||e[t][0]>"9")&&delete e[t];c(e)})(),console.log(o),((e,t)=>{if(!t){let t=localStorage.getItem(e);return JSON.parse(t)}localStorage.setItem(e,JSON.stringify(t))})("order",o)}},n.createElement(l.default,{variant:"h3"},"Confirm Order"))))),n.createElement(a.default,{item:!0,xs:8},n.createElement("div",{style:{maxHeight:"100vh",overflowX:"hidden"}},e.map((e=>n.createElement(j,{key:e.id,item:e,data:o,padding:2,style:{color:"blue"}})))))))}},"./src/components/Sidebar.js":(e,t,o)=>{o.r(t),o.d(t,{default:()=>r});var n=o("./node_modules/react/index.js"),a=o("./src/components/SidebarLink.js");o("./src/components/images/logo.jpg");class r extends n.Component{render(){return n.createElement("div",null,n.createElement("div",{className:"sidebar"},this.props.info.map((e=>n.createElement(a.default,{key:e.id,text:e.name})))))}}},"./src/components/SidebarLink.js":(e,t,o)=>{o.r(t),o.d(t,{default:()=>r});var n=o("./node_modules/react/index.js"),a=o("./node_modules/@mui/material/Button/Button.js");class r extends n.Component{constructor(e){super(e)}render(){return n.createElement("div",{className:"link",style:{display:"flex",flexDirection:"column",justifyContent:"center"}},n.createElement(a.default,{onClick:()=>{document.getElementById(this.props.text).scrollIntoView({behavior:"smooth"})},style:{textDecoration:"none",color:"white",fontSize:"2rem",fontStyle:"italic"}},this.props.text))}}},"./src/components/images/logo.jpg":(e,t,o)=>{o.r(t),o.d(t,{default:()=>n});const n=o.p+"d8fff34a5b1c4107126f8c84374b0894.jpg"}}]);
//# sourceMappingURL=src_components_OrderPage_js.js.map