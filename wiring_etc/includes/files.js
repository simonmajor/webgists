// https://docs.github.com/en/rest/repos/contents?apiVersion=2026-03-10

(async () => {
    const response = await fetch(`https://api.github.com/repos/${ghUsername}/${ghRepo}/contents/${ghBasePath}`);
    const data = await response.json();
    let htmlString = "<ul>";

    for (let file of data) {
        htmlString += `<li><a href="https://${ghUsername}.github.io/${ghRepo}/${file.path}">${file.name}</a></li>`;
    }

    htmlString += "</ul>";
    document.getElementById("listing").innerHTML = htmlString;
})();
