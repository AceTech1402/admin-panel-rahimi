import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as tinymce } from "tinymce";
import { TinymceEditor } from "../../../components/tinymce-editor/tinymceEditor";

import classes from "./newVideoPost.module.scss";

//images
import UploadImageIcon from "./../../../assets/pics/upload-image-icon.svg";
import { Input } from "../../../components/input/input";
import { VideoItems, VideoPost } from "../../../types/types";
import useCreateVideo from "../../../hooks/videos/useCreateVideo";
import { useLocation } from "react-router-dom";
import useGetOneVideo from "../../../hooks/videos/useGetOneVideo";
import useUpdateVideo from "../../../hooks/videos/useUpdateVideo";
import { Modal } from "../../../components/modal/modal";
import useCategories from "../../../hooks/useCategories";

interface FormCreateCategory {
  name: string;
  // type: string;
}

export const NewVideoPost: React.FC = () => {
  const location = useLocation();

  const { loading, callAPiPostVideo } = useCreateVideo();
  const [initialValue, setInitialValue] = useState<string>("");
  const [changeImage, setChangeImage] = useState<boolean>(false);
  const [cover, setCover] = useState<string>("");
  const coverInput = useRef<HTMLInputElement | null>(null);
  const [errorTextarea, setErrorTextArea] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const { getOneVideoPost, dataVideo } = useGetOneVideo();
  const { updateVideo } = useUpdateVideo();
  // const [editorState, setEditorState] = useState<EditorState>(
  //   EditorState.createWithContent(ContentState.createFromText("abcde"))
  // );
  const {
    register,
    formState: { errors, isSubmitted },
    handleSubmit,
    setValue,
  } = useForm<VideoItems & FormCreateCategory>();
  let editorRef = useRef<tinymce | null>(null);
  // const changeEditorData = (initialValue: any) => {
  //   // setInitialValue(initialValue);
  //   console.log(initialValue);
  // };

  const log = () => {
    console.log(initialValue);
    // console.log(editorState)
  };

  // const onEditorStateChange = (editorState: EditorState) => {
  //   console.log(editorState)
  //   setEditorState(editorState)
  // }

  const createNewVideo = (data: any) => {
    if (dataVideo) {
      console.log(dataVideo);
      let dataSendVideoPost: any;
      let uploadedImage: any;
      if (cover !== "") {
        if (coverInput.current) {
          if ((uploadedImage = coverInput.current.files))
            uploadedImage = coverInput.current.files[0];
          if (editorRef.current) {
            setDescription(editorRef.current.getContent());
          }
          if (description === "") {
            setErrorTextArea(true);
          } else if (description !== "") {
            setErrorTextArea(false);

            dataSendVideoPost = {
              title: data.title,
              cover: changeImage && uploadedImage,
              description,
              duration: data.duration,
              ...(categoryChoose !== "" &&
                categoryChoose !== "default" && {
                  categories__id: categoryChoose,
                }),
              link: data.link,
            };

            updateVideo(location.state.videos__id, dataSendVideoPost);
          }
        }
      }
    } else {
      let dataSendVideoPost: VideoPost;
      let uploadedImage: any;
      if (cover !== "") {
        if (coverInput.current) {
          if ((uploadedImage = coverInput.current.files))
            uploadedImage = coverInput.current.files[0];
          if (editorRef.current) {
            setDescription(editorRef.current.getContent());
          }
          // if (description === "") {
          //   setErrorTextArea(true);
          // } else if (description !== "") {
          setErrorTextArea(false);

          dataSendVideoPost = {
            title: data.title,
            cover: uploadedImage,
            description,
            duration: data.duration,
            ...(categoryChoose !== "" &&
              categoryChoose !== "default" && {
                categories__id: categoryChoose,
              }),
            link: data.link,
          };

          callAPiPostVideo(dataSendVideoPost);
          // }
        }
      }
    }
  };

  const changeCover = () => {
    setChangeImage(true);
    // setCover()
    if (coverInput.current) {
      // console.log(coverInput.current.value);
      //@ts-ignore
      if (coverInput.current.files[0]) {
        //@ts-ignore
        setCover(URL.createObjectURL(coverInput.current.files[0]));
      } else {
        setCover("");
      }
    }
  };

  useEffect(() => {
    if (location.state) {
      if (!dataVideo) {
        if (location.state.videos__id) {
          getOneVideoPost(location.state.videos__id);
        }
      }
      if (dataVideo) {
        console.log(dataVideo);
        setCover(dataVideo.cover);
        setValue("title", dataVideo.title);
        setValue("link", dataVideo.link);
        setValue("duration", dataVideo.duration);
        setCategoryChoose(dataVideo.categories__id);
        editorRef.current?.setContent(dataVideo.description);
      }
    }
  }, [dataVideo, editorRef]);

  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const { categories, createCategory, getAllCategoriesOfOneType } =
    useCategories();
  let categorySelect = useRef<HTMLSelectElement | null>(null);
  let nameCategoryInput = useRef<HTMLInputElement | null>(null);
  const [categoryChoose, setCategoryChoose] = useState<string>("");

  const closeModal = () => {
    setModalStatus((state) => !state);
  };

  const changeCategory = () => {
    console.log(categorySelect.current?.value);
    if (categorySelect.current)
      setCategoryChoose(categorySelect.current?.value);
  };

  const createCategoryFunc = () => {
    if (nameCategoryInput.current)
      if (nameCategoryInput?.current?.value !== "")
        createCategory(nameCategoryInput?.current?.value, "videos");
    setModalStatus(false);
  };

  useEffect(() => {
    getAllCategoriesOfOneType("videos");
  }, []);

  return (
    <>
      <Modal closeModal={closeModal} modalStatus={modalStatus}>
        <div className={classes.modal}>
          <div className={classes.header}>
            <div className={classes.title}>
              <h2>ایجاد دسته بندی جدید</h2>
            </div>
          </div>
          <form className={classes.form}>
            <Input
              full={true}
              label="اسم دسته بندی"
            >
              <input type="text" ref={nameCategoryInput} />
            </Input>
            <div className={classes.buttons}>
              <button
                type="button"
                className={classes.button}
                onClick={() => createCategoryFunc()}
              >
                <p>ثبت دسته بندی</p>
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <div className={classes.new_video_post}>
        <div className={classes.header}>
          <div className={classes.title}>
            <h1>ایجاد پست ویدیویی</h1>
          </div>
        </div>
        <div className={classes.body}>
          <div className={classes.category}>
            <div className={classes.label}>
              <p>دسته بندی ها</p>
            </div>
            <select
              onChange={() => changeCategory()}
              ref={categorySelect}
              value={categoryChoose !== "" ? categoryChoose : "default"}
            >
              <option value="default">یک دسته بندی انتخاب کن</option>
              {categories &&
                categories.length > 0 &&
                categories.map((category, index) => (
                  <option value={`${category.categories__id}`} key={index}>
                    {category.name}
                  </option>
                ))}
            </select>
            <button type="button" onClick={() => closeModal()}>
              <p>ایجاد دسته بندی جدید</p>
            </button>
          </div>
          <form onSubmit={handleSubmit(createNewVideo)}>
            <div className={classes.textarea_wrapper}>
              <Input full={true} message={errors.title && errors.title.message}>
                <input
                  type="text"
                  placeholder="عنوان پست ویدیویی ..."
                  {...register("title", { required: "عنوان را وارد کنید" })}
                />
              </Input>

              {/* <TinymceEditor
            id="4"
            
            initialValue={initialValue}
          /> */}

              <div className={classes.textarea}>
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
                  // onEditorChange={onEditorChange}
                  // onEditorChange={changeEditorData}
                  // id={1}
                  plugins="advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount"
                />
                {errorTextarea && (
                  <span className={classes.error}>
                    لطفا متنه پست خود را وارد کنید.
                  </span>
                )}
              </div>
              <div className={classes.inputs}>
                <Input
                  full={true}
                  message={errors.duration && errors.duration.message}
                >
                  <input
                    type="text"
                    {...register("duration", {
                      required: "زمان فیلم را مشخص کنید",
                    })}
                    placeholder="زمان فیلم"
                  />
                </Input>
                <Input full={true} message={errors.link && errors.link.message}>
                  <input
                    type="text"
                    {...register("link", {
                      required: "لینک ویدیو را قرار بدهید",
                    })}
                    placeholder="لینک ویدیو"
                  />
                </Input>
              </div>
              <div className={classes.buttons}>
                <button
                  type="submit"
                  className={`${classes.btn} ${classes.send}`}
                >
                  {dataVideo ? <p>ویرایش</p> : <p>انتشار</p>}
                </button>
                {/* <button
                type="button"
                className={`${classes.btn} ${classes.replace}`}
              >
                جایگذاری لینک
              </button> */}
              </div>
            </div>
            <div className={classes.upload_wrapper}>
              <div className={classes.cover}>
                <div className={classes.default_image}>
                  <img src={cover !== "" ? cover : UploadImageIcon} alt="" />
                </div>
                <div className={classes.image}></div>
              </div>
              <div className={classes.buttons}>
                {/* <div className={`${classes.upload_video} ${classes.btn}`}>
              <input type="file" accept="video/*" />
              <p>آپلود ویدیو</p>
            </div> */}
                <div className={`${classes.upload_image} ${classes.btn}`}>
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    ref={coverInput}
                    onChange={() => changeCover()}
                  />
                  <p>آپلود کاور</p>
                  {isSubmitted && cover === "" && (
                    <span className={classes.error}>
                      لطفا کاور پست را انتخاب کنید
                    </span>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
