"use client";

import isHotkey from "is-hotkey";
import React, { KeyboardEvent, useCallback, useMemo } from "react";
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from "slate";
import {
  Slate,
  Editable,
  useSlate,
  withReact,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";
import { withHistory } from "slate-history";
import {
  Bold,
  Italic,
  Underline,
  Code,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CustomEditor,
  CustomElement,
  CustomText,
  CustomElementType,
} from "./slate-types";

const HOTKEYS: Record<string, keyof Omit<CustomText, "text">> = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES: Array<CustomElement["type"]> = [
  "numbered-list",
  "bulleted-list",
];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

export type AlignType = (typeof TEXT_ALIGN_TYPES)[number];
export type ListType = Extract<
  CustomElementType,
  "bulleted-list" | "numbered-list"
>;
export type CustomElementFormat = CustomElementType | AlignType;

const SlateEditor = () => {
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    [],
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    [],
  );
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Toolbar>
        <MarkButton format="bold" icon={<Bold className="size-4" />} />
        <MarkButton format="italic" icon={<Italic className="size-4" />} />
        <MarkButton
          format="underline"
          icon={<Underline className="size-4" />}
        />
        <MarkButton format="code" icon={<Code className="size-4" />} />
        <BlockButton
          format="heading-one"
          icon={<Heading1 className="size-4" />}
        />
        <BlockButton
          format="heading-two"
          icon={<Heading2 className="size-4" />}
        />
        <BlockButton format="block-quote" icon={<Quote className="size-4" />} />
        <BlockButton
          format="numbered-list"
          icon={<ListOrdered className="size-4" />}
        />
        <BlockButton
          format="bulleted-list"
          icon={<List className="size-4" />}
        />
        <BlockButton format="left" icon={<AlignLeft className="size-4" />} />
        <BlockButton
          format="center"
          icon={<AlignCenter className="size-4" />}
        />
        <BlockButton format="right" icon={<AlignRight className="size-4" />} />
        <BlockButton
          format="justify"
          icon={<AlignJustify className="size-4" />}
        />
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="What’s on your mind? Write it down..."
        spellCheck
        className="border-input min-h-[150px] rounded-md border p-2.5"
        onKeyDown={(event: KeyboardEvent) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }
        }}
      />
    </Slate>
  );
};

const toggleBlock = (editor: CustomEditor, format: CustomElementFormat) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type",
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes((n as CustomElement).type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });

  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = { align: isActive ? undefined : format };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (
  editor: CustomEditor,
  format: keyof Omit<CustomText, "text">,
) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (
  editor: CustomEditor,
  format: CustomElementFormat,
  blockType: "type" | "align" = "type",
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => {
        if (Editor.isEditor(n) || !SlateElement.isElement(n)) return false;
        const element = n as CustomElement;
        return blockType === "align"
          ? element.align === format
          : element.type === format;
      },
    }),
  );

  return !!match;
};

const isMarkActive = (
  editor: CustomEditor,
  format: keyof Omit<CustomText, "text">,
) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }: RenderElementProps) => {
  const style = { textAlign: (element as any).align };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote
          className="border-l-4 pl-4 italic"
          style={style}
          {...attributes}
        >
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul className="list-disc pl-8" style={style} {...attributes}>
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1 className="text-3xl font-bold" style={style} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 className="text-2xl font-semibold" style={style} {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol className="list-decimal pl-8" style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.code)
    children = <code className="bg-muted rounded-sm p-1">{children}</code>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;
  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({
  format,
  icon,
}: {
  format: CustomElementFormat;
  icon: React.ReactNode;
}) => {
  const editor = useSlate();
  return (
    <Button
      variant="outline"
      size="icon"
      className={cn("h-8 w-8", {
        "bg-muted": isBlockActive(
          editor,
          format,
          TEXT_ALIGN_TYPES.includes(format) ? "align" : "type",
        ),
      })}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </Button>
  );
};

const MarkButton = ({
  format,
  icon,
}: {
  format: keyof Omit<CustomText, "text">;
  icon: React.ReactNode;
}) => {
  const editor = useSlate();
  return (
    <Button
      variant="outline"
      size="icon"
      className={cn("h-8 w-8", { "bg-muted": isMarkActive(editor, format) })}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </Button>
  );
};

const Toolbar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "border-input mb-2 flex items-center gap-1 rounded-md border p-1",
      className,
    )}
    {...props}
  />
));
Toolbar.displayName = "Toolbar";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export default SlateEditor;
