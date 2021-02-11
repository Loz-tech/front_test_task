/**Make random bonus score */
const getRandom = (min, max) => Math.round(Math.random() * (max - min) + min);
/**---For generating dom objects---*/
const createHtmlElement = elementName => (className, innerHTML = '') => Object.assign(document.createElement(elementName), { className, innerHTML });
const createParagraph = createHtmlElement('p');
const createSpan = createHtmlElement('span');
const createDiv = createHtmlElement('div');
/**---Partials of product component---*/
const createProductCode = code => createDiv('product_code', `Код:${parseInt(code)}`);
const createProductStatus = status => createDiv('product_status_tooltip_container', `<span class="product_status">${status ? "Наличие" : "Нет в наличие"}</span>`);
const createProductImage = img => createDiv(
    'product_photo',
    `<a href="#" class="url--link product__link">
        <img src="${img.slice(0, -4)}_220x220_1.jpg">
    </a>`
);
const createProductDescription = description => createDiv(
    'product_description',
    `
    <a href="#" class="product__link">
        ${description}
    </a>`
);
const createUnits = (unitAlt, unit) => createDiv('product_units', `
    <div class="unit--wrapper">
        <div class="unit--select unit--active">
            <p class="ng-binding">За ${unitAlt}</p>
        </div>
        <div class="unit--select">
          <p class="ng-binding">За ${unit}</p>
        </div>
    </div>
`);
const createProductPrice = (productType, priceType, paymentMethod, price) => createParagraph(`product_price_${productType}`, `
<span class="product_price_${productType}_text">
    ${paymentMethod}
</span>
<span class="${priceType}">
    ${parseFloat(price).toFixed(2)}
</span>
`);
const createSpanRouble = (useType) => createSpan('rouble__i black__i', `
<svg
version="1.0"
id="rouble__b"
xmlns="http://www.w3.org/2000/svg"
x="0"
y="0"
width="30px"
height="22px"
viewBox="0 0 50 50"
enable-background="new 0 0 50 50"
xml:space="preserve"
>
  <use xmlns:xlink="http://www.w3.org/1999/xlink" 
  xlink:href="#${useType}">
  </use>
  </svg>
</span>`);
const createProductPricePoints = score => createDiv('product_price_points', `
    <p class="ng-binding">Можно купить за ${score} балла</p>
`)
const createUnitPad = () => createDiv('list--unit-padd');
const createUnitDesc = (unit, unitRatioAlt, unitAlt) => createDiv('list--unit-desc', `
<div class="unit--info">
    <div class="unit--desc-i"></div>
    <div class="unit--desc-t">
    <p>
        <span class="ng-binding">Продается упаковками:</span>
        <span class="unit--infoInn">1 ${unit} = ${parseFloat(unitRatioAlt).toFixed(2)} ${unitAlt}
    </span>
  </p>
</div>
`)
const createProductWrapper = () => createDiv('product__wrapper', ``)
const createProductCountWrapper = () => createDiv('product_count_wrapper', ` 
<div class="stepper">
    <input
    class="product__count stepper-input"
    type="number"
    value="1"
    />
    <span class="stepper-arrow up"></span>
    <span class="stepper-arrow down"></span>
</div>`);
const createButton = () => createSpan('btn btn_cart', `
<svg class="ic ic_cart">
<use
  xmlns:xlink="http://www.w3.org/1999/xlink"
  xlink:href="#cart">
</use>
<span class="ng-binding">В корзину</span>
`);
const createPages = () => createDiv('products_pages');
/**
 * event Handlers
 */
const unitHandler = (e, product) => {
    if (e.target.className === 'ng-binding') {
        const current = e.target.parentNode;
        const active = product.querySelector('.unit--active');
        current.classList.toggle('unit--active');
        active.classList.toggle('unit--active');
        product.classList.toggle('alt');
    }
}
const arrowHandler = (e, counter) => {
    const arrow = e.target;
    const value = parseInt(counter.value);
    if (arrow.classList.contains('stepper-arrow')) {
        let count = arrow.classList.contains('up') ? value + 1 : value - 1;
        counter.value = count;
        const input = new Event('input');
        counter.dispatchEvent(input);
    }
}
const changeHandler = (e, prices, pricesComponents) => {
    const value = e.target.value;
    console.log(value);
    if (parseInt(value) < 0) {
        e.target.value = 1;
        value = 1;
    }
    pricesComponents.forEach((element, index) => {
        const price = (prices[index] * value).toFixed(2);
        element.childNodes[3].innerText = price;
    });

}
/**Building Product Component */
const createProduct = product => {
    const { productId, code, title, primaryImageUrl, unit, unitRatioAlt, unitAlt, priceRetail, priceGold, priceRetailAlt, priceGoldAlt, isActive } = product;
    const productComponent = createDiv('product product_horizontal alt', ``);
    const productCode = createProductCode(code);
    const productStatus = createProductStatus(isActive);
    const productImage = createProductImage(primaryImageUrl);
    const productDescription = createProductDescription(title);
    const productUnits = createUnits(unitAlt, unit);
    productUnits.addEventListener('click', (e) => unitHandler(e, productComponent));

    const productPriceDefault = createProductPrice('default alternative', 'retailPrice', '', priceRetail);
    productPriceDefault.appendChild(createSpanRouble('rouble_gray'));

    const productPriceClub = createProductPrice('club_card alternative', 'goldPrice', 'По карте клуба', priceGold);
    productPriceClub.appendChild(createSpanRouble('rouble_black'));

    const productPricePackage = createProductPrice('default package', 'retailPrice', '', priceRetailAlt);
    productPricePackage.appendChild(createSpanRouble('rouble_gray'));

    const productPricePackageClub = createProductPrice('club_card package', 'goldPrice', 'По карте клуба', priceGoldAlt);
    productPricePackageClub.appendChild(createSpanRouble('rouble_black'));

    const productPoints = createProductPricePoints(getRandom(100, 400));
    const productUnitPad = createUnitPad();
    const productUnitDesc = createUnitDesc(unit, unitRatioAlt, unitAlt);

    const productWrapper = createProductWrapper();
    const productCountWrapper = createProductCountWrapper();
    const counter = productCountWrapper.childNodes[1].childNodes[1];
    counter.addEventListener('input', (e) => changeHandler(e, [priceRetail, priceRetailAlt, priceGold, priceGoldAlt], [productPriceDefault, productPricePackage, productPriceClub, productPricePackageClub]));
    productCountWrapper.addEventListener('click', (e) => arrowHandler(e, counter));

    const productButton = createButton();
    productButton.setAttribute('data-url', '/cart/');
    productButton.setAttribute('data-product-id', productId);
    productWrapper.appendChild(productCountWrapper);
    productWrapper.appendChild(productButton);
    productComponent.append(
        productCode, productStatus, productImage,
        productDescription, productUnits,
        productPricePackageClub, productPricePackage,
        productPriceClub, productPriceDefault,
        productPoints, productUnitPad,
        productUnitDesc, productWrapper
    );
    return productComponent;
}
