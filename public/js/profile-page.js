async function init() {
    try {
        await import("./profile.js");
        await import("./main.js");
        const { initCalendar } = await import("./calendar.js"); // Імпортуємо функцію
        initCalendar();
        console.log("Скрипти успішно завантажені");
    } catch (error) {
        console.error("Помилка завантаження скриптів:", error);
    }
  }
  document.addEventListener("DOMContentLoaded", () => {
    init();
  });