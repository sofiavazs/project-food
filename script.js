// You should now have data from *at least* 10 restaurants 
//from the `/search` endpoint on your page, 
//and include the following data:

// - The restaurant name
// - The average cost for a dinner there
// - The address of the restaurant
// - An image (you choose which image you'd like to display from the response)
// - Either the `aggregate_rating` or the `rating_text` for that restaurant
let zomatoData;

const buildRestaurantList = (data, priceRangeValue) => {
  const restaurantList = document.getElementById('restaurantList');
  restaurantList.innerHTML = "";
  data.restaurants.forEach((restaurantContainer) => {
    if (priceRangeValue && priceRangeValue != restaurantContainer.restaurant.price_range) {
      return 
    }
    restaurantList.innerHTML += `
    <section class="restaurants">
      <div id="card-info">
        <p class="restaurantName">${restaurantContainer.restaurant.name}</p>
        <p>${restaurantContainer.restaurant.user_rating.rating_text} ${restaurantContainer.restaurant.user_rating.aggregate_rating}</p>
      </div>
      <img id="image"src=${restaurantContainer.restaurant.featured_image}>
      <div id="cost">
        <p class ="dollar">Price Range: ${restaurantContainer.restaurant.price_range}</p>
        <p>Average cost (2 people): $${restaurantContainer.restaurant.average_cost_for_two}</p>
        <p>
      </div>
      <div>
        <p>Address: ${restaurantContainer.restaurant.location.address}</p>
      </div>
    </section>
    `;
  });
};

const fetchZomato = () => { 
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
      zomatoData = data
      buildRestaurantList(data);
  });
}
fetchZomato();

// Filter by price function 
  
const dropdownEventListener = document.getElementById('priceRanges').addEventListener;

dropdownEventListener('change', (event) => {
  const selectedPriceRangeValue = event.target.value;
  buildRestaurantList(zomatoData,selectedPriceRangeValue)
});


