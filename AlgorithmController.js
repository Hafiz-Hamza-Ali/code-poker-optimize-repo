const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserService = require("../services/userService.js");
const UserValidation = require("../validation/userValidate.js");
const PreFlopValidation = require("../validation/preflopValidate.js");
const transporter = require("../config/emailConfig.js");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const XLSX = require("xlsx");
const asyncHandler = require("express-async-handler");
const AlgorithmService = require("../services/algorithmService");
const MatrixModel = require("../models/Matrix");
const MatrixGraphModel = require("../models/matrixGraph.js");
const Cards = require("../models/cards.js");
const AlgorithmModel = require("../models/Algorithm.js");
const AlgoString = require("../models/AlgoString");
const AlgoStringModel = require("../models/AlgoString");
class AlgorithmController {
  static createCards = asyncHandler(async (req, res) => {
    const card = [
      {
        suit: "hearts",
        value: 2,
        value_string: "2h",
        color: "#2E0303",
      },
      {
        suit: "hearts",
        value: 3,
        value_string: "3h",
        color: "#2E0303",
      },
      {
        suit: "hearts",
        value: 4,
        value_string: "4h",
        color: "#2E0303",
      },
      {
        suit: "hearts",
        value: 5,
        value_string: "5h",
        color: "#2E0303",
      },
      {
        suit: "hearts",
        value: 6,
        value_string: "6h",
        color: "#2E0303",
      },
      {
        suit: "hearts",
        value: 7,
        value_string: "7h",
        color: "#2E0303",
      },
      {
        suit: "hearts",
        value: 8,
        value_string: "8h",
        color: "#2E0303",
      },
      {
        suit: "hearts",
        value: 9,
        value_string: "9h",
        color: "#2E0303",
      },
      {
        suit: "hearts",
        value: 10,
        value_string: "Th",
        color: "#2E0303",
      },
      {
        suit: "hearts",
        value: "J",
        value_string: "Jh",
        color: "#2E0303",
      },
      {
        suit: "hearts",
        value: "Q",
        value_string: "Qh",
        color: "#2E0303",
      },
      {
        suit: "hearts",
        value: "K",
        value_string: "Kh",
        color: "#2E0303",
      },
      {
        suit: "hearts",
        value: "A",
        value_string: "Ah",
        color: "#2E0303",
      },
      {
        suit: "diamonds",
        value: 2,
        value_string: "2d",
        color: "#072230",
      },
      {
        suit: "diamonds",
        value: 3,
        value_string: "3d",
        color: "#072230",
      },
      {
        suit: "diamonds",
        value: 4,
        value_string: "4d",
        color: "#072230",
      },
      {
        suit: "diamonds",
        value: 5,
        value_string: "5d",
        color: "#072230",
      },
      {
        suit: "diamonds",
        value: 6,
        value_string: "6d",
        color: "#072230",
      },
      {
        suit: "diamonds",
        value: 7,
        value_string: "7d",
        color: "#072230",
      },
      {
        suit: "diamonds",
        value: 8,
        value_string: "8d",
        color: "#072230",
      },
      {
        suit: "diamonds",
        value: 9,
        value_string: "9d",
        color: "#072230",
      },
      {
        suit: "diamonds",
        value: 10,
        value_string: "Td",
        color: "#072230",
      },
      {
        suit: "diamonds",
        value: "J",
        value_string: "Jd",
        color: "#072230",
      },
      {
        suit: "diamonds",
        value: "Q",
        value_string: "Qd",
        color: "#072230",
      },
      {
        suit: "diamonds",
        value: "K",
        value_string: "Kd",
        color: "#072230",
      },
      {
        suit: "diamonds",
        value: "A",
        value_string: "Ad",
        color: "#072230",
      },
      {
        suit: "clubs",
        value: 2,
        value_string: "2c",
        color: "#041F0C",
      },
      {
        suit: "clubs",
        value: 3,
        value_string: "3c",
        color: "#041F0C",
      },
      {
        suit: "clubs",
        value: 4,
        value_string: "4c",
        color: "#041F0C",
      },
      {
        suit: "clubs",
        value: 5,
        value_string: "5c",
        color: "#041F0C",
      },
      {
        suit: "clubs",
        value: 6,
        value_string: "6c",
        color: "#041F0C",
      },
      {
        suit: "clubs",
        value: 7,
        value_string: "7c",
        color: "#041F0C",
      },
      {
        suit: "clubs",
        value_string: "8c",
        color: "#041F0C",
        value: 8,
      },
      {
        suit: "clubs",
        value_string: "9c",
        value: 9,
        color: "#041F0C",
      },
      {
        suit: "clubs",
        value: 10,
        value_string: "Tc",
        color: "#041F0C",
      },
      {
        suit: "clubs",
        value: "J",
        value_string: "Jc",
        color: "#041F0C",
      },
      {
        suit: "clubs",
        value: "Q",
        value_string: "Qc",
        color: "#041F0C",
      },
      {
        suit: "clubs",
        value: "K",
        value_string: "Kc",
        color: "#041F0C",
      },
      {
        suit: "clubs",
        value: "A",
        value_string: "Ac",
        color: "#041F0C",
      },
      {
        suit: "spades",
        value: 2,
        value_string: "2s",
        color: "#000000",
      },
      {
        suit: "spades",
        value: 3,
        value_string: "3s",
        color: "#000000",
      },
      {
        suit: "spades",
        value: 4,
        value_string: "4s",
        color: "#000000",
      },
      {
        suit: "spades",
        value: 5,
        value_string: "5s",
        color: "#000000",
      },
      {
        suit: "spades",
        value: 6,
        value_string: "6s",
        color: "#000000",
      },
      {
        suit: "spades",
        value: 7,
        value_string: "7s",
        color: "#000000",
      },
      {
        suit: "spades",
        value: 8,
        value_string: "8s",
        color: "#000000",
      },
      {
        suit: "spades",
        value: 9,
        value_string: "9s",
        color: "#000000",
      },
      {
        suit: "spades",
        value: 10,
        value_string: "Ts",
        color: "#000000",
      },
      {
        suit: "spades",
        value: "J",
        value_string: "Js",
        color: "#000000",
      },
      {
        suit: "spades",
        value: "Q",
        value_string: "Qs",
        color: "#000000",
      },
      {
        suit: "spades",
        value: "K",
        value_string: "Ks",
        color: "#000000",
      },
      {
        suit: "spades",
        value: "A",
        value_string: "As",
        color: "#000000",
      },
    ];
    const data = JSON.stringify(card);
    const cards = await Cards.create({
      name: req.body.name,

      value: data,
    });
    console.log("Created");
    res.status(201).send({
      status: "success",
      message: "File Uploaded Successfully",
      response: cards,
    });
  });
  static getCards = asyncHandler(async (req, res) => {
    const cards_data = await Cards.findOne({
      name: "cards",
    })
      .then((Cards) =>
        res.status(200).send({
          status: "success",
          message: "All Cards Data",
          response: JSON.parse(Cards.value),
        })
      )
      .catch((err) =>
        res.status(400).send({ status: "failed", message: "Data not found" })
      );
  });
  static createMatrix = asyncHandler(async (req, res) => {
    try {
      const matrix = [
        "AA",
        "AKs",
        "AQs",
        "AJs",
        "ATs",
        "A9s",
        "A8s",
        "A7s",
        "A6s",
        "A5s",
        "A4s",
        "A3s",
        "A2s",
        "AKo",
        "KK",
        "KQs",
        "KJs",
        "KTs",
        "K9s",
        "K8s",
        "K7s",
        "K6s",
        "K5s",
        "K4s",
        "K3s",
        "K2s",
        "AQo",
        "KQo",
        "QQ",
        "QJs",
        "QTs",
        "Q9s",
        "Q8s",
        "Q7s",
        "Q6s",
        "Q5s",
        "Q4s",
        "Q3s",
        "Q2s",
        "AJo",
        "KJo",
        "QJo",
        "JJ",
        "JTs",
        "J9s",
        "J8s",
        "J7s",
        "J6s",
        "J5s",
        "J4s",
        "J3s",
        "J2s",
        "ATo",
        "KTo",
        "QTo",
        "JTo",
        "TT",
        "T9s",
        "T8s",
        "T7s",
        "T6s",
        "T5s",
        "T4s",
        "T3s",
        "T2s",
        "A9o",
        "K9o",
        "Q9o",
        "J9o",
        "T9o",
        "99",
        "98s",
        "97s",
        "96s",
        "95s",
        "94s",
        "93s",
        "92s",
        "A8o",
        "K8o",
        "Q8o",
        "J8o",
        "T8o",
        "98o",
        "88",
        "87s",
        "86s",
        "85s",
        "84s",
        "83s",
        "82s",
        "A7o",
        "K7o",
        "Q7o",
        "J7o",
        "T7o",
        "97o",
        "87o",
        "77",
        "76s",
        "75s",
        "74s",
        "73s",
        "72s",
        "A6o",
        "K6o",
        "Q6o",
        "J6o",
        "T6o",
        "96o",
        "86o",
        "76o",
        "66",
        "65s",
        "64s",
        "63s",
        "62s",
        "A5o",
        "K5o",
        "Q5o",
        "J5o",
        "T5o",
        "95o",
        "85o",
        "75o",
        "65o",
        "55",
        "54s",
        "53s",
        "52s",
        "A4o",
        "K4o",
        "Q4o",
        "J4o",
        "T4o",
        "94o",
        "84o",
        "74o",
        "64o",
        "54o",
        "44",
        "43s",
        "42s",
        "A3o",
        "K3o",
        "Q3o",
        "J3o",
        "T3o",
        "93o",
        "83o",
        "73o",
        "63o",
        "53o",
        "43o",
        "33",
        "32s",
        "A2o",
        "K2o",
        "Q2o",
        "J2o",
        "T2o",
        "92o",
        "82o",
        "72o",
        "62o",
        "52o",
        "42o",
        "32o",
        "22",
      ];

      const datas = JSON.stringify(matrix);
      const matrixx = await MatrixGraphModel.create({
        name: "matrix",
        type: "matrix",
        value: datas,
      });
      console.log("Created");
      res.status(201).send({
        status: "success",
        message: "File Uploaded Successfully",
        response: matrixx,
      });
    } catch (err) {
      res.status(400).send({ status: "failed", message: err.message });
    }
  });
  static getMatrix = asyncHandler(async (req, res) => {
    const cards_data = await MatrixGraphModel.findOne({
      name: "matrix",
    })
      .then((Cards) =>
        res.status(200).send({
          status: "success",
          message: "All Cards Data",
          response: JSON.parse(Cards.value),
        })
      )
      .catch((err) =>
        res.status(400).send({ status: "failed", message: "Data not found" })
      );
  });
  static cardpairs = asyncHandler(async (req, res) => {
    const { cardOne, cardTwo, cardDetailOff, cardDetailSuited } = req.body;
    const matrix = [
      "AA",
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "A2s",
      "AKo",
      "KK",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K8s",
      "K7s",
      "K6s",
      "K5s",
      "K4s",
      "K3s",
      "K2s",
      "AQo",
      "KQo",
      "QQ",
      "QJs",
      "QTs",
      "Q9s",
      "Q8s",
      "Q7s",
      "Q6s",
      "Q5s",
      "Q4s",
      "Q3s",
      "Q2s",
      "AJo",
      "KJo",
      "QJo",
      "JJ",
      "JTs",
      "J9s",
      "J8s",
      "J7s",
      "J6s",
      "J5s",
      "J4s",
      "J3s",
      "J2s",
      "ATo",
      "KTo",
      "QTo",
      "JTo",
      "TT",
      "T9s",
      "T8s",
      "T7s",
      "T6s",
      "T5s",
      "T4s",
      "T3s",
      "T2s",
      "A9o",
      "K9o",
      "Q9o",
      "J9o",
      "T9o",
      "99",
      "98s",
      "97s",
      "96s",
      "95s",
      "94s",
      "93s",
      "92s",
      "A8o",
      "K8o",
      "Q8o",
      "J8o",
      "T8o",
      "98o",
      "88",
      "87s",
      "86s",
      "85s",
      "84s",
      "83s",
      "82s",
      "A7o",
      "K7o",
      "Q7o",
      "J7o",
      "T7o",
      "97o",
      "87o",
      "77",
      "76s",
      "75s",
      "74s",
      "73s",
      "72s",
      "A6o",
      "K6o",
      "Q6o",
      "J6o",
      "T6o",
      "96o",
      "86o",
      "76o",
      "66",
      "65s",
      "64s",
      "63s",
      "62s",
      "A5o",
      "K5o",
      "Q5o",
      "J5o",
      "T5o",
      "95o",
      "85o",
      "75o",
      "65o",
      "55",
      "54s",
      "53s",
      "52s",
      "A4o",
      "K4o",
      "Q4o",
      "J4o",
      "T4o",
      "94o",
      "84o",
      "74o",
      "64o",
      "54o",
      "44",
      "43s",
      "42s",
      "A3o",
      "K3o",
      "Q3o",
      "J3o",
      "T3o",
      "93o",
      "83o",
      "73o",
      "63o",
      "53o",
      "43o",
      "33",
      "32s",
      "A2o",
      "K2o",
      "Q2o",
      "J2o",
      "T2o",
      "92o",
      "82o",
      "72o",
      "62o",
      "52o",
      "42o",
      "32o",
      "22",
    ];
    const suited = [
      "AKs",
      "AQs",
      "AJs",
      "ATs",
      "A9s",
      "A8s",
      "A7s",
      "A6s",
      "A5s",
      "A4s",
      "A3s",
      "A2s",
      "KQs",
      "KJs",
      "KTs",
      "K9s",
      "K8s",
      "K7s",
      "K6s",
      "K5s",
      "K4s",
      "K3s",
      "K2s",
      "QJs",
      "QTs",
      "Q9s",
      "Q8s",
      "Q7s",
      "Q6s",
      "Q5s",
      "Q4s",
      "Q3s",
      "Q2s",
      "JTs",
      "J9s",
      "J8s",
      "J7s",
      "J6s",
      "J5s",
      "J4s",
      "J3s",
      "J2s",
      "T9s",
      "T8s",
      "T7s",
      "T6s",
      "T5s",
      "T4s",
      "T3s",
      "T2s",
      "98s",
      "97s",
      "96s",
      "95s",
      "94s",
      "93s",
      "92s",
      "87s",
      "86s",
      "85s",
      "84s",
      "83s",
      "82s",
      "76s",
      "75s",
      "74s",
      "73s",
      "72s",
      "65s",
      "64s",
      "63s",
      "62s",
      "54s",
      "53s",
      "52s",
      "43s",
      "42s",
      "32s",
    ];
    const offsuited = [
      "A2o",
      "K2o",
      "Q2o",
      "J2o",
      "T2o",
      "92o",
      "82o",
      "72o",
      "62o",
      "52o",
      "42o",
      "32o",
      "A3o",
      "K3o",
      "Q3o",
      "J3o",
      "T3o",
      "93o",
      "83o",
      "73o",
      "63o",
      "53o",
      "43o",
      "A4o",
      "K4o",
      "Q4o",
      "J4o",
      "T4o",
      "94o",
      "84o",
      "74o",
      "64o",
      "54o",
      "A5o",
      "K5o",
      "Q5o",
      "J5o",
      "T5o",
      "95o",
      "85o",
      "75o",
      "65o",
      "A6o",
      "K6o",
      "Q6o",
      "J6o",
      "T6o",
      "96o",
      "86o",
      "76o",
      "A7o",
      "K7o",
      "Q7o",
      "J7o",
      "T7o",
      "97o",
      "87o",
      "A8o",
      "K8o",
      "Q8o",
      "J8o",
      "T8o",
      "98o",
      "A9o",
      "K9o",
      "Q9o",
      "J9o",
      "T9o",
      "ATo",
      "KTo",
      "QTo",
      "JTo",
      "AJo",
      "KJo",
      "QJo",
      "AQo",
      "KQo",
      "AKo",
    ];
    const combinations = [
      "AA",
      "KK",
      "QQ",
      "JJ",
      "TT",
      "99",
      "88",
      "77",
      "66",
      "55",
      "44",
      "33",
      "22",
    ];

    let acePairs = [];
    // Generate suited Ace pairs

    const off = combinations.map(async (value, idx) => {
      const arrayvals = value.split("");
      for (let i = 0; i < 4; i++) {
        for (let j = i + 1; j < 4; j++) {
          let suit = ["h", "c", "s", "d"];
          acePairs.push(`${arrayvals[0]}${suit[i]}${arrayvals[1]}${suit[j]}`);
          const matrixx = await MatrixModel.create({
            name: `${arrayvals[0]}${arrayvals[0]}`,
            type: "combination",
            value: `${arrayvals[0]}${suit[i]}${arrayvals[1]}${suit[j]}`,
          });
        }
      }
    });
    console.log(acePairs);
    var offsuitPairs = {};
    const offd = offsuited.map(async (value, idx) => {
      const arrayvals = value.split("");

      // Define the possible suits of cards
      const suits = ["h", "d", "c", "s"];
      // Generate all possible offsuit pairs of Ace and King
      for (let i = 0; i < suits.length; i++) {
        const suit1 = suits[i];
        for (let j = 0; j < suits.length; j++) {
          const suit2 = suits[j];
          if (suit1 !== suit2) {
            const key = arrayvals[0] + arrayvals[1] + "o";
            const pair = {
              pairs: arrayvals[0] + suit1 + arrayvals[1] + suit2,
            };
            const matrixx = await MatrixModel.create({
              name: key,
              type: "off",
              value: arrayvals[0] + suit1 + arrayvals[1] + suit2,
            });
            offsuitPairs[key] = pair;
            //console.log(offsuitPairs)
          }
        }
      }
    });
    let suitedPairs = {};
    // Generate all possible suited pairs of Ace and King
    const suiting = suited.map(async (value, idx) => {
      const arrayvals = value.split("");
      const suits = ["h", "d", "c", "s"];
      for (let i = 0; i < suits.length; i++) {
        const suit = suits[i];
        const key = arrayvals[0] + arrayvals[1] + "s";
        const pair = {
          pairs: cardOne + suit + cardTwo + suit,
        };
        const matrixx = await MatrixModel.create({
          name: key,
          type: "suited",
          value: arrayvals[0] + suit + arrayvals[1] + suit,
        });
        suitedPairs[key] = pair;
      }
      const suiting = combinations.map(async (value, idx) => {
        const arrayvals = value.split("");
        let acePairs = [];
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            if (i !== j) {
              let suit = ["h", "s", "d", "c"];
              acePairs.push(
                `${arrayvals[0]}${suit[i]} ${arrayvals[0]}${suit[j]}`
              );
              const key = arrayvals[0] + arrayvals[1];
            }
          }
        }
      });
    });

