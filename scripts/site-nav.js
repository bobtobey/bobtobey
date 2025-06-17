// site-nav.js
// Build the template once when the module is evaluated
const navTemplate = document.createElement('template');
navTemplate.innerHTML = /*html*/`
  <nav>
    <ul class="nav-menu">
      <li><a data-page="home"      href="index.html">Home</a></li>
      <li class="nav-dropdown">
        <a data-page="portfolio"   href="portfolio.html">
          Case Studies
          <svg class="icon-caret" xmlns="http://www.w3.org/2000/svg" width="24"
               height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </a>
        <ul class="dropdown-menu">
          <li><a data-page="clients" href="clients.html">Client History</a></li>
        </ul>
      </li>
      <li><a data-page="about"     href="about.html">About</a></li>
      <li><a data-page="contact"   href="contact.html">Contact</a></li>
    </ul>
  </nav>
`;

// Declares a new custom element extending HTMLElement to behaves like a native HTML element with lifecycle hooks.
class SiteNav extends HTMLElement {
  // Specifies which attributes to observe for changes.
  static observedAttributes = ['active'];

  // Built-in Web Component lifecycle method that runs when the element is added to the DOM
  connectedCallback() {
    if (!this.hasChildNodes()) {
        // Append the template content to the custom element only if it has no child nodes.
        this.appendChild(navTemplate.content.cloneNode(true));
    }
    // Calls a private method to highlight the active navigation link.
    this.#highlight();
  }

  // Built-in Web Component lifecycle method that runs when an observed attribute changes
  attributeChangedCallback() { 
    this.#highlight(); 
  }  

  // Private method to highlight the active navigation link based on the 'active' attribute or current page
  #highlight() {
    const activeKey =
      this.getAttribute('active') ||
      document.body.dataset.page ||
      (location.pathname.split('/').pop().replace('.html', '') || 'home');

    // 1. Clear all possible active states
    this.querySelectorAll('a').forEach(function(a) {
        a.classList.remove('nav-link-active');
        a.classList.remove('nav-link-dropdown-active');
        a.classList.remove('nav-link-dropdown-active-parent');
    });

    // 2. Highlight matching item(s)
    this.querySelectorAll('a').forEach(function(a) {
        if (a.dataset.page === activeKey) {
            a.classList.add('nav-link-active');

            // Check if this is a submenu item
            const dropdown = a.closest('.dropdown-menu');
            if (dropdown) {
                a.classList.add('nav-link-dropdown-active');

                const parentDropdown = dropdown.closest('.nav-dropdown');
                const parentLink = parentDropdown?.querySelector('a[data-page]');
                if (parentLink) {
                    parentLink.classList.add('nav-link-dropdown-active-parent');
                }
            }
        }
    });
  }
}

// The custom element is registered with the browser, allowing it to be used in HTML documents.
customElements.define('site-nav', SiteNav);
export { SiteNav };
