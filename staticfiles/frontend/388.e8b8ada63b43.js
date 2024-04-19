"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[388],{3388:(e,t,a)=>{a.r(t),a.d(t,{default:()=>P});var i=a(6540),r=a(2794),n=a(2241),o=a(7059),s=a(2058),l=a(8587),d=a(8168),c=a(4533),p=a(4111),u=a(771),m=a(1848),g=a(9770),v=a(4409),h=a(2850),b=a(8850),y=a(2778),f=a(6852),A=a(7553);const C=(0,A.A)("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]),x=(0,A.A)("MuiListItemIcon",["root","alignItemsFlexStart"]);var $=a(8081),w=a(7245);function k(e){return(0,w.Ay)("MuiMenuItem",e)}const O=(0,A.A)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]);var S=a(4848);const I=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],M=(0,m.Ay)(b.A,{shouldForwardProp:e=>(0,g.A)(e)||"classes"===e,name:"MuiMenuItem",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,a.dense&&t.dense,a.divider&&t.divider,!a.disableGutters&&t.gutters]}})((({theme:e,ownerState:t})=>(0,d.A)({},e.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!t.disableGutters&&{paddingLeft:16,paddingRight:16},t.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${O.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,u.X4)(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${O.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:(0,u.X4)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${O.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:(0,u.X4)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,u.X4)(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${O.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${O.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`& + .${C.root}`]:{marginTop:e.spacing(1),marginBottom:e.spacing(1)},[`& + .${C.inset}`]:{marginLeft:52},[`& .${$.A.root}`]:{marginTop:0,marginBottom:0},[`& .${$.A.inset}`]:{paddingLeft:36},[`& .${x.root}`]:{minWidth:36}},!t.dense&&{[e.breakpoints.up("sm")]:{minHeight:"auto"}},t.dense&&(0,d.A)({minHeight:32,paddingTop:4,paddingBottom:4},e.typography.body2,{[`& .${x.root} svg`]:{fontSize:"1.25rem"}})))),E=i.forwardRef((function(e,t){const a=(0,v.A)({props:e,name:"MuiMenuItem"}),{autoFocus:r=!1,component:n="li",dense:o=!1,divider:s=!1,disableGutters:u=!1,focusVisibleClassName:m,role:g="menuitem",tabIndex:b,className:A}=a,C=(0,l.A)(a,I),x=i.useContext(h.A),$=i.useMemo((()=>({dense:o||x.dense||!1,disableGutters:u})),[x.dense,o,u]),w=i.useRef(null);(0,y.A)((()=>{r&&w.current&&w.current.focus()}),[r]);const O=(0,d.A)({},a,{dense:$.dense,divider:s,disableGutters:u}),E=(e=>{const{disabled:t,dense:a,divider:i,disableGutters:r,selected:n,classes:o}=e,s={root:["root",a&&"dense",t&&"disabled",!r&&"gutters",i&&"divider",n&&"selected"]},l=(0,p.A)(s,k,o);return(0,d.A)({},o,l)})(a),G=(0,f.A)(w,t);let P;return a.disabled||(P=void 0!==b?b:-1),(0,S.jsx)(h.A.Provider,{value:$,children:(0,S.jsx)(M,(0,d.A)({ref:G,role:g,tabIndex:P,component:n,focusVisibleClassName:(0,c.A)(E.focusVisible,m),className:(0,c.A)(E.root,A)},C,{ownerState:O,classes:E}))})}));function G(e,t,a){var i;return(t="symbol"==typeof(i=function(e,t){if("object"!=typeof e||!e)return e;var a=e[Symbol.toPrimitive];if(void 0!==a){var i=a.call(e,"string");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(t))?i:i+"")in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class P extends i.Component{constructor(...e){super(...e),G(this,"state",{quantity:"",unit:"KG"}),G(this,"onChange",(e=>{this.setState({quantity:e.target.value}),this.props.data[this.props.item.name]=e.target.value+" "+this.state.unit})),G(this,"changeUnit",(e=>{this.setState({unit:e.target.value}),this.props.data[this.props.item.name]=this.state.quantity+" "+e.target.value}))}render(){return i.createElement(r.Ay,{sx:{pl:2}},i.createElement(n.A,{primary:this.props.item.name,primaryTypographyProps:{fontSize:"2.5rem"},style:{textAlign:"left",color:"white"}}),i.createElement(o.A,{value:this.state.quantity,onChange:this.onChange,inputProps:{style:{textAlign:"center",fontSize:"2.5rem"}},variant:"outlined",sx:{width:"20%",height:"10%",margin:"0 auto",backgroundColor:"white",minWidth:"40px"}}),i.createElement(s.A,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:this.state.unit,label:"Unit",onChange:this.changeUnit,sx:{margin:"0 auto",backgroundColor:"transparent",color:"white",fontSize:"2.5rem"}},i.createElement(E,{value:"KG"},"Kg"),i.createElement(E,{value:"gm"},"gm"),i.createElement(E,{value:"PACKET"},"Pc")))}}}}]);
//# sourceMappingURL=388.js.b3081456b611.map