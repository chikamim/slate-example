import React, { useMemo, useState } from "react";
import { createEditor, Editor, Node, Transforms } from "slate";
import { Editable, RenderElementProps, Slate, withReact } from "slate-react";

// Define a React component renderer for our code blocks.
const CodeElement = (props: RenderElementProps) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>;
};

function renderElement(props: RenderElementProps) {
  console.log(">>", props.element.id);
  switch (props.element.type) {
    case "code":
      return <CodeElement {...props} />;
    default:
      return <DefaultElement {...props} />;
  }
}

interface IProps {}

const SlateEditor: React.FC<IProps> = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Node[]>([
    {
      type: "paragraph",
      id: 1,
      children: [{ text: "A line of text in a paragraph." }]
    },
    {
      type: "code",
      id: 2,
      children: [{ text: "this is a code." }]
    }
  ]);

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Editable renderElement={renderElement} />
    </Slate>
  );
};

export default SlateEditor;
