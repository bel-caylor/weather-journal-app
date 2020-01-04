/* Global Variables */
let weatherURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&APPID=723c0c754a5ad2c31e455fd50c29c5db';

//Get temperature for zip code
const weather = async (weatherURL, zip, apiKey) => {
  // console.log(weatherURL+zip+apiKey)
  const res = await fetch(weatherURL+zip+apiKey)
  try {
    const data = await res.json();
    // console.log(data);
    return data;
  }
  catch(error) {
    console.log("error", error);
  }
};

//Main Functions
function addEntry () {
  let feelings = document.getElementById('feelings').value;
  let zip = document.getElementById('zip').value;
  // Create a new date instance dynamically with JS
  let d = new Date();
  let newDate = (d.getMonth()+1) +'.'+ d.getDate()+'.'+ d.getFullYear();
  console.log(feelings, zip, newDate);

  //Get temp
  weather(weatherURL, zip, apiKey)
  .then(function(data) {
    console.log(data);
    postData('/', {temperature:data.main.temp, date:newDate, userResponse:feelings});
  })
  .then(
    //Update UI
  )
  // console.log(weatherData);
  //   let temperature = weatherData.main[temp];


  //Post data
  // postData('/', {temperature:temp, date:newDate, userResponse:feelings});
  //Add Data to Website
};

//Listen for Generate button click
document.getElementById('generate').addEventListener('click', addEntry);










const postData = async ( url = '', data = {})=>{
    // console.log(data);
      const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header
      body: JSON.stringify(data),
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

  // postData('/', {temperature:52});
// postData('/', {temperature:52, date:newDate, userResponse:'userResp'});
