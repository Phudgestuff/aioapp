const fs = require('fs');

module.exports = async function sortJson(string) {
    try {
        const data = await fs.promises.readFile('./data/paths.json', 'utf-8');
        const paths = JSON.parse(data);
        let matchingPaths = [];
        for (let path of paths) {
            if (path[0].toLowerCase().includes(string.toLowerCase())) {
                matchingPaths.push(path);
            }
        }

        return string!==""?matchingPaths:[];
    } catch (error) {
        return { error: error.message };
    }
}