(() => {
  const pageScriptUrl = document.currentScript.src;

  if (!window.dendroLightThemeInitialized) {
    window.dendroLightThemeInitialized = true;

    const enforceLightTheme = () => {
      const darkTheme = document.getElementById("darkTheme");
      if (darkTheme) darkTheme.disabled = true;
    };

    enforceLightTheme();

    document.addEventListener(
      "DOMContentLoaded",
      () => requestAnimationFrame(enforceLightTheme),
      { once: true },
    );
    window.addEventListener("pageshow", enforceLightTheme);
  }

  if (!window.dendroI18nInitialized) {
    window.dendroI18nInitialized = true;

    const languageStorageKey = "dendroLanguage";
    const preferredLanguage =
      localStorage.getItem(languageStorageKey) === "el" ? "el" : "en";
    const translationUrls = {
      en: new URL("translations.en.json?v=2", pageScriptUrl).href,
      el: new URL("translations.el.json?v=2", pageScriptUrl).href,
    };

    document.documentElement.classList.add("dendro-language-loading");

    const loadTranslations = async (language) => {
      const response = await fetch(translationUrls[language]);
      if (!response.ok) {
        throw new Error(`${language}: HTTP ${response.status}`);
      }
      return response.json();
    };

    const initializeLanguageSwitcher = async () => {
      const root = document.getElementById("main");
      const buttons = Array.from(
        document.querySelectorAll("button[data-dendro-language]"),
      );

      if (!root || buttons.length === 0) {
        document.documentElement.classList.remove("dendro-language-loading");
        return;
      }

      try {
        const [english, greek] = await Promise.all([
          loadTranslations("en"),
          loadTranslations("el"),
        ]);
        const translations = { en: english, el: greek };

        const setLanguage = (language, persist = true) => {
          const selectedLanguage = language === "el" ? "el" : "en";
          const selectedTranslations = translations[selectedLanguage];

          for (const element of root.querySelectorAll("[data-dendro-i18n]")) {
            const key = element.dataset.dendroI18n;
            if (Object.prototype.hasOwnProperty.call(selectedTranslations, key)) {
              element.textContent = selectedTranslations[key];
            } else {
              console.error(`Missing Dendro translation: ${selectedLanguage}.${key}`);
            }
          }

          for (const attribute of ["aria-label", "alt", "title"]) {
            const marker = `data-dendro-i18n-${attribute}`;
            for (const element of root.querySelectorAll(`[${marker}]`)) {
              const key = element.getAttribute(marker);
              if (Object.prototype.hasOwnProperty.call(selectedTranslations, key)) {
                element.setAttribute(attribute, selectedTranslations[key]);
              } else {
                console.error(
                  `Missing Dendro translation: ${selectedLanguage}.${key}`,
                );
              }
            }
          }

          root.lang = selectedLanguage;
          root.dataset.dendroLanguage = selectedLanguage;

          for (const button of buttons) {
            const isActive = button.dataset.dendroLanguage === selectedLanguage;
            button.setAttribute("aria-pressed", String(isActive));
          }

          if (persist) {
            localStorage.setItem(languageStorageKey, selectedLanguage);
          }
        };

        for (const button of buttons) {
          button.addEventListener("click", () => {
            setLanguage(button.dataset.dendroLanguage);
          });
        }

        setLanguage(preferredLanguage, false);
      } catch (error) {
        console.error("Could not load the Dendro translations.", error);
      } finally {
        document.documentElement.classList.remove("dendro-language-loading");
      }
    };

    if (document.readyState === "loading") {
      document.addEventListener(
        "DOMContentLoaded",
        initializeLanguageSwitcher,
        { once: true },
      );
    } else {
      initializeLanguageSwitcher();
    }
  }

  const faviconId = "dendro-page-favicon";
  const faviconUrl = new URL("favicon.png?v=2", pageScriptUrl).href;

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
