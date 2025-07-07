const API_URL = 'https://api.escuelajs.co/api/v1/users';

export const authenticateUser = async (credentials) => {
  const { email, password } = credentials;

  console.log('authenticateUser called with:', email, password);

  const response = await fetch(`${API_URL}`);

  if (!response.ok) {
    throw new Error('Error conectando al servidor');
  }

  const users = await response.json();

  console.log('Users fetched:', users);

  const user = users.find((a) => a.email === email && a.password === password);

  console.log('User found:', user);

  if (user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    };
  }

  return null;
};