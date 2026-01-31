
let isFirefox = false;
try {
    console.log(browser);
    isFirefox = true;
} catch { }

console.log("injected!");
console.log(isFirefox)

let squircle = !isFirefox;
if (!isFirefox) {
    const chromeVersion = parseInt(/Chrome\/([0-9.]+)/.exec(navigator.userAgent)[1].split('.')[0]);
    if (chromeVersion < 139) squircle = false;
}

const callback = (mutationsList, observer) => {
    /** @type {Array<Element>} */
    const allElems = Array.from(document.getElementsByClassName('result-text'));
    allElems.forEach((verdictElem) => {
        const cls = verdictElem.classList;
        let link = '';
        if (Element.prototype.isPrototypeOf(verdictElem.firstChild)) link = verdictElem.firstChild.getAttribute('href')
        
        if (cls.contains('result-ac') && !cls.contains('b-result-ac')) {
            verdictElem.className = "result-ac b-result b-result-ac";            
            if (verdictElem.textContent == "맞았습니다!!") {
                verdictElem.textContent = "AC";
            } else if (verdictElem.textContent.startsWith("맞았습니다!!")) {
                let ctn = verdictElem.textContent;
                ctn = ctn.substring(9, ctn.length-1);
                let pos = ctn.indexOf('/');
                const cor = parseInt(ctn.substring(0, pos));
                const tot = parseInt(ctn.substring(pos+1, ctn.length));

                verdictElem.textContent = `${cor}/${tot}`
            } else if (verdictElem.textContent.endsWith("점")) {
                const ctn = verdictElem.textContent;
                const cor = parseInt(ctn.substring(ctn, ctn.length-1));

                verdictElem.textContent = `${cor}`
            }
        } else if (cls.contains('result-pac') && !cls.contains('b-result-pac')) {
            verdictElem.className = "result-pac b-result b-result-pac";
            if (verdictElem.textContent == "맞았습니다!!") {
                verdictElem.textContent = "PAC";
            } else if (verdictElem.textContent.startsWith("맞았습니다!!")) {
                let ctn = verdictElem.textContent;
                ctn = ctn.substring(9, ctn.length-1);
                let pos = ctn.indexOf('/');
                const cor = parseInt(ctn.substring(0, pos));
                const tot = parseInt(ctn.substring(pos+1, ctn.length));

                verdictElem.textContent = `${cor}/${tot}`
            } else if (verdictElem.textContent.endsWith("점")) {
                const ctn = verdictElem.textContent;
                const cor = parseInt(ctn.substring(ctn, ctn.length-1));

                verdictElem.textContent = `${cor}`
            }
        } else if (cls.contains('result-rte') && !cls.contains('b-result-rte')) {
            verdictElem.className = "result-rte b-result b-result-rte";
            if (verdictElem.textContent == "런타임 에러") {
                verdictElem.textContent = "RTE";
            } else if (verdictElem.textContent.startsWith("런타임 에러")) {
                let ctn = verdictElem.textContent;
                verdictElem.textContent = ctn.substring(8, ctn.length-1);
            }
        } else if (cls.contains('result-ce') && !cls.contains('b-result-ce')) {
            verdictElem.className = "result-ce b-result b-result-ce";
            if (verdictElem.textContent == "컴파일 에러") {
                verdictElem.textContent = "CE";
            } else if (verdictElem.textContent.startsWith("컴파일 에러")) {
                let ctn = verdictElem.textContent;
                verdictElem.textContent = ctn.substring(8, ctn.length-1);
            }
        } else if (cls.contains('result-tle') && !cls.contains('b-result-tle')) {
            verdictElem.className = "result-tle b-result b-result-tle";
            if (verdictElem.textContent == "시간 초과") {
                verdictElem.textContent = "TLE";
            }
        } else if (cls.contains('result-mle') && !cls.contains('b-result-mle')) {
            verdictElem.className = "result-mle b-result b-result-mle";
            if (verdictElem.textContent == "메모리 초과") {
                verdictElem.textContent = "MLE";
            }
        } else if (cls.contains('result-ole') && !cls.contains('b-result-ole')) {
            verdictElem.className = "result-ole b-result b-result-ole";
            if (verdictElem.textContent == "출력 초과") {
                verdictElem.textContent = "OLE";
            }
        } else if (cls.contains('result-pe') && !cls.contains('b-result-pe')) {
            verdictElem.className = "result-pe b-result b-result-pe";
            if (verdictElem.textContent == "출력 형식이 잘못되었습니다") {
                verdictElem.textContent = "PE";
            }
        } else if (cls.contains('result-wa') && !cls.contains('b-result-wa')) {
            verdictElem.className = "result-wa b-result b-result-wa";
            if (verdictElem.textContent == "틀렸습니다") {
                verdictElem.textContent = "WA";
            }
        } else if (cls.contains('result-wait') && verdictElem.textContent != "Waiting...") {
            verdictElem.className = "result-text result-wait b-result b-result-wj";
            verdictElem.textContent = "Waiting...";
        } else if (cls.contains('result-compile') && verdictElem.textContent != "Compiling...") {
            verdictElem.className = "result-text result-compile b-result b-result-cmp";
            verdictElem.textContent = "Compiling...";
        } else if (cls.contains('result-judging') && !verdictElem.textContent.endsWith("%")) {
            verdictElem.className = "result-text result-judging b-result b-result-ijd";

            let ctn = verdictElem.textContent;
            verdictElem.textContent = "-%";
            if (ctn.startsWith("채점 중")) {
                ctn = ctn.substring(6, ctn.length-1);
                verdictElem.textContent = `${ctn}`
            }
        } else {
            return;
        }

        
        if (!squircle) verdictElem.classList.add("b-corner-legacy");
        else verdictElem.classList.add("b-corner-squircle")

        if (link) {
            const newElement = document.createElement('a');
            newElement.className = verdictElem.className;
            newElement.textContent = verdictElem.textContent;
            newElement.href = link;
            verdictElem.replaceWith(newElement);
        }
    });
};

const observer = new MutationObserver(callback);

observer.observe(document.documentElement, {
    childList: true,
    subtree: true
});

// document.addEventListener("DOMContentLoaded", (async () => {
// }));