import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/input/input";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as tinymce } from "tinymce";
import { TinymceEditor } from "../../../components/tinymce-editor/tinymceEditor";

import classes from "./newBookletPost.module.scss";

//image
import UploadImageIcon from "./../../../assets/pics/upload-image-icon.svg";
import { BookletPost } from "../../../types/types";
import useCreateBooklet from "../../../hooks/boolets/useCreateBooklet";
import { useLocation } from "react-router-dom";
import useGetOneBooklet from "../../../hooks/boolets/useGetOneBooklet";
import useUpdateBooklet from "../../../hooks/boolets/useUpdateBooklet";
import useCategories from "../../../hooks/useCategories";
import { Modal } from "../../../components/modal/modal";

export const NewBookletPost: React.FC = () => {
  const location = useLocation();
  const [textPdf, setTextPdf] = useState<string>("");
  const [cover, setCover] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [initialValue, setInitialValue] = useState<string>("");
  let editorRef = useRef<tinymce | null>(null);
  let pdf_input = useRef<HTMLInputElement | null>(null);
  let coverInput = useRef<HTMLInputElement | null>(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<BookletPost>();
  // const [editorState, setEditorState] = useState<EditorState>(
  //   EditorState.createWithContent(ContentState.createFromText("abcde"))
  // );
  const { dataBooklet, getOneBookletPost } = useGetOneBooklet();

  const { callAPiPostBooklet, loading } = useCreateBooklet();

  const log = () => {
    console.log(initialValue);
    // console.log(editorState)
  };

  // const onEditorStateChange = (editorState: EditorState) => {
  //   console.log(editorState)
  //   setEditorState(editorState)
  // }

  const { updateBooklet } = useUpdateBooklet();

  const submitBooklet = (data: any) => {
    if (dataBooklet) {
      let dataSendVideoPost: BookletPost;
      let uploadedImage: any;
      let uploadPdf: any;
      if (cover !== "" && textPdf !== "") {
        if (coverInput.current && pdf_input.current) {
          if (coverInput.current.files)
            uploadedImage = coverInput.current.files[0];
          if (editorRef.current) {
            setDescription(editorRef.current.getContent());
          }
          if (pdf_input.current.files) uploadPdf = pdf_input.current.files[0];
          if (editorRef.current) {
            setDescription(editorRef.current.getContent());
          }
          // setErrorTextArea(true);
          // setErrorTextArea(false);

          dataSendVideoPost = {
            title: data.title,
            cover: uploadedImage,
            description,
            author: data.author,
            ...(categoryChoose !== "" &&
              categoryChoose !== "default" && {
                categories__id: categoryChoose,
              }),
            link: uploadPdf,
          };

          updateBooklet(location.state.booklets__id, dataSendVideoPost);
        }
      }
    } else {
      let dataSendVideoPost: BookletPost;
      let uploadedImage: any;
      let uploadPdf: any;
      if (cover !== "" && textPdf !== "") {
        if (coverInput.current && pdf_input.current) {
          if (coverInput.current.files)
            uploadedImage = coverInput.current.files[0];
          if (editorRef.current) {
            setDescription(editorRef.current.getContent());
          }
          if (pdf_input.current.files) uploadPdf = pdf_input.current.files[0];
          if (editorRef.current) {
            setDescription(editorRef.current.getContent());
          }
          // setErrorTextArea(true);
          // setErrorTextArea(false);

          dataSendVideoPost = {
            title: data.title,
            cover: uploadedImage,
            description,
            author: data.author,
            ...(categoryChoose !== "" &&
              categoryChoose !== "default" && {
                categories__id: categoryChoose,
              }),
            link: uploadPdf,
          };

          callAPiPostBooklet(dataSendVideoPost);
        }
      }
    }
  };

  const changeCover = () => {
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

  const changePdfInput = () => {
    if (pdf_input.current) {
      // console.log(pdf_input.current.value);
      //@ts-ignore
      if (pdf_input.current.files) {
        if (pdf_input.current.files[0]) {
          setTextPdf(pdf_input.current.files[0].name);
        } else {
          setTextPdf("");
        }
      } else {
        setTextPdf("");
      }
    }
  };

  useEffect(() => {
    if (location.state) {
      if (!dataBooklet) {
        if (location.state.booklets__id) {
          getOneBookletPost(location.state.booklets__id);
        }
      }
      if (dataBooklet) {
        setCover(dataBooklet.cover);
        setValue("title", dataBooklet.title);
        setValue("author", dataBooklet.author);
        setValue("description", dataBooklet.description);
        setTextPdf(dataBooklet.link);
        setCategoryChoose(dataBooklet.categories__id);
        // setValue("summary", dataBooklet.summary);
        editorRef.current?.setContent(dataBooklet.description);
      }
    }
  }, [dataBooklet, editorRef]);

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
        createCategory(nameCategoryInput?.current?.value, "booklets");
    setModalStatus(false);
  };

  useEffect(() => {
    getAllCategoriesOfOneType("booklets");
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
            <Input full={true} label="اسم دسته بندی">
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
      <div className={classes.new_text_post}>
        <div className={classes.header}>
          <div className={classes.title}>
            <h1>ایجاد جزوه</h1>
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
          <form className={classes.form} onSubmit={handleSubmit(submitBooklet)}>
            <div className={classes.textarea}>
              <Input full={true} message={errors.title && errors.title.message}>
                <input
                  type="text"
                  placeholder="عنوان جزوه ..."
                  {...register("title", { required: "عنوان را انتخاب کنید" })}
                />
              </Input>
              {/* <TinymceEditor
            id="4"
            onEditorChange={changeEditorData}
            initialValue={initialValue}
          /> */}

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
                // id={1}
                plugins="advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount"
              />
              <div className={classes.inputs}>
                <Input
                  full={true}
                  message={errors.author && errors.author.message}
                >
                  <input
                    type="text"
                    placeholder="نویسنده"
                    {...register("author", { required: "نویسنده کیست؟" })}
                  />
                </Input>
                <div className={classes.upload_pdf}>
                  <input
                    type="file"
                    accept="application/pdf"
                    ref={pdf_input}
                    onChange={() => changePdfInput()}
                  />
                  <div className={classes.text}>
                    {textPdf !== "" ? (
                      <p>{textPdf}</p>
                    ) : (
                      <p>pdf خود را آپلود کنین</p>
                    )}
                  </div>
                  <div className={classes.upload_booklet}>
                    <p>آپلود</p>
                  </div>
                </div>
              </div>
              <div className={classes.buttons}>
                <button
                  type="submit"
                  className={`${classes.btn} ${classes.send}`}
                >
                  انتشار
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
                  <img src={cover ? cover : UploadImageIcon} alt="" />
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
                    onChange={() => changeCover()}
                    ref={coverInput}
                  />
                  <p>آپلود کاور</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
