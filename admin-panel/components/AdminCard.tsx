import React from 'react';

interface AdminCardProps {
    title: string;
    content: string;
    footer?: React.ReactNode;
}

const AdminCard: React.FC<AdminCardProps> = ({ title, content, footer }) => {
    return (
        <div className="admin-card">
            <h3 className="admin-card-title">{title}</h3>
            <p className="admin-card-content">{content}</p>
            {footer && <div className="admin-card-footer">{footer}</div>}
        </div>
    );
};

export default AdminCard;