"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


interface IUserProfile {
  _id: string;
  username?: string;
  email?: string;
  phoneNo: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  savedProperties: string[]; 
  contactedProperties: string[];
  seenProperties: string[];
  myReviews: string[];
  createdAt: string;
  avatar?: string;
}

interface UserContextType {
  user: IUserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<IUserProfile | null>>;
  loading: boolean;
  error: string | null;
  fetchUserData: () => Promise<void>;
  updateUser: (updatedData: Partial<IUserProfile>) => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchUserData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/users/get-profile");
      setUser(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch user data");
      setUser(null);
      // Optionally redirect to login if unauthorized
      if (err.response?.status === 401 || err.response?.status === 403) {
        router.push("/user/auth/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updatedData: Partial<IUserProfile>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put("/api/users/update-profile", updatedData);
      setUser(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to update user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, error, fetchUserData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

