"use client"
import Layout from '@/components/layout/Layout';

export default function AdminLayout({ children }) {
  return <Layout role="admin">{children}</Layout>;
}