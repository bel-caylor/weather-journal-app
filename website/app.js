/* Global Variables */
// const location = 'c://User/belin/Programming/fend-refresh-2019/fend-refresh-2019/projects/weather-journal-app'
let userResp = document.getElementById('feelings');
let zip = document.getElementById('zip');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


const postData = async ( url = '', data = {})=>{
    console.log(data);
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

postData('/', {temperature:52, date:'2/7/70', userResponse:'userResp'});
// postData('/', {temperature:temp, date:newDate, userResponse:userResp});
