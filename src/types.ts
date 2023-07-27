interface EventListener<Type> {
	[Property in keyof Type]: Callback;
}

enum EventName { 
	click = "click",
	submit = "submit",
};
interface Callback {
	[func: string]: string[];
}

export interface HtmlElementProps {
	attributes?: Map<string, string>,
	children?: HtmlElement[],
	classList?: string[],
	eventlisteners?: EventListener[],
	id?: string,
	text?: string,
}

export interface HtmlElement {
	element: HtmlElementProps;
	elementType: string;

	toHtml(): string;
}

export class HtmlElementBuilder implements HtmlElement {
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
		}

		if (this.element.attributes) {
			for (let key of Array.from(this.element.attributes.keys())) {
				res += ` ${key}="${this.element.attributes.get(key)}"`
			}
		}

		if (this.element.eventlisteners) {
			for (let i = 0; i < this.element.eventlisteners.length; i++) {
				res += ` ${this.element.eventlisteners[i]}`
			}
		}

		res += ">";

		if (this.element.children) {
			for (let i = 0; i < this.element.children.length; i++) {
				res += "\n" + this.element.children[i].toHtml();
			}
		} else if (this.element.text) {
			res += `\n${this.element.text}`;
		}

		res += `\n</${this.elementType}>`

		return res;
	}
}
