export default function ShowImages(props) {
  let pics;
  console.log("SI " + typeof props.content);
  //console.log(props.content[0])
  if (typeof props.content == "object")
    pics = props.content.map((v) => <img src={v} />);
  return (
    <>
      <h2>Content</h2>
      <div class="images">{pics}</div>
    </>
  );
}
