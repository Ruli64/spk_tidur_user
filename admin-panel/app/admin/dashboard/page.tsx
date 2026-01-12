import React from 'react';
import AdminHeader from '../../../components/AdminHeader';
import AdminSidebar from '../../../components/AdminSidebar';
import AdminCard from '../../../components/AdminCard';
import './admin.css';

const DashboardPage = () => {
    return (
        <div className="admin-dashboard">
            <AdminHeader />
            <div className="admin-content">
                <AdminSidebar />
                <main className="dashboard-main">
                    <h1>Dashboard</h1>
                    <div className="dashboard-cards">
                        <AdminCard title="Total Users" value="150" />
                        <AdminCard title="Active Sessions" value="75" />
                        <AdminCard title="Pending Orders" value="20" />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;