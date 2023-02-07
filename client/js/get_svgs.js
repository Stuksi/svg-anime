function htmlToElement(html) {
    let template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

function appendElement(element)
{
    svgId = "".concat("svg-", element.name);
    svgWrapper = document.createElement("div");
    svgWrapper.setAttribute('class', 'svg-wrapper');
    svgWrapper.setAttribute('id', svgId);
    document.getElementById("svg-gallery").appendChild(svgWrapper);


    svgName = document.createElement("p");
    svgName.textContent = element.name;
    svgName.setAttribute('class', 'svg-name');
    document.getElementById(svgId).appendChild(svgName);

    svg = htmlToElement(element.content);
    svg.setAttribute('class', 'svg');
    document.getElementById(svgId).appendChild( svg);

}

function requestSVGs() {

    fetch(`http://0.0.0.0:3000/library/?user_id=1`)
    .then(response => response.json())
    .then(response => {

        response.library.forEach(element => {
            appendElement(element)
        });
    })
    .catch(error => console.error(error));
}

window.onload = requestSVGs();