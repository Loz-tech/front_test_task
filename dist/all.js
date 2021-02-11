"use strict";

function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }

/**Make random bonus score */
var getRandom = function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
};
/**---For generating dom objects---*/


var createHtmlElement = function createHtmlElement(elementName) {
  return function (className) {
    var innerHTML = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    return Object.assign(document.createElement(elementName), {
      className: className,
      innerHTML: innerHTML
    });
  };
};

var createParagraph = createHtmlElement('p');
var createSpan = createHtmlElement('span');
var createDiv = createHtmlElement('div');
/**---Partials of product component---*/

var createProductCode = function createProductCode(code) {
  return createDiv('product_code', "\u041A\u043E\u0434:".concat(parseInt(code)));
};

var createProductStatus = function createProductStatus(status) {
  return createDiv('product_status_tooltip_container', "<span class=\"product_status\">".concat(status ? "Наличие" : "Нет в наличие", "</span>"));
};

var createProductImage = function createProductImage(img) {
  return createDiv('product_photo', "<a href=\"#\" class=\"url--link product__link\">\n        <img src=\"".concat(img.slice(0, -4), "_220x220_1.jpg\">\n    </a>"));
};

var createProductDescription = function createProductDescription(description) {
  return createDiv('product_description', "\n    <a href=\"#\" class=\"product__link\">\n        ".concat(description, "\n    </a>"));
};

var createUnits = function createUnits(unitAlt, unit) {
  return createDiv('product_units', "\n    <div class=\"unit--wrapper\">\n        <div class=\"unit--select unit--active\">\n            <p class=\"ng-binding\">\u0417\u0430 ".concat(unitAlt, "</p>\n        </div>\n        <div class=\"unit--select\">\n          <p class=\"ng-binding\">\u0417\u0430 ").concat(unit, "</p>\n        </div>\n    </div>\n"));
};

var createProductPrice = function createProductPrice(productType, priceType, paymentMethod, price) {
  return createParagraph("product_price_".concat(productType), "\n<span class=\"product_price_".concat(productType, "_text\">\n    ").concat(paymentMethod, "\n</span>\n<span class=\"").concat(priceType, "\">\n    ").concat(parseFloat(price).toFixed(2), "\n</span>\n"));
};

var createSpanRouble = function createSpanRouble(useType) {
  return createSpan('rouble__i black__i', "\n<svg\nversion=\"1.0\"\nid=\"rouble__b\"\nxmlns=\"http://www.w3.org/2000/svg\"\nx=\"0\"\ny=\"0\"\nwidth=\"30px\"\nheight=\"22px\"\nviewBox=\"0 0 50 50\"\nenable-background=\"new 0 0 50 50\"\nxml:space=\"preserve\"\n>\n  <use xmlns:xlink=\"http://www.w3.org/1999/xlink\" \n  xlink:href=\"#".concat(useType, "\">\n  </use>\n  </svg>\n</span>"));
};

var createProductPricePoints = function createProductPricePoints(score) {
  return createDiv('product_price_points', "\n    <p class=\"ng-binding\">\u041C\u043E\u0436\u043D\u043E \u043A\u0443\u043F\u0438\u0442\u044C \u0437\u0430 ".concat(score, " \u0431\u0430\u043B\u043B\u0430</p>\n"));
};

var createUnitPad = function createUnitPad() {
  return createDiv('list--unit-padd');
};

var createUnitDesc = function createUnitDesc(unit, unitRatioAlt, unitAlt) {
  return createDiv('list--unit-desc', "\n<div class=\"unit--info\">\n    <div class=\"unit--desc-i\"></div>\n    <div class=\"unit--desc-t\">\n    <p>\n        <span class=\"ng-binding\">\u041F\u0440\u043E\u0434\u0430\u0435\u0442\u0441\u044F \u0443\u043F\u0430\u043A\u043E\u0432\u043A\u0430\u043C\u0438:</span>\n        <span class=\"unit--infoInn\">1 ".concat(unit, " = ").concat(parseFloat(unitRatioAlt).toFixed(2), " ").concat(unitAlt, "\n    </span>\n  </p>\n</div>\n"));
};

var createProductWrapper = function createProductWrapper() {
  return createDiv('product__wrapper', "");
};

var createProductCountWrapper = function createProductCountWrapper() {
  return createDiv('product_count_wrapper', " \n<div class=\"stepper\">\n    <input\n    class=\"product__count stepper-input\"\n    type=\"number\"\n    value=\"1\"\n    />\n    <span class=\"stepper-arrow up\"></span>\n    <span class=\"stepper-arrow down\"></span>\n</div>");
};

var createButton = function createButton() {
  return createSpan('btn btn_cart', "\n<svg class=\"ic ic_cart\">\n<use\n  xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n  xlink:href=\"#cart\">\n</use>\n<span class=\"ng-binding\">\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0443</span>\n");
};

var createPages = function createPages() {
  return createDiv('products_pages');
};
/**
 * event Handlers
 */


var unitHandler = function unitHandler(e, product) {
  if (e.target.className === 'ng-binding') {
    var current = e.target.parentNode;
    var active = product.querySelector('.unit--active');
    current.classList.toggle('unit--active');
    active.classList.toggle('unit--active');
    product.classList.toggle('alt');
  }
};

