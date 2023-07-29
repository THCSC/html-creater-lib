import { div, p, a, button, script } from "./elements";
import * as http from "node:http";

let html = div({
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
});


http.createServer(async (req, res) => {
	console.log("Request recieved for path: " + req.url);
	let file = html.toHtml();

	res.writeHead(200, {"Content-Type": "text/html"});
	
	res.write(file);
	res.end();
}).listen(8080);

console.log("Server running at http://127.0.0.1:8080/")
