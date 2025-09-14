import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Edit, Bold, Italic, Link, List, Code } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function MarkdownEditor({ value, onChange, placeholder = "Start writing..." }: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState("edit");

  const insertMarkdown = (syntax: string, placeholder: string = "") => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const textToInsert = selectedText || placeholder;
    
    let newValue = "";
    if (syntax === "link") {
      newValue = value.substring(0, start) + `[${textToInsert}](url)` + value.substring(end);
    } else if (syntax === "list") {
      newValue = value.substring(0, start) + `\n- ${textToInsert}` + value.substring(end);
    } else if (syntax === "code") {
      if (textToInsert.includes('\n')) {
        newValue = value.substring(0, start) + `\`\`\`\n${textToInsert}\n\`\`\`` + value.substring(end);
      } else {
        newValue = value.substring(0, start) + `\`${textToInsert}\`` + value.substring(end);
      }
    } else {
      newValue = value.substring(0, start) + `${syntax}${textToInsert}${syntax}` + value.substring(end);
    }
    
    onChange(newValue);
  };

  return (
    <Card className="bg-surface border-0 shadow-lg h-full">
      <CardContent className="p-0 h-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="flex items-center justify-between border-b border-border p-4">
            <TabsList className="grid w-full max-w-[200px] grid-cols-2">
              <TabsTrigger value="edit" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </TabsTrigger>
            </TabsList>
            
            {activeTab === "edit" && (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => insertMarkdown("**", "bold text")}
                  title="Bold"
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => insertMarkdown("*", "italic text")}
                  title="Italic"
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => insertMarkdown("link", "link text")}
                  title="Link"
                >
                  <Link className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => insertMarkdown("list", "list item")}
                  title="List"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => insertMarkdown("code", "code")}
                  title="Code"
                >
                  <Code className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          
          <TabsContent value="edit" className="flex-1 p-0 m-0">
            <Textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="h-full min-h-[500px] border-0 resize-none rounded-none focus-visible:ring-0 bg-surface text-foreground"
            />
          </TabsContent>
          
          <TabsContent value="preview" className="flex-1 p-6 m-0 overflow-auto">
            {value ? (
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    code({ className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || '');
                      const isInline = !match;
                      return isInline ? (
                        <code className="bg-surface-variant px-1 py-0.5 rounded text-sm" {...props}>
                          {children}
                        </code>
                      ) : (
                        <SyntaxHighlighter
                          style={oneDark as any}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      );
                    },
                    h1: ({ children }) => (
                      <h1 className="text-2xl font-bold text-foreground mb-4">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl font-semibold text-foreground mb-3">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg font-medium text-foreground mb-2">{children}</h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-foreground mb-4 leading-relaxed">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside text-foreground mb-4 space-y-1">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside text-foreground mb-4 space-y-1">{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-foreground">{children}</li>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-4">
                        {children}
                      </blockquote>
                    ),
                    a: ({ children, href }) => (
                      <a 
                        href={href} 
                        className="text-primary hover:text-primary-glow underline transition-smooth"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {value}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <p>Start writing to see the preview</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}