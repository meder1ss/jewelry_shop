var cart = {}; // корзина
function init() {
    $.getJSON("goods.json", goodsOut);
}
function goodsOut(data) {
    // вывод на страницу
    console.log(data);
    var out='';
    for (var key in data) {
        out +='<div class="cart">';
        out +=`<p class="name">${data[key].name}</p>`;
        out +=`<img src="images/${data[key].img}" alt="">`;
        out +=`<div class="cost">${data[key].cost}</div>`;
        out += `<div class = "descr">${data[key].description}</div>`;
        out +=`<button class="add-to-cart" data-id="${key}">Купить</button>`;
        out +='</div>';
    }
    $('.goods-out').html(out);
    $('.add-to-cart').on('click', addToCart);
}

function addToCart() {
    //добавляем товар в корзину
    var id = $(this).attr('data-id');
    // console.log(id);
    if (cart[id]==undefined) {
        cart[id] = 1;
    }
    else {
        cart[id]++;
    }
    console.log(id);
    showMiniCart();
    saveCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showMiniCart() {
    var out="В корзине сейчас: ";
    var count = 0;
    for (var key in cart) {
        count += cart[key];
    }
    if (count != 0) {
        out += count;
        out += " товар(а/ов) <br>";
        $('.mini-cart').html(out);
    }
}

function loadCart() {
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        showMiniCart();
    }
}
$(document).ready(function () {
    init();
    loadCart();
});
