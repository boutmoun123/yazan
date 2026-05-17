import { Inter } from "next/font/google";
import ThemeToggle from "@/components/ThemeToggle";
import { withBasePath } from "@/lib/basePath";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"]
});

const logoPath = withBasePath("/images/logo.png");

export const metadata = {
  title: "Yazan Hamarneh | Artist",
  icons: {
    icon: logoPath,
    shortcut: logoPath,
    apple: logoPath
  },
  description:
    "Editorial portfolio rebuild inspired by Yazan Hamarneh's original photography landing page."
};

const themeScript = `
(() => {
  try {
    const storedTheme = window.localStorage.getItem("theme");
    const theme = storedTheme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch (error) {
    document.documentElement.dataset.theme = "light";
    document.documentElement.style.colorScheme = "light";
  }
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.variable}>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
