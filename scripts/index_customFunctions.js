export function handleEnter(nPath) {
    if (nPath === "help") {
        const blurCover = document.getElementById("blurCover");
        blurCover.style.backdropFilter = "blur(8px)";
        document.getElementById("helpMenu").style.opacity = "1"
    }
}