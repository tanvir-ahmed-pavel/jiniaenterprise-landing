export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Admin layout without the main site Navbar/Footer
  return <>{children}</>;
}
