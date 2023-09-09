import React, { useState, useEffect, useContext } from "react";
import EDIT from "../img/edit.png";
import DELETE from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";

const Single = () => {
  // states
  const [post, setPost] = useState({});
  // hooks
  const navigate = useNavigate();
  const location = useLocation();

  const postId = location.pathname.split("/")[2];

  // to check weather we are logged in or not
  const { currentUser } = useContext(AuthContext);

  // this function is gonna run each time we change our user id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        console.log(res.data);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    console.log("in");
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const convertStringToHTML = (htmlString) => {
    const parser = new DOMParser();
    const html = parser.parseFromString(htmlString, "text/html");

    return html.body;
  };

  const body = convertStringToHTML(post.desc);
  console.log(body);

  return (
    <div className="single">
      <div className="content">
        <img src={`${post.postImage}`} alt="" />
        <div className="user">
          {post.userImage && <img src={`${post.userImage}`} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=${postId}`} state={post}>
                <img src={EDIT} alt="" />
              </Link>
              <img onClick={handleDelete} src={DELETE} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.desc),
            }}
          ></p>
        </>
      </div>

      <div className="menu">
        <Menu cat={post.category} />
      </div>
    </div>
  );
};

export default Single;

{
  /* <p
  dangerouslySetInnerHTML={{
    __html: DOMPurify.sanitize(post.desc),
  }}
></p>; */
}
