interface Attribute {
	[key: string]: string,
}

interface HtmlElementConstructor {
	new (elementType: string, element: {attributes?: Map<string, string>, children?: HtmlElement[], classList?: string[], id?: string, text?: string}): HtmlElement;
}

interface HtmlElement {
	elementType: string,
	attributes?: Map<string, string>,
	children?: HtmlElement[],
	classList?: string[],
	id?: string,
	text?: string,

	toHtml(): string;
}

class HtmlElementBuilder implements HtmlElement {
	elementType: string;
	attributes?: Map<string, string>;
	children?: HtmlElement[] | undefined;
	classList?: string[] | undefined;
	id?: string | undefined;
	text?: string | undefined;

	constructor(elementType: string, element: {attributes?: Map<string, string>, children?: HtmlElement[], classList?: string[], id?: string, text?: string}) {
		this.elementType = elementType;
		this.attributes = element.attributes;
		this.children = element.children;
		this.classList = element.classList;
		this.id = element.id;
		this.text = element.text;
	}

	toHtml(): string {
	    let res = `<${this.elementType}`;

		if (this.id) res += ` id="${this.id}"`;

		if (this.classList) {
			res += ' class="';
			for (let i = 0; i < this.classList.length; i++) {
				res += this.classList[i];
				res += i < this.classList.length - 1 ? " " : "";
			}
		}

		if (this.attributes) {
			for (let key of Array.from(this.attributes.keys())) {
				res += ` ${key}="${this.attributes.get(key)}"`
			}
		}

		res += ">";

		if (this.children) {
			for (let i = 0; i < this.children.length; i++) {
				res += "\n" + this.children[i].toHtml();
			}
		} else if (this.text) {
			res += `\n${this.text}`;
		}

		res += `\n</${this.elementType}>`

		return res;
	}
}

function div(element: {attributes?: Map<string, string>, children?: HtmlElement[], classList?: string[], id?: string, text?: string}): HtmlElement {
	return new HtmlElementBuilder("div", element);
}

function p(element: {attributes?: Map<string, string>, children?: HtmlElement[], classList?: string[], id?: string, text?: string}): HtmlElement {
	return new HtmlElementBuilder("p", element);
}

function a(element: {attributes?: Map<string, string>, children?: HtmlElement[], classList?: string[], id?: string, text?: string}): HtmlElement {
	return new HtmlElementBuilder("a", element);
}

let html = div({
	children: [
		a({
			id: "test-id",
			attributes: new Map([
				["href", "https://skancloud.dk/"],
			]),
			text: "This is a link",
		}),
		p({
			classList: [
				"paragraph",
				"small-para",
			],
			text: "This is a small paragraph",
		}),
		p({
			classList: [
				"paragraph",
				"small-para",
			],
			text: "This is another small paragraph",
		}),
	],
}).toHtml();

console.log(html);
