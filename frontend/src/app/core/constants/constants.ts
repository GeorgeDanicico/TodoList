export const constants = {
  CURRENT_TOKEN: 'CURRENT_TOKEN',
};

const apiUrl = 'http://localhost:8080/api';

export const apiEndpoint = {
  AuthEndpoint: {
    login: `${apiUrl}/login`,
    logout: `${apiUrl}/logout`,
    loggedUser: `${apiUrl}/user`,
  },
  TodoEndpoint: {
    getAllTodo: `${apiUrl}/todos`,
    addTodo: `${apiUrl}/todos`,
    updateTodo: `${apiUrl}/todos`,
  },
};
