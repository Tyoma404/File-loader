import "../styles.css";
import { useState } from "react";

import FileLoader from "./FileLoader";
import SendBtn from "./Sendbtn";
import ShowImages from "./ShowImages";
import axios from "axios";

export default function App() {
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [readyToSend, setReady] = useState(false);

  const Filehandler = (evt) => {
    console.log("browse");

    let files = evt.target.files;

    setFiles(files);
    console.log(typeof files);

    setReady(true);

    Array.from(files).forEach((file) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        setImages((images) => [...images, reader.result]);
        console.log(typeof reader.result);
      };
    });
  };

  const getImages = () => {
    // setImages([]);
    axios({
      method: "GET",
      url:
        "https://firebasestorage.googleapis.com/v0/b/js-slider.appspot.com/o/"
    }).then((response) => {
      console.log(response.data.items[2].name);

      let items = response.data.items;

      let imgs = items.map(
        (value) =>
          "https://firebasestorage.googleapis.com/v0/b/" +
          value.bucket +
          "/o/" +
          value.name +
          "?alt=media"
      );
      setImages(imgs);
    });
  };

  return (
    <div className="App">
      <FileLoader onBrowse={Filehandler} />
      <ShowImages content={images} />

      {readyToSend ? (
        <SendBtn
          content={files}
          readyHandler={setReady}
          cleanState={setImages}
        />
      ) : (
        <button onClick={getImages}>Get images</button>
      )}
    </div>
  );
}
