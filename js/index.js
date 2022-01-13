INCOMING_ALL_ORDER_API_URL = 'http://localhost:3000/order/allIncoming'
let order_card_element = document.getElementById('incomingOrder')

const socket = io("http://localhost:3000/");
socket.on('getAllOrder', function(data){
    if(data.order){
        buildOrderCard(data.order)
    } else {
        defaultOrderCart()
    }
}) 


const getAllIncomingOrder = () => {
    fetch(INCOMING_ALL_ORDER_API_URL, {
        method: 'GET'
    }).then((response) => {
        return response.json()
    }).then((data) => {
        if(data.length > 0) {
            console.log(data)
            buildOrderCard(data)
        } else {
            defaultOrderCart()
        }
    })
}

const buildOrderCard = (data) => {
    let all_order = ""
    data.forEach(menu => {
        all_order +=`
        <div class="card" style="width: 18rem; margin: 5px 15px;">
            <img src="${menu.menu_image}" class="card-img-top" alt="${menu.menu_title}" style="width: 100%; border: 1px solid rgba(0,0,0,.125); height: 160px">
            <div class="card-body">
                <p class="card-text" id="${menu.order_id}${menu.menu_id}">${menu.menu_title} : <span class="${setStatus(menu.status).badge}">${setStatus(menu.status).orderStatus}</span></p>
            </div>
        </div>
        `
    })

    document.querySelector('#incomingOrderList').innerHTML = all_order
}
const defaultOrderCart = () => {

    document.querySelector('#incomingOrderList').innerHTML = `
    <div class="card" style="width: 18rem;">
        <img src="/img/bg/empty-plate.png" class="card-img-top" alt="empty_cart" style="width: 100%; border: 1px solid rgba(0,0,0,.125); height: 160px">
        <div class="card-body">
            <p class="card-text">ご注文は空です。注文をしましょう。</p>
        </div>
    </div>
    `
}

const setStatus = (orderStatus) => {
    let badge = ""
    switch(orderStatus) {
        case 0:
            orderStatus = '料理中';
            badge = "badge badge-pill badge-primary"
            break;
        case 1:
            orderStatus = 'ご注文はすぐに配達されます'
            badge = "badge badge-pill badge-info"
            break;
        case 2:
            orderStatus = '注文が届け完了'
            badge = "badge badge-pill badge-success"
            break    
        case 3:
            orderStatus = 'ご注文はキャンセルされました'
            badge = "badge badge-pill badge-danger"
            break    
    }

    return {orderStatus: orderStatus, badge: badge}
}



const updateStatus = () => {
    fetch(INCOMING_ALL_ORDER_API_URL, {
        method: 'GET'
    }).then((response) => {
        return response.json()
    }).then((data) => {
        if(data.length > 0) {
            statusUpdate(data)
        } else if(data.message) {
            defaultOrderCart()
        }
    })
}

const statusUpdate = (data) => {
    for(menu of data) {
        let a = document.getElementById(`${menu.order_id}${menu.menu_id}`)
        a.innerHTML = `${menu.menu_title} : <span class="${setStatus(menu.status).badge}">${setStatus(menu.status).orderStatus}</span>`
    }
}

window.onload = () => {
    getAllIncomingOrder()

    setInterval(function() {
        updateStatus();
    }, 1000); 
}

   