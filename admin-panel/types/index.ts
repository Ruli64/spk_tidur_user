export type User = {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
};

export type DashboardMetrics = {
    totalUsers: number;
    activeUsers: number;
    totalSales: number;
};

export type Settings = {
    theme: 'light' | 'dark';
    notificationsEnabled: boolean;
};

export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}