/**
 *@name Global Scripts
 *@file This brings all the scripts together, to be used.
 *@copyright ChrisPond.com
 *@author Chris Pond
 *@version 1.0.0
 */

// COMPONENT SCRIPTS
import { CookiesDisclaimer } from '../../components/cookies-disclaimer/scripts';

// GLOBAL OBJECTS
window.CookiesDisclaimer = CookiesDisclaimer;

//Cookie Disclaimer Initialization
const cookiesDisclaimerContainer = document.querySelector('#cookies-disclaimer');

if (cookiesDisclaimerContainer) {
  new CookiesDisclaimer(cookiesDisclaimerContainer);
}
