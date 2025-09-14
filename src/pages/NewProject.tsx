import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Calendar as CalendarIcon,
  Plus,
  X,
  Link as LinkIcon,
  FileText,
  Image as ImageIcon
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function NewProject() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priority: "",
    status: "Planning",
    dueDate: undefined as Date | undefined,
    tags: [] as string[],
  });
  
  const [newTag, setNewTag] = useState("");
  const [resources, setResources] = useState({
    links: [] as string[],
    documents: [] as string[],
    images: [] as string[],
  });
  const [newResource, setNewResource] = useState({
    type: "links" as keyof typeof resources,
    value: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Project name is required",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would save to your backend/state management
    toast({
      title: "Success",
      description: "Project created successfully!",
    });
    
    navigate("/projects");
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addResource = () => {
    if (newResource.value.trim()) {
      setResources(prev => ({
        ...prev,
        [newResource.type]: [...prev[newResource.type], newResource.value.trim()]
      }));
      setNewResource(prev => ({ ...prev, value: "" }));
    }
  };

  const removeResource = (type: keyof typeof resources, index: number) => {
    setResources(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const getResourceIcon = (type: keyof typeof resources) => {
    switch (type) {
      case "links": return <LinkIcon className="h-4 w-4" />;
      case "documents": return <FileText className="h-4 w-4" />;
      case "images": return <ImageIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/projects")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create New Project</h1>
            <p className="text-muted-foreground mt-2">
              Set up your project with all the necessary details and resources.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-surface border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-foreground">Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">Project Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter project name"
                      className="bg-background border-border"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-foreground">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your project..."
                      rows={4}
                      className="bg-background border-border resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-foreground">Priority</Label>
                      <Select 
                        value={formData.priority} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
                      >
                        <SelectTrigger className="bg-background border-border">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-foreground">Status</Label>
                      <Select 
                        value={formData.status} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                      >
                        <SelectTrigger className="bg-background border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Planning">Planning</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-foreground">Due Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal bg-background border-border",
                              !formData.dueDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.dueDate ? format(formData.dueDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={formData.dueDate}
                            onSelect={(date) => setFormData(prev => ({ ...prev, dueDate: date }))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resources */}
              <Card className="bg-surface border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-foreground">Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Select 
                      value={newResource.type} 
                      onValueChange={(value: keyof typeof resources) => 
                        setNewResource(prev => ({ ...prev, type: value }))
                      }
                    >
                      <SelectTrigger className="w-32 bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="links">Links</SelectItem>
                        <SelectItem value="documents">Documents</SelectItem>
                        <SelectItem value="images">Images</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      value={newResource.value}
                      onChange={(e) => setNewResource(prev => ({ ...prev, value: e.target.value }))}
                      placeholder={`Add ${newResource.type.slice(0, -1)}...`}
                      className="flex-1 bg-background border-border"
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addResource())}
                    />
                    <Button 
                      type="button" 
                      onClick={addResource}
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {Object.entries(resources).map(([type, items]) => (
                    items.length > 0 && (
                      <div key={type} className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground capitalize">
                          {getResourceIcon(type as keyof typeof resources)}
                          {type}
                        </div>
                        <div className="space-y-1">
                          {items.map((item, index) => (
                            <div key={index} className="flex items-center justify-between bg-background rounded-md p-2 border border-border">
                              <span className="text-sm text-foreground truncate">{item}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeResource(type as keyof typeof resources, index)}
                                className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="bg-surface border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-foreground">Tags</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add tag..."
                      className="bg-background border-border"
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button 
                      type="button" 
                      onClick={addTag}
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {formData.tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary" 
                          className="bg-primary/10 text-primary border-primary/20"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-surface border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-primary hover:opacity-90 transition-smooth"
                    >
                      Create Project
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate("/projects")}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}