import { BaseEditor, Descendant, BaseRange, Range, Element } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

export type BlockQuoteElement = {
  type: 'block-quote'
  align?: string
  children: Descendant[]
}

export type BulletedListElement = {
  type: 'bulleted-list'
  align?: string
  children: Descendant[]
}

export type CheckListItemElement = {
  type: 'check-list-item'
  checked: boolean
  children: Descendant[]
}

export type EditableVoidElement = {
  type: 'editable-void'
  children: EmptyText[]
}

export type HeadingOneElement = {
  type: 'heading-one'
  align?: string
  children: Descendant[]
}

export type HeadingTwoElement = {
  type: 'heading-two'
  align?: string
  children: Descendant[]
}

export type ListItemElement = { type: 'list-item'; children: Descendant[] }

export type NumberedListElement = {
  type: 'numbered-list'
  align?: string;
  children: Descendant[]
}

export type ParagraphElement = {
  type: 'paragraph'
  align?: string
  children: Descendant[]
}

export type CustomElement =
  | BlockQuoteElement
  | BulletedListElement
  | CheckListItemElement
  | EditableVoidElement
  | HeadingOneElement
  | HeadingTwoElement
  | ListItemElement
  | NumberedListElement
  | ParagraphElement

export type CustomElementType = CustomElement['type']

export type FormattedText = {
  text: string
  bold?: boolean
  italic?: boolean
  code?: boolean
  underline?: boolean
}

export type CustomText = FormattedText;

export type CustomTextKey = keyof Omit<CustomText, 'text'>

export type EmptyText = {
  text: string
}

export type CustomEditor = BaseEditor &
  ReactEditor &
  HistoryEditor & {
    nodeToDecorations?: Map<Element, Range[]>
  }

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
    Range: BaseRange & {
      [key: string]: unknown
    }
  }
}