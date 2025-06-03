/**
 * Template loading and management system
 * @author Clockert
 */

window.templateLoader = (function () {
  const templateCache = {};

  /**
   * @param {string} templateName - Name of template file without extension
   * @returns {Promise<string>} The template HTML content
   */
  async function loadTemplate(templateName) {
    if (templateCache[templateName]) {
      return templateCache[templateName];
    }

    try {
      const response = await fetch(`templates/${templateName}.html`);
      if (!response.ok) {
        throw new Error(`Failed to load template: ${templateName}`);
      }

      const html = await response.text();
      templateCache[templateName] = html;
      return html;
    } catch (error) {
      console.error(`Error loading template "${templateName}":`, error);
      return null;
    }
  }

  /**
   * @param {string} templateName - Template file name
   * @param {string|Element} container - Container element or selector
   * @returns {Promise<Element>} The container element with template inserted
   */
  async function insertTemplate(templateName, container) {
    const templateHtml = await loadTemplate(templateName);
    if (!templateHtml) return null;

    const containerElement =
      typeof container === "string"
        ? document.querySelector(container)
        : container;

    if (!containerElement) {
      console.error(`Container not found: ${container}`);
      return null;
    }

    containerElement.innerHTML = templateHtml;
    return containerElement;
  }

  /**
   * Creates template with data placeholders replaced ({{key}} syntax)
   * @param {string} templateName - Template file name
   * @param {Object} data - Data to populate template with
   * @returns {Promise<DocumentFragment>} Document fragment with content
   */
  async function createFromTemplate(templateName, data = {}) {
    const templateHtml = await loadTemplate(templateName);
    if (!templateHtml) return null;

    const template = document.createElement("template");
    let processedHtml = templateHtml;

    for (const [key, value] of Object.entries(data)) {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, "g");
      processedHtml = processedHtml.replace(regex, value);
    }

    template.innerHTML = processedHtml;
    return template.content.cloneNode(true);
  }

  /**
   * @param {Array<Object>} templates - Array of {name, container} objects
   */
  async function loadTemplates(templates) {
    try {
      const promises = templates.map((template) =>
        insertTemplate(template.name, template.container)
      );

      await Promise.all(promises);
      console.log("All templates loaded successfully");
    } catch (error) {
      console.error("Error loading templates:", error);
    }
  }

  return {
    loadTemplate,
    insertTemplate,
    createFromTemplate,
    loadTemplates,
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  const commonTemplates = [
    { name: "nav", container: "#navbar-container" },
    { name: "services-section", container: "#services-section-container" },
    { name: "articles-promo-section", container: "#articles-promo-container" },
    { name: "footer", container: "#footer-container" },
  ];

  window.templateLoader
    .loadTemplates(commonTemplates)
    .then(() => {
      document.dispatchEvent(new CustomEvent("templates-loaded"));
      console.log("Common templates loaded and initialized");
    })
    .catch((error) => {
      console.error("Failed to load common templates:", error);
    });
});
