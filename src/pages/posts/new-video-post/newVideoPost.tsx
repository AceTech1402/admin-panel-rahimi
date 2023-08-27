import { useState } from "react";

import { TinymceEditor } from "../../../components/tinymce-editor/tinymceEditor";

import classes from "./newVideoPost.module.scss";

//images
import UploadImageIcon from "./../../../assets/pics/upload-image-icon.svg";

export const NewVideoPost: React.FC = () => {
  const [initialValue, setInitialValue] = useState<string>("");
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
    <div className={classes.new_video_post}>
      <div className={classes.header}>
        <div className={classes.title}>
          <h1>ایجاد پست ویدیویی</h1>
        </div>
      </div>
      <div className={classes.body}>
        <div className={classes.textarea}>
          <div className={classes.title_input}>
            <input type="text" placeholder="عنوان پست ویدیویی ..." />
          </div>
          <TinymceEditor
            id="4"
            onEditorChange={changeEditorData}
            initialValue={initialValue}
          />
          <div className={classes.buttons}>
            <button type="submit" className={`${classes.btn} ${classes.send}`}>
              انتشار
            </button>
            <button
              type="button"
              className={`${classes.btn} ${classes.replace}`}
            >
              جایگذاری لینک
            </button>
          </div>
        </div>
        <div className={classes.upload_wrapper}>
          <div className={classes.cover}>
            <div className={classes.default_image}>
              <img src={UploadImageIcon} alt="" />
            </div>
            <div className={classes.image}></div>
          </div>
          <div className={classes.buttons}>
            <div className={`${classes.upload_video} ${classes.btn}`}>
              <input type="file" accept="video/*" />
              <p>آپلود ویدیو</p>
            </div>
            <div className={`${classes.upload_image} ${classes.btn}`}>
              <input type="file" accept="image/png, image/jpeg" />
              <p>آپلود کاور</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
