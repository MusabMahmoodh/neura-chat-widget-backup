export function replacePythonCodeWithText(markdown: string) {
  const pythonCodeRegex = /```python([\s\S]*?)```/g;
  return markdown.replace(pythonCodeRegex, "as shown in the code");
}
