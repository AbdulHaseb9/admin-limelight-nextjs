export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <main>Dashboard Layout{children}</main>
            </body>
        </html>
    )
}