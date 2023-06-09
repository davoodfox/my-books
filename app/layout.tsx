import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-enriqueta">
        <nav className="bg-slate-900 text-gray-300 p-2">
          <ul className="flex gap-2">
            <li>
              <Link className="hover:text-white" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/authors">
                Authors
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/books">
                Books
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/genres">
                Genres
              </Link>
            </li>
          </ul>
        </nav>
        <div className="px-4 sm:px-16 md:px-32 lg:px-72 py-3">{children}</div>
      </body>
    </html>
  );
}
