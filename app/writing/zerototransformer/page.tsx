import "katex/dist/katex.min.css";
import "../post.css";
import Latex from "react-latex-next";

export default function ZeroToTransformer() {
  return (
    <div className="post-container">
      <h1 className="post-title">Zero to Transformer</h1>
      <p className="post-content">
        <div className="post-chunk flex flex-col">
          Transformers power a bunch of stuff (chatgpt!). they're pretty simple.
          lets do this.
        </div>
        <div className="post-chunk flex flex-col">
          This is a zero
          <Latex>0</Latex>
          Zero is a <span className="font-bold contents">number</span>. These
          are some more numbers:
          <Latex>0,1,2,3</Latex>
          We can put multiple numbers together into a{" "}
          <span className="font-bold contents">vector</span>:
          <Latex>{`$$\\begin{bmatrix} 0 \\\\ 1 \\\\ 2 \\\\ 3 \\end{bmatrix}$$`}</Latex>
          Vectors can have one number
          <Latex>{`$$\\begin{bmatrix} 1 \\end{bmatrix}$$`}</Latex>
          or they can have a bunch of numbers:
          <Latex>{`$$\\begin{bmatrix} 1 \\\\ 2 \\\\ 3 \\\\ 4 \\\\ 5 \\\\ 6 \\\\ 7 \\\\ 8 \\\\ 9 \\\\ 10 \\end{bmatrix}$$`}</Latex>
          Think of a <span className="font-bold contents">vector</span> as a
          list of <span className="font-bold contents">numbers</span>.
        </div>
      </p>
    </div>
  );
}
