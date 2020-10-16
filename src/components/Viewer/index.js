import React, {
  useRef,
  useLayoutEffect
} from "react";
import { init } from "universalviewer";

const Viewer = ({manifest, width = '100vw', height = '100vh'}) => {
  const el = useRef();

  useLayoutEffect(() => {

    const uv = init(el.current,
      {
        manifestUri: manifest
      });

    uv.on('created', () => {
      uv.resize();
    }, false);

  }, [manifest]);

  return <div ref={el} id="uv" className="uv" style={{
    width: width,
    height: height
  }} />;
};

export default Viewer
