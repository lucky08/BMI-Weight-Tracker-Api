const WeightDate = require("../models/weight-date");
const UserProfile = require("../models/user-profile");

module.exports.findAllByUserProfileId = async (req, res) => {
  const { userProfileId } = req.params;

  try {
    const weightDates = await WeightDate.getAllByUserProfileId(userProfileId);

    const userProfile = await UserProfile.findById(userProfileId);

    for (let weightDate of weightDates) {
      weightDate.bmi =
        weightDate.weight /
        ((userProfile.height / 100) * (userProfile.height / 100));

      if (weightDate.bmi < 16) {
        weightDate.status = "Severe thinness";
      } else if (16 <= weightDate.bmi && weightDate.bmi < 17) {
        weightDate.status = "Moderate thinness";
      } else if (17 <= weightDate.bmi && weightDate.bmi < 18.5) {
        weightDate.status = "Mild thinness";
      } else if (18.5 <= weightDate.bmi && weightDate.bmi < 25) {
        weightDate.status = "Normal";
      } else if (25 <= weightDate.bmi && weightDate.bmi < 30) {
        weightDate.status = "Pre-obese";
      } else if (30 <= weightDate.bmi && weightDate.bmi < 35) {
        weightDate.status = "Obese (Class I)";
      } else if (35 <= weightDate.bmi && weightDate.bmi < 40) {
        weightDate.status = "Obese (Class II)";
      } else if (weightDate.bmi >= 40) {
        weightDate.status = "Obese (Class III)";
      }

      if (userProfile.age >= 18) {
        if (userProfile.gender === "female") {
          weightDate.bodyFatPercentage =
            1.2 * weightDate.bmi + 0.23 * userProfile.age - 10.8 * 0 - 5.4;
        } else if (userProfile.gender === "male") {
          weightDate.bodyFatPercentage =
            1.2 * weightDate.bmi + 0.23 * userProfile.age - 10.8 * 1 - 5.4;
        }
      } else if (userProfile.age >= 5 && userProfile.age < 18) {
        if (userProfile.gender === "female") {
          weightDate.bodyFatPercentage =
            1.5 * weightDate.bmi - 0.7 * userProfile.age - 3.6 * 0 + 1.4;
        } else if (userProfile.gender === "male") {
          weightDate.bodyFatPercentage =
            1.5 * weightDate.bmi - 0.7 * userProfile.age - 3.6 * 1 + 1.4;
        }
      }

      weightDate.bmi = parseFloat(weightDate.bmi).toFixed(2);
      weightDate.bodyFatPercentage = parseFloat(
        weightDate.bodyFatPercentage
      ).toFixed(2);
    }

    return res.status(200).send(weightDates);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send(JSON.parse("Error while retrieving all weightDates"));
  }
};

module.exports.create = async (req, res) => {
  try {
    const { weight, dateTime, userProfileId } = req.body;

    const weightDate = new WeightDate({
      weight,
      dateTime,
      userProfileId,
    });

    const createdWeightDate = await WeightDate.create(weightDate);
    return res.status(201).send(createdWeightDate);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(JSON.parse("Error while creating weight date by id."));
  }
};

module.exports.update = async (req, res) => {
  try {
    const { weight, dateTime, userProfileId } = req.body;

    const weightDate = new WeightDate({
      weight,
      dateTime,
      userProfileId,
    });

    const updatedWeightDate = await WeightDate.update(weightDate);
    return res.status(201).send(updatedWeightDate);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send(JSON.parse("Error while updating weight date by id."));
  }
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    await WeightDate.delete(id);

    return res
      .status(200)
      .send({ message: "Weight Date removed successfully!" });
  } catch (err) {
    console.error(err);

    const wasNotFound = err.kind === "not_found";

    const status = wasNotFound ? 404 : 500;
    const message = wasNotFound
      ? "Weight Date not found."
      : err.message || "Error while deleting the Weight Date.";

    return res.status(status).send({ message });
  }
};
