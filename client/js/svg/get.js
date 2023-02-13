import { get } from '../api.js';

function htmlToElement(html) {
    let template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

function registerClick() {
    let children = this.children;
    let codeInput= children[1].outerHTML;
    localStorage.setItem('input', codeInput);
    document.location.href = '../html/home.html';
}

function appendElement(element)
{
    let svgId = "".concat("svg-", element.name);
    let svgWrapper = document.createElement("div");
    svgWrapper.setAttribute('class', 'svg-wrapper');
    svgWrapper.setAttribute('id', svgId);
    svgWrapper.addEventListener("click", registerClick);
    document.getElementById("svg-gallery").appendChild(svgWrapper);


    let svgName = document.createElement("p");
    svgName.textContent = element.name;
    svgName.setAttribute('class', 'svg-name');
    document.getElementById(svgId).appendChild(svgName);

    let svg = htmlToElement(element.content);
    svg.setAttribute('class', 'svg');
    document.getElementById(svgId).appendChild(svg);
}

function requestSVGs() {

    get(`library`)
    .then(response => {
        response.library.forEach(element => {
            appendElement(element)
        });
    })
    .catch(error => console.error(error));
}

window.onload = requestSVGs();


