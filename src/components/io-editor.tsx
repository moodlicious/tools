"use client";

import { Checkbox } from "@heroui/react";
import Editor, {
    type BeforeMount,
    DiffEditor,
    type DiffEditorProps,
    type EditorProps,
} from "@monaco-editor/react";
import type { editor } from "monaco-editor/editor";
import { type ReactNode, useState } from "react";
import type { IntersectionOfTypes } from "../types/intersection-of-types";

const TRANSPARENT_THEME = "transparent";

type MonacoEditor = typeof editor;
const handleBeforeMount: BeforeMount = (monaco) => {
    const editor: MonacoEditor = monaco.editor;
    editor.defineTheme(TRANSPARENT_THEME, {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
            "editor.background": "#00000000",
            "editorGutter.background": "#00000000",
            "minimap.background": "#00000000",
        },
    });
};

const EDITOR_OPTIONS: EditorProps["options"] = {
    renderLineHighlight: "all",
    renderWhitespace: "all",
    fontSize: 14,
    fontFamily: "'Fira Code', 'JetBrains Mono', Consolas, monospace",
    fontLigatures: true,
    scrollbar: {
        verticalScrollbarSize: 8,
        horizontalScrollbarSize: 8,
        useShadows: false,
    },
    cursorSmoothCaretAnimation: "on",
    cursorBlinking: "smooth",
    minimap: {
        enabled: true,
        showSlider: "mouseover",
        renderCharacters: false,
    },
};

type CommonEditorProps = IntersectionOfTypes<EditorProps, DiffEditorProps>;

const EDITOR_PROPS: CommonEditorProps = {
    className: "overflow-hidden rounded bg-surface",
    theme: TRANSPARENT_THEME,
    options: EDITOR_OPTIONS,
};

export type IOEditorProps = {
    input: string;
    onInputChange: (value: string) => void;
    output: string;
    header?: ReactNode | null | undefined;
    actions?: ReactNode | null | undefined;
    footer?: ReactNode | null | undefined;
    language?: CommonEditorProps["language"];
};

export const IOEditor = ({
    input,
    onInputChange,
    output,
    header,
    actions,
    footer,
    language,
}: IOEditorProps) => {
    const [diff, setDiff] = useState(false);

    const onChange = async (value: string | undefined) => {
        value = value || "";
        onInputChange(value);
    };

    return (
        <section className="grid h-screen max-h-screen grid-rows-[auto_1fr_auto] gap-2">
            <header className="flex items-center justify-between bg-surface px-2 py-1">
                <div className="flex items-center gap-3">{header}</div>

                <div className="flex items-center gap-3">
                    {actions}
                    <Checkbox isSelected={diff} onChange={setDiff}>
                        <Checkbox.Content>
                            <Checkbox.Control>
                                <Checkbox.Indicator />
                            </Checkbox.Control>
                            Show Diff
                        </Checkbox.Content>
                    </Checkbox>
                </div>
            </header>
            <div className="max-h-full overflow-hidden px-2">
                {!diff ? (
                    <div className="grid h-full grid-cols-2 gap-2">
                        <Editor
                            {...EDITOR_PROPS}
                            language={language}
                            value={input}
                            onChange={onChange}
                            beforeMount={handleBeforeMount}
                        />
                        <Editor
                            {...EDITOR_PROPS}
                            language={language}
                            value={output}
                            options={{ readOnly: true, ...EDITOR_OPTIONS }}
                        />
                    </div>
                ) : (
                    <DiffEditor
                        {...EDITOR_PROPS}
                        language={language}
                        original={input}
                        modified={output}
                        keepCurrentOriginalModel
                        keepCurrentModifiedModel
                    />
                )}
            </div>
            <footer className="overflow-hidden bg-surface px-2 py-1">
                {footer}
            </footer>
        </section>
    );
};
