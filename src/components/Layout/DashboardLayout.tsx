import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
