"use client";

import { Breadcrumbs } from "@heroui/react";
import { useDebounce, useLocalStorage } from "@uidotdev/usehooks";
import { useCallback, useEffect, useState } from "react";
import { IOEditor } from "@/src/components/io-editor";
import { format } from "./formatter/format";

export const FormatDmlSqlTool = () => {
    const [sql, setSQL] = useLocalStorage("sql", "");
    const [formatted, setFormatted] = useState("");
    const [formatting, setFormatting] = useState(false);
    const [duration, setDuration] = useState(0);

    const debouncedSQL = useDebounce(sql, 10);

    const doFormat = useCallback(async (sql: string) => {
        setFormatting(true);
        const start = performance.now();
        try {
            const formatted = await format(sql);
            setFormatted(formatted);
        } catch (error) {
            setFormatted(
                error instanceof Error ? error.message : "Something went wrong",
            );
        } finally {
            setDuration(performance.now() - start);
            setFormatting(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        doFormat(debouncedSQL);
    }, [doFormat, debouncedSQL]);

    return (
        <IOEditor
            language="sql"
            input={sql}
            onInputChange={setSQL}
            output={formatted}
            header={
                <Breadcrumbs>
                    <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
                    <Breadcrumbs.Item>DML SQL Formatter</Breadcrumbs.Item>
                </Breadcrumbs>
            }
            footer={
                <p className="text-muted text-sm">
                    {formatting
                        ? "Formatting..."
                        : `Formatting took ${duration.toFixed(2)}ms`}
                </p>
            }
        />
    );
};
