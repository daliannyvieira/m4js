const JsonResponse = {
  formatUserData: (user, method) => {
    if (method === 'post') {
      return {
        type: `User`,
        id: user.id,
        attributes: {
          name: user.name,
          message: `O usuário ${user.name} foi criado com sucesso.`
        }
      };
    }
    return {
      type: `User`,
      id: user.id,
      attributes: {
        name: user.name,
        message: `Sucesso`
      }
    };
  },
  formatAuthorization: (token) => {
    return {
      type: `Authorization`,
      attributes: {
        token: token.jwt
      }
    }
  }
};

module.exports = JsonResponse;