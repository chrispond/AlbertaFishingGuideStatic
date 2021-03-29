// Custom errors for this component
export const errors = {
  elementRequired: 'CpTrimParagraph requires element paramter to be defined',
  elementObject: 'CpTrimParagraph requires element be an object',
};

/**
 * @name CpTrimParagraph
 * @description
 * @param {object} element - Required: DOM element
 * @param {object} textLimit - Optional: Character limit. Default is 270.
 * @example
 * new CpTrimParagraph(document.querySelector('.cp-trim-paragraph'));
 */
export class CpTrimParagraph {
  constructor(element, textLimit) {
    // Validate 'element' exists and is an object; otherwise error
    if (!element) {
      throw new Error(errors.elementRequired);
    } else if (typeof element !== 'object') {
      throw new Error(errors.elementObject);
    }

    //Param
    this.element = element;
    this.textLimit = this.textLimit =
      typeof textLimit !== 'number' ? 270 : textLimit;

    //DOM Elements
    this.readMoreLink = this._buildReadMore();

    //Properties
    this.originalText = this.element.innerHTML;

    //Bind Event Methods
    this._toggleTextBound = this._toggleText.bind(this);

    //Init
    this._trimParagraph();
  }

  /**
   * @name _addEvents
   * @description Handles adding event listeners for CpTrimParagraph
   * @memberof CpTrimParagraph
   * @method
   * @private
   */
  _addEvents() {
    //Click handler for read more link
    this.readMoreLink.addEventListener('click', this._toggleTextBound);
  }

  /**
   * @name _buildReadMore
   * @description Builds a read more link
   * @memberof CpTrimParagraph
   * @method
   * @private
   */
  _buildReadMore() {
    const link = document.createElement('a');
    link.setAttribute('href', '#');
    link.setAttribute('data-gtm-event-cta', 'read-more');
    link.classList.add('cp-trim-paragraph-read-more');
    link.innerText = 'Read more';
    return link;
  }

  /**
   * @name destroy
   * @description Handles destroying an instance of CpTrimParagraph
   * @memberof CpTrimParagraph
   * @method
   * @public
   */
  destroy() {
    this._removeEvents();
    this.readMoreLink.remove();
    this.element.innerHTML = this.originalText;
  }

  /**
   * @name _removeEvents
   * @description Handles removing event listeners for CpTrimParagraph
   * @memberof CpTrimParagraph
   * @method
   * @private
   */
  _removeEvents() {
    //Click handler for read more link
    this.readMoreLink.removeEventListener('click', this._toggleTextBound);
  }

  /**
   * @name _toggleText
   * @description Handles hiding/showing trimmed paragraph text and updating read more link text
   * @memberof CpTrimParagraph
   * @method
   * @private
   */

  _toggleText(event) {
    event.preventDefault();

    if (this.element.classList.contains('show')) {
      this.element.classList.remove('show');
      this.readMoreLink.innerText = 'Read more';
    } else {
      this.element.classList.add('show');
      this.readMoreLink.innerText = 'Hide text';
    }
  }

  /**
   * @name _trimParagraph
   * @description Trims paragraph if it exceeds the max text limit
   * @memberof CpTrimParagraph
   * @method
   * @private
   */
  _trimParagraph() {
    const originalTextLength = this.originalText.length;

    //Get text that fits within text limit
    const limitText = this.originalText.substr(0, this.textLimit);

    //Adjust trimmed text by making sure we don't cut the middle of a word
    const trimText = this.originalText.substr(
      Math.min(limitText.length, limitText.lastIndexOf(' '))
    );

    //Create new paragraph and wrap trimmed text in a span element so we can hide it
    const newParagraph = this.originalText.replace(
      trimText,
      `<span class="cp-trim-paragraph-ellipsis"></span><span class="cp-trim-paragraph-extra">${trimText}</span><br /> `
    );

    //Only the paragraph if it exceeds the text limit
    if (originalTextLength > this.textLimit) {
      this.element.innerHTML = newParagraph;
      this.element.appendChild(this.readMoreLink);
      this._addEvents();
    }
  }
}
