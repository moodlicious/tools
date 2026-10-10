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
            <h1 className="mb-2 font-bold text-4xl">tools.feli.page</h1>
            <p className="mb-8 text-base-content/60">
                A collection of useful web developer tools
            </p>
            <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tools.map((tool) => (
                    <Link
                        key={tool.href}
                        href={tool.href}
                        className="card bg-base-200 transition-colors hover:bg-base-300"
                    >
                        <div className="card-body">
                            <h2 className="card-title">{tool.name}</h2>
                            <p>{tool.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;
