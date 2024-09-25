import { useAuth } from '@/contexts/AppContext';
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