/**
 * main.js
 *
 * used as the main client side js file
 *
 * @author: Jae Sung Song
 * @license:
 * @version: 1.0.0
 * @see README
 */

msgCloseButton();

function msgCloseButton() {
  var msg = document.querySelector('.close.icon')
  if (msg) {
    msg.addEventListener('click', (event) => {
      msg.parentNode.parentNode.removeChild(msg.parentNode);
    });
  }
};
