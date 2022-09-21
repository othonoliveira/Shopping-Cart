const itemSection = document.querySelector('.items');
const cartItems = document.querySelectorAll('.cart__items')[0];
const cartPrice = document.querySelector('.total-price');
const clearCartButton = document.querySelector('.empty-cart');
const loadingMassage = document.querySelector('.loading');

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

const getFullCartPrice = () => {
  let result = 0;
  for (let index = 0; index < cartItems.children.length; index += 1) {
    const price = parseFloat(cartItems.children[index].innerText.split('PRICE: $')[1], 10);
    result += price;
  }
  cartPrice.innerHTML = result.toFixed(2);
};

 const cartItemClickListener = (element) => {
  element.target.remove();
  getFullCartPrice();
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const appendItem = (father, child) => father.appendChild(child);

const appendToCart = (product) => {
  const cartElement = createCartItemElement(product);
  appendItem(cartItems, cartElement);
  saveCartItems(cartItems.innerHTML);
  getFullCartPrice();
};

const populateCart = async () => {
  cartItems.innerHTML = await getSavedCartItems();
  for (let index = 0; index < cartItems.children.length; index += 1) {
    cartItems.children[index].addEventListener('click', cartItemClickListener);
  }
  getFullCartPrice();
};

const populateOptions = async (product) => {
  try {
    const response = await fetchProducts(product);
    loadingMassage.remove();
    response.results.forEach((element) => {
      const itemElement = createProductItemElement(element);
      itemElement.lastChild.addEventListener('click', async () => {
        const itemResponse = await fetchItem(element.id);
        appendToCart(itemResponse);
      });
      appendItem(itemSection, itemElement);
    });
  } catch (error) {
    return error;
  }
};

clearCartButton.addEventListener('click', () => {
  cartItems.innerHTML = '';
  saveCartItems(cartItems.innerHTML);
  getFullCartPrice();
});

window.onload = () => {
  populateOptions('computador');
  populateCart();
};
