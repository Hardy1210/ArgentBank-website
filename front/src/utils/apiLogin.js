export const loginRequest = async (email, password) => {
    const url = 'http://localhost:3001/api/v1/user/login';
    const requestBody = { email, password };
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
  
    if (!response.ok) {
      throw new Error('Login failed, please check your credentials');
    }
  
    const data = await response.json();
    return data.body;
  };