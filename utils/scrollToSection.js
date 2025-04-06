// utils/scrollToSection.js
export const navigateAndScroll = (router, path, targetId) => {
    if (router.pathname === path) {
      // If already on the same page
      document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(path).then(() => {
        setTimeout(() => {
          document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
        }, 300); // delay to allow the DOM to render
      });
    }
  };
  