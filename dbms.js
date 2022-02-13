const fs = require("fs");

const usersPath = "./public/data/users.json";
const petsPath = "./public/data/pets.json";
let users = require(usersPath);
let pets = require(petsPath);

const getUser = (username) => {
  const user = users.users[username] || {};
  user.name = username;
  return user;
};

const getCardsForUser = (username, number) => {
  const keys = Object.keys(pets.pets);
  const cards = [];

  while (cards.length < number) {
    const i = (keys.length * Math.random()) << 0;
    const key = keys[i];
    const pet = pets.pets[key];
    // ! This is always false
    if (pet.user_id === username) {
      continue;
    }

    pet.name = key;
    const n = (Math.random() * 5) << 0;
    pet.img = `/data/img/dog${n + 1}.jpg`;
    cards.push(pet);
  }

  return cards;
};

const setUser = (user, phone, likes, dislikes) => {
  users[user.name] = { phone, likes, dislikes };
};

const newUser = (user, phone) => {
  setUser(user, phone, [], []);
};

const getPet = (petName) => {
  const pet = pets.pets[petName];
  pet.name = petName;
  return pet;
};

const setPet = (name, description, img, owner) => {
  pets.pets[name] = { description, img, owner };
};

const writeData = () => {
  fs.writeFile(usersPath, JSON.stringify(users), (err) => {
    if (err) console.log(err);
    else {
      console.log("File written successfully");
      console.log(fs.readFileSync(usersPath, "utf8"));
    }
  });
  fs.writeFile(petsPath, JSON.stringify(pets), (err) => {
    if (err) console.log(err);
    else {
      console.log("File written successfully");
      console.log(fs.readFileSync(usersPath, "utf8"));
    }
  });

  setTimeout(writeData, 60000);
};

writeData();

module.exports = { getUser, getCardsForUser, newUser, getPet, setPet };
