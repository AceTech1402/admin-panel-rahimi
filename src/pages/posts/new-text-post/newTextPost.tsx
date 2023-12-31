import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/input/input";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as tinymce } from "tinymce";
import { TinymceEditor } from "../../../components/tinymce-editor/tinymceEditor";

import classes from "./newTextPost.module.scss";

//image
import UploadImageIcon from "./../../../assets/pics/upload-image-icon.svg";
import { BlogPost } from "../../../types/types";
import useCreateBlog from "../../../hooks/blogs/useCreateBlog";
import useGetOneBlog from "../../../hooks/blogs/useGetOneBlog";
import useUpdateBlog from "../../../hooks/blogs/useUpdateBlog";
import { useLocation } from "react-router-dom";
import { Modal } from "../../../components/modal/modal";
import useCategories from "../../../hooks/useCategories";

export const NewTextPost: React.FC = () => {
  const location = useLocation();
  const [changeImage, setChangeImage] = useState<boolean>(false);
  const [cover, setCover] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  let editorRef = useRef<tinymce | null>(null);
  let coverInput = useRef<HTMLInputElement | null>(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<BlogPost>();
  // const [editorState, setEditorState] = useState<EditorState>(
  //   EditorState.createWithContent(ContentState.createFromText("abcde"))
  // );
  const { callAPiPostBlog, loading } = useCreateBlog();
  const { getOneBlogPost, dataBlog } = useGetOneBlog();
  const { updateBlog } = useUpdateBlog();

  // const onEditorStateChange = (editorState: EditorState) => {
  //   console.log(editorState)
  //   setEditorState(editorState)
  // }

  const submitBlog = (data: any) => {
    if (dataBlog) {
      console.log(dataBlog);
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
            // setErrorTextArea(true);
          } else if (description !== "") {
            // setErrorTextArea(false);

            dataSendVideoPost = {
              title: data.title,
              cover: changeImage && uploadedImage,
              body: description,
              read_time: data.read_time,
              summary: data.summary,
              ...(categoryChoose !== "" &&
                categoryChoose !== "default" && {
                  categories__id: categoryChoose,
                }),
              author: data.author,
            };

            updateBlog(location.state.blogs__id, dataSendVideoPost);
          }
        }
      }
    } else {
      let dataSendVideoPost: BlogPost;
      let uploadedImage: any;
      if (cover !== "") {
        if (coverInput.current) {
          if (coverInput.current.files) {
            console.log(coverInput.current.files[0]);
            uploadedImage = coverInput.current.files[0];
          }
          if (editorRef.current) {
            setDescription(editorRef.current.getContent());
          }
          // setErrorTextArea(true);
          // setErrorTextArea(false);

          dataSendVideoPost = {
            title: data.title,
            cover: uploadedImage,
            body: description,
            read_time: data.read_time,
            summary: data.summary,
            ...(categoryChoose !== "" &&
              categoryChoose !== "default" && {
                categories__id: categoryChoose,
              }),
            author: data.author,
          };

          callAPiPostBlog(dataSendVideoPost);
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
      if (coverInput.current.files) {
        console.log(coverInput.current.files[0]);
        //@ts-ignore
        setCover(URL.createObjectURL(coverInput.current.files[0]));
      } else {
        setCover("");
      }
    }
  };

  useEffect(() => {
    if (location.state) {
      if (!dataBlog) {
        if (location.state.blogs__id) {
          getOneBlogPost(location.state.blogs__id);
        }
      }
      if (dataBlog) {
        console.log(dataBlog);
        console.log(JSON.stringify(dataBlog.body).replaceAll('"', ""));
        setCover(dataBlog.cover);
        setValue("title", dataBlog.title);
        setValue("author", dataBlog.author);
        setValue("read_time", dataBlog.read_time);
        setValue("summary", dataBlog.summary);
        setCategoryChoose(dataBlog.categories__id);
        editorRef.current?.setContent(
          JSON.stringify(dataBlog.body).replaceAll('"', "")
        );
      }
    }
  }, [dataBlog, editorRef]);

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
        createCategory(nameCategoryInput?.current?.value, "blogs");
    setModalStatus(false);
  };

  useEffect(() => {
    getAllCategoriesOfOneType("blogs");
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
            <h1>ایجاد پست متنی</h1>
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
          <form className={classes.form} onSubmit={handleSubmit(submitBlog)}>
            <div className={classes.textarea_wrapper}>
              <Input full={true} message={errors.title && errors.title.message}>
                <input
                  type="text"
                  placeholder="عنوان پست متنی ..."
                  {...register("title", { required: "عنوان را انتخاب کنید" })}
                />
              </Input>
              {/* <TinymceEditor
            id="4"
            onEditorChange={changeEditorData}
            initialValue={initialValue}
          /> */}

              <div className={classes.body_wrapper}>
                <div className={classes.summary}>
                  <div className={classes.textarea_layout}>
                    <label>
                      <span>خلاصه</span>
                      <textarea
                        className={classes.textarea}
                        {...register("summary", {
                          required: "لطفا یه خلاصه برای این بلاگ مشخص کنید",
                        })}
                      ></textarea>
                    </label>
                    {errors.summary && (
                      <span className={classes.error}>
                        {errors.summary.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className={classes.textarea}>
                  <Editor
                    apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
                    onInit={(evt, editor) => (editorRef.current = editor)}
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
                </div>
              </div>
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
                <Input
                  full={true}
                  message={errors.read_time && errors.read_time.message}
                >
                  <input
                    type="text"
                    placeholder="مدت زمان مطالعه"
                    {...register("read_time", {
                      required: "مدت زمان مطالعه چقدر است؟",
                    })}
                  />
                </Input>
              </div>
              <div className={classes.buttons}>
                <button
                  type="submit"
                  className={`${classes.btn} ${classes.send}`}
                >
                  {dataBlog ? <p>ویرایش</p> : <p>انتشار</p>}
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
                    ref={coverInput}
                    onChange={() => changeCover()}
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