    res.status(200).send({
      status: "success",
      message: "All Cards Data",
    });
  });
  static getFlop = asyncHandler(async (req, res) => {
    try {
      const flop = await AlgorithmService.getFlopCards(req, res);
    } catch (error) {
      res.status(500).send({
        status: "failed",
        message: "data not found",
      });
    }
  });
  static getAlgo = async (req, res) => {
    const { userInput } = req.body;
    if (userInput) {
      const input = await AlgorithmModel.findOne({
        cards_string: userInput,
      });
      const matrix = await MatrixModel.find({});
      var mydata = [];
      var newRecord = [];
      const output = await AlgoString.aggregate(
        [
          ({ $unwind: "$algorithm" },
          { $group: { _id: { matrix: "$matrix", key: "$key" } } }),
        ],
        function (err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
          }
        }
      );
      res.status(200).send({
        status: "success",
        response: output,
      });
    } else {
      res
        .status(400)
        .send({ status: "failed", message: "Please enter user input" });
      return;
    }

    try {
      const input = await AlgorithmModel.findOne({ cards_string: userInput });
      const pipeline = [
        { $match: { algorithm_id: input._id } },
        { $group: { _id: "$algorithm_id", records: { $push: "$$ROOT" } } },
        { $project: { _id: 0, records: 1 } },
      ];
      const output = await AlgoString.aggregate(pipeline)
        .populate("records.algorithm_id", "-full_string")
        .lean();

      res.status(200).send({ status: "success", response: output[0].records });
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: "failed", message: "Data not found" });
    }
  };
  static getCardsPairs = asyncHandler(async (req, res) => {
    try {
      const cards_data = await MatrixModel.find({
        name: req.params.name,
      });
      if (cards_data.length === 0) {
        res.status(400).send({
          status: "failed",
          message: "No Such Card Pair",
        });
      } else {
        res.status(200).send({
          status: "success",
          message: "All Card Pairs",
          response: cards_data,
        });
      }
    } catch (error) {
      res.status(400).send({
        status: "failed",
        message: "Card Pairs not found",
        response: error.message,
      });
    }
  });
  static getOneFlop = asyncHandler(async (req, res) => {
    try {
      const flop = await AlgorithmService.getOneFlopCards(req, res);
    } catch (error) {
      res.status(500).send({
        status: "failed",
        message: "data not found",
      });
    }
    try {
      const cards_data = await MatrixModel.find({
        name: req.params.name,
      });
      if (cards_data.length === 0) {
        res.status(400).send({
          status: "failed",
          message: "No Such Card Pair",
        });
      } else {
        res.status(200).send({
          status: "success",
          message: "All Card Pairs",
          response: cards_data,
        });
      }
    } catch (error) {
      res.status(400).send({
        status: "failed",
        message: "Card Pairs not found",
        response: error.message,
      });
    }
  });
  static getAlgoGroup = async (req, res) => {
    const { userInput } = req.body;
    try {
      if (userInput) {
        const input = await AlgorithmModel.findOne({
          cards_string: userInput,
        });
        const output = await AlgoString.aggregate([
          {
            $match: {
              algorithm_id: input._id,
            },
          },
          {
            $group: {
              _id: { matrix: "$matrix" },
              response: { $push: "$$ROOT" },
            },
          },
        ]);
        res.status(200).send({
          status: "sccuess",
          message: "Data found",
          result_algorithm: input,
          result: output,
        });
      } else {
        res.status(400).send({ status: "Failed", message: "Data not found" });
      }
    } catch (err) {
      res.status(500).send({ status: "failed", message: err.message });
    }
  };
  static createExcelFormulas = asyncHandler(async (req, res) => {
    const d = new Date();
    let hour = d.getUTCHours().toString();
    let minutes = d.getUTCMinutes().toString();
    let date = d.getUTCDate().toString();
    let year = d.getUTCFullYear().toString();
    const name =
      "api/public/" +
      hour +
      minutes +
      date +
      year +
      "-" +
      req.file.originalname;
    const workbook = XLSX.readFile(name);

    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    const children = data.map(async (value, idx) => {
      const formula_data = value;
      let myArr = Object.keys(formula_data);
      let myVal = Object.values(formula_data);

      if (myVal[3] === undefined || myVal[3] === "---") {
      } else {
        console.log(myVal[3]);
        if (myArr[0] == "FLOP") {
          var result = {};
          if (!myVal[3]) {
            myVal[3] = "empty";
            Promise.all([
              AlgorithmModel.create({
                cards_string: myVal[0],
                joins: myVal[1],
                colour: myVal[2],
                type: "FLOP",
                full_string: myVal[3],
                //  flop_colour: myVal[3],
                //  flop_string: myVal[3],
              }),
            ])
              .then(function (result) {
                // console.log(result);
                // console.log("result");
              })
              .catch((e) => console.error(e));
          } else {
            Promise.all([
              AlgorithmModel.create({
                cards_string: myVal[0],
                joins: myVal[1],
                colour: myVal[2],
                type: "FLOP",
                full_string: myVal[3],
                //  flop_colour: myVal[3],
                //  flop_string: myVal[3],
              }),
            ])
              .then(function (result) {
                const arrays = {};
                const regex = /\[\d+\.\d+\](.*?)\[\/\d+\.\d+\]/g;
                const matches = [];
                let match;
                //console.log("matches", myVal[3]);
                while ((match = regex.exec(myVal[3]))) {
                  matches.push(match[0]);
                }
                const lastIndex = myVal[3].lastIndexOf("]");
                if (lastIndex !== -1) {
                  const remaining = myVal[3].substring(lastIndex + 1);
                  var lasts = remaining.substring(2);
                  matches.push(lasts);
                } else {
                }
                const valData = typeof myVal[3];
                matches.map((newtrim, keyd) => {
                  const newtrims = newtrim.split(",");
                  if (newtrims[0].includes("[")) {
                  } else {
                    newtrims[0] = `[100.00]${newtrims[0]}`;
                  }
                  var key = newtrims[0].substring(
                    newtrims[0].indexOf("[") + 1,
                    newtrims[0].lastIndexOf("]")
                  );
                  const finalarray = newtrim.split(",");
                  const lasttrim = finalarray.length - 1;
                  if (newtrims[lasttrim].includes("]")) {
                  } else {
                    newtrims[lasttrim] = `${newtrims[lasttrim]}[/100.00]`;
                  }
                  newtrims.map(async (arrayval, keyval) => {
                    if (keyval == 0) {
                      const fstValue =
                        AlgorithmService._extractFirstValueFromTrim(arrayval);
                      const firstValue =
                        AlgorithmService._removeSpaces(fstValue);
                      const myval = firstValue.split("");
                      const strType =
                        AlgorithmService._determineStringType(myval);
                      const matrixData = await AlgorithmService._getMatrixData(
                        firstValue
                      );
                      console.log("keyval", keyval);
                      Promise.all([
                        AlgoStringModel.create({
                          algorithm_id: result[0]._id,
                          matrix: matrixData,
                          key: key,
                          value: firstValue,
                          type: strType || "null",
                        }),
                      ])
                        .then(function (result) {})
                        .catch((e) => console.error(e));
                    } else if (keyval == lasttrim) {
                      const lstValue = arrayval.substr(
                        0,
                        arrayval.indexOf("[")
                      );
                      const lastValue =
                        AlgorithmService._removeSpaces(lstValue);
                      const myval = lastValue.split("");
                      const strType =
                        AlgorithmService._determineStringType(myval);
                      const matrixData = await AlgorithmService._getMatrixData(
                        lastValue
                      );
                      console.log("matrixData", matrixData);
                      Promise.all([
                        AlgoStringModel.create({
                          algorithm_id: result[0]._id,
                          matrix: matrixData,
                          key: key,
                          value: lastValue || "empty",
                          type: strType || "null",
                        }),
                      ])
                        .then(function (result) {})
                        .catch((e) => console.error(e));
                    } else {
                      arrayval = AlgorithmService._removeSpaces(arrayval);
                      const myval = arrayval.split("");
                      const strType =
                        AlgorithmService._determineStringType(myval);
                      const matrixData = await AlgorithmService._getMatrixData(
                        arrayval
                      );
                      Promise.all([
                        AlgoStringModel.create({
                          algorithm_id: result[0]._id,
                          matrix: matrixData,
                          key: key,
                          value: arrayval || "empty",
                          type: strType || "null",
                        }),
                      ])
                        .then(function (result) {})
                        .catch((e) => console.error(e));
                    }
                  });
                });
                AlgorithmService.insertAllPossibleScenario(
                  result[0]._id,
                  "value"
                );
              })
              .catch((e) => console.error(e));
          }
        } else if (myArr[0] == "TURN") {
          var result = {};
          if (!myVal[3]) {
            myVal[3] = "empty";
          }
          if (!myVal[1]) {
            myVal[1] = "empty";
          }
          Promise.all([
            AlgorithmModel.create({
              cards_string: myVal[0],
              joins: "myVal[1]",
              colour: myVal[2],
              type: "TURN",
              full_string: myVal[3],
            }),
          ])
            .then(function (result) {
              const arrays = {};
              const regex = /\[\d+\.\d+\](.*?)\[\/\d+\.\d+\]/g;
              const matches = [];
              let match;
              while ((match = regex.exec(myVal[3]))) {
                matches.push(match[0]);
              }
              const valData = typeof myVal[3];
              //  console.log("myVal[3]", myVal[3]);
              const newtrims = myVal[3].split(",");
              var key = newtrims[0].substring(
                newtrims[0].indexOf("[") + 1,
                newtrims[0].lastIndexOf("]")
              );
              matches.map((newtrim, keyd) => {
                const finalarray = newtrim.split(",");
                const lasttrim = finalarray.length - 1;
                finalarray.map(async (arrayval, keyval) => {
                  if (keyval == 0) {
                    const fstValue =
                      AlgorithmService._extractFirstValueFromTrim(arrayval);
                    const firstValue = AlgorithmService._removeSpaces(fstValue);
                    const myval = firstValue.split("");
                    const strType =
                      AlgorithmService._determineStringType(myval);
                    const matrixData = await AlgorithmService._getMatrixData(
                      firstValue
                    );
                    Promise.all([
                      AlgoStringModel.create({
                        algorithm_id: result[0]._id,
                        matrix: matrixData,
                        key: key,
                        value: firstValue,
                        type: strType || "null",
                      }),
                    ])
                      .then(function (result) {})
                      .catch((e) => console.error(e));
                  } else if (keyval == lasttrim) {
                    const lstValue = arrayval.substr(0, arrayval.indexOf("["));
                    const lastValue = AlgorithmService._removeSpaces(lstValue);
                    const myval = lastValue.split("");
                    const strType =
                      AlgorithmService._determineStringType(myval);
                    const matrixData = await AlgorithmService._getMatrixData(
                      lastValue
                    );
                    Promise.all([
                      AlgoStringModel.create({
                        algorithm_id: result[0]._id,
                        matrix: matrixData,
                        key: key,
                        value: lastValue || "empty",
                        type: strType || "null",
                      }),
                    ])
                      .then(function (result) {})
                      .catch((e) => console.error(e));
                  } else {
                    arrayval = AlgorithmService._removeSpaces(arrayval);
                    const myval = arrayval.split("");
                    const strType =
                      AlgorithmService._determineStringType(myval);
                    const matrixData = await AlgorithmService._getMatrixData(
                      arrayval
                    );
                    Promise.all([
                      AlgoStringModel.create({
                        algorithm_id: result[0]._id,
                        matrix: matrixData,
                        key: key,
                        value: arrayval || "empty",
                        type: strType || "null",
                      }),
                    ])
                      .then(function (result) {})
                      .catch((e) => console.error(e));
                  }
                });
              });
              AlgorithmService.insertAllPossibleScenario(
                result[0]._id,
                "value"
              );
            })
            .catch((e) => console.error(e));
        } else if (myArr[0] == "RIVER") {
          if (!myVal[3]) {
            myVal[3] = "empty";
          }
          if (!myVal[1]) {
            myVal[1] = "empty";
          }
          Promise.all([
            AlgorithmModel.create({
              cards_string: myVal[0],
              joins: myVal[1],
              colour: myVal[2],
              type: "RIVER",
              full_string: myVal[3],
            }),
          ])
            .then(function (result) {
              const arrays = {};
              const regex = /\[\d+\.\d+\](.*?)\[\/\d+\.\d+\]/g;
              const matches = [];
              let match;
              while ((match = regex.exec(myVal[3]))) {
                matches.push(match[0]);
              }
              const valData = typeof myVal[3];
              matches.map((newtrim, keyd) => {
                const newtrims = newtrim.split(",");
                var key = newtrims[0].substring(
                  newtrims[0].indexOf("[") + 1,
                  newtrims[0].lastIndexOf("]")
                );
                const finalarray = newtrim.split(",");
                const lasttrim = finalarray.length - 1;
                //console.log("matches", finalarray);
                finalarray.map(async (arrayval, keyval) => {
                  //console.log(keyval);
                  if (keyval == 0) {
                    var firstValue = arrayval.split("]")[1];
                    if (firstValue.includes("[/")) {
                      const checkvals = firstValue.split("[/");
                      firstValue = checkvals[0];
                      key = checkvals[1];
                    }
                    const myval = firstValue.split("");
                    const strType =
                      AlgorithmService._determineStringType(myval);
                    const matrixData = await AlgorithmService._getMatrixData(
                      firstValue
                    );
                    Promise.all([
                      AlgoStringModel.create({
                        algorithm_id: result[0]._id,
                        matrix: matrixData,
                        key: key,
                        value: firstValue,
                        type: strType || "null",
                      }),
                    ])
                      .then(function (result) {})
                      .catch((e) => console.error(e));
                  } else if (keyval == lasttrim) {
                    const lstValue = arrayval.substr(0, arrayval.indexOf("["));
                    const lastValue = AlgorithmService._removeSpaces(lstValue);
                    const myval = lastValue.split("");
                    const strType =
                      AlgorithmService._determineStringType(myval);
                    const matrixData = await AlgorithmService._getMatrixData(
                      lastValue
                    );
                    Promise.all([
                      AlgoStringModel.create({
                        algorithm_id: result[0]._id,
                        matrix: matrixData,
                        key: key,
                        value: lastValue || "empty",
                        type: strType || "null",
                      }),
                    ])
                      .then(function (result) {})
                      .catch((e) => console.error(e));
                  } else {
                    arrayval = AlgorithmService._removeSpaces(arrayval);
                    const myval = arrayval.split("");
                    const strType =
                      AlgorithmService._determineStringType(myval);
                    const matrixData = await AlgorithmService._getMatrixData(
                      arrayval
                    );
                    Promise.all([
                      AlgoStringModel.create({
                        algorithm_id: result[0]._id,
                        matrix: matrixData,
                        key: key,
                        value: arrayval || "empty",
                        type: strType || "null",
                      }),
                    ])
                      .then(function (result) {})
                      .catch((e) => console.error(e));
                  }
                });
              });
              AlgorithmService.insertAllPossibleScenario(
                result[0]._id,
                "value"
              );
            })
            .catch((e) => console.error(e));
        }
      }
    });

    res.status(200).send({ status: "success", message: "Uploaded" });
  });
}

module.exports = AlgorithmController;
