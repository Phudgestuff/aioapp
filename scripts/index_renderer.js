document.addEventListener("keydown", (event) => {
    // check for ctrl + h
    if (event.ctrlKey && event.code === "KeyH") {
        console.log("Ctrl+H pressed");
    }
});