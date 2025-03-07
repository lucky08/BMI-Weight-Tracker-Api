const WeightDate = require('../models/weight-date');
const UserProfile = require('../models/user-profile');

module.exports.findAllByUserProfileId = async (req, res) => {
  const { userProfileId } = req.params;

  try {
    const [weightDates, userProfile] = await Promise.all([
      WeightDate.getAllByUserProfileId(userProfileId),
      UserProfile.findById(userProfileId),
    ]);

    const { height, age, gender } = userProfile;
    const heightInMeters = height / 100;

    const processedWeightDates = weightDates.map((weightDate) => {
      const bmi = weightDate.weight / (heightInMeters * heightInMeters);
      let status;

      if (bmi < 16) status = 'Severe Thinness';
      else if (bmi < 17) status = 'Moderate Thinness';
      else if (bmi < 18.5) status = 'Mild Thinness';
      else if (bmi < 25) status = 'Normal';
      else if (bmi < 30) status = 'Pre-obese';
      else if (bmi < 35) status = 'Obese (Class I)';
      else if (bmi < 40) status = 'Obese (Class II)';
      else status = 'Obese (Class III)';

      let bodyFatPercentage = null;
      if (age >= 18) {
        bodyFatPercentage = 1.2 * bmi + 0.23 * age - 10.8 * (gender === 'male' ? 1 : 0) - 5.4;
      } else if (age >= 5) {
        bodyFatPercentage = 1.5 * bmi - 0.7 * age - 3.6 * (gender === 'male' ? 1 : 0) + 1.4;
      }

      return {
        ...weightDate,
        bmi: bmi.toFixed(2),
        status,
        bodyFatPercentage: bodyFatPercentage ? bodyFatPercentage.toFixed(2) : null,
      };
    });

    return res.status(200).send(processedWeightDates);
  } catch (err) {
    console.error(err);
    return res.status(500).send(JSON.parse('Error while retrieving all weight dates'));
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
    return res.status(500).send(JSON.parse('Error while creating weight date.'));
  }
};

module.exports.update = async (req, res) => {
  try {
    const { id, weight, dateTime, userProfileId } = req.body;

    const weightDate = new WeightDate({
      id,
      weight,
      dateTime,
      userProfileId,
    });

    const updatedWeightDate = await WeightDate.update(weightDate);
    return res.status(201).send(updatedWeightDate);
  } catch (err) {
    console.log(err);
    return res.status(500).send(JSON.parse('Error while updating weight date by id.'));
  }
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    await WeightDate.delete(id);

    return res.status(200).send({ message: 'Weight date removed successfully!' });
  } catch (err) {
    console.error(err);

    const wasNotFound = err.kind === 'not_found';

    const status = wasNotFound ? 404 : 500;
    const message = wasNotFound ? 'Weight date not found.' : err.message || 'Error while deleting the Weight date.';

    return res.status(status).send({ message });
  }
};
