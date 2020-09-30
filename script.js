let zomatoData; //global variable 

//filters variables based on the default values
const noPriceRange = "0";
const noReviewRating = "no-review";

// Registers active filters 

let activeFilters = {
  priceRange: noPriceRange,
  reviewRating: noReviewRating,
};

// loop that adds a $ sign as many times as the number in the restaurant's price range  

const priceRangeText = (priceRange) => {
  // if (priceRange === 1) {
  //   return "$"
  // }
  // else if (priceRange === 2) {
  //   return "$$"
  // }
  // else if (priceRange === 3) {
  //   return "$$$"
  // }
  // else if (priceRange === 4) {
  //   return "$$$$"
  // }
  // else if (priceRange === 5) {
  //   return "$$$$$"
  // }
  // else {
  //   return "N/A"
  // }

  // does the same as the function with "if statements"
  let txt = "";
  for (let i = 0; i < priceRange; i++) {
    txt += "$";
  }
  return txt;
}

// Function to show the star rating with using same method as above (for loop)
const ratingStar = (starRating) => {
  let star = "";
  for (let i = 0; i < starRating; i++) {
    star += "<span class=\"fa fa-star checked\"</span>"
  }
  return star;
}

// Function that injects restaurants in the list 

const insertRestaurantInList = (restaurant, element) => {
  const priceRange = priceRangeText(restaurant.price_range);
  const starRating = ratingStar(restaurant.user_rating.aggregate_rating);

  element.innerHTML += `
    <section class="restaurants">
      <div id="card-info">
        <p class="restaurantName">${restaurant.name}</p>
        <p>${restaurant.user_rating.rating_text} ${starRating}</p>
      </div>
      <img id="image"src=${restaurant.featured_image}>
      <div id="cost">
        <p class ="dollar"><span style="color:green">${priceRange}</span></p>
        <p>Average cost (2 people): $${restaurant.average_cost_for_two}</p>
        <p>
      </div>
      <div>
        <p>Address: ${restaurant.location.address}</p>
      </div>
    </section>
  `;
}

// filter functions 
function includeRestaurant(filters, restaurant) {
  // restaurant price range is NOT WITHIN the filtered price range
  if (filters.priceRange != noPriceRange && filters.priceRange != restaurant.price_range) {
    return false;
  }

  // restaurant review rating is NOT WITHIN the filtered review rating
  if (filters.reviewRating != noReviewRating && filters.reviewRating != restaurant.user_rating.rating_text) {
    return false;
  }

  // Respects all the filters
  return true;
}

// Loop function over the array of restaurants

const buildRestaurantList = (data, activeFilters) => {
  const restaurantListElement = document.getElementById('restaurantList');
  restaurantListElement.innerHTML = "";

  data.restaurants.forEach((restaurantContainer) => {
    const restaurant = restaurantContainer.restaurant

    if (includeRestaurant(activeFilters, restaurant)) {
      insertRestaurantInList(restaurant, restaurantListElement);
    }
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
      buildRestaurantList(data, activeFilters);
  });
}
fetchZomato();

// functions responsible for the dropdowns

const priceRangeDropdownEventListener = document.getElementById('priceRanges').addEventListener('change', (event) => {
  activeFilters.priceRange = event.target.value
  buildRestaurantList(zomatoData, activeFilters);
});

const ratingDropdownEventListener = document.getElementById('rating').addEventListener('change', (event) => {
  activeFilters.reviewRating = event.target.value
  buildRestaurantList(zomatoData, activeFilters);
});

