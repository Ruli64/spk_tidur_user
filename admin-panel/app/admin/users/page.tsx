import React from 'react';
import AdminHeader from '../../../components/AdminHeader';
import AdminSidebar from '../../../components/AdminSidebar';

const UsersPage = () => {
    return (
        <div className="admin-container">
            <AdminHeader />
            <div className="admin-content">
                <AdminSidebar />
                <main>
                    <h1>User Management</h1>
                    {/* Add user management functionalities here */}
                </main>
            </div>
        </div>
    );
};

export default UsersPage;