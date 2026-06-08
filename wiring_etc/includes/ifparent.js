function resizeIframe(iframe) {
    console.log("resizeIframe entry");
    const doc = iframe.contentDocument;

    if (!doc) return;

    const update = () => {
        console.debug("update entry");
        const height =
            Math.max(
                doc.body.scrollHeight,
                doc.documentElement.scrollHeight,
                doc.body.offsetHeight,
                doc.documentElement.offsetHeight
            ) + "px";
        console.debug("Type of height:", typeof height, "Value:", height);
        iframe.style.height = height;
    };

    requestAnimationFrame(update);

    setTimeout(update, 50);
    setTimeout(update, 250);
    setTimeout(update, 1000);
}

document.querySelectorAll("iframe.full").forEach((iframe) => {
    iframe.addEventListener("load", () => resizeIframe(iframe));
});

/* For use with parents:

 <iframe
    id="wiring1"
    src="some-page.html">
</iframe>

and a ifchild.js id="wiring1"

*/
window.addEventListener("message", (event) => {
    if (event.data.type !== "iframeHeight") return;

    const iframe = document.getElementById(event.data.id);

    if (iframe) iframe.style.height = `${event.data.height}px`;
});
