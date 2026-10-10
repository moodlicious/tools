"use client";

import { Breadcrumbs, Button } from "@heroui/react";
import { gfm } from "@truto/turndown-plugin-gfm";
import html from "prettier/plugins/html";
import { format } from "prettier/standalone";
import { useState } from "react";
import sanitizeHtml from "sanitize-html";
import { Converter } from "showdown";
import TurndownService from "turndown";
import { IOEditor } from "@/src/components/io-editor";

const turndown = new TurndownService();
turndown.use(gfm);

const converter = new Converter({ tables: true });

export const CleanHTMLTool = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");

    const onChange = async (input: string) => {
        setInput(input);
        let output = input;
        try {
            output = output.replaceAll("\u200B", "");
            output = sanitizeHtml(output);
            output = turndown.turndown(output);
            output = converter.makeHtml(output);
            output = await format(output, {
                parser: "html",
                plugins: [html],
            });
        } catch (error) {
            output = error instanceof Error ? error.message : String(error);
        } finally {
            setOutput(output);
        }
    };

    const pasteFromClipboard = async () => {
        const data = await navigator.clipboard.read();
        const clipboardItem = data.find((d) => d.types.includes("text/html"));
        if (!clipboardItem) {
            return;
        }
        const html = await clipboardItem
            .getType("text/html")
            .then((blob) => blob.text());

        onChange(html);
    };

    const copyToClipboard = async () => {
        await navigator.clipboard.write([
            new ClipboardItem({
                "text/plain": output,
                "text/html": output,
            }),
        ]);
    };

    return (
        <IOEditor
            language="html"
            input={input}
            onInputChange={onChange}
            output={output}
            header={
                <Breadcrumbs>
                    <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
                    <Breadcrumbs.Item>Clean HTML</Breadcrumbs.Item>
                </Breadcrumbs>
            }
            actions={
                <>
                    <Button
                        variant="outline"
                        size="sm"
                        type="button"
                        onClick={pasteFromClipboard}
                    >
                        Paste from clipboard
                    </Button>
                    <Button
                        variant="outline"
                        type="button"
                        onClick={copyToClipboard}
                    >
                        Copy to clipboard
                    </Button>
                </>
            }
            footer={null}
        />
    );
};
