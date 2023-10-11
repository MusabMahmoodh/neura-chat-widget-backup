import { ReactMarkdown } from "react-markdown/lib/react-markdown";
// import CodeBlock from "./CodeBLock";

function LinkRenderer(props) {
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
}

const ResponseComponent = ({ response }) => {
  return (
    <div>
      <ReactMarkdown components={{ a: LinkRenderer }}>{response}</ReactMarkdown>
    </div>
  );
};

export default ResponseComponent;
