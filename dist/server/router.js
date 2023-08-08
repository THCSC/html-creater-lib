import * as fs from "node:fs";
import * as path from "node:path";
import * as vm from "node:vm";
import { div, p, a, button, script, cssBuilder, link } from "framework";
const MIME_TYPES = {
    default: "application/octet-stream",
    html: "text/html; charset=UTF-8",
    js: "application/javascript",
    css: "text/css",
    png: "image/png",
    jpg: "image/jpg",
    gif: "image/gif",
    ico: "image/x-icon",
    svg: "image/svg+xml",
};
class Router {
    baseRoute;
    constructor(baseRoute) {
        this.baseRoute = baseRoute;
    }
    static setup(baseRoute) {
        baseRoute = path.join(process.cwd(), baseRoute);
        readFilesInDir(baseRoute, (name, filePath, content) => {
            console.log("reading file: " + name);
            const vmFunctions = createVmContent(content);
            const context = vm.createContext({ div, p, a, button, script, link, cssBuilder });
            for (let i = 0; i < vmFunctions.length; i++) {
                let vmScript = getVmFunctionString(vmFunctions[i]);
                if (vmScript.runnable) {
                    vmScript.script = vm.runInContext(vmScript.script, context, { filename: name });
                }
                name = name.replace(name.substring(name.indexOf(".")), `.${vmFunctions[i].name}`);
                const newFile = path.join(filePath, name);
                try {
                    const fd = fs.openSync(newFile, 'w+');
                    fs.writeFileSync(fd, vmScript.script, { flag: "w+" });
                }
                catch (e) {
                    console.log(e);
                }
            }
        });
        return new Router(baseRoute);
    }
    async getFileContent(_path) {
        if (_path == "/")
            _path += "index.html";
        if (_path.indexOf(".") == -1)
            _path += ".html";
        try {
            const lookupPath = path.join(this.baseRoute, _path);
            const pathTraversal = !lookupPath.startsWith(this.baseRoute);
            const exists = await fs.promises.access(lookupPath).then(() => true, () => false);
            const found = !pathTraversal && exists;
            const streamPath = found ? lookupPath : path.join(this.baseRoute, "404.html");
            const ext = path.extname(streamPath).substring(1).toLowerCase();
            const fileBuffer = await fs.promises.readFile(streamPath);
            const mimeType = MIME_TYPES[ext] || MIME_TYPES.default;
            const status = (found ? 200 : 404);
            let content = fileBuffer.toString();
            return { status, mimeType, content };
        }
        catch (err) {
            console.log(err);
            return { status: 500, mimeType: MIME_TYPES.default, content: "Error occurred!" };
        }
    }
}
function readFilesInDir(dirPath, callback) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            readFilesInDir(filePath, callback);
        }
        else {
            const ext = path.extname(file);
            if (ext != ".ts" && ext != ".js")
                continue;
            const content = fs.readFileSync(filePath).toString();
            callback(path.basename(filePath), dirPath, content);
        }
    }
}
class Lexer {
    content;
    index;
    currentChar;
    constructor(content) {
        this.content = content;
        this.index = 0;
        this.currentChar = content.charAt(this.index);
    }
    getCurrentChar() {
        return this.currentChar;
    }
    advance() {
        this.index += 1;
        this.currentChar = this.content.charAt(this.index);
    }
    skipWhitespace() {
        console.log("skipWhitespace");
        while ((this.currentChar == ' ' || this.currentChar == "\n") && !this.endOfFile()) {
            this.advance();
        }
    }
    skipExpression() {
        console.log("skipExpression");
        while (this.currentChar != ";" && this.currentChar != "\n") {
            this.advance();
        }
        this.advance();
    }
    skipMultiLineComment() {
        this.advance();
        this.advance();
        while (this.currentChar != "*" && this.peek() != "/") {
            this.advance();
        }
        this.advance();
        this.advance();
    }
    skipSingleLineComment() {
        throw new Error("Method not implemented.");
    }
    endOfFile() {
        return this.index >= this.content.length;
    }
    readBlock() {
        console.log("readBlock");
        let block = this.currentChar;
        this.advance();
        while (this.currentChar != "}") {
            if (this.currentChar == "{") {
                block += this.readBlock();
            }
            else {
                block += this.currentChar;
                this.advance();
            }
        }
        block += this.currentChar;
        this.advance();
        return block;
    }
    readIdent() {
        console.log("readIdent");
        let res = "";
        while (this.currentCharIsAlphanumeric()) {
            res += this.currentChar;
            this.advance();
        }
        return res;
    }
    currentCharIsAlphanumeric() {
        var code, i, len;
        for (i = 0, len = this.currentChar.length; i < len; i++) {
            code = this.currentChar.charCodeAt(i);
            if (!(code > 47 && code < 58) && // numeric (0-9)
                !(code > 64 && code < 91) && // upper alpha (A-Z)
                !(code > 96 && code < 123)) { // lower alpha (a-z)
                return false;
            }
        }
        return true;
    }
    readFunctionDecl() {
        console.log("readFunctionDecl");
        let res = { name: "", content: "", };
        this.skipWhitespace();
        res.name = this.readIdent();
        console.log("Func name: " + res.name);
        this.skipWhitespace();
        while (this.currentChar != "{") {
            this.advance();
        }
        res.content = this.readBlock();
        return res;
    }
    peek() {
        return this.content.charAt(this.index + 1);
    }
}
function createVmContent(content) {
    console.log("creating vm content");
    const lexer = new Lexer(content);
    let res = [];
    while (!lexer.endOfFile()) {
        console.log("Current char: '" + lexer.getCurrentChar() + "'");
        lexer.skipWhitespace();
        if (charIsAlpha(lexer.getCurrentChar())) {
            console.log("char is alpha");
            const identifier = lexer.readIdent();
            console.log(identifier);
            switch (identifier) {
                case "const":
                case "let":
                case "var":
                case "function":
                    res.push(lexer.readFunctionDecl());
                    break;
                case "import":
                    lexer.skipExpression();
                    break;
                default:
                    break;
            }
        }
        switch (lexer.getCurrentChar()) {
            case "/":
                if (lexer.peek() == "/")
                    lexer.skipSingleLineComment();
                if (lexer.peek() == "*")
                    lexer.skipMultiLineComment();
                break;
        }
    }
    return res;
}
export default Router;
function charIsAlpha(char) {
    return char.toLowerCase() != char.toUpperCase();
}
function getVmFunctionString(item) {
    let res = { script: "", runnable: false };
    switch (item.name) {
        case "html":
        case "css":
            res.script = `function ${item.name}() ${item.content}\n${item.name}()`;
            res.runnable = true;
            break;
        case "js":
            res.script = `${item.content}`;
            res.runnable = false;
            break;
    }
    return res;
}
