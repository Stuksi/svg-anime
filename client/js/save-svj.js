function saveSVG() {
  let svg_code = document.getElementById("code-input").value

  const userId = 1;
  const name = "star-svg";

  const data = new URLSearchParams();
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