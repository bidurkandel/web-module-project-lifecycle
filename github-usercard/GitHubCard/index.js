import axios from 'axios';
/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
let isMainUser = true;
get("bidurkandel");

function get(username){
  axios.get("https://api.github.com/users/"+username)
  .then(res => {
    addUserToDOM(res.data);
    if(isMainUser){
      findFollowers(res.data.followers_url);
      isMainUser = false;
    }
  })
  .catch(err => {
    console.log(err);
  });
}

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/
function addUserToDOM(obj){
    document.querySelector(".cards").appendChild(cardMaker(obj));
}

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [];

function findFollowers(url){
  axios.get(url).then(res => {
    res.data.forEach(item => followersArray.push(item));
    addFollowersToDOM(followersArray);
  }).catch(err => {
    console.log(err);
  });
  
}

function addFollowersToDOM(fArr){
  fArr.forEach(item => {
    get(item.login);
  });
}

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
function cardMaker(data){
  const card = document.createElement("div");
  const img = document.createElement("img");
  const cardInfo = document.createElement("div");
  const name = document.createElement("h3");
  const username = document.createElement("p");
  const loc = document.createElement("p");
  const profile = document.createElement("p");
  const link = document.createElement("a");
  const followers = document.createElement("p");
  const Following = document.createElement("p");
  const bio = document.createElement("p");
  const profileText = document.createElement("span");

  card.appendChild(img);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(username);
  cardInfo.appendChild(loc);
  cardInfo.appendChild(profile);
  profile.appendChild(profileText);
  profile.appendChild(link);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(Following);
  cardInfo.appendChild(bio);

  card.classList.add("card");
  cardInfo.classList.add("card-info");
  name.classList.add("name");
  username.classList.add("username");

  img.src = data.avatar_url;
  name.textContent = data.name;
  username.textContent = data.login;
  loc.textContent = "Location: "+ data.location;
  profileText.textContent = "Profile: ";
  link.href = data.html_url;
  link.textContent = data.html_url;
  followers.textContent = "Followers: " + data.followers;
  Following.textContent = "Following: " + data.following;
  bio.textContent = "Bio: " + data.bio;

  return card;
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
