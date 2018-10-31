const JsonResponse = {
  formatUserData: (user) => {
    return {
      type: `User`,
      id: user.id,
      attributes: {
        name: user.name,
        email: user.email
      }
    };
  }
};

module.exports = JsonResponse;