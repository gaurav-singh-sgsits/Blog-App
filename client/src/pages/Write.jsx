import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import { postSchema } from "../schemas";

const Write = () => {
  const state = useLocation().state;
  console.log(state);

  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [about, setAbout] = useState(state?.about || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.category || "");
  const [img, setImg] = useState(state?.postImage || null);

  console.log(value);

  useEffect(() => {
    const fetchData = async () => {
      if (file) {
        const res = await upload();
        // console.log(res);
        setImg(res.location);
      }
    };
    fetchData();
  }, [file]);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload/coverImg", formData);
      // console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = img;

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: imgUrl,
            about,
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: imgUrl,
            about,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
    } catch (err) {
      console.log(err);
      // alert(JSON.stringify(err.response.data));
      // if (err.response.status == 401) navigate("/login");
    }
  };

  const useDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isSmallScreen = window.matchMedia("(max-width: 1023.5px)").matches;

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          name="about"
          placeholder="What the project is about?"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        <div className="editorContainer">
          <Editor
            apiKey="bftq4rwb3xyc34fnpplaitoqthu65z3q6ilw0xcgjvish6qg"
            initialValue={`${value}`}
            init={{
              plugins:
                "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
              imagetools_cors_hosts: ["picsum.photos"],
              menubar: "file edit view insert format tools table help",
              toolbar:
                "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
              toolbar_sticky: true,
              autosave_ask_before_unload: true,
              autosave_interval: "30s",
              autosave_prefix: "{path}{query}-{id}-",
              autosave_restore_when_empty: false,
              autosave_retention: "2m",
              image_advtab: true,
              link_list: [
                { title: "My page 1", value: "https://www.tiny.cloud" },
                { title: "My page 2", value: "http://www.moxiecode.com" },
              ],
              image_list: [
                { title: "My page 1", value: "https://www.tiny.cloud" },
                { title: "My page 2", value: "http://www.moxiecode.com" },
              ],
              image_class_list: [
                { title: "None", value: "" },
                { title: "Some class", value: "class-name" },
              ],
              importcss_append: true,
              file_picker_callback: function (callback, value, meta) {
                /* Provide file and text for the link dialog */
                if (meta.filetype === "file") {
                  callback("https://www.google.com/logos/google.jpg", {
                    text: "My text",
                  });
                }

                /* Provide image and alt text for the image dialog */
                if (meta.filetype === "image") {
                  callback("https://www.google.com/logos/google.jpg", {
                    alt: "My alt text",
                  });
                }

                /* Provide alternative source and posted for the media dialog */
                if (meta.filetype === "media") {
                  callback("movie.mp4", {
                    source2: "alt.ogg",
                    poster: "https://www.google.com/logos/google.jpg",
                  });
                }
              },
              templates: [
                {
                  title: "New Table",
                  description: "creates a new table",
                  content:
                    '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
                },
                {
                  title: "Starting my story",
                  description: "A cure for writers block",
                  content: "Once upon a time...",
                },
                {
                  title: "New list with dates",
                  description: "New List with dates",
                  content:
                    '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
                },
              ],
              template_cdate_format:
                "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
              template_mdate_format:
                "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
              height: 600,
              image_caption: true,
              quickbars_selection_toolbar:
                "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
              noneditable_noneditable_class: "mceNonEditable",
              toolbar_mode: "sliding",
              contextmenu: "link image imagetools table",
              skin: useDarkMode ? "oxide-dark" : "oxide",
              content_css: useDarkMode ? "dark" : "default",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onChange={(e) => {
              setValue(e.target.getContent());
            }}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <div className="heading">
            <h1>Publish</h1>
          </div>
          <div className="middle">
            <div className="about">
              <span>
                <b>Status: </b> Draft
              </span>
              <span>
                <b>Visibility: </b> Public
              </span>
            </div>
            <div className="image">
              <input
                accept="image/png, image/gif, image/jpeg"
                style={{ display: "none" }}
                type="file"
                id="file"
                name="coverimg"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label className="file" htmlFor="file">
                Upload Image
              </label>
              {img && <img src={`${img}`} />}
            </div>
          </div>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "arduino"}
              name="cat"
              value="arduino"
              id="arduino"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="arduino">Arduino</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "esp32"}
              name="cat"
              value="esp32"
              id="esp32"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="esp32">ESP32</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "iot"}
              name="cat"
              value="iot"
              id="iot"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="iot">IOT</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "robots"}
              name="cat"
              value="robots"
              id="robots"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="robots">Robots</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
