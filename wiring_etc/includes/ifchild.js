function reportHeight() {
    const height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

    parent.postMessage(
        {
            type: "iframeHeight",
            id: "wiring1",
            height: height
        },
        "*"
    );
}

window.addEventListener("load", reportHeight);
window.addEventListener("resize", reportHeight);

/* For use with parents:

 <iframe
    id="wiring1"
    src="some-page.html">
</iframe>
*/
