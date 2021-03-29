// Custom errors for this component
export const errors = {
  elementRequired: 'CpTrimString requires element paramter to be defined',
  elementObject: 'CpTrimString requires element be an object',
};

/**
 * @name CpTrimString
 * @description
 * @param {object} element - Required: DOM element
 * @param {object} textLimit - Optional: Character limit. Default is 50.
 * @example
 * new CpTrimString(document.querySelector('.cp-trim-string'));
 */

export class CpTrimString {
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
      typeof textLimit !== 'number' ? 50 : textLimit;

    //Properties
    this.originalText = this.element.innerHTML;

    //Init
    this._trimString();
  }

  /**
   * @name destroy
   * @description Handles destroying an instance of CpTrimString
   * @memberof CpTrimString
   * @method
   * @public
   */
  destroy() {
    this.element.innerHTML = this.originalText;
    this.element.classList.remove('trimmed');
  }

  /**
   * @name _trimString
   * @description Trims string if it exceeds the max text limit
   * @memberof CpTrimString
   * @method
   * @private
   */
  _trimString() {
    const originalTextLength = this.originalText.length;

    //Get text that fits within text limit
    const limitText = this.originalText.substr(0, this.textLimit);

    //Adjust trimmed text by making sure we don't cut the middle of a word
    const trimText = this.originalText.substr(
      Math.min(limitText.length, limitText.lastIndexOf(' '))
    );

    //Remove extra text
    const newParagraph = this.originalText.replace(trimText, '');

    //Only trim the string if it exceeds the text limit
    if (originalTextLength > this.textLimit) {
      this.element.innerHTML = newParagraph;
      this.element.classList.add('trimmed');
    }
  }
}
