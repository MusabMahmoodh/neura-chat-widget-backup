import { ReactMarkdown } from "react-markdown/lib/react-markdown";
// import CodeBlock from "./CodeBLock";

function LinkRenderer(props) {
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
}

function extractURLs(text) {
  // Define a regular expression to match URLs
  var urlRegex = /(https?|ftp):\/\/[^\s/$.?#].[^\s]*|www\.[^\s/$.?#].[^\s]*/g;

  // Use the match method to find all URLs in the text
  var urls = text.match(urlRegex);

  // Return the array of URLs
  return urls;
}

const ResourceDisplay = ({ resources }) => {
  var extractedURLs = extractURLs(resources);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        marginTop: "1rem",
        marginBottom: "1rem",
        width: "100%",
      }}
    >
      {extractedURLs?.map((url, idx) => (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          key={idx}
          style={{
            // add a modern styling for the links
            textDecoration: "none",
            color: "blue",
            marginBottom: "0.5rem",
            borderLeft: "5px solid #e0e0e0",
            paddingLeft: "0.5rem",
            maxWidth: "340px",
          }}
        >
          {url}
        </a>
      ))}
    </div>
  );
};

const ResponseComponent = ({ response, resources }) => {
  return (
    <div
      style={{
        maxWidth: "340px",
      }}
    >
      <ReactMarkdown components={{ a: LinkRenderer }}>{response}</ReactMarkdown>
      {resources && <ResourceDisplay resources={resources} />}
    </div>
  );
};

export default ResponseComponent;
