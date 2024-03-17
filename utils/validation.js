const checkRoleType = (role) => {
  const roleTypes = ["client", "restauanteur", "delivery_driver", "admin"];

  console.log(roleTypes.some(roleType =>roleTypes === roleType));

  return roleTypes.some((roleType) => roleType === role);
};

module.exports = {
  checkRoleType,
};
