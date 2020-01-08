/* Global Variables */
const weatherURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&APPID=723c0c754a5ad2c31e455fd50c29c5db';

//Get temperature for zip code
const weather = async (weatherURL, zip, apiKey) => {
  const res = await fetch(weatherURL+zip+apiKey)
  try {
    const data = await res.json();
    return data;
  }
  catch(error) {
    console.log("error", error);
  }
};

//Helper Functions
//Post Data to Server
const postData = async ( url = '', data = {})=>{
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
  };

//Test to make sure there is input.
const inputTest = (zip, feelings) => {
  if (zip === "") {
    alert("Please enter zip code.");
    return true;
  };
  if (feelings === "") {
    alert("Please tell us how you are feeling today.");
    return true;
  };
};

//Update Web Page
const updateWebPage = async () => {
  const request = await fetch('/all');
  console.log(request);
  try{
    const allData = await request.json();
    console.log(allData);
    const length = (allData.length-1)
    document.getElementById('date').innerHTML = "Date:  " + allData[length].date;
    document.getElementById('temp').innerHTML = "Temp:  " + allData[length].temp;
    document.getElementById('content').innerHTML = "Feelings:  " + allData[length].resp;
  }catch(error){
    console.log("error", error);
  }
};

//End Helper Functions


//Main Functions
function addEntry () {
  let feelings = document.getElementById('feelings').value;
  let zip = document.getElementById('zip').value;
  //Test for values
  if (inputTest(zip, feelings) == true) {return};
  //Set Date
  let d = new Date();
  let newDate = (d.getMonth()+1) +'.'+ d.getDate()+'.'+ d.getFullYear();

  //Get temp
  weather(weatherURL, zip, apiKey)

  //Post Data
  .then(function(data) {
    //Test for error city not found
    if (data.cod == "404" || data.cod == "400") {
      alert("Please enter a valid city.");
      return;
    };
    let tempF = (data.main.temp * 9/5 - 459.67).toFixed(2);
    postData('/', {temperature:tempF, date:newDate, userResponse:feelings})
    .then(updateWebPage())
  })


};

  //Listen for Generate button click
  document.getElementById('generate').addEventListener('click', addEntry);
