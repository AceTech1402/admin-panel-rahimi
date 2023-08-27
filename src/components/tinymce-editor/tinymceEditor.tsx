import { useRef } from "react";
import classes from "./tinymceEditor.module.scss";

import { Editor } from "@tinymce/tinymce-react";
import { Editor as tinymce } from "tinymce";

interface EditorProps {
  initialValue: string;
  id: string;
  onEditorChange: (initialValue: any) => void;
}

export const TinymceEditor: React.FC<EditorProps> = ({
  initialValue = "",
  onEditorChange,
  id,
}) => {
  let editorRef = useRef<tinymce | null>(null);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <>
      <Editor
        apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initialValue}
        init={{
          height: 500,
          menubar: false,
          toolbar:
            "undo redo | formatselect | " +
            "bold italic forecolor backcolor fontsize | link image | media | table | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | preview | " +
            "removeformat | help",
          textcolor_rows: "4",
          // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onEditorChange={onEditorChange}
        id={id}
        plugins="advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount"
      />
    </>
  );
};
