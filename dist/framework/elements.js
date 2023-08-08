export function div(element) {
    return new HtmlElementBuilder("div", element);
}
export function p(element) {
    return new HtmlElementBuilder("p", element);
}
export function a(element) {
    return new HtmlElementBuilder("a", element);
}
export function button(element) {
    return new HtmlElementBuilder("button", element);
}
export function script(element) {
    return new HtmlElementBuilder("script", element);
}
class HtmlElementBuilder {
    elementType;
    element;
    constructor(elementType, element) {
        this.elementType = elementType;
        this.element = element;
    }
    toHtml() {
        let res = `<${this.elementType}`;
        if (this.element.id)
            res += ` id="${this.element.id}"`;
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
            for (let i = 0; i < attribs.length; i++) {
                let attr = attribs[i];
                res += ` ${attr[0]}="${attr[1]}"`;
            }
        }
        if (this.element.eventlisteners) {
            for (let key of Object.entries(this.element.eventlisteners)) {
                let callback = Object.entries(key[1])[0];
                res += ` on${key[0]}="${callback[0]}(${callback[1]})"`;
            }
        }
        if (this.element.style) {
            let props = Object.entries(this.element.style);
            res += ' style="';
            for (let i = 0; i < props.length; i++) {
                let prop = props[i];
                res += `${prop[0]}: ${prop[1]};`;
                res += i < props.length - 1 ? " " : "";
            }
            res += '"';
        }
        res += ">";
        if (this.element.children) {
            for (let i = 0; i < this.element.children.length; i++) {
                res += "\n" + this.element.children[i].toHtml();
            }
        }
        else if (this.element.content) {
            res += `\n${this.element.content}`;
        }
        res += `\n</${this.elementType}>`;
        return res;
    }
}
