import NavMenu from "./_Components/NavMenu";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex">
            <NavMenu />
            {children}
        </div>
    );
}
