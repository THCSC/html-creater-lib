interface ClipboardEvent {
	cut?: Callback;
	copy?: Callback;
	paste?: Callback;
}

interface DragEvent {
	drag?: Callback;
	dragend?: Callback;
	dragstart?: Callback;
	dragenter?: Callback;
	dragleave?: Callback;
	dragover?: Callback;
	drop?: Callback;
	scroll?: Callback;
}

interface MouseEvent {
	click?: Callback;
	dblclick?: Callback;
	mousedown?: Callback;
	mousemove?: Callback;
	mouseout?: Callback;
	mouseup?: Callback;
	mouseover?: Callback;
	wheel?: Callback;
}

interface KeyboardEvent {
	keydown?: Callback;
	keypress?: Callback;
	keyup?: Callback;
}

interface FormEvent {
	blur?: Callback;
	change?: Callback;
	contextmenu?: Callback;
	focus?: Callback;
	input?: Callback;
	invalid?: Callback;
	reset?: Callback;
	search?: Callback;
	select?: Callback;
	submit?: Callback;
}

interface WindowEvent {
	afterprint?: Callback;
	beforeprint?: Callback;
	beforeunload?: Callback;
	error?: Callback;
	hashchange?: Callback;
	load?: Callback;
	message?: Callback;
	offline?: Callback;
	online?: Callback;
	pagehide?: Callback;
	pageshow?: Callback;
	popstate?: Callback;
	resize?: Callback;
	storage?: Callback;
	unload?: Callback;
}

export interface Callback {
	[func: string]: string[];
}

export interface StyleProperty {
	[prop: string]: string;
}

export interface CssSelector {
	[selector: string]: StyleProperty;
}

interface Attribute {
	[attr: string]: string;
}

export interface HtmlElementProps {
	attributes?: Attribute | undefined,
	children?: HtmlElement[],
	classList?: string[],
	content?: string,
	eventlisteners?: ClipboardEvent | DragEvent | MouseEvent | KeyboardEvent | FormEvent | WindowEvent | undefined,
	id?: string,
	style?: StyleProperty | undefined;
}

export interface HtmlElement {
	element: HtmlElementProps;
	elementType: string;

	toHtml(): string;
}
