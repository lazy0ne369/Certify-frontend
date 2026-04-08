import PublicNavbar from './PublicNavbar';

export default function PublicLayout({ children, className = '' }) {
    return (
        <div className={`min-h-screen public-app-shell ${className}`}>
            <PublicNavbar />
            {children}
        </div>
    );
}
