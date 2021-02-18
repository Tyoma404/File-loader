import axios from "axios";

export default function SendBtn(props) {
  function send() {
    let promises = [];
    Array.from(props.content).forEach((img) => {
      console.log(img.name);
      let url =
        "https://firebasestorage.googleapis.com/v0/b/js-slider.appspot.com/o/" +
        img.name +
        "?alt=media";
      let promise = axios({
        method: "POST",
        headers: { "Content-Type": "image/jpeg" },
        url: url,
        data: img
      });
      promises.push(promise);
    });
    Promise.all(promises).then(() => {
      props.cleanState([]);
      props.readyHandler(false);
    });
  }

  return <button onClick={send}>Send</button>;
}
