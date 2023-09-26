import { useState } from "react";

import { TinymceEditor } from "../../components/tinymce-editor/tinymceEditor";
import classes from "./posts.module.scss";
import { VideoPosts } from "../../components/all-posts-tabs/video-posts/videoPosts";
import { TextPosts } from "../../components/all-posts-tabs/text-posts/textPosts";
import { BooksPosts } from "../../components/all-posts-tabs/books-posts/booksPosts";
import { BookletPosts } from "../../components/all-posts-tabs/booklet-posts/bookletPosts";
// import { ReactDraft } from "../../components/react-draft/reactDraft";
// import { EditorState, ContentState } from "draft-js";

export const Posts: React.FC = () => {
  const [initialValue, setInitialValue] = useState<string>("");
  const [tabs, setTabs] = useState<string>("video");
  // const [editorState, setEditorState] = useState<EditorState>(
  //   EditorState.createWithContent(ContentState.createFromText("abcde"))
  // );

  const changeEditorData = (initialValue: any) => {
    setInitialValue(initialValue);
    console.log(initialValue);
  };

  const log = () => {
    console.log(initialValue);
    // console.log(editorState)
  };

  // const onEditorStateChange = (editorState: EditorState) => {
  //   console.log(editorState)
  //   setEditorState(editorState)
  // }

  return (
    <div className={classes.posts}>
      <div className={classes.header}>
        <div className={classes.title}>
          <h1>پست ها</h1>
        </div>
      </div>
      <div className={classes.body}>
        <div className={classes.tabs}>
          <ul>
            <li
              className={tabs === "video" ? classes.active : ""}
              onClick={() => setTabs("video")}
            >
              <p>پست ویدیویی</p>
            </li>
            <li
              className={tabs === "text" ? classes.active : ""}
              onClick={() => setTabs("text")}
            >
              <p>پست متنی</p>
            </li>
            <li
              className={tabs === "books" ? classes.active : ""}
              onClick={() => setTabs("books")}
            >
              <p>کتاب ها</p>
            </li>
            <li
              className={tabs === "booklet" ? classes.active : ""}
              onClick={() => setTabs("booklet")}
            >
              <p>جزوات</p>
            </li>
          </ul>
        </div>
      </div>

      {tabs === "video" ? (
        <VideoPosts />
      ) : tabs === "text" ? (
        <TextPosts />
      ) : tabs === "books" ? (
        <BooksPosts />
      ) : tabs === "booklet" ? (
        <BookletPosts />
      ) : null}
    </div>
  );
};
