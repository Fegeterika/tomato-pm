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

markActiveTab();
msgCloseButton();

function markActiveTab() {
  var currTab = document.getElementById('currTab').textContent;
  var menuItems = document.querySelectorAll('.item');

  for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].classList.remove('active');
    if (menuItems[i].textContent === currTab) {
      menuItems[i].classList.add('active');
    }
  }
}
