//Сверстайте кнопку, которая будет содержать в себе icon_01 (как в примере в последнем видео).
// При клике на кнопку иконка должна меняться на icon_02. Повторный клик меняет иконку обратно.
btn = document.querySelector('.btn');
btn.addEventListener('click', () => {
    let svgDiv = document.querySelector('.svgDiv1');
    svgDiv.classList.toggle('svgDiv2');
    })