require("dotenv").config();
require("./../config/mongo.js");

const userModel = require("../models/Users.js");
const exchangeModel = require("./../models/Exchanges");
const skillModel = require("./../models/Skills");

const exchangeSeed = [
  { exchangeStatus: "in progess" },
  { exchangeStatus: "denied" },
  { exchangeStatus: "in progess" },
  { exchangeStatus: "done" },
  { exchangeStatus: "in progess" },
  { exchangeStatus: "accepted" },
];

function createSeed() {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await userModel.find();
      const skills = await skillModel.find();
      exchangeSeed.forEach((el) => {
        el.teacher = user[Math.floor(Math.random() * user.length)]._id;
        el.student = user[Math.floor(Math.random() * user.length)]._id;
        el.skillsName = skills[Math.floor(Math.random() * skills.length)]._id;

       
        resolve();
      });
    } catch (err) {
      reject(err);
    }
  });
}

createSeed()
  .then((r) => {
    exchangeModel.deleteMany().then(() => {
      exchangeModel.insertMany(exchangeSeed).then((res) => {
        console.log("Exchanges added");
        process.exit();
      });
    });
  })
  .catch((err) => console.log("err", err));

