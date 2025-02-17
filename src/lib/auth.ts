// Mock authentication for client-side demo
const mockUsers = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    password: "password123",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@gmail.com",
    password: "Pass@123",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  },
];

export async function registerUser(userData: {
  name: string;
  email: string;
  password: string;
}) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const existingUser = mockUsers.find((u) => u.email === userData.email);
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const newUser = {
    id: String(mockUsers.length + 1),
    ...userData,
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`,
  };

  mockUsers.push(newUser);
  const { password, ...userWithoutPassword } = newUser;
  return { user: userWithoutPassword };
}

export async function loginUser(email: string, password: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = mockUsers.find(
    (u) => u.email === email && u.password === password,
  );
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword };
}
