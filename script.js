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
        <img id="image"src=${restaurantContainer.restaurant.featured_image}>
          <p>${restaurantContainer.restaurant.name}</p>
          <p>${restaurantContainer.restaurant.user_rating.rating_text} ${restaurantContainer.restaurant.user_rating.aggregate_rating}</p>
        </div>
        <div id="cost">
          <p>Average cost (2 people): $${restaurantContainer.restaurant.average_cost_for_two}</p>
        </div>
        <div>
          <p>Address: ${restaurantContainer.restaurant.location.address}</p>
        </div>
      </section>
        
      `;
    });

    
    //ITERATING OVER THE ARRAY WITH MAP 

    // const testmap = data.restaurants.map(
    //   (restaurantContainer) => restaurantContainer.restaurant.name
    // );
    // console.log(testmap);
  });
  // const forecast = document.getElementById('forecast');
  // const forecastIcon = document.getElementById('forecastIcon');
  // forecast.innerHTML = "";
  // for (const date in minMaxTemps) { 
  //     forecast.innerHTML += `<div class="column">${minMaxTemps[date].dayOfWeek}</div>`
  //     forecast.innerHTML += `<img src="http://openweathermap.org/img/wn/${minMaxTemps[date].icon}@2x.png"></img>`
  //     forecast.innerHTML += `<div class="column">${minMaxTemps[date].minTemp.toFixed(0)} °C | ${minMaxTemps[date].maxTemp.toFixed(0)} °C </div>`
  // };