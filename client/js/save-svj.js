function saveSVG() {
  let svg_code = document.getElementById("code-input").value
  const svgRegex = /<svg(?:.*?)>(.*?)<\/svg>/s;
  const match = svgRegex.exec(svg_code.trim());

  if (!svg_code || !match) {
    alert("No valid svg detected!");
    return;
  }

  var name = prompt("Enter name for the SVG");
  fetch(`http://0.0.0.0:3000/library/?user_id=2&name=${name}`)
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    if (data.length > 0) {
      alert("There is already an SVG with this name, please type another");
      return;
    }
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  });

  const data = new URLSearchParams();
  const userId = 2;
  data.append("user_id", userId);
  data.append("name", name);
  data.append("content", svg_code);

  fetch("http://0.0.0.0:3000/library/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data
  })
  .then(response => response.json())
  .catch(error => console.error(error));
}