async function init() {
  try {
      await import("./index.header-nav.js");
      await import("./index.registr.js");
      await import("./script.js");
      await import("./profile.js");
      console.log("Скрипти успішно завантажені");
  } catch (error) {
      console.error("Помилка завантаження скриптів:", error);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  init();
});


// function init() {
//    import("./index.header-nav.js");
//    import("./index.registr.js");
//    import("./script.js");  
//   }
  
//   const totalPartials = document.querySelectorAll(
//     '[hx-trigger="load"], [data-hx-trigger="load"]'
//   ).length;
//   let loadedPartialsCount = 0;
  
//   document.body.addEventListener("htmx:afterOnLoad", () => {
//     loadedPartialsCount++;
//     if (loadedPartialsCount === totalPartials) init();
//   });