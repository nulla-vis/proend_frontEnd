const run1 = () => {
    const order_list = document.getElementById('itemList').getElementsByTagName('li')
    let menuData = []
    for(order of order_list){
        // test-area-------------
        // ----------------------
        try {
            id = order.id.match(/\d+/)[0]
            amount = order.getElementsByTagName('input')[1].value
            menuData.push({"id": id, 'amount': amount})
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

    fetch("http://localhost:3000/order/create/", {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    }).then(() => {
        console.log('Data sent succesfully')
    })
}