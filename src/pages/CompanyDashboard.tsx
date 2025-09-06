import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout";
import { Building2, Users, Plus, Star, MapPin, GraduationCap, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample candidate data
const sampleCandidates = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    education: "Computer Science, Stanford University",
    year: "Junior",
    gpa: "3.8",
    location: "San Francisco, CA",
    skills: ["JavaScript", "React", "Node.js", "Python", "Git"],
    interests: ["Software Development", "Web Development", "AI/ML"],
    matchScore: 95,
    appliedFor: "Software Engineering Intern",
  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    education: "Data Science, MIT",
    year: "Senior",
    gpa: "3.9",
    location: "Boston, MA",
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Pandas"],
    interests: ["Data Science", "AI/ML", "Research"],
    matchScore: 92,
    appliedFor: "Data Science Intern",
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    email: "michael.r@email.com",
    education: "Business Administration, UC Berkeley",
    year: "Sophomore",
    gpa: "3.7",
    location: "San Francisco, CA",
    skills: ["Marketing", "Social Media", "Content Writing", "Analytics"],
    interests: ["Marketing", "Digital Strategy", "Brand Management"],
    matchScore: 88,
    appliedFor: "Marketing Intern",
  },
];

const CompanyDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("candidates");
  
  const [internshipForm, setInternshipForm] = useState({
    title: "",
    description: "",
    skills: "",
    location: "",
    duration: "",
    stipend: "",
    type: "",
  });

  const handlePostInternship = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Internship Posted Successfully!",
      description: "Your internship listing is now live and students can apply.",
    });

    // Reset form
    setInternshipForm({
      title: "",
      description: "",
      skills: "",
      location: "",
      duration: "",
      stipend: "",
      type: "",
    });
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-orange-600";
  };

  return (
    <Layout>
      <div className="py-12">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold">
              Company <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Manage your internship postings and discover talented candidates.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="candidates" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Candidates</span>
              </TabsTrigger>
              <TabsTrigger value="post" className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Post Internship</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center space-x-2">
                <Star className="h-4 w-4" />
                <span>Analytics</span>
              </TabsTrigger>
            </TabsList>

            {/* Candidates Tab */}
            <TabsContent value="candidates" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Top Candidates</span>
                  </CardTitle>
                  <CardDescription>
                    AI-matched candidates based on your internship requirements.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sampleCandidates.map((candidate) => (
                      <Card key={candidate.id} className="border border-border hover:shadow-md transition-all">
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="space-y-2">
                              <h3 className="text-lg font-semibold">{candidate.name}</h3>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Mail className="h-4 w-4" />
                                  <span>{candidate.email}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <GraduationCap className="h-4 w-4" />
                                  <span>{candidate.year}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{candidate.location}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right space-y-1">
                              <div className={`text-xl font-bold ${getMatchColor(candidate.matchScore)}`}>
                                {candidate.matchScore}%
                              </div>
                              <div className="text-sm text-muted-foreground">Match Score</div>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h4 className="font-medium text-sm text-muted-foreground mb-2">Education</h4>
                              <p className="text-sm">{candidate.education}</p>
                              <p className="text-sm text-muted-foreground">GPA: {candidate.gpa}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-sm text-muted-foreground mb-2">Applied For</h4>
                              <p className="text-sm font-medium">{candidate.appliedFor}</p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium text-sm text-muted-foreground mb-2">Skills</h4>
                              <div className="flex flex-wrap gap-2">
                                {candidate.skills.map((skill, index) => (
                                  <Badge key={index} variant="secondary">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium text-sm text-muted-foreground mb-2">Interests</h4>
                              <div className="flex flex-wrap gap-2">
                                {candidate.interests.map((interest, index) => (
                                  <Badge key={index} variant="outline">
                                    {interest}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-4 pt-4 border-t">
                            <Button variant="gradient" size="sm">
                              Contact Candidate
                            </Button>
                            <Button variant="outline" size="sm">
                              View Full Profile
                            </Button>
                            <Button variant="outline" size="sm">
                              Save for Later
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Post Internship Tab */}
            <TabsContent value="post" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Plus className="h-5 w-5 text-primary" />
                    <span>Post New Internship</span>
                  </CardTitle>
                  <CardDescription>
                    Create a new internship listing to attract top talent.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePostInternship} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Internship Title</Label>
                        <Input
                          id="title"
                          value={internshipForm.title}
                          onChange={(e) => setInternshipForm(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="e.g., Software Engineering Intern"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={internshipForm.location}
                          onChange={(e) => setInternshipForm(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="e.g., San Francisco, CA or Remote"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Job Description</Label>
                      <Textarea
                        id="description"
                        value={internshipForm.description}
                        onChange={(e) => setInternshipForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe the internship role, responsibilities, and what the intern will learn..."
                        rows={4}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="skills">Required Skills</Label>
                      <Input
                        id="skills"
                        value={internshipForm.skills}
                        onChange={(e) => setInternshipForm(prev => ({ ...prev, skills: e.target.value }))}
                        placeholder="e.g., JavaScript, React, Python (comma-separated)"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration</Label>
                        <Select value={internshipForm.duration} onValueChange={(value) => setInternshipForm(prev => ({ ...prev, duration: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3 months">3 months</SelectItem>
                            <SelectItem value="4 months">4 months</SelectItem>
                            <SelectItem value="5 months">5 months</SelectItem>
                            <SelectItem value="6 months">6 months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <Select value={internshipForm.type} onValueChange={(value) => setInternshipForm(prev => ({ ...prev, type: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Full-time">Full-time</SelectItem>
                            <SelectItem value="Part-time">Part-time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stipend">Monthly Stipend</Label>
                        <Input
                          id="stipend"
                          value={internshipForm.stipend}
                          onChange={(e) => setInternshipForm(prev => ({ ...prev, stipend: e.target.value }))}
                          placeholder="e.g., $2500"
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" variant="gradient" size="lg" className="w-full">
                      Post Internship
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="shadow-card">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold gradient-text">156</div>
                      <div className="text-sm text-muted-foreground">Total Applications</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-card">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold gradient-text">23</div>
                      <div className="text-sm text-muted-foreground">Active Listings</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-card">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold gradient-text">87%</div>
                      <div className="text-sm text-muted-foreground">Match Quality</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-card">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold gradient-text">12</div>
                      <div className="text-sm text-muted-foreground">Hired Interns</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest applications and candidate interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">New application from Sarah Chen</p>
                        <p className="text-sm text-muted-foreground">Applied for Data Science Intern - 92% match</p>
                      </div>
                      <div className="text-sm text-muted-foreground">2 hours ago</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">Alex Johnson viewed your company profile</p>
                        <p className="text-sm text-muted-foreground">Interested in Software Engineering position</p>
                      </div>
                      <div className="text-sm text-muted-foreground">1 day ago</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">New internship listing published</p>
                        <p className="text-sm text-muted-foreground">Mobile App Developer Intern is now live</p>
                      </div>
                      <div className="text-sm text-muted-foreground">3 days ago</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default CompanyDashboard;