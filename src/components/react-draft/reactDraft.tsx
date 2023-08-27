import { createRef } from "react";
import { EditorState } from "draft-js";
import classes from "./reactDraft.module.scss";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface ReactDraftProps {
  editorState: EditorState;
  onEditorStateChange: (editorState: EditorState) => void;
}

export const ReactDraft: React.FC<ReactDraftProps> = ({
  editorState,
  onEditorStateChange,
}) => {
  const editorRef = createRef<Editor>();
  const uploadImageCallBack = (file: File) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.imgur.com/3/image");
      xhr.setRequestHeader("Authorization", "Client-ID XXXXX");
      const data = new FormData();
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  };
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      ref={editorRef}
      // readOnly={!editMode}
      // toolbarHidden={true}
      toolbar={{
        // inline: { inDropdown: true },
        // list: { inDropdown: true },
        // textAlign: { inDropdown: true },
        // link: { inDropdown: true },
        // history: { inDropdown: true },
        image: {
          uploadCallback: uploadImageCallBack,
          alt: { present: true, mandatory: true },
        },
      }}
    />
  );
};
