export function replacePythonCodeWithText(markdown: string) {
  const pythonCodeRegex = /```python([\s\S]*?)```/g;
  return markdown.replace(pythonCodeRegex, "as shown in the code");
}

export function replaceEsoft(markdown: string) {
  const esoftRegex = /eSoft/gi;
  return markdown.replace(esoftRegex, "GRAD");
}

export function replaceGrad(markdown: string) {
  console.log("replaceGrad", markdown);
  const gradRegex = /grad/gi;
  return markdown.replace(gradRegex, "esoft");
}
