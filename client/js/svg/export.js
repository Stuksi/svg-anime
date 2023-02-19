
function exportSvg(event) {
  const fileName = prompt("Enter name for the SVG file") + ".svg"; // Change for better ui
  const content = document.getElementById('input').value.trim();
  const textDataBlob = new Blob([content], { type: "text/plain" });
  const downloadUrl = URL.createObjectURL(textDataBlob)
  const downloadLink = document.createElement('a');
  downloadLink.download = fileName;
  downloadLink.href = downloadUrl;
  downloadLink.click();
  downloadLink.remove();
  event.preventDefault();
}

document.getElementById('export').addEventListener('click', exportSvg);