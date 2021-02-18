import { useRef } from "react";

export default function FileLoader({ onBrowse }) {
  const inputRef = useRef(null);

  return (
    <>
      <input ref={inputRef} onChange={onBrowse} type="file" multiple />
      <br />
    </>
  );
}
