import axios from 'axios';

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


function addUserToDOM(obj){
    document.querySelector(".cards").appendChild(cardMaker(obj));
}



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

