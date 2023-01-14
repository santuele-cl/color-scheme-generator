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

