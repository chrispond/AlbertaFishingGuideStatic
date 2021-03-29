// Custom errors for this component
export const errors = {
  elementRequired: 'CookiesDisclaimer requires element paramter to be defined',
  elementObject: 'CookiesDisclaimer requires element be an object',
};

/**
 * @name CookiesDisclaimer
 * @description
 * @param {object} element - Required: DOM element
 * @example
 * new CookieDisclaimer(document.querySelector('#cookies-disclaimer'));
 */
export class CookiesDisclaimer {
  constructor(element) {
    // Validate 'element' exists and is an object; otherwise error
    if (!element) {
      throw new Error(errors.elementRequired);
    } else if (typeof element !== 'object') {
      throw new Error(errors.elementObject);
    }

    //Param
    this.element = element;

    //DOM Elements
    this.acceptButton = element.querySelector('.button-accept');
    this.closeButton = element.querySelector('.button-close');

    //Bind Event Methods
    this._acceptDisclaimerBound = this._acceptDisclaimer.bind(this);
    this.closeDisclaimerBound = this.closeDisclaimer.bind(this);

    //Init
    this._addEvents();
  }

  /**
   * @name _acceptDisclaimer
   * @description Handles updating cookies permissions for google adsense and analytics
   * @memberof CookiesDisclaimer
   * @method
   * @private
   */

   _acceptDisclaimer() {
    if(window.gtag && typeof window.gtag === 'function') {
      gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted'
      });

      this.closeDisclaimer();
    }
  }

  /**
   * @name _addEvents
   * @description Handles adding event listeners for CookiesDisclaimer
   * @memberof CookiesDisclaimer
   * @method
   * @private
   */
  _addEvents() {
    this.acceptButton.addEventListener('click', this._acceptDisclaimerBound);
    this.closeButton.addEventListener('click', this.closeDisclaimerBound);
  }

  /**
   * @name closeDisclaimer
   * @description Handles hiding the cookies disclaimer
   * @memberof CookiesDisclaimer
   * @method
   * @public
   */
   closeDisclaimer() {
    this.element.classList.add('hide');
  }

  /**
   * @name destroy
   * @description Handles destroying an instance of CookiesDisclaimer
   * @memberof CookiesDisclaimer
   * @method
   * @public
   */
  destroy() {
    this._removeEvents();
  }

  /**
   * @name openDisclaimer
   * @description Handles showing the cookies disclaimer
   * @memberof CookiesDisclaimer
   * @method
   * @public
   */
   openDisclaimer() {
    this.element.classList.remove('hide');
  }

  /**
   * @name _removeEvents
   * @description Handles removing event listeners for CookiesDisclaimer
   * @memberof CookiesDisclaimer
   * @method
   * @private
   */
  _removeEvents() {
    this.acceptButton.removeEventListener('click', this._acceptDisclaimer);
    this.closeButton.removeEventListener('click', this.closeDisclaimer);
  }
}
