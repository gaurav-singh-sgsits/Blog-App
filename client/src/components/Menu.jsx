import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const Menu = ({ cat }) => {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const [posts, setPosts] = useState([]);
  console.log(cat);

  // this function is gonna run each time we change our category
  useEffect(() => {
    const fetchData = async () => {
      if (cat && cat.length > 0)
        try {
          const res = await axios.get(`/posts?cat=${cat}&search=`);
          // console.log(res);
          setPosts(res.data);
        } catch (err) {
          console.log(err);
        }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map(
        (post) =>
          post.id != postId && (
            <div className="post" key={post.id}>
              <img src={`${post.img}`} alt="" />
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <Link to={`/post/${post.id}`}>
                <button>Read More</button>
              </Link>
            </div>
          )
      )}
    </div>
  );
};

export default Menu;
