const productsSection = document.querySelector('#products_section');
const productsPages = createPages();
let currentPage = document.querySelector('.pg_0');
let page_counter = 1;
let product_counter = 0;
const createNewPage = () => {
    addButton(page_counter);
    const newPage = createDiv(`products_page pg_${page_counter++}`)
    newPage.hidden = true;
    productsSection.appendChild(newPage);
    currentPage = newPage;
}
const addButton = (number) => {
    const pageButton = document.createElement('button');
    pageButton.innerText = number;
    pageButton.addEventListener('click', pageChangeHandler);
    productsPages.appendChild(pageButton);
}
const pageChangeHandler = (e) => {
    const pageNumber = parseInt(e.target.innerText) - 1;
    const currentPage = document.querySelector('.current_page');
    const nextPage = document.querySelector(`.pg_${pageNumber}`)
    currentPage.classList.remove('current_page');
    nextPage.classList.add('current_page');
    currentPage.hidden = true;
    nextPage.hidden = false;
    window.scrollTo(0, 0);
}
/**Load data after document is fully load*/
document.addEventListener("DOMContentLoaded", () => {
    fetch('products.json', {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        }
    })
        .then(res => res.json())
        .then(data => {
            const products = data;
            products.forEach(element => {
                if (product_counter > 9) {
                    createNewPage();
                    product_counter = 0;
                }
                const product = createProduct(element);
                currentPage.appendChild(product);
                product_counter++;
            });
            productsSection.appendChild(productsPages);
        });

});
