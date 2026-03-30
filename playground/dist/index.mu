#!/usr/bin/env node

process.on('uncaughtException', (e) => {
  process.stdout.write('Error\n')
  process.stdout.write('Something went wrong.\n')
  process.stderr.write(e.stack + '\n')
  process.exit(1)
})
process.on('unhandledRejection', (e) => {
  process.stdout.write('Error\n')
  process.stdout.write('Something went wrong.\n')
  process.stderr.write(String(e) + '\n')
  process.exit(1)
})

var P=Object.defineProperty;var O=Object.getOwnPropertyDescriptor;var Q=Object.getOwnPropertyNames;var V=Object.prototype.hasOwnProperty;var i=(r,n)=>()=>(r&&(n=r(r=0)),n);var b=(r,n)=>{for(var o in n)P(r,o,{get:n[o],enumerable:!0})},X=(r,n,o,e)=>{if(n&&typeof n=="object"||typeof n=="function")for(let c of Q(n))!V.call(r,c)&&c!==o&&P(r,c,{get:()=>n[c],enumerable:!(e=O(n,c))||e.enumerable});return r};var q=r=>X(P({},"__esModule",{value:!0}),r);var z,a,A,k=i(()=>{z=new WeakMap,a=(r,n)=>{z.set(r,n)},A=r=>typeof r!="function"?null:z.get(r)??null});function f({children:r}){return null}var H=i(()=>{"use strict"});function s({hex:r,children:n}){return null}var v=i(()=>{"use strict"});function m({symbol:r}){return null}var I=i(()=>{"use strict"});function d({children:r}){return null}var T=i(()=>{"use strict"});function l({children:r}){return null}var C=i(()=>{"use strict"});function g({children:r}){return null}var N=i(()=>{"use strict"});function x({name:r,placeholder:n,width:o=24}){return null}var _=i(()=>{"use strict"});function y({children:r}){return null}var M=i(()=>{"use strict"});function h({to:r,children:n}){return null}var L=i(()=>{"use strict"});function u({children:r}){return null}var D=i(()=>{"use strict"});function $({children:r}){return null}var E=i(()=>{"use strict"});function R({group:r,value:n,checked:o}){return null}var B=i(()=>{"use strict"});var F={};b(F,{Bold:()=>f,Color:()=>s,Divider:()=>m,H1:()=>d,H2:()=>l,H3:()=>g,Input:()=>x,Italic:()=>y,Link:()=>h,Paragraph:()=>u,Radio:()=>R,Underline:()=>$});var S=i(()=>{"use strict";k();H();v();I();T();C();N();_();M();L();D();E();B();H();v();I();T();C();N();_();M();L();D();E();B();a(f,"bold");a($,"underline");a(h,"link");a(x,"input");a(m,"divider");a(d,"h1");a(l,"h2");a(g,"h3");a(y,"italic");a(s,"color");a(u,"paragraph");a(R,"radio")});var G={};b(G,{serialize:()=>t});function Z(r){return r.replace(/\\/g,"\\\\").replace(/`/g,"\\`").replace(/\*/g,"\\*").replace(/_/g,"\\_").replace(/>/g,"\\>").replace(/\|/g,"\\|").replace(/-/g,"\\-")}function t(r){if(r==null)return"";if(typeof r=="string"||typeof r=="number")return Z(String(r));if(typeof r=="boolean")return"";if(Array.isArray(r))return r.map(t).join("");let n=r,{type:o,props:e}=n;if(o==="fragment")return t(e.children);let c=A(o);if(c)switch(c){case"h1":return`>${t(e.children)}
`;case"h2":return`>>${t(e.children)}
`;case"h3":return`>>>${t(e.children)}
`;case"bold":return`\`!${t(e.children)}\`!`;case"italic":return`\`*${t(e.children)}\`*`;case"underline":return`\`_${t(e.children)}\`_`;case"divider":return`-${e.symbol}
`;case"link":return`\`[${t(e.children)}\`${e.to}]\``;case"input":return rr(e);case"color":return`\`F${e.hex}${t(e.children)}\`f`;case"paragraph":return`${t(e.children)}
`;case"radio":return`\`<^${e.group}|${e.value}${e.checked?"|*":""}>\`${e.label?e.label:""}\`
`}switch(o){case"h1":return`#${t(e.children)}
`;case"h2":return`##${t(e.children)}
`;case"h3":return`###${t(e.children)}
`;case"b":return`\`!${t(e.children)}\`!`;case"i":return`\`*${t(e.children)}\`*`;case"u":return`\`_${t(e.children)}\`_`;case"hr":return`---
`;case"a":return`>[${t(e.children)}:${e.href}]`;case"p":return`${t(e.children)}

`;case"br":return`
`;case"radio":return`\`<^${e.group}|${e.value}${e.checked?"|*":""}>\`${e.label?e.label:""}\`
`}if(typeof o=="function"){if(o.prototype?.isReactComponent){let K=new o(e);return t(K.render())}return t(o(e))}return t(e.children)}function rr(r){let{name:n,placeholder:o,width:e}=r;e===void 0&&(e=24);let c=[];return c.push(`\`<${e}|${n}\``),o&&c.push(`|${o}`),c.push(`>
`),c.join("")}var J=i(()=>{"use strict";k()});var j={};b(j,{config:()=>Y,default:()=>w});S();var W="fragment",p=(r,n)=>({type:r,props:n}),U=p;var Y={dynamic:!0};function w(){let r=new Date().toTimeString();return U(W,{children:[p(d,{children:"Header 1"}),p(l,{children:"Header 2"}),p(u,{children:"Paragraph"}),U(l,{children:["Time ",p(s,{hex:"f00",children:r})]}),p(u,{children:p(h,{to:":/page/page_two.mu",children:"go to page two"})})]})}var er=w??j,nr=async r=>{try{let{serialize:n}=(J(),q(G));S();let o=await r(process.env);process.stdout.write(n(o))}catch(n){process.stdout.write(`#Error
`),process.stdout.write(`Something went wrong.
`),process.stderr.write(n.stack+`
`),process.exit(1)}};nr(er);
