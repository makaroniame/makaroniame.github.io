(() => {
  const faviconId = "dendro-page-favicon";
  const faviconUrl = new URL("favicon.png?v=2", document.currentScript.src).href;

  document
    .querySelectorAll(`link[rel~="icon"]:not(#${faviconId})`)
    .forEach((link) => link.remove());

  let favicon = document.getElementById(faviconId);
  if (!favicon) {
    favicon = document.createElement("link");
    favicon.id = faviconId;
    favicon.rel = "icon";
    favicon.type = "image/png";
    favicon.sizes = "240x240";
    document.head.append(favicon);
  }

  favicon.href = faviconUrl;
})();
