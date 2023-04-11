const options = {
  method: 'GET',
  url: 'https://coinpaprika1.p.rapidapi.com/exchanges',
  headers: {
    'x-rapidapi-host': 'coinpaprika1.p.rapidapi.com',
    'x-rapidapi-key': '85ddb24a5cmsh18392d6a5801ac6p13e892jsn72643991ed3d'
  }
};

axios.request(options).then(function (response) {

  let newData = mixData(response.data)
  render(newData)
  // console.log(newData);
}).catch(function (error) {
    console.error(error);
});

let render = (data)=>{
let dom = document.querySelector(".show_data_container")
dom.innerHTML = ""

const numb = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

for (let i=0; i<data.length;i++){
  let web = data[i].links.website || ["#"]
  let tw = data[i].links.twitter || ["#"]
  let html = `<div class="card">
  <p>Latest Update At: ${convertTime(data[i].last_updated)}</p>
  <hr>
  <h2 style="text-align:center; margin-bottom:30px">${data[i].id.toUpperCase()}</h2>
  <p id="des">${data[i].description}</p>

  <h3 class="w">Khối Lượng Giao dịch: ${numb(Math.round(data[i].quotes.USD.adjusted_volume_30d))}</h3>
  <div class="bot">
      <a href="${web[0]}"><img src="https://img.icons8.com/color/96/000000/domain--v1.png"/></a>
  <a href="${tw[0]}"><img src="https://img.icons8.com/office/80/000000/twitter.png"/></a>
  </div>
  
</div>`
dom.innerHTML += html
}
}


let convertTime = (timex) => {
let date = new Date(timex);
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let h = date.getHours();
let m = date.getMinutes();
let s = date.getSeconds();
let d = days[date.getUTCDay()];

let h_ = "";
let m_ = "";
let s_ = "";

if (h < 10) {
  h_ = "0" + h;
} else {
  h_ = h;
}
if (m < 10) {
  m_ = "0" + m;
} else {
  m_ = m;
}
if (s < 10) {
  s_ = "0" + s;
} else {
  s_ = s;
}

let time = h_ + ":" + m_ + ":" + s_ + " " + d;

return time;
};






function mixData(data) {
let result = [];
for (let i = 0; i < 30; i++) {
  let randomIndex = getRandomInt(0, data.length);
  result.push(data[randomIndex]);
}

return result;
}

function getRandomInt(min, max) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min) + min);
}