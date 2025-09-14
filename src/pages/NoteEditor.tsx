import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Save, 
  FolderOpen, 
  Tag,
  X,
  Plus
} from "lucide-react";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { toast } from "@/hooks/use-toast";

export default function NoteEditor() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const handleSave = () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your note",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would save to your state management/API
    toast({
      title: "Note saved",
      description: "Your note has been saved successfully",
    });
    
    navigate("/notes");
  };

  const handleConvertToProject = () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title before converting to project",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would create a project from the note
    toast({
      title: "Project created",
      description: "Your note has been converted to a project",
    });
    
    navigate("/projects");
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim().toLowerCase())) {
      setTags([...tags, newTag.trim().toLowerCase()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/notes")}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Notes
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-xl font-semibold text-foreground">
                {title || "New Note"}
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={handleConvertToProject}
                disabled={!title.trim()}
              >
                <FolderOpen className="h-4 w-4 mr-2" />
                Convert to Project
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-gradient-primary hover:opacity-90 transition-smooth"
                disabled={!title.trim()}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Note
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Note Details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Title */}
            <Card className="bg-surface border-0 shadow-md">
              <CardContent className="p-4 space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Title
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter note title..."
                    className="bg-background border-border"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="bg-surface border-0 shadow-md">
              <CardContent className="p-4 space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Tags
                  </label>
                  <div className="flex gap-2 mb-3">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Add tag..."
                      className="bg-background border-border flex-1"
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={addTag}
                      disabled={!newTag.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary"
                        className="flex items-center gap-1 bg-primary/10 text-primary hover:bg-primary/20 transition-smooth"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-destructive transition-smooth"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-surface border-0 shadow-md">
              <CardContent className="p-4 space-y-2">
                <h3 className="text-sm font-medium text-foreground mb-3">Statistics</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Words:</span>
                    <span className="font-medium text-foreground">
                      {content.split(/\s+/).filter(word => word.length > 0).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Characters:</span>
                    <span className="font-medium text-foreground">{content.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lines:</span>
                    <span className="font-medium text-foreground">
                      {content.split('\n').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Markdown Editor */}
          <div className="lg:col-span-3">
            <MarkdownEditor
              value={content}
              onChange={setContent}
              placeholder="Start writing your note in Markdown..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}