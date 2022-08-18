import { useStore } from "@/store";

interface User {
  name: string;
  email: string;
  password: string;
}

export const useAuth = () => {
  const store = useStore();

  const createUser = async (user: User) => {
    const response = await store.dispatch("authModule/createUser", user);

    return response;
  };

  return {
    createUser,
  };
};
