import { 
  Users, 
  Clock, 
  CheckCircle, 
  PlayCircle,
  Pause,
  Search,
  Filter,
  Download,
  Settings2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

const reportStats = [
  { title: 'Total Participants', value: 2847, icon: Users, color: 'bg-primary/10 text-primary' },
  { title: 'Yet to Start', value: 423, icon: Pause, color: 'bg-muted text-muted-foreground' },
  { title: 'In Progress', value: 1256, icon: PlayCircle, color: 'bg-warning/10 text-warning' },
  { title: 'Completed', value: 1168, icon: CheckCircle, color: 'bg-success/10 text-success' },
];

const mockLearnerData = [
  { id: '1', course: 'React Masterclass', name: 'Alex Thompson', email: 'alex@email.com', enrolled: '2024-01-15', started: '2024-01-16', timeSpent: 245, completion: 78, status: 'in_progress' },
  { id: '2', course: 'TypeScript Course', name: 'Maria Garcia', email: 'maria@email.com', enrolled: '2024-01-20', started: '2024-01-21', timeSpent: 180, completion: 100, status: 'completed' },
  { id: '3', course: 'UI/UX Design', name: 'James Wilson', email: 'james@email.com', enrolled: '2024-02-01', started: null, timeSpent: 0, completion: 0, status: 'yet_to_start' },
  { id: '4', course: 'React Masterclass', name: 'Emily Chen', email: 'emily@email.com', enrolled: '2024-01-18', started: '2024-01-19', timeSpent: 320, completion: 92, status: 'in_progress' },
  { id: '5', course: 'Node.js Backend', name: 'David Kim', email: 'david@email.com', enrolled: '2024-02-05', started: '2024-02-06', timeSpent: 45, completion: 15, status: 'in_progress' },
];

export default function BackofficeReportsPage() {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins}m`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-success/10 text-success border-success/30">Completed</Badge>;
      case 'in_progress':
        return <Badge className="bg-warning/10 text-warning border-warning/30">In Progress</Badge>;
      case 'yet_to_start':
        return <Badge variant="secondary">Yet to Start</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-muted-foreground">
            Track learner progress and engagement
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reportStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg", stat.color)}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search learners..."
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Learner</TableHead>
              <TableHead>Enrolled</TableHead>
              <TableHead>Started</TableHead>
              <TableHead>Time Spent</TableHead>
              <TableHead>Completion</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockLearnerData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.course}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{row.name}</p>
                    <p className="text-sm text-muted-foreground">{row.email}</p>
                  </div>
                </TableCell>
                <TableCell>{new Date(row.enrolled).toLocaleDateString()}</TableCell>
                <TableCell>
                  {row.started ? new Date(row.started).toLocaleDateString() : '-'}
                </TableCell>
                <TableCell>{formatTime(row.timeSpent)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={row.completion} className="h-2 w-20" />
                    <span className="text-sm">{row.completion}%</span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(row.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
