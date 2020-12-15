import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { useHistory } from "react-router-dom";
import "./styles.css";

const CreatePost = ({ onPostCreated }) => {
  let history = useHistory();
  const [postData, setPostData] = useState({
    title: "",
    body: "",
  });
  const { title, body } = postData;

  const onChange = (e) => {
    const { name, value } = e.target;

    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const create = async () => {
    if (!title || !body) {
      console.log("Title and body are required");
    } else {
      const newPost = {
        id: uuidv4(),
        title: title,
        body: body,
        date: moment().toISOString(),
      };

      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        // Create the post
        const body = JSON.stringify(newPost);
        const res = await axios.post(
          "http://localhost:5000/api/posts",
          body,
          config
        );

        // Call the handler and redirect
        onPostCreated(res.data);
        history.push("/");
      } catch (error) {
        console.error(`Error creating post: ${error.response.data}`);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Add Item</h2>
      <input
        name="title"
        type="text"
        placeholder="Item"
        value={title}
        onChange={(e) => onChange(e)}
      />
      <textarea
        name="body"
        cols="30"
        rows="5"
        placeholder="Details"
        value={body}
        onChange={(e) => onChange(e)}
      ></textarea>
      <button onClick={() => create()}>Add</button>
    </div>
  );
};

export default CreatePost;
