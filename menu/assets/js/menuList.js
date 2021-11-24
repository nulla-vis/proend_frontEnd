MENU_API_URL = 'http://localhost:3000/menu/all'



// Get all menu function
const getAllMenu = () => {
    fetch(MENU_API_URL, {
        method: 'GET'
    }).then((response) => {
        return response.json()
    }).then((data) => {
        buildMenu(data)
    })
}

// Build menu function using DOM
const buildMenu = (menu_data) => {
    let all_foods = ""
    let all_beverages = ""
    let all_desserts = ""

    for(menu of menu_data.menus){
        if (menu.menu_type === 'foods') {
            all_foods +=`
            <div id="gridItem1${menu.id}" class="col-xl-6 col-lg-6 col-md-6 col-sm-6 animated-element" data-sr-id="${menu.id}" style="visibility: visible; opacity: 1; transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transition: opacity 0.6s cubic-bezier(0.5, 0, 0, 1) 0s, transform 0.6s cubic-bezier(0.5, 0, 0, 1) 0s;">
                <div class="item-body">
                    <figure>
                        <img src="${menu.menu_image}" class="img-fluid" alt="">
                        <a href="${menu.menu_image}" class="item-body-link">
                            <div class="item-title">
                                <h3>${menu.title}</h3>
                                <small>${menu.description}</small>
                            </div>
                        </a>
                    </figure>
                    <ul>
                        <li>
                            <span class="item-price">¥${menu.price}</span>
                        </li>
                        <li>
                            <a href="javascript:;" class="add-item-to-cart"><i class="icon icon-shopping-cart"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        `
        }

        if (menu.menu_type === 'beverages') {
            all_beverages +=`
            <div id="gridItem2${menu.id}" class="col-xl-6 col-lg-6 col-md-6 col-sm-6 animated-element" data-sr-id="${menu.id}" style="visibility: visible; opacity: 1; transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transition: opacity 0.6s cubic-bezier(0.5, 0, 0, 1) 0s, transform 0.6s cubic-bezier(0.5, 0, 0, 1) 0s;">
                <div class="item-body">
                    <figure>
                        <img src="${menu.menu_image}" class="img-fluid" alt="">
                        <a href="${menu.menu_image}" class="item-body-link">
                            <div class="item-title">
                                <h3>${menu.title}</h3>
                                <small>${menu.description}</small>
                            </div>
                        </a>
                    </figure>
                    <ul>
                        <li>
                            <span class="item-price">¥${menu.price}</span>
                        </li>
                        <li>
                            <a href="javascript:;" class="add-item-to-cart"><i class="icon icon-shopping-cart"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        `
        }
        
        if (menu.menu_type === 'desserts') {
            all_desserts +=`
            <div id="gridItem3${menu.id}" class="col-xl-6 col-lg-6 col-md-6 col-sm-6 animated-element" data-sr-id="${menu.id}" style="visibility: visible; opacity: 1; transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); transition: opacity 0.6s cubic-bezier(0.5, 0, 0, 1) 0s, transform 0.6s cubic-bezier(0.5, 0, 0, 1) 0s;">
                <div class="item-body">
                    <figure>
                        <img src="${menu.menu_image}" class="img-fluid" alt="">
                        <a href="${menu.menu_image}" class="item-body-link">
                            <div class="item-title">
                                <h3>${menu.title}</h3>
                                <small>${menu.description}</small>
                            </div>
                        </a>
                    </figure>
                    <ul>
                        <li>
                            <span class="item-price">¥${menu.price}</span>
                        </li>
                        <li>
                            <a href="javascript:;" class="add-item-to-cart"><i class="icon icon-shopping-cart"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        `
        }
    }
  
     document.querySelector('.foods').innerHTML = all_foods
     document.querySelector('.beverages').innerHTML = all_beverages
     document.querySelector('.desserts').innerHTML = all_desserts
    // console.log(menu_data.menus[0])

}


getAllMenu()