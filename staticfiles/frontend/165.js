"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[165],{2165:(e,t,n)=>{n.r(t),n.d(t,{default:()=>_});var r=n(6540),a=n(8587),i=n(8168),o=n(4533),s=n(5419),c=n(4111),l=n(771),d=n(1848),p=n(4409),u=n(8850),m=n(5602),g=n(2778),y=n(6852),b=n(2850),f=n(7553),h=n(7245);function v(e){return(0,h.Ay)("MuiListItem",e)}const A=(0,f.A)("MuiListItem",["root","container","focusVisible","dense","alignItemsFlexStart","disabled","divider","gutters","padding","button","secondaryAction","selected"]),x=(0,f.A)("MuiListItemButton",["root","focusVisible","dense","alignItemsFlexStart","disabled","divider","gutters","selected"]);function w(e){return(0,h.Ay)("MuiListItemSecondaryAction",e)}(0,f.A)("MuiListItemSecondaryAction",["root","disableGutters"]);var S=n(4848);const $=["className"],k=(0,d.Ay)("div",{name:"MuiListItemSecondaryAction",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.disableGutters&&t.disableGutters]}})((({ownerState:e})=>(0,i.A)({position:"absolute",right:16,top:"50%",transform:"translateY(-50%)"},e.disableGutters&&{right:0}))),C=r.forwardRef((function(e,t){const n=(0,p.A)({props:e,name:"MuiListItemSecondaryAction"}),{className:s}=n,l=(0,a.A)(n,$),d=r.useContext(b.A),u=(0,i.A)({},n,{disableGutters:d.disableGutters}),m=(e=>{const{disableGutters:t,classes:n}=e,r={root:["root",t&&"disableGutters"]};return(0,c.A)(r,w,n)})(u);return(0,S.jsx)(k,(0,i.A)({className:(0,o.A)(m.root,s),ownerState:u,ref:t},l))}));C.muiName="ListItemSecondaryAction";const N=C,I=["className"],M=["alignItems","autoFocus","button","children","className","component","components","componentsProps","ContainerComponent","ContainerProps","dense","disabled","disableGutters","disablePadding","divider","focusVisibleClassName","secondaryAction","selected","slotProps","slots"],P=(0,d.Ay)("div",{name:"MuiListItem",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,n.dense&&t.dense,"flex-start"===n.alignItems&&t.alignItemsFlexStart,n.divider&&t.divider,!n.disableGutters&&t.gutters,!n.disablePadding&&t.padding,n.button&&t.button,n.hasSecondaryAction&&t.secondaryAction]}})((({theme:e,ownerState:t})=>(0,i.A)({display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",width:"100%",boxSizing:"border-box",textAlign:"left"},!t.disablePadding&&(0,i.A)({paddingTop:8,paddingBottom:8},t.dense&&{paddingTop:4,paddingBottom:4},!t.disableGutters&&{paddingLeft:16,paddingRight:16},!!t.secondaryAction&&{paddingRight:48}),!!t.secondaryAction&&{[`& > .${x.root}`]:{paddingRight:48}},{[`&.${A.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${A.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,l.X4)(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${A.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:(0,l.X4)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${A.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity}},"flex-start"===t.alignItems&&{alignItems:"flex-start"},t.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},t.button&&{transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${A.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:(0,l.X4)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,l.X4)(e.palette.primary.main,e.palette.action.selectedOpacity)}}},t.hasSecondaryAction&&{paddingRight:48}))),G=(0,d.Ay)("li",{name:"MuiListItem",slot:"Container",overridesResolver:(e,t)=>t.container})({position:"relative"}),L=r.forwardRef((function(e,t){const n=(0,p.A)({props:e,name:"MuiListItem"}),{alignItems:l="center",autoFocus:d=!1,button:f=!1,children:h,className:x,component:w,components:$={},componentsProps:k={},ContainerComponent:C="li",ContainerProps:{className:L}={},dense:W=!1,disabled:T=!1,disableGutters:j=!1,disablePadding:R=!1,divider:O=!1,focusVisibleClassName:z,secondaryAction:E,selected:B=!1,slotProps:F={},slots:V={}}=n,X=(0,a.A)(n.ContainerProps,I),D=(0,a.A)(n,M),K=r.useContext(b.A),Y=r.useMemo((()=>({dense:W||K.dense||!1,alignItems:l,disableGutters:j})),[l,K.dense,W,j]),q=r.useRef(null);(0,g.A)((()=>{d&&q.current&&q.current.focus()}),[d]);const H=r.Children.toArray(h),J=H.length&&(0,m.A)(H[H.length-1],["ListItemSecondaryAction"]),Q=(0,i.A)({},n,{alignItems:l,autoFocus:d,button:f,dense:Y.dense,disabled:T,disableGutters:j,disablePadding:R,divider:O,hasSecondaryAction:J,selected:B}),U=(e=>{const{alignItems:t,button:n,classes:r,dense:a,disabled:i,disableGutters:o,disablePadding:s,divider:l,hasSecondaryAction:d,selected:p}=e,u={root:["root",a&&"dense",!o&&"gutters",!s&&"padding",l&&"divider",i&&"disabled",n&&"button","flex-start"===t&&"alignItemsFlexStart",d&&"secondaryAction",p&&"selected"],container:["container"]};return(0,c.A)(u,v,r)})(Q),Z=(0,y.A)(q,t),_=V.root||$.Root||P,ee=F.root||k.root||{},te=(0,i.A)({className:(0,o.A)(U.root,ee.className,x),disabled:T},D);let ne=w||"li";return f&&(te.component=w||"div",te.focusVisibleClassName=(0,o.A)(A.focusVisible,z),ne=u.A),J?(ne=te.component||w?ne:"div","li"===C&&("li"===ne?ne="div":"li"===te.component&&(te.component="div")),(0,S.jsx)(b.A.Provider,{value:Y,children:(0,S.jsxs)(G,(0,i.A)({as:C,className:(0,o.A)(U.container,L),ref:Z,ownerState:Q},X,{children:[(0,S.jsx)(_,(0,i.A)({},ee,!(0,s.g)(_)&&{as:ne,ownerState:(0,i.A)({},Q,ee.ownerState)},te,{children:H})),H.pop()]}))})):(0,S.jsx)(b.A.Provider,{value:Y,children:(0,S.jsxs)(_,(0,i.A)({},ee,{as:ne,ref:Z},!(0,s.g)(_)&&{ownerState:(0,i.A)({},Q,ee.ownerState)},te,{children:[H,E&&(0,S.jsx)(N,{children:E})]}))})}));var W=n(9452),T=n(9599),j=n(4675);const R=r.createContext();function O(e){return(0,h.Ay)("MuiGrid",e)}const z=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12],E=(0,f.A)("MuiGrid",["root","container","item","zeroMinWidth",...[0,1,2,3,4,5,6,7,8,9,10].map((e=>`spacing-xs-${e}`)),...["column-reverse","column","row-reverse","row"].map((e=>`direction-xs-${e}`)),...["nowrap","wrap-reverse","wrap"].map((e=>`wrap-xs-${e}`)),...z.map((e=>`grid-xs-${e}`)),...z.map((e=>`grid-sm-${e}`)),...z.map((e=>`grid-md-${e}`)),...z.map((e=>`grid-lg-${e}`)),...z.map((e=>`grid-xl-${e}`))]),B=["className","columns","columnSpacing","component","container","direction","item","rowSpacing","spacing","wrap","zeroMinWidth"];function F(e){const t=parseFloat(e);return`${t}${String(e).replace(String(t),"")||"px"}`}function V({breakpoints:e,values:t}){let n="";Object.keys(t).forEach((e=>{""===n&&0!==t[e]&&(n=e)}));const r=Object.keys(e).sort(((t,n)=>e[t]-e[n]));return r.slice(0,r.indexOf(n))}const X=(0,d.Ay)("div",{name:"MuiGrid",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e,{container:r,direction:a,item:i,spacing:o,wrap:s,zeroMinWidth:c,breakpoints:l}=n;let d=[];r&&(d=function(e,t,n={}){if(!e||e<=0)return[];if("string"==typeof e&&!Number.isNaN(Number(e))||"number"==typeof e)return[n[`spacing-xs-${String(e)}`]];const r=[];return t.forEach((t=>{const a=e[t];Number(a)>0&&r.push(n[`spacing-${t}-${String(a)}`])})),r}(o,l,t));const p=[];return l.forEach((e=>{const r=n[e];r&&p.push(t[`grid-${e}-${String(r)}`])})),[t.root,r&&t.container,i&&t.item,c&&t.zeroMinWidth,...d,"row"!==a&&t[`direction-xs-${String(a)}`],"wrap"!==s&&t[`wrap-xs-${String(s)}`],...p]}})((({ownerState:e})=>(0,i.A)({boxSizing:"border-box"},e.container&&{display:"flex",flexWrap:"wrap",width:"100%"},e.item&&{margin:0},e.zeroMinWidth&&{minWidth:0},"wrap"!==e.wrap&&{flexWrap:e.wrap})),(function({theme:e,ownerState:t}){const n=(0,W.kW)({values:t.direction,breakpoints:e.breakpoints.values});return(0,W.NI)({theme:e},n,(e=>{const t={flexDirection:e};return 0===e.indexOf("column")&&(t[`& > .${E.item}`]={maxWidth:"none"}),t}))}),(function({theme:e,ownerState:t}){const{container:n,rowSpacing:r}=t;let a={};if(n&&0!==r){const t=(0,W.kW)({values:r,breakpoints:e.breakpoints.values});let n;"object"==typeof t&&(n=V({breakpoints:e.breakpoints.values,values:t})),a=(0,W.NI)({theme:e},t,((t,r)=>{var a;const i=e.spacing(t);return"0px"!==i?{marginTop:`-${F(i)}`,[`& > .${E.item}`]:{paddingTop:F(i)}}:null!=(a=n)&&a.includes(r)?{}:{marginTop:0,[`& > .${E.item}`]:{paddingTop:0}}}))}return a}),(function({theme:e,ownerState:t}){const{container:n,columnSpacing:r}=t;let a={};if(n&&0!==r){const t=(0,W.kW)({values:r,breakpoints:e.breakpoints.values});let n;"object"==typeof t&&(n=V({breakpoints:e.breakpoints.values,values:t})),a=(0,W.NI)({theme:e},t,((t,r)=>{var a;const i=e.spacing(t);return"0px"!==i?{width:`calc(100% + ${F(i)})`,marginLeft:`-${F(i)}`,[`& > .${E.item}`]:{paddingLeft:F(i)}}:null!=(a=n)&&a.includes(r)?{}:{width:"100%",marginLeft:0,[`& > .${E.item}`]:{paddingLeft:0}}}))}return a}),(function({theme:e,ownerState:t}){let n;return e.breakpoints.keys.reduce(((r,a)=>{let o={};if(t[a]&&(n=t[a]),!n)return r;if(!0===n)o={flexBasis:0,flexGrow:1,maxWidth:"100%"};else if("auto"===n)o={flexBasis:"auto",flexGrow:0,flexShrink:0,maxWidth:"none",width:"auto"};else{const s=(0,W.kW)({values:t.columns,breakpoints:e.breakpoints.values}),c="object"==typeof s?s[a]:s;if(null==c)return r;const l=Math.round(n/c*1e8)/1e6+"%";let d={};if(t.container&&t.item&&0!==t.columnSpacing){const n=e.spacing(t.columnSpacing);if("0px"!==n){const e=`calc(${l} + ${F(n)})`;d={flexBasis:e,maxWidth:e}}}o=(0,i.A)({flexBasis:l,flexGrow:0,maxWidth:l},d)}return 0===e.breakpoints.values[a]?Object.assign(r,o):r[e.breakpoints.up(a)]=o,r}),{})})),D=r.forwardRef((function(e,t){const n=(0,p.A)({props:e,name:"MuiGrid"}),{breakpoints:s}=(0,j.A)(),l=(0,T.A)(n),{className:d,columns:u,columnSpacing:m,component:g="div",container:y=!1,direction:b="row",item:f=!1,rowSpacing:h,spacing:v=0,wrap:A="wrap",zeroMinWidth:x=!1}=l,w=(0,a.A)(l,B),$=h||v,k=m||v,C=r.useContext(R),N=y?u||12:C,I={},M=(0,i.A)({},w);s.keys.forEach((e=>{null!=w[e]&&(I[e]=w[e],delete M[e])}));const P=(0,i.A)({},l,{columns:N,container:y,direction:b,item:f,rowSpacing:$,columnSpacing:k,wrap:A,zeroMinWidth:x,spacing:v},I,{breakpoints:s.keys}),G=(e=>{const{classes:t,container:n,direction:r,item:a,spacing:i,wrap:o,zeroMinWidth:s,breakpoints:l}=e;let d=[];n&&(d=function(e,t){if(!e||e<=0)return[];if("string"==typeof e&&!Number.isNaN(Number(e))||"number"==typeof e)return[`spacing-xs-${String(e)}`];const n=[];return t.forEach((t=>{const r=e[t];if(Number(r)>0){const e=`spacing-${t}-${String(r)}`;n.push(e)}})),n}(i,l));const p=[];l.forEach((t=>{const n=e[t];n&&p.push(`grid-${t}-${String(n)}`)}));const u={root:["root",n&&"container",a&&"item",s&&"zeroMinWidth",...d,"row"!==r&&`direction-xs-${String(r)}`,"wrap"!==o&&`wrap-xs-${String(o)}`,...p]};return(0,c.A)(u,O,t)})(P);return(0,S.jsx)(R.Provider,{value:N,children:(0,S.jsx)(X,(0,i.A)({ownerState:P,className:(0,o.A)(G.root,d),as:g,ref:t},M))})})),K=D;var Y=n(4073);function q(e){return(0,h.Ay)("MuiListItemText",e)}const H=(0,f.A)("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]),J=["children","className","disableTypography","inset","primary","primaryTypographyProps","secondary","secondaryTypographyProps"],Q=(0,d.Ay)("div",{name:"MuiListItemText",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[{[`& .${H.primary}`]:t.primary},{[`& .${H.secondary}`]:t.secondary},t.root,n.inset&&t.inset,n.primary&&n.secondary&&t.multiline,n.dense&&t.dense]}})((({ownerState:e})=>(0,i.A)({flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4},e.primary&&e.secondary&&{marginTop:6,marginBottom:6},e.inset&&{paddingLeft:56}))),U=r.forwardRef((function(e,t){const n=(0,p.A)({props:e,name:"MuiListItemText"}),{children:s,className:l,disableTypography:d=!1,inset:u=!1,primary:m,primaryTypographyProps:g,secondary:y,secondaryTypographyProps:f}=n,h=(0,a.A)(n,J),{dense:v}=r.useContext(b.A);let A=null!=m?m:s,x=y;const w=(0,i.A)({},n,{disableTypography:d,inset:u,primary:!!A,secondary:!!x,dense:v}),$=(e=>{const{classes:t,inset:n,primary:r,secondary:a,dense:i}=e,o={root:["root",n&&"inset",i&&"dense",r&&a&&"multiline"],primary:["primary"],secondary:["secondary"]};return(0,c.A)(o,q,t)})(w);return null==A||A.type===Y.A||d||(A=(0,S.jsx)(Y.A,(0,i.A)({variant:v?"body2":"body1",className:$.primary,component:null!=g&&g.variant?void 0:"span",display:"block"},g,{children:A}))),null==x||x.type===Y.A||d||(x=(0,S.jsx)(Y.A,(0,i.A)({variant:"body2",className:$.secondary,color:"text.secondary",display:"block"},f,{children:x}))),(0,S.jsxs)(Q,(0,i.A)({className:(0,o.A)($.root,l),ownerState:w,ref:t},h,{children:[A,x]}))}));var Z=n(722);const _=({item:e,data:t})=>{const[n,a]=(0,r.useState)(""),[i,o]=(0,r.useState)(e.unit);return r.createElement(L,null,r.createElement(K,{container:!0,alignItems:"center",justifyContent:"space-between"},r.createElement(K,{item:!0,xs:7},r.createElement(U,{primary:e.name,primaryTypographyProps:{fontSize:"2.5rem"},style:{textAlign:"left",color:"white"}})),r.createElement(K,{item:!0,xs:4},r.createElement(Z.A,{value:n,onChange:n=>{a(n.target.value),t[e.name]=n.target.value+" "+i},onBlur:r=>{""===n||0==n?(a(""),delete t[e.name]):n<1&&"Pc"!=i?(a(1e3*n),o("gm"),t[e.name]=1e3*n+" gm"):n>=1&&"Pc"!=i&&(a(n),o("KG"),t[e.name]=n+" KG")},inputProps:{style:{textAlign:"center",fontSize:"2.5rem"}},variant:"outlined",fullWidth:!0,style:{backgroundColor:"white"}})),r.createElement(K,{item:!0,xs:1},r.createElement(U,{primary:i,primaryTypographyProps:{fontSize:"2.5rem",paddingLeft:"2px"},style:{textAlign:"left",color:"white",width:"100px"}}))))}}}]);
//# sourceMappingURL=165.js.map