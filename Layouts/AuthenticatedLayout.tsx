export default function AuthenticatedLayout({ children, header }: { children: any; header: any }) {
  return (
    <>
      {header}
      <main>{children}</main>
    </>
  )
}

