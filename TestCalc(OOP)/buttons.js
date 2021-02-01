let selectedButton;
let selectedWindow;
let windows = document.querySelector('.count-windows');
let logos = document.querySelector('.brand');
logos.onclick = function (event) {
    let target = event.target;
    if (target.tagName != "BUTTON"){
        return;
    }
    highlight(target);

}
function highlight(button) {
    if (selectedButton) {
        selectedButton.classList.remove('button-toggle');
    }
    selectedButton = button;
    selectedButton.classList.add('button-toggle');
}
windows.onclick = function (event) {
    let target = event.target;
    if (target.tagName != "BUTTON"){
        return;
    }
    highlight2(target);
}
function highlight2(button) {
    if (selectedWindow) {
        selectedWindow.classList.remove('button-toggle');
    }
    selectedWindow = button;
    selectedWindow.classList.add('button-toggle');
}