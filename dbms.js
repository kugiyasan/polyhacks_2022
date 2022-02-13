const getUser = (username) => {
  const data = require("data/users.json");
  return data.users[username];
}; 

const setUser = (user, phone, likes, dislikes) => {
  const data = require("data/users.json");
  data[user.name] = {phone, likes, dislikes};
};

const newUser = (user, phone) => {
  setUser(user, phone, [], []);
};

const getPet = (petName) => {
  const data = require("data/pets.json");
  return data.users[petName];
}; 

const setPet = (name, description, img, owner) => {
  const data = require("data/pets.json");
  data[name] = {description, img, owner};
}; 
module.exports =  { getUser, newUser, getPet, setPet };