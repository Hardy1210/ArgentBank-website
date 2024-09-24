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
      // Vérifier si la réponse contient un statut 401 ou 403
      if (response.status === 400) {
        throw new Error('Email ou mot de passe incorrect');
      } else {
        throw new Error('Une erreur est survenue, veuillez réessayer');
      }
    }
  
    const data = await response.json();
    
    //console.log('API Response:', data);
     // S'assurer que toutes les données nécessaires sont présentes dans la réponse
    return {
      token: data.body.token,
    }
  };