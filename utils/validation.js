const checkRoleType = (role) => {
  const roleTypes = ["client", "restauranteur", "delivery_driver", "admin"];

  for (let i = 0; i < roleTypes.length; i++) {
    // If any element matches the input value, return true

    console.log(roleTypes[i]);

    // role===roleTypes[i]? return true
    if (roleTypes[i] === role) {
      return true;
    }
  }

  // If no match is found, return false
  return false;

  // if()
};

module.exports = {
  checkRoleType,
};
