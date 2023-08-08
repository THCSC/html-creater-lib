import { Callback, HtmlElement, HtmlElementProps, CssSelector, StyleProperty } from "./types";

export function div(element: HtmlElementProps): HtmlElement {
	return new HtmlElementBuilder("div", element);
}

export function p(element: HtmlElementProps): HtmlElement {
	return new HtmlElementBuilder("p", element);
}

export function a(element: HtmlElementProps): HtmlElement {
	return new HtmlElementBuilder("a", element);
}

export function button(element: HtmlElementProps): HtmlElement {
	return new HtmlElementBuilder("button", element);
}

export function script(element: HtmlElementProps): HtmlElement {
	return new HtmlElementBuilder("script", element);
}

export function link(element: HtmlElementProps): HtmlElement {
	return new HtmlElementBuilder("link", element);
}

export function cssBuilder(selectors: CssSelector) {
	return new CssBuilder(selectors);
}

class HtmlElementBuilder implements HtmlElement {
	elementType: string;
	element: HtmlElementProps;

	constructor(elementType: string, element: HtmlElementProps) {
		this.elementType = elementType;
		this.element = element;
	}

	toHtml(): string {
	    let res = `<${this.elementType}`;

		if (this.element.id) res += ` id="${this.element.id}"`;

		if (this.element.classList) {
			res += ' class="';
			for (let i = 0; i < this.element.classList.length; i++) {
				res += this.element.classList[i];
				res += i < this.element.classList.length - 1 ? " " : "";
			}
			res += '"';
		}

		if (this.element.attributes) {
			let attribs = Object.entries(this.element.attributes);
			for (let i = 0; i < attribs.length; i++ ) {
				let attr = attribs[i];
				res += ` ${attr[0]}="${attr[1]}"`
			}
		}

		if (this.element.eventlisteners) {
			for (let key of Object.entries(this.element.eventlisteners)) {
				let callback = Object.entries(key[1] as Callback)[0];
				res += ` on${key[0]}="${callback[0]}(${callback[1]})"`
			}
		}

		if (this.element.style) {
			let props = Object.entries(this.element.style);

			res += ' style="'
			for (let i = 0; i < props.length; i++ ) {
				let prop = props[i];
				res += `${prop[0]}: ${prop[1]};`
				res += i < props.length - 1 ? " " : "";
			}
			res += '"';
		}

		res += ">";

		if (this.element.children) {
			for (let i = 0; i < this.element.children.length; i++) {
				res += "\n" + this.element.children[i].toHtml();
			}
		} else if (this.element.content) {
			res += `\n${this.element.content}`;
		}

		res += `\n</${this.elementType}>`

		return res;
	}
}

class CssBuilder {
	selectors: CssSelector;

	constructor(selectors: CssSelector) {
		this.selectors = selectors;
	}

	toCss(): string {
		let res = "";

		const entries = Object.entries(this.selectors);

		for (let i = 0; i < entries.length; i++) {
			const current = entries[i];

			res += `\n${current[0]} {\n`

			let props = Object.entries(current[1]);

			for (let j = 0; j < props.length; j++ ) {
				let prop = props[j];
				res += `${prop[0]}: ${prop[1]};`
				res += j < props.length - 1 ? "\n" : "\n}\n";
			}
		}

		return res;
	}
}
