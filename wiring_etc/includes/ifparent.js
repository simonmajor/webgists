function resizeIframe(iframe) {
    // console.debug("resizeIframe entry");

    const doc = iframe.contentDocument || iframe.contentWindow.document;
    if (!doc) return;

    /* console.log(doc.body.outerHTML);
    console.log("body.scrollHeight", doc.body.scrollHeight);
    console.log("documentElement.scrollHeight", doc.documentElement.scrollHeight);
    console.log("body.offsetHeight", doc.body.offsetHeight);
    console.log("documentElement.offsetHeight", doc.documentElement.offsetHeight);
    console.log("body", doc.body.scrollHeight, doc.body.offsetHeight);
    console.log("html", getComputedStyle(doc.documentElement).height);
    console.log("body css", getComputedStyle(doc.body).height); */

    const update = () => {
        // console.debug("update entry");
        const height = doc.documentElement.getBoundingClientRect().height;
        iframe.style.height = `${Math.ceil(height)}px`;
        // console.debug("Type of height:", typeof height, "Value:", height);
    };

    /* requestAnimationFrame(update);

    setTimeout(() => resizeIframe(iframe), 100); */
    update();

    /* Problems with the earlier versions:
     * body.scrollHeight → measures only the body content (~79px)
     * documentElement.scrollHeight → polluted by the iframe’s default viewport height (150px)
     * documentElement.getBoundingClientRect().height → measures the actual rendered document (~116.5px)
     */
}

document.querySelectorAll("iframe.full").forEach((iframe) => {
    iframe.addEventListener("load", () => {
        resizeIframe(iframe);
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        new ResizeObserver(() => resizeIframe(iframe)).observe(doc.documentElement);
    });
});

/* For use with parents:

 <iframe
    id="wiring1"
    src="some-page.html">
</iframe>

and a ifchild.js id="wiring1"

*/
/* window.addEventListener("message", (event) => {
    if (event.data.type !== "iframeHeight") return;

    const iframe = document.getElementById(event.data.id);

    if (iframe) iframe.style.height = `${event.data.height}px`;
}); */
