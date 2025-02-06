async function init() {
    try {
        await import("./profile.js");
        await import("./main.js");
        console.log("Скрипти успішно завантажені");
    } catch (error) {
        console.error("Помилка завантаження скриптів:", error);
    }
  }
  document.addEventListener("DOMContentLoaded", () => {
    init();
  });