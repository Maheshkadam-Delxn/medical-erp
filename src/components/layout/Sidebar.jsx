'use client';
import { usePathname } from 'next/navigation';
import AdminSidebar from '../dashboard/AdminSidebar';
import ChemistSidebar from '../dashboard/ChemistSidebar';
import SupplierSidebar from '../dashboard/SupplierSidebar';

export default function Sidebar({ role, isOpen, onClose }) {
  const pathname = usePathname();
  const SidebarComponent = {
    admin: AdminSidebar,
    chemist: ChemistSidebar,
    supplier: SupplierSidebar
  }[role];

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200
      transform ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      transition-transform duration-300 ease-in-out
    `}>
      <SidebarComponent 
        isOpen={isOpen} 
        onClose={onClose}
        currentPath={pathname} // Pass pathname to the specific sidebar
      />
    </aside>
  );
}