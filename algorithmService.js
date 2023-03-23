const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const XLSX = require("xlsx");
const PreflopModel = require("../models/Preflop.js");
const MatrixModel = require("../models/Matrix");
const Algorithm = require("../models/Algorithm");
const AlgoString = require("../models/AlgoString");
const AlgoStringModel = require("../models/AlgoString");
class AlgorithmService {
  static getPreflopChart = asyncHandler(async (req, res) => {
    let { p1Position, p2Position, p1Action, p2Action } = req.body;
    if (p2Position === "") {
      p2Position = "NA";
    }
    if (p1Position === "") {
      p1Position = "NA";
    }
    if (p2Action === "") {
      p2Action = "NA";
    }
    if (p1Action === "") {
      p1Action = "NA";
    }
    const UserLoginModels_data = await PreflopModel.findOne({
      $and: [
        { playerOne: p1Position },
        { playerTwo: p2Position },
        { plyOneaction: p1Action },
        { plyTwoaction: p2Action },
      ],
    })
      .then((Preflops) =>
        res.status(200).send({
          status: "success",
          message: "preflop get data.",
          response: JSON.parse(Preflops.values),
        })
      )
      .catch((err) =>
        res.status(400).send({ status: "failed", message: "Data not found" })
      );
  });
  static createPreflops = asyncHandler(async (req, res) => {
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
    var keywords = req.file.originalname.split(" ");
    //console.log("mydata", keywords);
    const workbook = XLSX.readFile(name);
    const sheetOne = workbook.Sheets[workbook.SheetNames[0]];
    const dataSheet = XLSX.utils.sheet_to_json(sheetOne);
    // console.log(dataSheet);
    const sheetname = [];
    const children = dataSheet
      .slice(0)
      .reverse()
      .map((value, idx) => {
        let myArr = Object.keys(value);
        let myVal = Object.values(value);
        if (myVal[0].toString().includes("Player 1")) {
          sheetname.push(myVal[1]);
          sheetname.push(myVal[3]);
        }
        if (myVal[0].toString().includes("Action")) {
          sheetname.push(myVal[1]);
          sheetname.push(myVal[3]);
        }
        return true;
      });
    const sheet = workbook.Sheets[workbook.SheetNames[1]];
    const data = XLSX.utils.sheet_to_json(sheet);
    const datas = JSON.stringify(data);
    const user = await PreflopModel.create({
      playerOne: sheetname[2],
      playerTwo: sheetname[3],
      values: datas,
      plyOneaction: sheetname[0],
      plyTwoaction: sheetname[1],
      status: "1",
    });
    res
      .status(201)
      .send({ status: "success", message: "File Uploaded Successfully" });
  });
  static getFlopCards = async (req, res) => {
    const { userInput } = req.body;
    //try {
    if (userInput) {
      const input = await Algorithm.findOne({
        cards_string: userInput,
      });
      const matrix = await MatrixModel.find({});
      //console.log("matrix", matrix);
      var mydata = [];
      var newRecord = [];
      await Promise.all(
        matrix.map(async (values, idx) => {
          // console.log("1");
          const output = await AlgoString.find({
            $and: [{ algorithm_id: input._id }, { value: values.value }],
          })
            .populate("algorithm_id", "-full_string")
            .lean();

          //newRecord.push(values.name);
          // console.log("q1");

          if (output.length > 0) {
            const newObject = { name: values.name };
            // console.log("output", output);
            //myArray.push(newObject);
            output[0].matrixKey = values.name;
            const checking = values.name;
            const myArray = [{ [values.name]: output }];
            mydata.push(myArray[0]);
          } else {
            const object = {
              matrixKey: values,
            };
            var arr = [];
            arr.push(values);
            //console.log("values", arr);
            const myArray = [{ [values.name]: arr }];
            mydata.push(myArray[0]);
          }

          return mydata;
        })
      );
      const originalObj = {};
      mydata.forEach((obj) => {
        Object.keys(obj).forEach((key) => {
          originalObj[key] = originalObj.hasOwnProperty(key)
            ? [].concat(originalObj[key], obj[key])
            : obj[key];
        });
      });

      //console.log(originalObj);
      const newObj = {};
      for (const key in originalObj) {
        if (Object.prototype.hasOwnProperty.call(originalObj, key)) {
          if (newObj[key]) {
            newObj[key].push(...originalObj[key]);
          } else {
            newObj[key] = originalObj[key];
          }
        }
      }
      //console.log(mydata);
      res.status(200).send({
        status: "success",
        response: newObj,
      });
    } else {
      res
        .status(400)
        .send({ status: "failed", message: "Please enter user input" });
    }
    // } catch (error) {
    //   res.status(500).send({ status: "failed", message: "Data not found" });
    // }
  };
  static getOneFlopCards = async (req, res) => {
    const { userInput, matrixKey } = req.body;

    try {
      if (userInput) {
        const input = await Algorithm.findOne({
          cards_string: userInput,
        });
        const matrix = await MatrixModel.find({
          $and: [{ name: matrixKey }],
        });
        //    console.log("matrix", matrix);
        var mydata = [];
        await Promise.all(
          matrix.map(async (values, idx) => {
            const output = await AlgoString.find({
              $and: [{ algorithm_id: input._id }, { value: values.value }],
            })
              .populate("algorithm_id", "-full_string")
              .lean();
            if (output.length > 0) {
              output[0].matrixKey = values.name;
              mydata.push(output[0]);
            } else {
              const object = {
                matrixKey: values,
              };
              mydata.push(object);
            }
            return mydata;
          })
        );

        console.log(mydata);
        res.status(200).send({
          status: "success",
          response: mydata,
        });
      } else {
        res
          .status(400)
          .send({ status: "failed", message: "Please enter user input" });
      }
    } catch (error) {
      res.status(500).send({ status: "failed", message: "Data not found" });
    }
  };

