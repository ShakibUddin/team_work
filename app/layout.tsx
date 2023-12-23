import React from "react";
import "./globals.css";
import "./antd_overrides.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"flex justify-start"}>{children}</body>
    </html>
  );
}
