import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { SearchContext } from "../context/serchContext";
import { CatContext } from "../context/catContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { cat } = useContext(CatContext);
  const { search } = useContext(SearchContext);
  console.log(search, cat);

  // this function is gonna run each time we change our category
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts?cat=${cat}&search=${search}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat, search]);

  // this function is gonna run each time we change our category
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get(`/posts?cat=${cat}`);
  //       setPosts(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.about)}</p>
              <Link to={`/post/${post.id}`}>
                <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