  //New Cleanup Methods for Algorithms
  static extractArraysFromString(betString) {
    const regex = /\[\d+\.\d+\](.*?)\[\/\d+\.\d+\]/g;
    const matches = [];
    let match;

    while ((match = regex.exec(betString))) {
      matches.push(match[0]);
      regex.lastIndex = match.index + match[0].length; // reset lastIndex
    }

    const lastIndex = betString.lastIndexOf("]");
    if (lastIndex !== -1) {
      const remaining = betString.substring(lastIndex + 1);
      var lasts = remaining.substring(2);
      matches.push(lasts);
    }

    return matches;
  }

  static processArray(algorithmId, arrayString) {
    const newtrimArray = this._splitArrayString(arrayString);
    // if (newtrimArray[0].includes("[")) {
    //   // console.log(newtrims[0]);
    //   //console.log("The string contains the substring 'sample'");
    // } else {
    //   newtrimArray[0] = `[100.00]${arrayString[0]}`;
    //   //console.log(newtrims[0]);
    // }
    const key = this._extractKeyFromTrim(newtrimArray[0]);
    //console.log("key", key);
    const firstValue = this._extractFirstValueFromTrim(newtrimArray[0]);

    // const finalarray = newtrimArray.split(",");
    const lasttrim = newtrimArray.length - 1;
    //console.log("newtrimArray", key);
    newtrimArray.map(async (arrayval, keyval) => {
      if (keyval == 0) {
        const fstValue = this._extractFirstValueFromTrim(arrayval);
        const firstValue = this._removeSpaces(fstValue);
        const myval = firstValue.split("");
        const strType = this._determineStringType(myval);
        const matrixData = await this._getMatrixData(firstValue);
        //console.log("keyval", keyval);
        //console.log("key", key);

        const myresult = await AlgoStringModel.create({
          algorithm_id: algorithmId,
          matrix: matrixData,
          key: key,
          value: firstValue || "null",
          type: strType || "null",
        });
      } else if (keyval == lasttrim) {
        const lstValue = arrayval.substr(0, arrayval.indexOf("["));
        const lastValue = this._removeSpaces(lstValue);
        const myval = lastValue.split("");
        const strType = this._determineStringType(myval);
        const matrixData = await this._getMatrixData(lastValue);
        //console.log("matrixData", matrixData);
        //console.log("key", key);
        const myresult = await AlgoStringModel.create({
          algorithm_id: algorithmId,
          matrix: matrixData,
          key: key,
          value: firstValue || "null",
          type: strType || "null",
        });
      } else {
        arrayval = this._removeSpaces(arrayval);
        const myval = arrayval.split("");
        const strType = this._determineStringType(myval);

        const matrixData = await this._getMatrixData(arrayval);
        //console.log("matrixData", matrixData);

        const myresult = await AlgoStringModel.create({
          algorithm_id: algorithmId,
          matrix: matrixData,
          key: key,
          value: firstValue || "null",
          type: strType || "null",
        });
      }
    });

    // try {
    //   AlgoStringModel.create([
    //     {
    //       algorithm_id: algorithmId,
    //       matrix: matrixData,
    //       key: key,
    //       value: firstValue,
    //       type: strType || "null",
    //     },
    //   ]);
    // } catch (error) {
    //   console.error("Error creating AlgoStringModel:", error);
    // }
  }

