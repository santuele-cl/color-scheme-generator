const clickBtn = document.getElementById("click-btn")
const colorContainer = document.getElementById("color-container")
const colorField = document.getElementById('color-field')
const schemeField = document.getElementById('scheme-mode')
const form = document.getElementById('form')

const defaultColor = ['#f55a5a','#2b283a','#fbf3ab','#aad1b6','#a626d3']

function getColorHtml(colors) {
    let colorHtml = ``
    colors.forEach(color => {
        colorHtml += `
            <div>
                <div class="color-box" style="background-color:${color};"></div>
                <div class="color-name">${color}</div>
            </div>
        `
    })
    return colorHtml
}

colorContainer.innerHTML = getColorHtml(defaultColor)

form.addEventListener('submit', event => {
    event.preventDefault()
})

clickBtn.addEventListener('click', () => {
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorField.value.replace("#","")}&format=json&mode=${schemeField.value}&count=5`)
        .then((response) => response.json())
        .then((data) => {
            const colorArr = data.colors.map(color => {
                return color.hex.value
            })
            colorContainer.innerHTML = getColorHtml(colorArr)
        });
})



//ndef reader
const scanButton = document.getElementById('scan-button')
const writeButton = document.getElementById('write-button')
const makeReadOnlyButton = document.getElementById('make-read')
const parag = document.getElementById('message')


scanButton.addEventListener("click", async () => {
    console.log("User clicked scan button");
  
    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      parag.innerText += "> Scan started" + '\n';
  
      ndef.addEventListener("readingerror", () => {
        console.log("Argh! Cannot read data from the NFC tag. Try another one?");
      parag.innerText += "Argh! Cannot read data from the NFC tag. Try another one?";
      });
  
      ndef.addEventListener("reading", ({ message, serialNumber }) => {
        parag.textContent = message.records;
        parag.innerText += `> Serial Number: ${serialNumber}` + '\n';
        console.log(`> Serial Number: ${serialNumber}`);
        parag.innerText += `> Records: (${message.records}) \n`;
        console.log(`> Records: (${message.records})`);
      });
    } catch (error) {
        console.log("Argh! " + error);
    }
  });
  
  writeButton.addEventListener("click", async () => {
    console.log("User clicked write button");
  
    try {
      const ndef = new NDEFReader();
      await ndef.write("Hello world!");
      console.log("> Message written");
    } catch (error) {
        console.log("Argh! " + error);
    }
  });
  
  makeReadOnlyButton.addEventListener("click", async () => {
    console.log("User clicked make read-only button");
  
    try {
      const ndef = new NDEFReader();
      await ndef.makeReadOnly();
      console.log("> NFC tag has been made permanently read-only");
    } catch (error) {
      console.log("Argh! " + error);
    }
  });