/*! For license information please see src_components_Item_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_components_Item_js"],{"./src/components/Item.js":(e,t,a)=>{a.r(t),a.d(t,{default:()=>d});var i=a("./node_modules/react/index.js"),n=a.n(i),r=a("./node_modules/@mui/material/ListItem/ListItem.js"),s=a("./node_modules/@mui/material/ListItemText/ListItemText.js"),l=a("./node_modules/@mui/material/TextField/TextField.js"),o=a("./node_modules/@mui/material/Select/Select.js"),u=a("./node_modules/@mui/material/MenuItem/MenuItem.js");function m(e,t,a){var i;return(t="symbol"==typeof(i=function(e,t){if("object"!=typeof e||!e)return e;var a=e[Symbol.toPrimitive];if(void 0!==a){var i=a.call(e,"string");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(t))?i:i+"")in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class d extends i.Component{constructor(...e){super(...e),m(this,"state",{quantity:"",unit:"KG"}),m(this,"onChange",(e=>{this.setState({quantity:e.target.value}),this.props.data[this.props.item.name]=e.target.value+" "+this.state.unit})),m(this,"changeUnit",(e=>{this.setState({unit:e.target.value}),this.props.data[this.props.item.name]=this.state.quantity+" "+e.target.value}))}render(){return n().createElement(r.default,{sx:{pl:2}},n().createElement(s.default,{primary:this.props.item.name,primaryTypographyProps:{fontSize:"2.5rem"},style:{textAlign:"left",color:"white"}}),n().createElement(l.default,{value:this.state.quantity,onChange:this.onChange,inputProps:{style:{textAlign:"center",fontSize:"2.5rem"}},variant:"outlined",sx:{width:"20%",height:"10%",margin:"0 auto",backgroundColor:"white",minWidth:"40px"}}),n().createElement(o.default,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:this.state.unit,label:"Unit",onChange:this.changeUnit,sx:{margin:"0 auto",backgroundColor:"transparent",color:"white",fontSize:"2.5rem"}},n().createElement(u.default,{value:"KG"},"Kg"),n().createElement(u.default,{value:"gm"},"gm"),n().createElement(u.default,{value:"PACKET"},"Pc")))}}}}]);
//# sourceMappingURL=src_components_Item_js.js.2ec77f12f3f2.map