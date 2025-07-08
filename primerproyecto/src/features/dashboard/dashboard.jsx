import { useAuth } from '../auth/hooks/useAuth';
import ProductPage from './pages/productPage';

const Dashboard = () => {
    const { user, logout } = useAuth();

    return (
        <>
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Panel De Adminstración</h1>
                <button className="button-logout" onClick={logout}>Cerrar Sesión</button>
            </div>

            <div className="dashboard-content">
                <div className="user-info">
                    <h2>Información del Usuario</h2>
                    {user?.avatar && (
                        <div className="user-avatar">
                            <img src={user.avatar} alt={`Avatar de ${user.name}`} />
                        </div>
                    )}
                    <p><strong>ID:</strong> {user?.id}</p>
                    <p><strong>Nombre:</strong> {user?.name}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Rol:</strong> {user?.role}</p>
                     
                </div>
                <ProductPage/>
            </div>
        </div>

     
    </>
    );
};

export default Dashboard;
