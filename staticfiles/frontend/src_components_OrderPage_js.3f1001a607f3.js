/*! For license information please see src_components_OrderPage_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_components_OrderPage_js"],{"./src/api/getCategory.js":(e,t,o)=>{o.r(t),o.d(t,{default:()=>r});var a=o("./node_modules/axios/index.js"),n=o.n(a);async function r(){return n().get("/store/category").then((e=>e.data)).catch((e=>{console.log(e)}))}},"./src/components/CategoryList.js":(e,t,o)=>{o.r(t),o.d(t,{default:()=>l});var a=o("./node_modules/react/index.js"),n=o("./node_modules/@mui/material/List/List.js"),r=o("./node_modules/@material-ui/core/esm/Box/Box.js"),s=o("./node_modules/@material-ui/core/esm/Typography/Typography.js");const d=a.lazy((()=>Promise.all([o.e("vendors-node_modules_mui_material_TextField_TextField_js-node_modules_mui_material_Typography-06c9ca"),o.e("vendors-node_modules_mui_material_ListItem_ListItem_js-node_modules_mui_material_ListItemText-afa934"),o.e("src_components_Item_js")]).then(o.bind(o,"./src/components/Item.js"))));function l(e){const[t,o]=a.useState(!1);return a.createElement("div",{id:e.item.name},a.createElement(r.default,{justifyContent:"center",alignItems:"center",style:{backgroundColor:"darkred",borderTopLeftRadius:"10px",borderTopRightRadius:"10px",padding:"10px",color:"white"}},a.createElement(s.default,{align:"center",variant:"h3"},e.item.name)),a.createElement(n.default,{style:{width:"100%",backgroundColor:"#5587fa",padding:"2px",borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px",marginBottom:"10px"}},e.item.products.map((t=>a.createElement(d,{key:t.id,item:t,data:e.data})))))}},"./src/components/OrderPage.js":(e,t,o)=>{o.r(t),o.d(t,{default:()=>_});var a=o("./node_modules/react/index.js"),n=o("./node_modules/@material-ui/core/esm/Grid/Grid.js"),r=o("./node_modules/@material-ui/core/esm/Box/Box.js"),s=o("./node_modules/@material-ui/core/esm/Button/Button.js"),d=o("./node_modules/@material-ui/core/esm/Typography/Typography.js"),l=o("./node_modules/react-router-dom/index.js"),i=o("./src/components/CategoryList.js"),m=o("./node_modules/axios/index.js"),c=o.n(m),u=o("./src/components/Sidebar.js"),p=o("./src/components/images/logo.jpg"),f=o("./node_modules/@mui/material/Card/Card.js"),g=o("./node_modules/@mui/material/CardMedia/CardMedia.js"),x=(o("./node_modules/react-dom/index.js"),o("./src/api/getCategory.js"));c().defaults.xsrfHeaderName="X-CSRFToken",c().defaults.xsrfCookieName="csrftoken";const _=()=>{const[e,t]=(0,a.useState)([]),[o,m]=(0,a.useState)({}),[c,_]=(0,a.useState)([]);return(0,a.useEffect)((()=>{(0,x.default)().then((e=>{t(e)})).catch((e=>{console.log(e)}))}),[]),a.createElement("div",{style:{overflowX:"hidden",padding:"5px"}},a.createElement(n.default,{container:!0,spacing:1},a.createElement(n.default,{item:!0,xs:4},a.createElement(f.default,null,a.createElement(g.default,{component:"img",image:p.default,title:"Logo",sx:{backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"center",margin:"0 auto",borderRadius:"2px",shadow:"2px 2px 5px #000000"}})),a.createElement(u.default,{info:e}),a.createElement(r.default,{textAlign:"center"},a.createElement(l.Link,{to:{pathname:"/final",state:o},style:{textDecoration:"none"}},a.createElement(s.default,{variant:"contained",color:"primary",onClick:()=>{(()=>{let e=o;for(let t in e)(e[t][0]<"0"||e[t][0]>"9")&&delete e[t];m(e)})(),console.log(o),((e,t)=>{if(!t){let t=localStorage.getItem(e);return JSON.parse(t)}localStorage.setItem(e,JSON.stringify(t))})("order",o)}},a.createElement(d.default,{variant:"h3"},"Confirm Order"))))),a.createElement(n.default,{item:!0,xs:8},a.createElement("div",{style:{maxHeight:"100vh",overflowX:"hidden"}},e.map((e=>a.createElement(i.default,{key:e.id,item:e,data:o,padding:2,style:{color:"blue"}})))))))}},"./src/components/Sidebar.js":(e,t,o)=>{o.r(t),o.d(t,{default:()=>r});var a=o("./node_modules/react/index.js"),n=o("./src/components/SidebarLink.js");o("./src/components/images/logo.jpg");class r extends a.Component{render(){return a.createElement("div",null,a.createElement("div",{className:"sidebar"},this.props.info.map((e=>a.createElement(n.default,{key:e.id,text:e.name})))))}}},"./src/components/SidebarLink.js":(e,t,o)=>{o.r(t),o.d(t,{default:()=>r});var a=o("./node_modules/react/index.js"),n=o("./node_modules/@mui/material/Button/Button.js");class r extends a.Component{constructor(e){super(e)}render(){return a.createElement("div",{className:"link",style:{display:"flex",flexDirection:"column",justifyContent:"center"}},a.createElement(n.default,{onClick:()=>{document.getElementById(this.props.text).scrollIntoView({behavior:"smooth"})},style:{textDecoration:"none",color:"white",fontSize:"2rem",fontStyle:"italic"}},this.props.text))}}},"./src/components/images/logo.jpg":(e,t,o)=>{o.r(t),o.d(t,{default:()=>a});const a=o.p+"d8fff34a5b1c4107126f8c84374b0894.jpg"}}]);
//# sourceMappingURL=src_components_OrderPage_js.js.8a11def645ba.map