const UserProfile = require('../models/user-profile');

module.exports.findAll = async (req, res) => {
  try {
    const userProfiles = await UserProfile.findAll();
    return res.status(200).send(userProfiles);
  } catch (err) {
    console.error(err);
    return res.status(500).send(JSON.parse('Error while retrieving all user profiles'));
  }
};

module.exports.findOneByUuid = async (req, res) => {
  const { uuid } = req.params;
  try {
    const userProfile = await UserProfile.findByUuid(uuid);
    return res.status(200).send(userProfile);
  } catch (err) {
    console.log(err);

    const wasNotFound = err.message === 'not_found';
    const status = wasNotFound ? 404 : 500;
    const message = wasNotFound
      ? 'User profile not found.'
      : err.message || 'Error while retrieving user profile by uuid.';

    return res.status(status).send({ message });
  }
};

module.exports.create = async (req, res) => {
  try {
    const { userName, age, gender, height, uuid } = req.body;

    const userProfile = new UserProfile({
      userName,
      age,
      gender,
      height,
      uuid,
    });

    const createdUserProfile = await UserProfile.create(userProfile);
    return res.status(201).send(createdUserProfile);
  } catch (err) {
    console.log(err);
    return res.status(500).send(JSON.parse('Error while creating user profile.'));
  }
};

module.exports.update = async (req, res) => {
  try {
    const { userName, age, gender, height, uuid } = req.body;

    const userProfile = new UserProfile({
      userName,
      age,
      gender,
      height,
      uuid,
    });

    const updatedUserProfile = await UserProfile.updateByUuid(userProfile);
    return res.status(201).send(updatedUserProfile);
  } catch (err) {
    console.log(err);
    return res.status(500).send(JSON.parse('Error while updating user profile by id.'));
  }
};
