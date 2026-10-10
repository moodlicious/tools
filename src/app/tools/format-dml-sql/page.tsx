import type { Metadata } from "next";
import ClientOnly from "@/src/components/client-only";
import { FormatDmlSqlTool } from "./page.client";

export const metadata: Metadata = {
    title: "Format DML SQL",
    description: "Formats PHP SQL strings with Moodle coding standard",
    openGraph: {
        description: "Formats PHP SQL strings with Moodle coding standard",
        type: "website",
        url: "/tools/clean-html",
    },
};

const Page = () => {
    return (
        <div className="flex flex-1 flex-col">
            <ClientOnly>
                <FormatDmlSqlTool />
            </ClientOnly>
        </div>
    );
};

export default Page;
