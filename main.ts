interface HtmlElementConstructor {
	new (elementType: string, attributes?: Map<string, string>, children?: HtmlElement[], childrenCount?: Number, classList?: string[], id?: string): HtmlElement;
}

interface HtmlElement {
	elementType: string,
	attributes?: Map<string, string>,
	children?: HtmlElement[],
	childrenCount?: Number,
	classList?: string[],
	id?: string
}

class HtmlElementBuilder implements HtmlElement {
	constructor(elementType: string, attributes?: Map<string, string>, children?: HtmlElement[], childrenCount?: Number, classList?: string[], id?: string) {
		this.elementType = elementType;
		this.attributes = attributes;
		this.children = children;
		this.childrenCount = childrenCount;
		this.classList = classList;
		this.id = id;
	}

    elementType: string;
    attributes?: Map<string, string> | undefined;
    children?: HtmlElement[] | undefined;
    childrenCount?: Number | undefined;
    classList?: string[] | undefined;
    id?: string | undefined;
}

function div(element: {attributes?: Map<string, string>, children?: HtmlElement[], childrenCount?: Number, classList?: string[], id?: string}): HtmlElement {
	return new HtmlElementBuilder("div", element.attributes, element.children, element.childrenCount, element.classList, element.id);
}

function p(element: {attributes?: Map<string, string>, children?: HtmlElement[], childrenCount?: Number, classList?: string[], id?: string}): HtmlElement {
	return new HtmlElementBuilder("p", element.attributes, element.children, element.childrenCount, element.classList, element.id);
}

let html = div({
	children: [
		p({}),
		p({}),
	],
})
