import { div, p, a, button } from "./elements";

let html = div({
	children: [
		a({
			id: "test-id",
			attributes: new Map([
				["href", "https://skancloud.dk/"],
			]),
			text: "This is a link",
		}),
		button({
			eventlisteners: [{
				click: {
					"function": [ "params" ]
				}
			}]
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
