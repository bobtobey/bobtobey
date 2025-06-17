// site-header.js
import './site-nav.js';

// Creates an in-memory DOM element
const headerTemplate = document.createElement('template');
headerTemplate.innerHTML = /*html*/`
  <header>
    <div class="header-wrapper">
      <div class="header-branding-wrapper">
        <a href="index.html" title="Home - Bob Tobey UX Portfolio">
          <span><img src="images/logos/bgs_logo-40.png" alt="BobTobey.com"></span>
        </a>
      </div>

      <site-nav></site-nav>
    </div>
  </header>
`;

// Declares a new custom element extending HTMLElement to behaves like a native HTML element with lifecycle hooks.
class SiteHeader extends HTMLElement {
  // Specifies which attributes to observe for changes.  
  static observedAttributes = ['active'];

  // Built-in Web Component lifecycle method that runs when the element is added to the DOM
  connectedCallback() {
    // Prevents double-inserting content. 
    if (!this.hasChildNodes()) {
        // this.innerHTML = HEADER_HTML;
        this.appendChild(headerTemplate.content.cloneNode(true));
    }
    // Calls a private method to apply the 'active' attribute to the site-nav component.
    this.#forwardActive();
  }
  // Built-in Web Component lifecycle method that runs when an observed attribute changes
  attributeChangedCallback() { 
    this.#forwardActive(); 
  }

  // Private method to forward the 'active' attribute to the site-nav component
  #forwardActive() {
    const key = this.getAttribute('active');
    if (key) {
        // If the 'active' attribute is set, it updates the site-nav component with the active page key.
        // '?' is part of optional chaining, introduced in ES2020
        this.querySelector('site-nav')?.setAttribute('active', key);
    }
  }
}

// The custom element is registered with the browser, allowing it to be used in HTML documents.
// The name must contain a hyphen to avoid conflicts with built-in elements.
customElements.define('site-header', SiteHeader);
export { SiteHeader };
