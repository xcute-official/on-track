import type { Metadata } from "next";
import "./globals.css";
import { StepContextProvder } from "@/components/multi-step-slider";
import { UserSessionContextProvider } from "@/components/user-session";
export const metadata: Metadata = {
  title: "on track",
  description: "manage and track your progress of your goals",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserSessionContextProvider>
        <StepContextProvder>
          <body className={""}>{children}</body>
        </StepContextProvder>
      </UserSessionContextProvider>
    </html>
  );
}
