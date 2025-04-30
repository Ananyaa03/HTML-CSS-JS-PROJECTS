const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the form from submitting

  const height = parseInt(document.querySelector('#height').value);

  const weight = parseInt(document.querySelector('#weight').value);
  
  const results = document.querySelector("#results");
  
  if(height === '' || height < 0 || isNaN(height)){
    results.innerHTML = `Please enter a valid height ${height}`;
  }

  else if(weight === '' || weight < 0 || isNaN(weight)){
    results.innerHTML = `Please enter a valid weight ${weight}`;
  }
  else{
    const bmi = (weight / ((height * height) / 10000)).toFixed(2);
    results.innerHTML = `Your BMI is ${bmi}`;
  }
});