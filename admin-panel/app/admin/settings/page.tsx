import React from 'react';
import AdminHeader from '../../../components/AdminHeader';
import AdminSidebar from '../../../components/AdminSidebar';

const SettingsPage = () => {
    return (
        <div className="admin-settings">
            <AdminHeader />
            <div className="admin-content">
                <AdminSidebar />
                <div className="settings-main">
                    <h1>Settings</h1>
                    <p>Manage your application settings here.</p>
                    {/* Add settings form or components here */}
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;