import { useAuth } from '@/contexts/AuthContext';
import React, { ReactNode } from 'react';

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { isAuthenticated } = useAuth()

        return (
            <>
                {children}
            </>
        )
};

export default PublicLayout;