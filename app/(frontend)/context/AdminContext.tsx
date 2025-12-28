'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Property {
  _id: string;
  title: string;
  // Add other relevant property fields if needed for display
}

interface AdminData {
  _id: string;
  name: string;
  email: string;
  phoneNo: string;
  bio?: string;
  experience?: number;
  specialization?: string;
  profilePhoto?: string;
  role: string;
  properties: Property[];
  propertySold: number;
  createdAt: string;
}

interface AdminContextType {
    adminData: AdminData | null;
    loading: boolean;
    refreshAdminData: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
    const [adminData, setAdminData] = useState<AdminData | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchAdminData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/admin/me');
            if (!response.ok) {
                router.push('/admin/auth/login');
                return;
            }
            const result = await response.json();
            if (result.data) {
                setAdminData(result.data);
            } else {
                router.push('/admin/auth/login');
            }
        } catch (error) {
            console.error("Failed to fetch admin data", error);
            router.push('/admin/auth/login');
        } finally {
            setLoading(false);
        }
    }, [router]);

    useEffect(() => {
        fetchAdminData();
    }, [fetchAdminData]);

    const refreshAdminData = useCallback(async () => {
        await fetchAdminData();
    }, [fetchAdminData]);

    return (
        <AdminContext.Provider value={{ adminData, loading, refreshAdminData }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};
