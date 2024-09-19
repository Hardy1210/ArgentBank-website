//enregistrer le token
export const saveToken = (token, rememberMe) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('authToken', token);
  };
  //function pour obtien du token avec sessioStorage et localStorage
  export const loadToken = () => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    return token;
  };
  //pour effacer le token
  export const clearToken = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
  };
  {/*export const saveToken = (token, rememberMe) => {
  if (rememberMe) {
    localStorage.setItem('authToken', token);
  } else {
    sessionStorage.setItem('authToken', token);
  }
};

export const getToken = () => {
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
};

export const clearToken = () => {
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('authToken');
}; */}