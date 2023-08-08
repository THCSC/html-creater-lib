import { HtmlElement, HtmlElementProps, CssSelector } from "./types";
export declare function div(element: HtmlElementProps): HtmlElement;
export declare function p(element: HtmlElementProps): HtmlElement;
export declare function a(element: HtmlElementProps): HtmlElement;
export declare function button(element: HtmlElementProps): HtmlElement;
export declare function script(element: HtmlElementProps): HtmlElement;
export declare function link(element: HtmlElementProps): HtmlElement;
export declare function cssBuilder(selectors: CssSelector): CssBuilder;
declare class CssBuilder {
    selectors: CssSelector;
    constructor(selectors: CssSelector);
    toCss(): string;
}
export {};
//# sourceMappingURL=elements.d.ts.map