const single = {
    javascript: ["// ", ""],
    python: ["# ", ""],
    java: ["// ", ""],
    c: ["// ", ""],
    cpp: ["// ", ""],
    csharp: ["// ", ""],
    php: ["// ", ""],
    ruby: ["# ", ""],
    json: ["// ", ""],
    xml: ["<!-- ", " -->"],
    css: ["/* ", " */"],
    arduino: ["// ", ""],
    vbnet: ["' ", ""],
    swift: ["// ", ""],
    kotlin: ["// ", ""],
    go: ["// ", ""],
    rust: ["// ", ""],
    scala: ["// ", ""],
    haskell: ["-- ", ""],
    bash: ["// ", ""],
    shell: ["// ", ""],
    powershell: ["// ", ""],
    ocaml: ["(* ", " *)"],
    haxe: ["// ", ""],
    lua: ["-- ", ""],
    typescript: ["// ", ""],
    perl: ["# ", ""],
    groovy: ["// ", ""],
    julia: ["// ", ""],
    coffeescript: ["// ", ""],
    fsharp: ["// ", ""],
    pascal: ["// ", ""],
    prolog: ["% ", ""],
    lisp: ["; ", ""],
    erlang: ["% ", ""],
    elixir: ["// ", ""],
    elm: ["// ", ""],
    apl: ["! ", ""],
    scheme: ["; ", ""],
    matlab: ["% ", ""],
    verilog: ["// ", ""],
    dart: ["// ", ""],
};
const multi = {
    javascript: ["/* ", " */"],
    python: ['""" ', ' """'],
    java: ["/* ", " */"],
    c: ["/* ", " */"],
    cpp: ["/* ", " */"],
    csharp: ["/* ", " */"],
    php: ["/* ", " */"],
    json: ["/* ", " */"],
    xml: ["<!-- ", " -->"],
    css: ["/* ", " */"],
    arduino: ["/* ", " */"],
    swift: ["/* ", " */"],
    kotlin: ["/* ", " */"],
    go: ["/* ", " */"],
    rust: ["/* ", " */"],
    scala: ["/* ", " */"],
    haskell: ["{- ", " -}"],
    ocaml: ["(* ", " *)"],
    lua: ["--[[ ", " --]]"],
    typescript: ["/* ", " */"],
    perl: ["\n=begin", "\n=end"],
    coffeescript: ["/* ", " */"],
};
function getScrollBarWidth() {
    var inner = document.createElement("p");
    inner.style.width = "100%";
    inner.style.height = "200px";
    var outer = document.createElement("div");
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild(inner);
    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = "scroll";
    var w2 = inner.offsetWidth;
    if (w1 == w2) w2 = outer.clientWidth;
    document.body.removeChild(outer);
    return w1 - w2;
}
function convertPercentageToPixelsw(element, percentage) {
    var parentElement = element.parentElement;
    var parentWidth = parentElement.clientWidth;
    var pixelValue = (percentage / 100) * parentWidth;
    return pixelValue;
}
function convertPercentageToPixels(element, percentage) {
    var parentElement = element.parentElement;
    var parentHeight = parentElement.clientHeight;
    var pixelValue = (percentage / 100) * parentHeight;
    return pixelValue;
}
export function coderInit(hljs) {
    document.addEventListener("DOMContentLoaded", () => {
        let edits = document.getElementsByTagName("coder");
        for (let index = 0; index < edits.length; index++) {
            const edit = edits[index];
            edit.classList.add("coder-editor");
            if (edit.getAttribute("lines") != null) {
                if (edit.getAttribute("lines").toLocaleLowerCase() == "nostyle") {edit.innerHTML = `<div class="coder-lines hljs"></div><textarea name="codeEditor" class="coder-tea" spellcheck="false" wrap="hard">${edit.innerHTML}</textarea><div class="coder-display hljs">`;console.log("ee");}
                else {edit.innerHTML = `<div class="coder-lines hljs hljs-comment"></div><textarea name="codeEditor" class="coder-tea" spellcheck="false" wrap="hard">${edit.innerHTML}</textarea><div class="coder-display hljs">`;}
            } else {
                edit.innerHTML = `<textarea name="codeEditor" class="coder-tea" spellcheck="false" wrap="hard">${edit.innerHTML}</textarea><div class="coder-display hljs">`;
            }
            edit.outerHTML = edit.outerHTML.replace("coder", "div");
        }
        edits = document.getElementsByClassName("coder-editor");
        for (let index = 0; index < edits.length; index++) {
            const edit = edits[index];
            const editor2 = edit.getElementsByClassName("coder-tea")[0];
            const display = edit.getElementsByClassName("coder-display")[0];
            const linesdiv = edit.getElementsByClassName("coder-lines")[0];
            const lang = edit.getAttribute("lang");
            let undoStack = [];
            let redoStack = [];
            const savevs = () => {
                let value = editor2.value;
                let selectionStart = editor2.selectionStart;
                let selectionEnd = editor2.selectionEnd;
                undoStack.push({ value, selectionStart, selectionEnd });
                redoStack = [];
            };
            const undo = (textarea) => {
                if (undoStack.length > 0) {
                    redoStack.push(undoStack.pop());
                    const lastState = undoStack[undoStack.length - 1] || { value: "", selectionStart: 0, selectionEnd: 0 };
                    textarea.value = lastState.value;
                    textarea.selectionStart = lastState.selectionStart;
                    textarea.selectionEnd = lastState.selectionEnd;
                    re();
                }
            };
            const redo = (textarea) => {
                if (redoStack.length > 0) {
                    const nextState = redoStack.pop();
                    undoStack.push(nextState);
                    textarea.value = nextState.value;
                    textarea.selectionStart = nextState.selectionStart;
                    textarea.selectionEnd = nextState.selectionEnd;
                    re();
                }
            };
            const tablength = " ".repeat(
                Number(edit.getAttribute("tab-length") ? edit.getAttribute("tab-length") : 4)
            );
            const re = () => {
                let ccon = hljs
                    .highlight(editor2.value, { language: lang })
                    .value.replaceAll("\n", "<br>");
                let cconl = ccon.split("<br>");
                let linescon = "";
                for (let i = 0; i < cconl.length; i++) {
                    const line = cconl[i];
                    const start = line.replace(line.trimStart(), "");
                    cconl[i] =
                        start.replaceAll(
                            tablength,
                            '<span class="hljs-tab">' + tablength + "</span>"
                        ) + line.trimStart(); //"<span class=\"hljs-tab\">"+tablength+"</span>"
                }
                display.innerHTML = cconl.join("<br>");
                if (linesdiv) {
                    for (let indx = 0; indx < cconl.length; indx++) {
                        linescon += (indx + 1).toString() + "<br>";
                    }
                    linesdiv.innerHTML = linescon;
                }
            };
            re();
            editor2.addEventListener("input", () => {
                savevs();
                re();
            });
            display.style.fontWeight = window.getComputedStyle(editor2).fontWeight;
            display.style.fontSize = window.getComputedStyle(editor2).fontSize;
            display.style.height =
                (convertPercentageToPixels(display, 100) - getScrollBarWidth()).toString() +
                "px";
            display.style.width = (convertPercentageToPixelsw(display, 100) - getScrollBarWidth()).toString() + "px";
            let oldsize;
            if (linesdiv) {
                linesdiv.style.fontWeight = window.getComputedStyle(editor2).fontWeight;
                linesdiv.style.fontSize = window.getComputedStyle(editor2).fontSize;
                linesdiv.style.height = (convertPercentageToPixels(linesdiv, 100) - getScrollBarWidth()).toString() + "px";
                editor2.style.marginLeft = (Number(editor2.style.marginLeft.slice(0, -2)) + Number(window.getComputedStyle(linesdiv).width.slice(0, -2))).toString() + "px";
                display.style.marginLeft = (Number(display.style.marginLeft.slice(0, -2)) + Number(window.getComputedStyle(linesdiv).width.slice(0, -2))).toString() + "px";
                oldsize = Number(window.getComputedStyle(linesdiv).width.slice(0, -2));
            }
            window.addEventListener("resize", () => {
                display.style.fontWeight = window.getComputedStyle(editor2).fontWeight;
                display.style.fontSize = window.getComputedStyle(editor2).fontSize;
                display.style.height = (convertPercentageToPixels(display, 100) - getScrollBarWidth()).toString() + "px";
                display.style.width = (convertPercentageToPixelsw(display, 100) - getScrollBarWidth()).toString() + "px";
                if (linesdiv) {
                    linesdiv.style.fontWeight = window.getComputedStyle(editor2).fontWeight;
                    linesdiv.style.fontSize = window.getComputedStyle(editor2).fontSize;
                    linesdiv.style.height = (convertPercentageToPixels(linesdiv, 100) - getScrollBarWidth()).toString() + "px";
                    editor2.style.marginLeft = (Number(editor2.style.marginLeft.slice(0, -2)) - oldsize + Number(window.getComputedStyle(linesdiv).width.slice(0, -2))).toString() + "px";
                    display.style.marginLeft = (Number(display.style.marginLeft.slice(0, -2)) - oldsize + Number(window.getComputedStyle(linesdiv).width.slice(0, -2))).toString() + "px";
                    oldsize = Number(window.getComputedStyle(linesdiv).width.slice(0, -2));
                }
            });
            editor2.addEventListener("scroll", () => {
                display.scrollTop = editor2.scrollTop;
                display.scrollLeft = editor2.scrollLeft;
                if (linesdiv) {
                    linesdiv.scrollTop = editor2.scrollTop;
                    linesdiv.scrollLeft = editor2.scrollLeft;
                }
            });
            document.addEventListener("keydown", function (event) {
                let textarea = editor2;
                let start = textarea.selectionStart;
                let end = textarea.selectionEnd;
                let textBefore = textarea.value.substring(0, start);
                let textAfter = textarea.value.substring(end);
                let selectedText = textarea.value.substring(start, end);
                if (event.key === "Tab") {
                    event.preventDefault();
                    let newText = textBefore + tablength + textAfter;
                    textarea.value = newText;
                    textarea.setSelectionRange(start + tablength.length,start + tablength.length);
                    savevs();
                    re();
                }
                if (event.key === "(") {
                    event.preventDefault();
                    let newText = textBefore + "(" + selectedText + ")" + textAfter;
                    textarea.value = newText;
                    textarea.setSelectionRange(start + 1, end + 1);
                    savevs();
                    re();
                }
                if (event.key === "[") {
                    event.preventDefault();
                    let newText = textBefore + "[" + selectedText + "]" + textAfter;
                    textarea.value = newText;
                    textarea.setSelectionRange(start + 1, end + 1);
                    savevs();
                    re();
                }
                if (event.key === "{") {
                    event.preventDefault();
                    let newText = textBefore + "{" + selectedText + "}" + textAfter;
                    textarea.value = newText;
                    textarea.setSelectionRange(start + 1, end + 1);
                    savevs();
                    re();
                }
                if (event.key === '"') {
                    event.preventDefault();
                    let newText = textBefore + '"' + selectedText + '"' + textAfter;
                    textarea.value = newText;
                    textarea.setSelectionRange(start + 1, end + 1);
                    savevs();
                    re();
                }
                if (event.key === "'") {
                    event.preventDefault();
                    let newText = textBefore + "'" + selectedText + "'" + textAfter;
                    textarea.value = newText;
                    textarea.setSelectionRange(start + 1, end + 1);
                    savevs();
                    re();
                }
                if (event.key === "`") {
                    event.preventDefault();
                    let newText = textBefore + "`" + selectedText + "`" + textAfter;
                    /* let charAfterCursor = textAfter.trim().charAt(0);
                    if (charAfterCursor !== "") {
                        newText = textBefore + "`" + selectedText + "`" + charAfterCursor + textAfter.substring(1);
                    } */
                    textarea.value = newText;
                    textarea.setSelectionRange(start + 1, end + 1);
                    savevs();
                    re();
                }
                if (event.key === ">" && lang.toLocaleLowerCase() == "xml") {
                    event.preventDefault();
                    const matches = textBefore.match(/<(\w+)[^>]*>?$/);
                    if (matches) {
                        let newText = textBefore + "></" + matches[1] + ">" + textAfter;
                        textarea.value = newText;
                        savevs();
                        re();
                        textarea.setSelectionRange(start + 1, end + 1);
                    } else {
                        let newText = textBefore + ">" + textAfter;
                        textarea.value = newText;
                        textarea.setSelectionRange(start + 1, start + 1);
                        savevs();
                        re();
                    }
                }
                if (event.key === "Backspace") {
                    if (
                        ((textBefore.endsWith('"') && textAfter.startsWith('"')) ||
                            (textBefore.endsWith("'") && textAfter.startsWith("'")) ||
                            (textBefore.endsWith("`") && textAfter.startsWith("`")) ||
                            (textBefore.endsWith("(") && textAfter.startsWith(")")) ||
                            (textBefore.endsWith("[") && textAfter.startsWith("]")) ||
                            (textBefore.endsWith("{") && textAfter.startsWith("}"))) &&
                        textarea.selectionStart === textarea.selectionEnd
                    ) {
                        event.preventDefault();
                        let newText = textBefore.slice(0, -1) + textAfter.slice(1);
                        const ms = textarea.selectionStart;
                        const me = textarea.selectionEnd;
                        textarea.value = newText;
                        textarea.selectionStart = ms - 1;
                        textarea.selectionEnd = me - 1;
                        savevs();
                        re();
                    }
                    if (
                        textBefore.split("\n").slice(-1)[0].trimStart() === "" &&
                        textBefore.split("\n").slice(-1)[0].length >= tablength.length
                    ) {
                        event.preventDefault();
                        let newText = textBefore.slice(0, tablength.length * -1) + textAfter;
                        const ms = textarea.selectionStart;
                        const me = textarea.selectionEnd;
                        textarea.value = newText;
                        textarea.selectionStart = ms - tablength.length;
                        textarea.selectionEnd = me - tablength.length;
                        savevs();
                        re();
                    }
                }
                if (event.ctrlKey && event.key === "z") {
                    event.preventDefault();
                    undo(textarea);
                    re();
                }
                if (event.ctrlKey && event.key === "y") {
                    event.preventDefault();
                    redo(textarea);
                    re();
                }
                if (event.altKey && event.key === "c" && single[lang.toLocaleLowerCase()]) {
                    //event.key === "k" &&
                    event.preventDefault();
                    let pre = single[lang.toLocaleLowerCase()][0];
                    let suf = single[lang.toLocaleLowerCase()][1];
                    if (textarea.selectionStart === textarea.selectionEnd) {
                        let lines = textarea.value.split("\n");
                        let currentLine = 0;
                        let totalCharacters = 0;
                        for (let i = 0; i < lines.length; i++) {
                            totalCharacters += lines[i].length + 1;
                            if (totalCharacters >= textarea.selectionStart) {
                                currentLine = i;
                                break;
                            }
                        }
                        textBefore = textarea.value.split(lines[currentLine])[0];
                        textAfter = textarea.value.split(lines[currentLine])[1];
                        selectedText = lines[currentLine];
                    }
                    let arra = selectedText.split("\n")
                    let arralength = arra.length;
                    if (arra.length > 1) {
                        for (let indexim = 0; indexim < arra.length; indexim++) {
                            arra[indexim] = pre + arra[indexim] + suf;
                        }
                        arra=arra.join("\n");
                    } else {
                        arra=pre + arra.join("\n") + suf;
                    }
                    let newText = textBefore + arra + textAfter;
                    textarea.value = newText;
                    if (arralength===1) {textarea.setSelectionRange(start + pre.length, end + pre.length);} else {textarea.setSelectionRange(start, start);}
                    savevs();
                    re();
                }
                if (event.key === "a" && event.altKey && multi[lang.toLocaleLowerCase()]) {
                    let pre = multi[lang.toLocaleLowerCase()][0];
                    let suf = multi[lang.toLocaleLowerCase()][1];
                    let newText = textBefore + pre + selectedText + suf + textAfter;
                    textarea.value = newText;
                    textarea.setSelectionRange(start + pre.length, end + pre.length);
                    savevs();
                    re();
                }
                if (event.ctrlKey && event.key === "c" && textarea.selectionStart === textarea.selectionEnd) {
                    event.preventDefault();
                    let lines = textarea.value.split("\n");
                    let currentLine = 0;
                    let totalCharacters = 0;
                    for (let i = 0; i < lines.length; i++) {
                        totalCharacters += lines[i].length + 1;
                        if (totalCharacters >= textarea.selectionStart) {
                            currentLine = i;
                            break;
                        }
                    }
                    // textarea.setSelectionRange(textarea.value.split(lines[currentLine])[0].length, lines[currentLine].length);
                    savevs();
                    navigator.clipboard.writeText("\n" + lines[currentLine]);
                    re();
                }
                if (event.shiftKey && event.altKey && textarea.selectionStart === textarea.selectionEnd) {
                    if (event.key == "ArrowDown") {
                        event.preventDefault();
                        let lines = textarea.value.split("\n");
                        let currentLine = 0;
                        let totalCharacters = 0;
                        for (let i = 0; i < lines.length; i++) {
                            totalCharacters += lines[i].length + 1;
                            if (totalCharacters >= textarea.selectionStart) {
                                currentLine = i;
                                break;
                            }
                        }
                        // textarea.setSelectionRange(textarea.value.split(lines[currentLine])[0].length, lines[currentLine].length);
                        let line = lines[currentLine];
                        lines[currentLine] += "\n" + lines[currentLine];
                        let olds= textarea.selectionStart;
                        textarea.value = lines.join("\n");
                        textarea.selectionStart = olds + line.length + 1;
                        textarea.selectionEnd = textarea.selectionStart;
                        savevs();
                        re();
                    }
                    return;
                }
                if (event.shiftKey && event.altKey && textarea.selectionStart === textarea.selectionEnd) {
                    if (event.key == "ArrowUp") {
                        event.preventDefault();
                        let lines = textarea.value.split("\n");
                        let currentLine = 0;
                        let totalCharacters = 0;
                        for (let i = 0; i < lines.length; i++) {
                            totalCharacters += lines[i].length + 1;
                            if (totalCharacters >= textarea.selectionStart) {
                                currentLine = i;
                                break;
                            }
                        }
                        // textarea.setSelectionRange(textarea.value.split(lines[currentLine])[0].length, lines[currentLine].length);
                        lines[currentLine] += "\n" + lines[currentLine];
                        let olds= textarea.selectionStart;
                        textarea.value = lines.join("\n");
                        textarea.selectionStart = olds;
                        textarea.selectionEnd = textarea.selectionStart;
                        savevs();
                        re();
                    }
                    return;
                }
                if (event.altKey && textarea.selectionStart === textarea.selectionEnd) {
                    if (event.key == "ArrowUp") {
                        event.preventDefault();
                        let lines = textarea.value.split("\n");
                        let currentLine = 0;
                        let totalCharacters = 0;
                        for (let i = 0; i < lines.length; i++) {
                            totalCharacters += lines[i].length + 1;
                            if (totalCharacters >= textarea.selectionStart) {
                                currentLine = i;
                                break;
                            }
                        }
                        // textarea.setSelectionRange(textarea.value.split(lines[currentLine])[0].length, lines[currentLine].length);
                        const eksibir = lines[currentLine - 1];
                        const eksinobir = lines[currentLine];
                        lines[currentLine] = eksibir;
                        lines[currentLine - 1] = eksinobir;
                        let olds= textarea.selectionStart;
                        textarea.value = lines.join("\n");
                        textarea.selectionStart = olds - eksibir.length - 1;
                        textarea.selectionEnd = textarea.selectionStart;
                        savevs();
                        re();
                    }
                }
                if (event.altKey && textarea.selectionStart === textarea.selectionEnd) {
                    if (event.key == "ArrowDown") {
                        event.preventDefault();
                        let lines = textarea.value.split("\n");
                        let currentLine = 0;
                        let totalCharacters = 0;
                        for (let i = 0; i < lines.length; i++) {
                            totalCharacters += lines[i].length + 1;
                            if (totalCharacters >= textarea.selectionStart) {
                                currentLine = i;
                                break;
                            }
                        }
                        // textarea.setSelectionRange(textarea.value.split(lines[currentLine])[0].length, lines[currentLine].length);
                        const eksibir = lines[currentLine + 1];
                        const eksinobir = lines[currentLine];
                        lines[currentLine] = eksibir;
                        lines[currentLine + 1] = eksinobir;
                        let olds= textarea.selectionStart;
                        textarea.value = lines.join("\n");
                        textarea.selectionStart = olds + eksibir.length + 1;
                        textarea.selectionEnd = textarea.selectionStart;
                        savevs();
                        re();
                    }
                }
                if (event.key == "Enter") {
                    let lines = textarea.value.split("\n");
                    let currentLine = 0;
                    let totalCharacters = 0;
                    for (let i = 0; i < lines.length; i++) {
                        totalCharacters += lines[i].length + 1;
                        if (totalCharacters >= textarea.selectionStart) {
                            currentLine = i;
                            break;
                        }
                    }
                    if (lines[currentLine].trimStart() !== lines[currentLine]) {
                        event.preventDefault();
                        let olds= textarea.selectionStart;
                        let bojluck = (
                            "\n" + lines[currentLine].replace(lines[currentLine].trimStart(), "")
                        ).length;
                        lines[currentLine] +=
                            "\n" + lines[currentLine].replace(lines[currentLine].trimStart(), "");
                        let newText =textBefore +"\n" +lines[currentLine].replace(lines[currentLine].trimStart(), "") +selectedText +textAfter;
                        textarea.value = newText;
                        textarea.selectionStart = olds + bojluck;
                        textarea.selectionEnd = textarea.selectionStart;
                        savevs();
                        re();
                    }
                }
            });
        }
    });
}
