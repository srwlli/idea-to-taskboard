import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FolderOpen, FileText, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  // Mock data - in a real app, this would come from your state management/API
  const stats = {
    totalProjects: 12,
    totalNotes: 34,
    recentActivity: 8,
    completedTasks: 156,
  };

  const recentProjects = [
    { id: 1, name: "Website Redesign", status: "In Progress", updated: "2 hours ago" },
    { id: 2, name: "Mobile App Development", status: "Planning", updated: "1 day ago" },
    { id: 3, name: "Marketing Campaign", status: "Completed", updated: "3 days ago" },
  ];

  const recentNotes = [
    { id: 1, title: "Meeting Notes - Q4 Planning", updated: "1 hour ago" },
    { id: 2, title: "Research: User Experience Patterns", updated: "4 hours ago" },
    { id: 3, title: "Ideas for New Features", updated: "1 day ago" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back! Here's what's happening with your projects and notes.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline" size="sm">
              <Link to="/notes/new">
                <Plus className="h-4 w-4 mr-2" />
                New Note
              </Link>
            </Button>
            <Button asChild size="sm" className="bg-gradient-primary hover:opacity-90 transition-smooth">
              <Link to="/projects/new">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-surface border-0 shadow-md hover:shadow-lg transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Projects
              </CardTitle>
              <FolderOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalProjects}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-surface border-0 shadow-md hover:shadow-lg transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Notes
              </CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalNotes}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +8 from last week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-surface border-0 shadow-md hover:shadow-lg transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Recent Activity
              </CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.recentActivity}</div>
              <p className="text-xs text-muted-foreground">
                In the last 24 hours
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-surface border-0 shadow-md hover:shadow-lg transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tasks Completed
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.completedTasks}</div>
              <p className="text-xs text-muted-foreground">
                All time total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Projects */}
          <Card className="bg-surface border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <FolderOpen className="h-5 w-5 text-primary" />
                Recent Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="flex items-center justify-between p-3 rounded-lg bg-surface-variant hover:bg-card-hover transition-smooth cursor-pointer"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{project.name}</p>
                    <p className="text-sm text-muted-foreground">{project.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{project.updated}</p>
                  </div>
                </div>
              ))}
              <Button asChild variant="outline" className="w-full">
                <Link to="/projects">View All Projects</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Notes */}
          <Card className="bg-surface border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <FileText className="h-5 w-5 text-primary" />
                Recent Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentNotes.map((note) => (
                <div 
                  key={note.id} 
                  className="flex items-center justify-between p-3 rounded-lg bg-surface-variant hover:bg-card-hover transition-smooth cursor-pointer"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{note.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{note.updated}</p>
                  </div>
                </div>
              ))}
              <Button asChild variant="outline" className="w-full">
                <Link to="/notes">View All Notes</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}