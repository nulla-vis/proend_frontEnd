const run1 = () => {
    const order_list = document.getElementById('itemList').getElementsByTagName('li')
    let menuData = []
    for(order of order_list){
        // test-area-------------
        // ----------------------
        try {
            id = order.id.match(/\d+/)[0]
            amount = order.getElementsByTagName('input')[1].value
            table_number = document.getElementById('tableNumber').value
            menuData.push({"id": id, 'amount': amount, 'table_number': parseInt(table_number)})
        } catch (error) {
            console.log("cart empty") 
        }
        
    }
    let total = document.getElementById('totalOrderSummary').value

    var object = {
        "menus":menuData,
        "total_price": total,
        "status": 0
    }

    var json = JSON.stringify(object);
    json = json.replace(/\\/g, "")
    console.log(json)
   
    if(total != 0) {
        fetch("http://localhost:3000/order/create/", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        }).then(() => {
            console.log('Data sent succesfully')
            // socker.io
            const socket = io("http://localhost:3000/");
            // tell server that a new order has been placed
            socket.emit('newOrder')
        })


    }else {
        console.log("cart is empty")
    }

}