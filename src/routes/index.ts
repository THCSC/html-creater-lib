import { div, p, a, button, script } from "../elements";

function html() {
	return div({
		children: [
			a({
				id: "test-id",
				attributes: {
					"href": "https://skancloud.dk/",
					"data-test": "test",
				},
				content: "This is a link",
			}),
			button({
				eventlisteners: {
					change: {
						"change": []
					},
					load: {
						"function": [ "param", "param2" ]
					},
				},
				style: {
					"display": "flex",
					"width": "200px",
				}
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
			script({
				attributes: {
					"src": "index.js",
				},
			})
		],
	}).toHtml();
}