var arrowHandler = function arrowHandler(e, counter) {
  var arrow = e.target;
  var value = parseInt(counter.value);

  if (arrow.classList.contains('stepper-arrow')) {
    var count = arrow.classList.contains('up') ? value + 1 : value - 1;
    counter.value = count;
    var input = new Event('input');
    counter.dispatchEvent(input);
  }
};

var changeHandler = function changeHandler(e, prices, pricesComponents) {
  var value = e.target.value;
  console.log(value);

  if (parseInt(value) < 0) {
    e.target.value = 1;
    value = (_readOnlyError("value"), 1);
  }

  pricesComponents.forEach(function (element, index) {
    var price = (prices[index] * value).toFixed(2);
    element.childNodes[3].innerText = price;
  });
};
/**Building Product Component */


var createProduct = function createProduct(product) {
  var productId = product.productId,
      code = product.code,
      title = product.title,
      primaryImageUrl = product.primaryImageUrl,
      unit = product.unit,
      unitRatioAlt = product.unitRatioAlt,
      unitAlt = product.unitAlt,
      priceRetail = product.priceRetail,
      priceGold = product.priceGold,
      priceRetailAlt = product.priceRetailAlt,
      priceGoldAlt = product.priceGoldAlt,
      isActive = product.isActive;
  var productComponent = createDiv('product product_horizontal alt', "");
  var productCode = createProductCode(code);
  var productStatus = createProductStatus(isActive);
  var productImage = createProductImage(primaryImageUrl);
  var productDescription = createProductDescription(title);
  var productUnits = createUnits(unitAlt, unit);
  productUnits.addEventListener('click', function (e) {
    return unitHandler(e, productComponent);
  });
  var productPriceDefault = createProductPrice('default alternative', 'retailPrice', '', priceRetail);
  productPriceDefault.appendChild(createSpanRouble('rouble_gray'));
  var productPriceClub = createProductPrice('club_card alternative', 'goldPrice', 'По карте клуба', priceGold);
  productPriceClub.appendChild(createSpanRouble('rouble_black'));
  var productPricePackage = createProductPrice('default package', 'retailPrice', '', priceRetailAlt);
  productPricePackage.appendChild(createSpanRouble('rouble_gray'));
  var productPricePackageClub = createProductPrice('club_card package', 'goldPrice', 'По карте клуба', priceGoldAlt);
  productPricePackageClub.appendChild(createSpanRouble('rouble_black'));
  var productPoints = createProductPricePoints(getRandom(100, 400));
  var productUnitPad = createUnitPad();
  var productUnitDesc = createUnitDesc(unit, unitRatioAlt, unitAlt);
  var productWrapper = createProductWrapper();
  var productCountWrapper = createProductCountWrapper();
  var counter = productCountWrapper.childNodes[1].childNodes[1];
  counter.addEventListener('input', function (e) {
    return changeHandler(e, [priceRetail, priceRetailAlt, priceGold, priceGoldAlt], [productPriceDefault, productPricePackage, productPriceClub, productPricePackageClub]);
  });
  productCountWrapper.addEventListener('click', function (e) {
    return arrowHandler(e, counter);
  });
  var productButton = createButton();
  productButton.setAttribute('data-url', '/cart/');
  productButton.setAttribute('data-product-id', productId);
  productWrapper.appendChild(productCountWrapper);
  productWrapper.appendChild(productButton);
  productComponent.append(productCode, productStatus, productImage, productDescription, productUnits, productPricePackageClub, productPricePackage, productPriceClub, productPriceDefault, productPoints, productUnitPad, productUnitDesc, productWrapper);
  return productComponent;
};
"use strict";

var productsSection = document.querySelector('#products_section');
var productsPages = createPages();
var currentPage = document.querySelector('.pg_0');
var page_counter = 1;
var product_counter = 0;

var createNewPage = function createNewPage() {
  addButton(page_counter);
  var newPage = createDiv("products_page pg_".concat(page_counter++));
  newPage.hidden = true;
  productsSection.appendChild(newPage);
  currentPage = newPage;
};

var addButton = function addButton(number) {
  var pageButton = document.createElement('button');
  pageButton.innerText = number;
  pageButton.addEventListener('click', pageChangeHandler);
  productsPages.appendChild(pageButton);
};

var pageChangeHandler = function pageChangeHandler(e) {
  var pageNumber = parseInt(e.target.innerText) - 1;
  var currentPage = document.querySelector('.current_page');
  var nextPage = document.querySelector(".pg_".concat(pageNumber));
  currentPage.classList.remove('current_page');
  nextPage.classList.add('current_page');
  currentPage.hidden = true;
  nextPage.hidden = false;
  window.scrollTo(0, 0);
};
/**Load data after document is fully load*/


document.addEventListener("DOMContentLoaded", function () {
  fetch('products.json', {
    method: "GET",
    headers: {
      "Content-type": "application/json"
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    var products = data;
    products.forEach(function (element) {
      if (product_counter > 9) {
        createNewPage();
        product_counter = 0;
      }

      var product = createProduct(element);
      currentPage.appendChild(product);
      product_counter++;
    });
    productsSection.appendChild(productsPages);
  });
});
//# sourceMappingURL=all.js.map
