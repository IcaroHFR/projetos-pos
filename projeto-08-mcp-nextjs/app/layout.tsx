import "./globals.css";

export const metadata = {
  title: "Better Auth Demo",
  description: "Next.js App Router demo com login GitHub e SQLite",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
