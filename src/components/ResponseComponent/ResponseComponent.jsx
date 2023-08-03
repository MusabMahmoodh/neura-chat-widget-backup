import { ReactMarkdown } from "react-markdown/lib/react-markdown";
// import CodeBlock from "./CodeBLock";

const ResponseComponent = ({ response }) => {
  return (
    <div>
      <ReactMarkdown>{response}</ReactMarkdown>
    </div>
  );
};

export default ResponseComponent;
