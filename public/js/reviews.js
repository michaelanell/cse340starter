'use strict' 

// Get a list of vehicle reviews based on the inv_id 
let vehicleList = document.querySelector("#inv_id")
vehicleList.addEventListener("change", function () { 
 let inv_id = vehicleList.value 
 console.log(`inv_id is: ${inv_id}`) 
 let classIdURL = "/reviews/getReviews/" +inv_id 
 fetch(classIdURL) 
 .then(function (response) {
  if (response.ok) { 
   return response.json();
  } 
  throw Error("Network response was not OK"); 
 }) 
 .then(function (data) { 
  buildReviewList(data); 
 }) 
 .catch(function (error) { 
 }) 
})

// Build inventory items into HTML table components and inject into DOM 
function buildReviewList(data) { 
    console.log(data);
    let reviewsDisplay = document.getElementById("reviewsDisplay"); 
    console.log(reviewsDisplay);
    let dataDisplay = ''
    data.forEach(function (element) { 
    // Iterate over all reviews in the array and put each in a row 
    dataDisplay += `<p>Name: ${element.review_firstname} ${element.review_lastname}</p>`;
    console.log(dataDisplay)
     console.log(element.review_firstname + ", " + element.review_lastname); 
     dataDisplay += `<p>${element.review_comment}</p>`;
     console.log('data display: ')
     console.log(dataDisplay)
    })
    // Display the contents in the Inventory Management view 
    reviewsDisplay.innerHTML = dataDisplay; 
   }