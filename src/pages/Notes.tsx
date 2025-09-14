import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search,
  FileText, 
  Calendar,
  MoreVertical,
  ArrowRight,
  FolderOpen
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Notes() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data - in a real app, this would come from your state management/API
  const [notes] = useState([
    {
      id: 1,
      title: "Meeting Notes - Q4 Planning",
      content: "Discussed project roadmap for Q4, including new feature releases and team allocation...",
      tags: ["meeting", "planning", "q4"],
      createdAt: "2024-09-14T10:00:00Z",
      updatedAt: "2024-09-14T14:30:00Z",
      wordCount: 234
    },
    {
      id: 2,
      title: "Research: User Experience Patterns",
      content: "Comprehensive research on modern UX patterns and their implementation in web applications...",
      tags: ["research", "ux", "design"],
      createdAt: "2024-09-13T09:15:00Z",
      updatedAt: "2024-09-14T10:45:00Z",
      wordCount: 567
    },
    {
      id: 3,
      title: "Ideas for New Features",
      content: "Brainstorming session results for upcoming product features and improvements...",
      tags: ["brainstorming", "features", "product"],
      createdAt: "2024-09-12T16:20:00Z",
      updatedAt: "2024-09-13T11:10:00Z",
      wordCount: 345
    },
    {
      id: 4,
      title: "Technical Architecture Review",
      content: "Review of current system architecture and recommendations for scaling...",
      tags: ["technical", "architecture", "scaling"],
      createdAt: "2024-09-11T14:00:00Z",
      updatedAt: "2024-09-12T09:30:00Z",
      wordCount: 892
    },
    {
      id: 5,
      title: "Client Feedback Summary",
      content: "Summary of client feedback from recent product demos and user testing sessions...",
      tags: ["client", "feedback", "testing"],
      createdAt: "2024-09-10T11:30:00Z",
      updatedAt: "2024-09-11T15:45:00Z",
      wordCount: 456
    },
  ]);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const getTagColor = (tag: string) => {
    const colors = {
      "meeting": "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
      "research": "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
      "technical": "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
      "planning": "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
      "default": "bg-surface-variant text-muted-foreground"
    };
    return colors[tag as keyof typeof colors] || colors.default;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Notes</h1>
            <p className="text-muted-foreground mt-2">
              Capture ideas, meeting notes, and convert them to projects.
            </p>
          </div>
          <Button asChild className="bg-gradient-primary hover:opacity-90 transition-smooth">
            <Link to="/notes/new">
              <Plus className="h-4 w-4 mr-2" />
              New Note
            </Link>
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-surface border-border"
          />
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <Card 
              key={note.id} 
              className="bg-surface border-0 shadow-lg hover:shadow-glow transition-smooth cursor-pointer group"
            >
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-smooth line-clamp-2">
                    {note.title}
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {note.content}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {note.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary"
                      className={`text-xs ${getTagColor(tag)}`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(note.updatedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    <span>{note.wordCount} words</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-smooth"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 hover:bg-accent hover:text-accent-foreground transition-smooth"
                  >
                    <FolderOpen className="h-4 w-4 mr-2" />
                    To Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Empty State / New Note Card */}
          <Card className="bg-surface-variant border-2 border-dashed border-border hover:border-primary transition-smooth cursor-pointer group">
            <CardContent className="flex flex-col items-center justify-center h-full min-h-[280px] text-center space-y-4">
              <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-smooth">
                <Plus className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Create New Note</h3>
                <p className="text-sm text-muted-foreground">
                  Capture your thoughts and ideas
                </p>
              </div>
              <Button asChild variant="outline" className="mt-4">
                <Link to="/notes/new">
                  Start Writing
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* No Results */}
        {searchQuery && filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No notes found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or create a new note
            </p>
          </div>
        )}
      </div>
    </div>
  );
}