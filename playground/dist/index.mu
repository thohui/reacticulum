#!/usr/bin/env node

process.on('uncaughtException', (e) => {
  process.stdout.write('#Error\n')
  process.stdout.write('Something went wrong.\n')
  process.stderr.write(e.stack + '\n')
  process.exit(1)
})
process.on('unhandledRejection', (e) => {
  process.stdout.write('#Error\n')
  process.stdout.write('Something went wrong.\n')
  process.stderr.write(String(e) + '\n')
  process.exit(1)
})

var P=Object.defineProperty;var Q=Object.getOwnPropertyDescriptor;var V=Object.getOwnPropertyNames;var X=Object.prototype.hasOwnProperty;var i=(r,n)=>()=>(r&&(n=r(r=0)),n);var b=(r,n)=>{for(var o in n)P(r,o,{get:n[o],enumerable:!0})},Y=(r,n,o,e)=>{if(n&&typeof n=="object"||typeof n=="function")for(let c of V(n))!X.call(r,c)&&c!==o&&P(r,c,{get:()=>n[c],enumerable:!(e=Q(n,c))||e.enumerable});return r};var z=r=>Y(P({},"__esModule",{value:!0}),r);var A,a,F,k=i(()=>{A=new WeakMap,a=(r,n)=>{A.set(r,n)},F=r=>typeof r!="function"?null:A.get(r)??null});function m({children:r}){return null}var v=i(()=>{"use strict"});function s({hex:r,children:n}){return null}var T=i(()=>{"use strict"});function g({symbol:r}){return null}var I=i(()=>{"use strict"});function d({children:r}){return null}var C=i(()=>{"use strict"});function l({children:r}){return null}var N=i(()=>{"use strict"});function h({children:r}){return null}var _=i(()=>{"use strict"});function x({name:r,placeholder:n,width:o=24}){return null}var M=i(()=>{"use strict"});function y({children:r}){return null}var L=i(()=>{"use strict"});function f({to:r,children:n}){return null}var D=i(()=>{"use strict"});function u({children:r}){return null}var E=i(()=>{"use strict"});function $({children:r}){return null}var B=i(()=>{"use strict"});function R({group:r,value:n,checked:o}){return null}var S=i(()=>{"use strict"});var W={};b(W,{Bold:()=>m,Color:()=>s,Divider:()=>g,H1:()=>d,H2:()=>l,H3:()=>h,Input:()=>x,Italic:()=>y,Link:()=>f,Paragraph:()=>u,Radio:()=>R,Underline:()=>$});var H=i(()=>{"use strict";k();v();T();I();C();N();_();M();L();D();E();B();S();v();T();I();C();N();_();M();L();D();E();B();S();a(m,"bold");a($,"underline");a(f,"link");a(x,"input");a(g,"divider");a(d,"h1");a(l,"h2");a(h,"h3");a(y,"italic");a(s,"color");a(u,"paragraph");a(R,"radio")});var J={};b(J,{serialize:()=>t});function rr(r){return r.replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/\*/g,"\\*").replace(/_/g,"\\_").replace(/>/g,"\\>").replace(/\|/g,"\\|").replace(/-/g,"\\-")}function t(r){if(r==null)return"";if(typeof r=="string"||typeof r=="number")return rr(String(r));if(typeof r=="boolean")return"";if(Array.isArray(r))return r.map(t).join("");let n=r,{type:o,props:e}=n;if(o==="fragment")return t(e.children);let c=F(o);if(c)switch(c){case"h1":return`>${t(e.children)}
`;case"h2":return`>>${t(e.children)}
`;case"h3":return`>>>${t(e.children)}
`;case"bold":return`\`!${t(e.children)}\`!`;case"italic":return`\`*${t(e.children)}\`*`;case"underline":return`\`_${t(e.children)}\`_`;case"divider":return`-${e.symbol}
`;case"link":return`\`[${t(e.children)}\`${e.to}]\``;case"input":return er(e);case"color":return`\`F${e.hex}${t(e.children)}\`f`;case"paragraph":return`${t(e.children)}
`;case"radio":return`\`<^${e.group}|${e.value}${e.checked?"|*":""}>\`${e.label?e.label:""}\`
`}switch(o){case"h1":return`#${t(e.children)}
`;case"h2":return`##${t(e.children)}
`;case"h3":return`###${t(e.children)}
`;case"b":return`\`!${t(e.children)}\`!`;case"i":return`\`*${t(e.children)}\`*`;case"u":return`\`_${t(e.children)}\`_`;case"hr":return`---
`;case"a":return`>[${t(e.children)}:${e.href}]`;case"p":return`${t(e.children)}

`;case"br":return`
`;case"radio":return`\`<^${e.group}|${e.value}${e.checked?"|*":""}>\`${e.label?e.label:""}\`
`}if(typeof o=="function"){if(o.prototype?.isReactComponent){let O=new o(e);return t(O.render())}return t(o(e))}return t(e.children)}function er(r){let{name:n,placeholder:o,width:e}=r;e===void 0&&(e=24);let c=[];return c.push(`\`<${e}|${n}\``),o&&c.push(`|${o}`),c.push(`>
`),c.join("")}var K=i(()=>{"use strict";k()});var q={};b(q,{config:()=>Z,default:()=>w});H();H();var j="fragment",p=(r,n)=>({type:r,props:n}),U=p;function G(){return p(h,{children:"The Header"})}var Z={dynamic:!0};function w(){let r=new Date().toTimeString();return U(j,{children:[p(G,{}),p(d,{children:"Header 1"}),p(l,{children:"Header 2"}),p(u,{children:"Paragraph"}),U(l,{children:["Time ",p(s,{hex:"f00",children:r})]}),p(u,{children:p(f,{to:":/page/page_two.mu",children:"go to page two"})})]})}var nr=w??q,tr=async r=>{try{let{serialize:n}=(K(),z(J));H();let o=await r(process.env);process.stdout.write(n(o))}catch(n){process.stdout.write(`#Error
`),process.stdout.write(`Something went wrong.
`),process.stderr.write(n.stack+`
`),process.exit(1)}};tr(nr);
