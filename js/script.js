document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------
     MOBILE HEADER TOGGLE & WIDTH BEHAVIOR
  -------------------------------------- */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const header = document.getElementById("main-header");

  if (hamburger && mobileMenu && header) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");

      if (window.innerWidth < 768) {
        if (mobileMenu.classList.contains("hidden")) {
          header.classList.remove("w-1/2");
          header.classList.add("w-1/4");
        } else {
          header.classList.remove("w-1/4");
          header.classList.add("w-1/2");
        }
      }
    });

    // Ensure header starts correctly on mobile
    if (window.innerWidth < 768) {
      header.classList.remove("w-1/2");
      header.classList.add("w-1/4");
    }
  }

  /* --------------------------------------
     DESKTOP DROPDOWNS (MORE + SERVICES)
  -------------------------------------- */
  function setupDropdown(triggerId, dropdownId) {
    const trigger = document.getElementById(triggerId);
    const dropdown = document.getElementById(dropdownId);
    if (!trigger || !dropdown) return;

    const showDropdown = () => {
      dropdown.classList.remove("opacity-0", "invisible");
      dropdown.classList.add("opacity-100", "visible");
    };
    const hideDropdown = () => {
      dropdown.classList.remove("opacity-100", "visible");
      dropdown.classList.add("opacity-0", "invisible");
    };

    // Click toggle
    trigger.addEventListener("click", (e) => {
      dropdown.classList.contains("opacity-0") ? showDropdown() : hideDropdown();
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!trigger.contains(e.target) && !dropdown.contains(e.target)) hideDropdown();
    });

    // Hover open/close (for desktop)
    [trigger, dropdown].forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 768) showDropdown();
      });
      el.addEventListener('mouseleave', () => {
        if (window.innerWidth >= 768) hideDropdown();
      });
    });
  }

  setupDropdown("more-link", "more-dropdown");
  setupDropdown("services-link", "services-dropdown");

  /* --------------------------------------
     MOBILE DROPDOWN HANDLING
  -------------------------------------- */
  const mobileServices = document.getElementById("mobile-services");
  const mobileServicesDropdown = document.getElementById("mobile-services-dropdown");
  const mobileMore = document.getElementById("mobile-more");
  const mobileMoreDropdown = document.getElementById("mobile-more-dropdown");

  if (mobileServices && mobileServicesDropdown) {
    mobileServices.addEventListener("click", (e) => {
      e.preventDefault();
      mobileServicesDropdown.classList.toggle("hidden");
    });
  }

  if (mobileMore && mobileMoreDropdown) {
    mobileMore.addEventListener("click", (e) => {
      e.preventDefault();
      mobileMoreDropdown.classList.toggle("hidden");
    });
  }

  /* --------------------------------------
     CART COUNT & LOCAL STORAGE HANDLING
  -------------------------------------- */
  const cartCount = document.getElementById('cart-count');
  const cartCountMobile = document.getElementById('cart-count-mobile');

  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  function updateCartDisplay() {
    const count = cartItems.length;
    if (cartCount) {
      if (count > 0) {
        cartCount.textContent = count;
        cartCount.classList.remove('hidden');
      } else {
        cartCount.classList.add('hidden');
      }
    }
    if (cartCountMobile) {
      if (count > 0) {
        cartCountMobile.textContent = count;
        cartCountMobile.classList.remove('hidden');
      } else {
        cartCountMobile.classList.add('hidden');
      }
    }
  }

  // Listen for updates globally (other pages can dispatch this event)
  window.addEventListener('cartUpdated', () => {
    cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    updateCartDisplay();
  });

  // Initial load
  updateCartDisplay();

});
