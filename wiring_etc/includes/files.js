
/* function adjustIframeHeight(felem) {
    console.log("adjustIframeHeight entry");
    // console.log("Type of felm:", typeof felem, "Value:", felem);
    try {
        const diframeContent = felem.contentDocument || felem.contentWindow.document;
        // console.log("Type of diframeContent:", typeof diframeContent, "Value:", diframeContent);

        const dfbody = diframeContent.body;
        // console.log("Type of dfbody:", typeof dfbody, "Value:", dfbody);

        // Get the content's scroll height (includes padding, excludes margins/borders)
        const contentHeight = diframeContent.body.scrollHeight;
        // const contentHeight = diframeContent.body.style.height;
        console.log("contentHeight is ", JSON.parse(JSON.stringify(contentHeight)));

        // Set iframe height to match content height (add padding to avoid clipping)
        felem.style.height = `${contentHeight + 2}px`;
    } catch (error) {
        console.error("Failed to adjust iframe height:", error);
    }
} */

/*
function adjustIframeHeight(iFrame) {
    iFrame.width = iFrame.contentWindow.document.body.scrollWidth;
    iFrame.height = iFrame.contentWindow.document.body.scrollHeight;
}
*/

/*
// Use querySelectorAll to get the collection and forEach to attach listeners rather than getElementsByClassName
document.querySelectorAll(".full").forEach((iifr) => {
    // ["load"].forEach((evt) => ifi.addEventListener(evt, adjustIframeHeight(ifi), false));
    const iframeContent = iifr.contentDocument || iifr.contentWindow.document;
    console.log("Type of iframeContent:", typeof iframeContent, "Value:", iframeContent);
    const fbody = iframeContent.body;
    console.log("Type of fbody:", typeof fbody, "Value:", fbody);
    ["DOMContentLoaded"].forEach((evt) => fbody.addEventListener(evt, adjustIframeHeight(iifr), false));
});
*/

document.querySelectorAll("iframe.full").forEach((iifr) => {
    iifr.onload = (function (o) {
        o.style.height = o.contentWindow.document.body.scrollHeight + "px";
    })(iifr);
});

/*
window.addEventListener("DOMContentLoaded", function (e) {

    // To resize all iframes:
    var iframes = document.querySelectorAll("iframe");
    for (var i = 0; i < iframes.length; i++) {
        adjustIframeHeight(iframes[i]);
    }
});
*/

// <!-- onload='javascript:(function(o){o.style.height=o.contentWindow.document.body.scrollHeight+"px";}(this));' -->

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
