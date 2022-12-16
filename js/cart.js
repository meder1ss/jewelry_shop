var cart = {};
function loadCart() {
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
            showCart();
        }
    else {
        $('.main-cart').html('Корзина пуста!');
    }
}

function showCart() {
    //вывод корзины
    if (!isEmpty(cart)) {
        $('.main-cart').html('Корзина пуста!');
    }
    else {
        $.getJSON('goods.json', function (data) {
            console.log(cart);
            var out = '';
            for (var id in cart) {
                out += `<button data-id="${id}" class="del-goods">x</button>`;
                out += `<img src="images/${data[id].img}">`;
                out += ` ${data[id].name  }`;
                out += `  <button data-id="${id}" class="minus-goods">-</button>  `;
                out += ` ${cart[id]}  `;
                out += `  <button data-id="${id}" class="plus-goods">+</button>  `;
                out += cart[id]*data[id].cost;
                out += '<br>';
            }
            $('.main-cart').html(out);
            $('.del-goods').on('click', delGoods);
            $('.plus-goods').on('click', plusGoods);
            $('.minus-goods').on('click', minusGoods);
        });
    }
}

function delGoods() {
    var id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
}
function plusGoods() {
    var id = $(this).attr('data-id');
    cart[id]++;
    saveCart();
    showCart();
}
function minusGoods() {
    var id = $(this).attr('data-id');
    if (cart[id]==1) {
        delete cart[id];
    }
    else {
        cart[id]--;
    }
    saveCart();
    showCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
}

function isEmpty(object) {
    for (var key in object)
    if (object.hasOwnProperty(key)) return true;
    return false;
}

function sendEmail() {
    var ename = $('#ename').val();
    var email = $('#email').val();
    var ephone = $('#ephone').val();
    if (ename!='' && email!='' && ephone!='') {
        if (isEmpty(cart)) {
            /*$.post( //отправка письма
                "core/mail.php",
                {
                    "ename" : ename,
                    "email" : email,
                    "ephone" : ephone,
                    "cart" : cart
                },
                function(data){
                    if (data==1) {
                        alert('Заказ отправлен');
                    }
                    else {
                        alert('Повторите заказ');
                    }
                }
            );*/
            alert("Ваш заказ отправлен!");
        }
        else {
            alert('Корзина пуста');
        }
    }
    else {
        alert('Заполните поля');
    }

}
function cleaning() {
    cart = {};
    localStorage.clear();
    location.reload();
}
$(document).ready(function () {
   loadCart();
   $('.send-email').on('click', sendEmail); // отправить письмо с заказом
    $('.clear_trash').on('click', cleaning);
});