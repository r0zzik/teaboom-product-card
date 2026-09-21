const packages = document.querySelectorAll('.product__package');
const skuEl = document.getElementById('sku');
const priceOldEl = document.getElementById('priceOld');
const priceCurrentEl = document.getElementById('priceCurrent');

const zoomBtn = document.getElementById('zoomBtn');
const closeBtn = document.getElementById('closeBtn');
const modal = document.getElementById('modal');

const commentBtn = document.querySelector('.product__comment');
const commentTxt = document.querySelector('.product__comment-text');
const favoriteBtn = document.querySelector('.product__favorite');
const favoriteTxt = document.querySelector('.product__favorite-text');
const cartBtn = document.querySelector('.product__cart');
const cartTxt = document.querySelector('.product__cart-text');

const cartState = {};

// КНОПКА комментарий, в избранное и корзина

commentBtn.addEventListener('click', () => {
    commentBtn.classList.toggle('product__comment--active');
    commentTxt.textContent = commentBtn.classList.contains('product__comment--active')
        ? 'Отзыв оставлен'
        : 'Оставить отзыв';
});

// КНОПКА в избранное

favoriteBtn.addEventListener('click', () => {
    favoriteBtn.classList.toggle('product__favorite--active');
    favoriteTxt.textContent = favoriteBtn.classList.contains('product__favorite--active')
        ? 'В избранном'
        : 'В избранноe';
});

// КНОПКА корзина

cartBtn.addEventListener('click', () => {
    const activePackage = document.querySelector('.product__package--active');
    if(!activePackage) return;

    const weight = activePackage.dataset.weight;

    // Переключаем состояние для текущей фасовки
    cartState[weight] = !cartState[weight];

    // Обновляем кнопку
    if (cartState[weight]) {
        cartBtn.classList.add('product__cart--active');
        cartTxt.textContent = 'В корзине';
    } else {
        cartBtn.classList.remove('product__cart--active');
        cartTxt.textContent = 'В корзину';
    }
});

// КНОПКИ ФАСОВКИ Данные

const data = {
    100: { sku: '01306', old: 349.20, current: 326.40 },
    500: { sku: '01307', old: 1646, current: 1432 },
    1000: { sku: '01308', old: 2592, current: 2064 },
    5000: { sku: '01309', old: 8710, current: 6320 }
};

// КНОПКИ ФАСОВКИ Формат цен
function formatPrice(number) {
    return number.toLocaleString('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) + ' ₽'
}

// КНОПКИ ФАСОВКИ

packages.forEach(btn => {
    btn.addEventListener('click', () => {
        // Убрать активную у всех
        packages.forEach(b => b.classList.remove('product__package--active'));
        // Добавить активную текущей
        btn.classList.add('product__package--active');
        
        // Взять данные
        const info = data[btn.dataset.weight];
        
        // Обновить 
        skuEl.textContent = info.sku;
        priceOldEl.textContent = formatPrice(info.old);
        priceCurrentEl.textContent = formatPrice(info.current);

        // Обновить состояние кнопки корзины
        const weight = btn.dataset.weight;
        if (cartState[weight]) {
            cartBtn.classList.add('product__cart--active');
            cartTxt.textContent = 'В корзине';
        } else {
            cartBtn.classList.remove('product__cart--active');
            cartTxt.textContent = 'В корзину';
        }
    });
});

// УВЕЛИЧЕНИЕ КАРТИНКИ

zoomBtn.addEventListener('click', () => {
    modal.classList.add('product__modal--open');
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('product__modal--open');
});