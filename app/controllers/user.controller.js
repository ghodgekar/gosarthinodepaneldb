exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.driverBoard = (req, res) => {
  res.status(200).send("Driver Content.");
};
exports.customerBoard = (req, res) => {
  res.status(200).send("Customer Content.");
};