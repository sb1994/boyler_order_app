const checkRoleType = (role) => {
  const roleTypes = ["client", "restaurateur", "delivery_driver", "admin"];

  return roleTypes.some((roleType) => roleType === role);
};

module.exports = {
  checkRoleType,
};
