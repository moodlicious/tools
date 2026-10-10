import { cn } from "@heroui/react";
import type { Metadata } from "next";
import { Geist_Mono, Google_Sans } from "next/font/google";
import { env } from "../env";
import "./globals.css";

const googleSans = Google_Sans({
    variable: "--font-google-sans",
    subsets: ["latin"],
    fallback: [],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
    title: {
        default: `${env.APP_NAME}`,
        template: `%s — ${env.APP_NAME}`,
    },
    description: "A collection of useful web developer tools",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={cn(
                googleSans.variable,
                geistMono.variable,
                "h-full antialiased",
            )}
            data-theme="dark"
        >
            <body className="flex min-h-full flex-col">{children}</body>
        </html>
    );
}
