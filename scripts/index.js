const products = [
    {
       image: "images/athletic-cotton-socks-6-pairs.jpg",
       name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
       rating: {
        stars: 4.5,
        count: 87
       },
       priceInCents: 1090,

    },
    {
       image: "images/intermediate-composite-basketball.jpg",
       name: "Intermediate Size Basketball",
       rating: {
        stars: 4.5,
        count: 127
       },
       priceInCents: 2095,

    },
    {
       image: "images/adults-plain-cotton-tshirt-2-pack-teal.jpg",
       name: "Adults Plain Cotton T-Shirt - 2 Pack",
       rating: {
        stars: 4.5,
        count: 56
       },
       priceInCents: 799,

    }
]

let html = "";
products.forEach((product) => {
    html += `
    <div class="item-card">
        <div class="image-container">
          <img
            class="item-image"
            src="${product.image}"
            alt=""
          />
        </div>
        <div class="item-name">
          ${product.name}
        </div>
        <div class="item-ratings">
          <img class="stars" src="images/rating-${product.rating.stars * 10}.png" alt="" />
          <span class="count">${product.rating.count}</span>
        </div>
        <div class="item-price">$${(product.priceInCents / 100).toFixed(2)}</div>
        <select class="item-quantity" name="item-quantity" id="">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <button class="add-to-cart-btn">Add to cart</button>
    </div>
    `
})

const mainContainerElement = document.querySelector(".main");
mainContainerElement.innerHTML = html
