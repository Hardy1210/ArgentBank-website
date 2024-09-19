export const getUserProfile = async () => {
  const url = 'http://localhost:3001/api/v1/user/profile';

  // Récupérer le token depuis le stockage local ou session
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,  // Token dans le header
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  const data = await response.json();
  return data.body;  // Le profil de l'utilisateur
};
