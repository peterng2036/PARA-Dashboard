import "@/styles/global.css";
// import { Inter } from "@next/font/google";
// import Sidebar from "@/components/Sidebar";
import clsx from "clsx";
import GlassPane from "@/components/GlassPane";
import Sidebar from "@/components/Sidebar";

// const inter = Inter({
//   variable: "--font-inter",
// });

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={clsx("inter.variable", "dark")}>
      <head />
      <body className="h-screen w-screen candy-mesh p-6">
        <GlassPane className="w-full h-full p-6 flex align-center container mx-auto">
          {/* <Sidebar /> */}
          <Sidebar />
          <main className="w-full pl-6 h-full">{children}</main>
        </GlassPane>
        <div id="modal"></div>
      </body>
    </html>
  );
}
