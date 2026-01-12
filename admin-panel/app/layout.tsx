import React from 'react';
import AdminHeader from '../../components/AdminHeader';
import AdminSidebar from '../../components/AdminSidebar';
import '../../styles/admin.css';

const AdminLayout = ({ children }) => {
    return (
        <div className="admin-layout">
            <AdminHeader />
            <div className="admin-content">
                <AdminSidebar />
                <main>{children}</main>
            </div>
        </div>
    );
};

export default AdminLayout;