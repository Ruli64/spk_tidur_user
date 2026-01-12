import React from 'react';
import AdminHeader from '../../../components/AdminHeader';
import AdminSidebar from '../../../components/AdminSidebar';

const AdminPage = () => {
    return (
        <div className="admin-container">
            <AdminHeader />
            <div className="admin-content">
                <AdminSidebar />
                <main>
                    <h1>Welcome to the Admin Panel</h1>
                    <p>Select an option from the sidebar to manage the application.</p>
                </main>
            </div>
        </div>
    );
};

export default AdminPage;