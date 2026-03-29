import { getMicronType } from "@reacticulum/types";
import { ReactElement, ReactNode } from "react";

function escapeMarkdown(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\*/g, "\\*")
    .replace(/_/g, "\\_")
    .replace(/>/g, "\\>")
    .replace(/\|/g, "\\|")
    .replace(/-/g, "\\-");
}

export function serialize(node: ReactNode): string {
  if (node === null || node === undefined) return "";

  if (typeof node === "string" || typeof node === "number") {
    return escapeMarkdown(String(node));
  }

  if (typeof node === "boolean") return "";

  if (Array.isArray(node)) {
    return node.map(serialize).join("");
  }

  const el = node as ReactElement<any>;

  const { type, props } = el;

  // Fragment
  if (type === 'fragment') {
    return serialize(props.children);
  }

  const micronType = getMicronType(type);

  let outPut = "";

  // Add algnment if specified. We will use the same syntax for alignment across all components, so that we can easily apply alignment to any component in the future if needed.
  if (props.align) {
    switch (props.align) {
      case "left":
        outPut += `\`l`;
        break;
      case "center":
        outPut += `\`c`;
        break;
      case "right":
        outPut += `\`r`;
        break;
    }
  }

  if (props.backgroundColor) {
    outPut += `\`B${props.backgroundColor.replace("#", "")}`;
  }
  if (props.color) {
    outPut += `\`F${props.color.replace("#", "")}`;
  }
  if (props.bold) {
    outPut += `\`!`;
  }
  if (props.italic) {
    outPut += `\`*`;
  }
  if (props.underline) {
    outPut += `\`_`;
  }

  if (micronType) {
    switch (micronType) {
      case "align":
        return outPut;
      case "h1":
        return (outPut += `>${serialize(props.children)} ${props.backgroundColor ? `\`b` : ""} ${props.color ? `\`f` : ""}\n`);
      case "h2":
        return (outPut += `>>${serialize(props.children)} ${props.backgroundColor ? `\`b` : ""} ${props.color ? `\`f` : ""}\n`);
      case "h3":
        return (outPut += `>>>${serialize(props.children)} ${props.backgroundColor ? `\`b` : ""} ${props.color ? `\`f` : ""}\n`);
      case "bold":
        return (outPut += `\`!${serialize(props.children)}\`! ${props.backgroundColor ? `\`b` : ""} ${props.color ? `\`f` : ""}`);
      case "italic":
        return (outPut += `\`*${serialize(props.children)}\`* ${props.backgroundColor ? `\`b` : ""} ${props.color ? `\`f` : ""}`);
      case "underline":
        return (outPut += `\`_${serialize(props.children)}\`_ ${props.backgroundColor ? `\`b` : ""} ${props.color ? `\`f` : ""}`);
      case "divider":
        return (outPut += `-${props.symbol} ${props.backgroundColor ? `\`b` : ""} ${props.color ? `\`f` : ""}\n`);
      case "link":
        return (outPut += `\`[${serialize(props.children)}\`${props.to}]\` ${props.backgroundColor ? `\`b` : ""} ${props.color ? `\`f` : ""}`);
      case "input":
        return renderInput(props);
      case "color":
        return (outPut += `\`F${props.hex}${serialize(props.children)}\`f`);
      case "paragraph":
        return (outPut += `${serialize(props.children)} ${props.backgroundColor ? `\`b` : ""} ${props.color ? `\`f` : ""}\n`);
      case "radio":
        return (outPut += `\`<^|${props.group}|${props.value}${props.checked ? "|*" : ""}\`>${props.label ? props.label : ""} ${props.backgroundColor ? `\`b` : ""} ${props.color ? `\`f` : ""}\n`);
    }
  }

  // handle native elements.
  switch (type) {
    case "h1":
      return `#${serialize(props.children)} ${props.backgroundColor ? `\`b` : ""} ${props.color ? `\`f` : ""} \n`;
    case "h2":
      return `##${serialize(props.children)} ${props.backgroundColor ? `\`b` : ""} ${props.color ? `\`f` : ""}\n`;
    case "h3":
      return `###${serialize(props.children)} ${props.backgroundColor ? `\`b` : ""} ${props.color ? `\`f` : ""}\n`;
    case "b":
      return `\`!${serialize(props.children)}\`! ${props.backgroundColor ? `\`b` : ""} ${props.color ? `\`f` : ""}`;
    case "i":
      return `\`*${serialize(props.children)}\`* ${props.backgroundColor ? `\`b` : ""} ${props.color ? `\`f` : ""}`;
    case "u":
      return `\`_${serialize(props.children)}\`_ ${props.backgroundColor ? `\`b` : ""} ${props.color ? `\`f` : ""}`;
    case "hr":
      return `---\n`;
    case "a":
      return `>[${serialize(props.children)}:${props.href}] ${props.backgroundColor ? `\`b` : ""} ${props.color ? `\`f` : ""}`;
    // case 'input': return renderInput(props);
    case "p":
      return `${serialize(props.children)} ${props.backgroundColor ? `\`b` : ""} ${props.color ? `\`f` : ""}\n\n`;
    case "br":
      return `\n`;
    case "radio":
      return `\`<^${props.group}|${props.value}${props.checked ? "|*" : ""}\`>${props.label ? props.label : ""} ${props.backgroundColor ? `\`b` : ""} ${props.color ? `\`f` : ""}\n`;
  }

  // unknown component.
  if (typeof type === "function") {
    // class component
    if (!!type.prototype?.isReactComponent) {
      const instance = new (type as any)(props);
      return serialize(instance.render());
    }


    // try to render functional component.
    return serialize((type as any)(props));

  }

  return serialize(props.children);
}

function renderInput(props: {
  name: string;
  placeholder?: string;
  width?: number;
  backgroundColor?: string;
  passWord?: boolean;
  texColor?: string;
}) {
  let { name, placeholder, width, backgroundColor, passWord } = props;

  if (width === undefined) width = 24;

  const content: string[] = [];
  //Set text color, default to #fff if not provided. We assume the terminal background is dark, so we use white as the default text color.
  content.push(
    `\`F${props.texColor ? props.texColor.replace("#", "") : "fff"}`,
  );

  // Set background color, default to #333 if not provided. We assume the terminal background is dark, so we use a dark gray as the default input background.
  content.push(
    `\`B${backgroundColor ? backgroundColor.replace("#", "") : "333"}`,
  );

  content.push(`\`<${passWord ? "!" : ""}${width}|${name}\``);

  if (placeholder) {
    content.push(`${placeholder}`);
  }

  content.push(">`b`f\n");

  return content.join("");
}
