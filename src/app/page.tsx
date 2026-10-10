import { Card, Typography } from "@heroui/react";
import Link from "next/link";

const tools = [
    {
        name: "Clean HTML",
        description: "Paste HTML and get back clean, formatted code.",
        href: "/tools/clean-html",
    },
    {
        name: "Clipboard Inspector",
        description: "Inspect everything currently on your clipboard.",
        href: "/tools/clipboard-inspector",
    },
    {
        name: "Format DML SQL",
        description: "Format PHP SQL Strings with Moodle coding standard",
        href: "/tools/format-dml-sql",
    },
] as const;

const Home = () => {
    return (
        <div className="flex flex-col items-center p-8">
            <Typography.Heading>Tools</Typography.Heading>
            <Typography.Paragraph>
                A collection of useful web developer tools
            </Typography.Paragraph>
            <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tools.map((tool) => (
                    <Card key={tool.href} className="relative">
                        <Card.Header>
                            <Card.Title>
                                <Link
                                    href={tool.href}
                                    className="before:absolute before:inset-0"
                                >
                                    {tool.name}
                                </Link>
                            </Card.Title>
                            <Card.Description>
                                {tool.description}
                            </Card.Description>
                        </Card.Header>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Home;
