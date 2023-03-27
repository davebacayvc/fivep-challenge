import { useEffect, useState } from "react";
import ENDPOINTS from "../constants/endpoints";

export interface UsersData {
  email: string;
  id?: number;
  name: string;
  phoneNumber: string;
}

const useFetchUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UsersData[]>();
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const response = await fetch(ENDPOINTS.USER_INFO);
      const data = await response.json();

      setUsers(data);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  return {
    users,
    loading,
    setLoading,
    setUsers,
  };
};

export default useFetchUsers;
