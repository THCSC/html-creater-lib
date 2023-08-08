import { div, p, a, button, script, cssBuilder, link } from "framework";

function html() {
	return div({
		children: [
			link({
				attributes: {
					"rel": "stylesheet",
					"href": "index.css",
				},
			}),
			a({
				id: "test-id",
				attributes: {
					"href": "./folder/test",
					"data-test": "test",
				},
				content: "This is a link",
			}),
			p({
				classList: [
					"paragraph",
					"small-para",
				],
				content: "This is a small paragraph",
			}),
			p({
				classList: [
					"paragraph",
					"small-para",
				],
				content: "This is another small paragraph",
			}),
			button({
				eventlisteners: {
					click: {
						"btnClicked": []
					},
				},
				style: {
					"display": "flex",
					"width": "200px",
				},
				content: "Click me!",
			}),
			script({
				attributes: {
					"src": "index.js",
				},
			})
		],
		style: {
			"display": "flex",
			"gap": "20px",
			"flex-direction": "column",
		}
	}).toHtml();
}

function js() {
	let clicks = 0;
	function btnClicked() {
		clicks += 1;
		console.log("Button clicks: " + clicks);
	}
}

function css() {
	return cssBuilder({
		".paragraph": {
			"color": "red",
			"margin": "0",
		}
	}).toCss();
}
