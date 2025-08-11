import { handleEnter } from './index_customFunctions.js';

// ensure that search box is not unfocused
document.addEventListener('click', () => {
    document.getElementById("search").focus();
});
window.addEventListener('focus', () => {
    document.getElementById('search').focus();
})

// create Menu entry with bold text to match the current search input
function menuEntry(pathArr, text, top) {
    let entry = document.createElement("div");
    entry.className = "menuEntry";

    const start = pathArr[0].toLowerCase().indexOf(text)
    const end = start + text.length;

    entry.innerHTML = `${pathArr[0].slice(0, start)}<b><u>${pathArr[0].slice(start, end)}</u></b>${pathArr[0].slice(start + text.length)}`;
    entry.style.top = `${top + 275}px`;
    return entry;
}

let currentPromptIndex = -1;

function movePromptToIndex(index) {
    const prompt = document.getElementById("prompt");
    currentPromptIndex = index;
    prompt.style.top = `${200 + 75*(index+1)}px`
}

let dataAmount = -1;
let dataArr = [];

// handle search input
const searchInput = document.getElementById("search");
searchInput.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== "Control" && e.key !== "ArrowDown" && e.key !== "ArrowUp") {
        const resultContainer = document.getElementById("resultContainer");
        resultContainer.innerHTML = "";
        dataAmount = -1;
        // current text input
        let textContent = `${document.getElementById("search").value}${/^[a-zA-Z]$/.test(e.key)?e.key:""}`;
        // search paths.json for entries containing textContent
        if (textContent !== "") {
            window.scanjson.retrieve(textContent).then(data => {
                dataArr = data
                for (let i=0; i<data.length; i++) {
                    resultContainer.appendChild(menuEntry(data[i], textContent, i*75));
                    dataAmount++
                }
                if (resultContainer.innerHTML !== "") {
                    const prompt = document.getElementById("prompt");
                    movePromptToIndex(0);
                }
            });
        }
    }
});

document.addEventListener("keydown", (e) => {
    // move pointer up and down the option list
    if (currentPromptIndex+1 < dataArr.length && e.key === "ArrowDown") {
        currentPromptIndex++;
        movePromptToIndex(currentPromptIndex);
    } else if (currentPromptIndex-1 > -1 && e.key === "ArrowUp") {
        currentPromptIndex--;
        movePromptToIndex(currentPromptIndex);

    // go to page or run custom function when enter is pressed
    // provided that the pointer is not pointing to the text input (index -1)
    } else if (e.key === "Enter" && currentPromptIndex !== -1) {
        const nPath = dataArr[currentPromptIndex][1].slice(2);
        const nPathPrefix = dataArr[currentPromptIndex][1].slice(0, 2)
        if (nPathPrefix === "c:") {
            // handle custom functions
            handleEnter(nPath);
        } else if (nPathPrefix === "p:") {
            window.location.href = nPath;
        }
    // exit from help menu
    } else if (e.key === "Escape" && document.getElementById("helpMenu").style.opacity === "1") {
        document.getElementById("helpMenu").style.opacity = "0";
        document.getElementById("blurCover").style.backdropFilter = "none";
    }
})

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (mutation.type === "childList" || mutation.type === "subtree") {
            if (document.getElementById("resultContainer").innerHTML === "") {
                movePromptToIndex(-1);
            }
        }
    }
});
observer.observe(document.getElementById("resultContainer"), {
    childList: true
});