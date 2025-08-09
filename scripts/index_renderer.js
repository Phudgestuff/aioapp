// ensure that search box is not unfocused
document.addEventListener('click', () => {
    document.getElementById("search").focus();
});
window.addEventListener('focus', () => {
    document.getElementById('search').focus();
})