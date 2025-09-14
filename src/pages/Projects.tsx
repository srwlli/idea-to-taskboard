import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  ExternalLink, 
  FileText, 
  Image, 
  Link as LinkIcon,
  MoreVertical,
  Calendar,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Projects() {
  // Mock data - in a real app, this would come from your state management/API
  const [projects] = useState([
    {
      id: 1,
      name: "Website Redesign",
      description: "Complete overhaul of the company website with modern design and improved UX",
      status: "In Progress",
      priority: "High",
      dueDate: "2024-10-15",
      resources: {
        links: 3,
        documents: 5,
        images: 12
      },
      team: ["Alice", "Bob", "Charlie"],
      progress: 65,
      color: "blue"
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Native iOS and Android app for customer engagement",
      status: "Planning",
      priority: "Medium",
      dueDate: "2024-12-20",
      resources: {
        links: 7,
        documents: 3,
        images: 8
      },
      team: ["David", "Eve"],
      progress: 25,
      color: "green"
    },
    {
      id: 3,
      name: "Marketing Campaign",
      description: "Q4 marketing campaign for product launch",
      status: "Completed",
      priority: "High",
      dueDate: "2024-09-30",
      resources: {
        links: 5,
        documents: 8,
        images: 20
      },
      team: ["Frank", "Grace", "Henry", "Ivy"],
      progress: 100,
      color: "purple"
    },
  ]);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "default";
      case "In Progress":
        return "secondary";
      case "Planning":
        return "outline";
      default:
        return "outline";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-500";
      case "Medium":
        return "text-yellow-500";
      case "Low":
        return "text-green-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground mt-2">
              Manage your projects, resources, and track progress.
            </p>
          </div>
          <Button asChild className="bg-gradient-primary hover:opacity-90 transition-smooth">
            <Link to="/projects/new">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Link>
          </Button>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card 
              key={project.id} 
              className="bg-surface border-0 shadow-lg hover:shadow-glow transition-smooth cursor-pointer group"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-smooth">
                      {project.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusBadgeVariant(project.status)}>
                        {project.status}
                      </Badge>
                      <span className={`text-sm font-medium ${getPriorityColor(project.priority)}`}>
                        {project.priority}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-surface-variant rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Resources */}
                <div className="grid grid-cols-3 gap-4 py-3 border-y border-border">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-primary">
                      <LinkIcon className="h-4 w-4" />
                      <span className="font-semibold">{project.resources.links}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Links</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-primary">
                      <FileText className="h-4 w-4" />
                      <span className="font-semibold">{project.resources.documents}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Docs</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-primary">
                      <Image className="h-4 w-4" />
                      <span className="font-semibold">{project.resources.images}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Images</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(project.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{project.team.length} members</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Project
                </Button>
              </CardContent>
            </Card>
          ))}

          {/* Empty State / New Project Card */}
          <Card className="bg-surface-variant border-2 border-dashed border-border hover:border-primary transition-smooth cursor-pointer group">
            <CardContent className="flex flex-col items-center justify-center h-full min-h-[300px] text-center space-y-4">
              <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-smooth">
                <Plus className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Create New Project</h3>
                <p className="text-sm text-muted-foreground">
                  Start organizing your work with a new project
                </p>
              </div>
              <Button asChild variant="outline" className="mt-4">
                <Link to="/projects/new">
                  Get Started
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}