const clickBtn = document.getElementById("click-btn")
const colorContainer = document.getElementById("color-container")

const colorField = document.getElementById('color-field')
const schemeField = document.getElementById('scheme-mode')



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

