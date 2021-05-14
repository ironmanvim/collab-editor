import { useRef, useState } from "react";
import _ from "lodash";

const letterWidth = 9.6;
const lineHeight = 24;

interface TextEditorProps {
    width?: number;
    height?: number;
    cursorColor?: string;
}

export const TextEditor: React.FC<TextEditorProps> = ({
    width,
    height,
    cursorColor = "orange",
}) => {
    const [data, setData] = useState("");
    const ref = useRef<HTMLTextAreaElement>(null!);
    const tickRef = useRef<HTMLDivElement>(null);

    const [focus, setFocus] = useState(false);
    const [cursorPosition, setCursorPosition] = useState(0);

    const lines = data.split("\n");
    let currentLineIndex = 0;
    let selection = cursorPosition;

    for (let i = 0; i < lines.length; i++) {
        currentLineIndex = i;
        if (selection <= lines[i].length) {
            break;
        }
        selection -= lines[i].length + 1;
    }

    return (
        <div
            style={{
                height,
                width,
            }}
            className="relative flex flex-col overflow-auto bg-gray-700 hide-scrollbar"
        >
            <div
                onClick={() => ref.current.focus()}
                className="relative py-1 flex flex-1 whitespace-pre font-mono m-1 p-1"
            >
                <div className="pl-1 pr-2 text-gray-500">
                    {_.range(1, lines.length + 1).map((index) => (
                        <div className="h-6" key={index}>
                            {index}
                        </div>
                    ))}
                </div>
                <div className="text-gray-200 w-full overflow-y-auto hide-scrollbar">
                    <div className="relative">
                        <div
                            className="absolute"
                            style={{
                                top: `${lineHeight * currentLineIndex}px`,
                                left: `${letterWidth * selection}px`,
                            }}
                        >
                            <textarea
                                className="absolute h-6 w-0 text-black opacity-0 resize-none whitespace-pre"
                                ref={ref}
                                value={data}
                                onChange={(e) => {
                                    setData(e.target.value);
                                    setCursorPosition(e.target.selectionStart);
                                    tickRef.current?.scrollIntoView();
                                }}
                                onKeyUp={(e) => {
                                    if (
                                        cursorPosition !==
                                        e.currentTarget.selectionStart
                                    ) {
                                        setCursorPosition(
                                            e.currentTarget.selectionStart
                                        );
                                    }
                                    tickRef.current?.scrollIntoView();
                                }}
                                onKeyDown={(e) => {
                                    if (
                                        cursorPosition !==
                                        e.currentTarget.selectionStart
                                    ) {
                                        setCursorPosition(
                                            e.currentTarget.selectionStart
                                        );
                                    }
                                    tickRef.current?.scrollIntoView();
                                }}
                                onFocus={() => setFocus(true)}
                                onBlur={() => setFocus(false)}
                            />
                            <div
                                ref={tickRef}
                                style={{
                                    borderColor: cursorColor,
                                }}
                                className={`absolute ${
                                    focus ? "opacity-100" : "opacity-30"
                                } border h-6 animate-pulse`}
                            />
                        </div>
                        {lines.map((line, index) => {
                            return (
                                <div className="h-6" key={index}>
                                    <span className="w-full">{line}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextEditor;
