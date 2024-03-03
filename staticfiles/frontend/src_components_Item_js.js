/*! For license information please see src_components_Item_js.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([["src_components_Item_js"],{"./src/components/Item.js":(e,t,a)=>{a.r(t),a.d(t,{default:()=>o});var n=a("./node_modules/react/index.js"),i=a("./node_modules/@mui/material/ListItem/ListItem.js"),s=a("./node_modules/@mui/material/ListItemText/ListItemText.js"),l=a("./node_modules/@mui/material/TextField/TextField.js"),r=a("./node_modules/@mui/material/Select/Select.js"),u=a("./node_modules/@mui/material/MenuItem/MenuItem.js");function m(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}class o extends n.Component{constructor(...e){super(...e),m(this,"state",{quantity:"",unit:"KG"}),m(this,"onChange",(e=>{this.setState({quantity:e.target.value}),this.props.data[this.props.item.name]=e.target.value+" "+this.state.unit})),m(this,"changeUnit",(e=>{this.setState({unit:e.target.value}),this.props.data[this.props.item.name]=this.state.quantity+" "+e.target.value}))}render(){return n.createElement(i.default,{sx:{pl:2}},n.createElement(s.default,{primary:this.props.item.name,primaryTypographyProps:{fontSize:"2.5rem"},style:{textAlign:"left",color:"white"}}),n.createElement(l.default,{value:this.state.quantity,onChange:this.onChange,inputProps:{style:{textAlign:"center",fontSize:"2.5rem"}},variant:"outlined",sx:{width:"20%",height:"10%",margin:"0 auto",backgroundColor:"white",minWidth:"40px"}}),n.createElement(r.default,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:this.state.unit,label:"Unit",onChange:this.changeUnit,sx:{margin:"0 auto",backgroundColor:"transparent",color:"white",fontSize:"2.5rem"}},n.createElement(u.default,{value:"KG"},"Kg"),n.createElement(u.default,{value:"gm"},"gm"),n.createElement(u.default,{value:"PACKET"},"Pc")))}}}}]);
//# sourceMappingURL=src_components_Item_js.js.map