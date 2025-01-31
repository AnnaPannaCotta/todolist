async function init() {
  try {
      await import("./index.header-nav.js");
      // await import("./profile.js");
      await import("./script.js");
      console.log("Скрипти успішно завантажені");
  } catch (error) {
      console.error("Помилка завантаження скриптів:", error);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  init();
});