  static _splitArrayString(arrayString) {
    return arrayString.split(",");
  }

  static _extractKeyFromTrim(trimString) {
    return trimString.substring(
      trimString.indexOf("[") + 1,
      trimString.lastIndexOf("]")
    );
  }

  static _extractFirstValueFromTrim(trimString) {
    if (trimString.includes("]")) {
      var firstValue = trimString.split("]")[1];
    } else {
      var firstValue = trimString;
    }
    return firstValue;
  }

  static _determineStringType(value) {
    //console.log("value", value);
    //const myval = value.split("");
    if (value[0] === value[2]) {
      return "combination";
    } else if (value[1] === value[3]) {
      return "suited";
    } else {
      return "off";
    }
  }

  static _getMatrixData = asyncHandler(async (value) => {
    console.log("vLUE", value);
    let matrix = await MatrixModel.find({
      $and: [{ value: value }],
    });

    if (matrix.length === 0) {
      const firstTwo = value.slice(0, 2);
      const lastTwo = value.slice(2);
      const stringWithSpaces = `${lastTwo}${firstTwo}`;
      const newStr = stringWithSpaces.replace(/\s/g, "");
      matrix = await MatrixModel.find({
        $and: [{ value: newStr }],
      });
      if (matrix.length > 0) {
        var matrixData = matrix[0].name;
      } else {
        var matrixData = "";
      }
    }

    if (matrix.length > 0) {
      var matrixData = matrix[0].name;
    } else {
      var matrixData = "";
    }
    console.log(matrixData);
    return matrixData;
  });
  static _removeSpaces(str) {
    if (/\s/.test(str)) {
      // check if string contains any spaces
      return str.replace(/\s/g, ""); // if yes, remove all spaces and return
    } else {
      return str; // if no, return the original string
    }
  }
  static insertAllPossibleScenario = asyncHandler(
    async (algorithmId, value) => {
      try {
        const matrixData = await MatrixModel.find({});
        await Promise.all(
          matrixData.map(async (values, idx) => {
            const algoStringData = await AlgoStringModel.find({
              $and: [{ algorithm_id: algorithmId }, { value: values.value }],
            });

            let firstTwo = values.value.slice(0, 2); // "he"
            let lastTwo = values.value.slice(2); // "lo"
            let stringWithSpaces = `${lastTwo}${firstTwo}`;
            let newStr = stringWithSpaces.replace(/\s/g, "");

            const checkput = await AlgoStringModel.find({
              $and: [{ algorithm_id: algorithmId }, { value: newStr }],
            });

            if (algoStringData.length > 0 || checkput.length > 0) {
              // do nothing
            } else {
              await AlgoStringModel.create({
                algorithm_id: algorithmId,
                matrix: values.name,
                key: "",
                value: values.value,
                type: values.type || "null",
              });
            }
          })
        );
        return true;
      } catch (error) {
        console.error(error);
      }
    }
  );
}
module.exports = AlgorithmService;
