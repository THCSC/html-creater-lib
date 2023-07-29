import { HtmlElement, HtmlElementProps, HtmlElementBuilder } from "./types";

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

