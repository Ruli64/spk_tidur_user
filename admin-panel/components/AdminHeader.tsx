import React from 'react';

const AdminHeader = () => {
    return (
        <header className="admin-header">
            <h1>Admin Panel</h1>
            <nav>
                <ul>
                    <li><a href="/admin/dashboard">Dashboard</a></li>
                    <li><a href="/admin/users">Users</a></li>
                    <li><a href="/admin/settings">Settings</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default AdminHeader;