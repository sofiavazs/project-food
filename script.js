// You should now have data from *at least* 10 restaurants 
//from the `/search` endpoint on your page, 
//and include the following data:

// - The restaurant name
// - The average cost for a dinner there
// - The address of the restaurant
// - An image (you choose which image you'd like to display from the response)
// - Either the `aggregate_rating` or the `rating_text` for that restaurant

const cityId = "260"; //Sydney
const cuisineId = "168"; //Burger

const zomatoApiUrlCuisine = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&cuisines=${cuisineId}`;

const apiKey = {
  headers: {
    "user-key": "e2ebc2f85586d3cdd1bcde9e2e9924d4"
  }
};

fetch(zomatoApiUrlCuisine, apiKey)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    data.restaurants.forEach((restaurantContainer) => {
      const restaurantList = document.getElementById('restaurantList');

      restaurantList.innerHTML += `
      <section class="restaurants">
        <div id="card-info">
          <p>${restaurantContainer.restaurant.name}</p>
          <p>${restaurantContainer.restaurant.user_rating.rating_text} ${restaurantContainer.restaurant.user_rating.aggregate_rating}</p>
        </div>
        <img id="image"src=${restaurantContainer.restaurant.featured_image}>
        <div id="cost">
          <p>Price Range: ${restaurantContainer.restaurant.price_range}</p>
        </div>
        <div>
          <p>Address: ${restaurantContainer.restaurant.location.address}</p>
        </div>
      </section>
      `;


    });
    const filterPriceRange = restaurantContainer.restaurant.price_range;
    const priceRangeValue = document.getElementById("priceRanges").value
    const priceRangeElement = (filterPriceRange, priceRangeValue) => {
      if (filterPriceRange === 1) {
        // console.log("$")
      } else if (filterPriceRange === 2) {
        // console.log(filterPriceRange)
      } else if (filterPriceRange === 3) {
        // console.log(filterPriceRange)
      } else if (filterPriceRange === 4) {
        // console.log(filterPriceRange)
      } else if (filterPriceRange === 5) {
        // console.log(filterPriceRange)
      } else {
        // console.log(filterPriceRange)
      }
    }
    let selectPriceRange = '';
    priceRangeElement(selectPriceRange);

    document.getElementById('priceRanges').addEventListener('change', (event) => {
      selectPriceRange = event.target.value;
      console.log(selectPriceRange)
      priceRangeElement(filterPriceRange, priceRangeValue);

    });
  });