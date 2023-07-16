import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const ResponseComponent = ({ response }) => {
  return (
    <div>
      <ReactMarkdown>{response}</ReactMarkdown>
    </div>
  );
};

export default ResponseComponent;
