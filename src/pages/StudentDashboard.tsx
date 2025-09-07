import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { User, MapPin, GraduationCap, Star, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    education: "",
    institution: "",
    location: "",
    skills: [] as string[],
    interests: [] as string[],
    bio: "",
    gpa: "",
    year: "",
  });

  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");

  const skillSuggestions = [
    "JavaScript", "Python", "React", "Node.js", "TypeScript", "SQL", "Java", "C++",
    "Machine Learning", "Data Analysis", "UI/UX Design", "Marketing", "Project Management",
    "Content Writing", "Social Media", "Graphic Design", "Finance", "Accounting"
  ];

  const interestSuggestions = [
    "Software Development", "Data Science", "AI/ML", "Cybersecurity", "Web Development",
    "Mobile Development", "Cloud Computing", "DevOps", "Product Management", "Marketing",
    "Design", "Finance", "Consulting", "Healthcare", "Education", "Non-profit"
  ];

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addInterest = (interest: string) => {
    if (interest && !formData.interests.includes(interest)) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
      setNewInterest("");
    }
  };

  const removeInterest = (interestToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(interest => interest !== interestToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage for demo purposes
    const studentId = Date.now().toString();
    localStorage.setItem(`student_${studentId}`, JSON.stringify({ ...formData, id: studentId }));
    localStorage.setItem('currentStudentId', studentId);
    
    toast({
      title: "Profile Created Successfully!",
      description: "Your student profile has been saved. You can now get personalized recommendations.",
    });

    // Navigate to recommendations
    setTimeout(() => {
      navigate(`/recommendations/${studentId}`);
    }, 1500);
  };

  return (
    <Layout>
      <div className="py-12">
        <div className="container max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold">
              Create Your <span className="gradient-text">Student Profile</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Tell us about yourself to get personalized internship recommendations.
            </p>
          </div>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span>Personal Information</span>
              </CardTitle>
              <CardDescription>
                Fill out your details to help us match you with the right opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Education Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <span>Education</span>
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="institution">Institution</Label>
                      <Input
                        id="institution"
                        value={formData.institution}
                        onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                        placeholder="University or College name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="education">Degree/Major</Label>
                      <Input
                        id="education"
                        value={formData.education}
                        onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                        placeholder="e.g., Computer Science, Business, etc."
                        required
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="year">Year of Study</Label>
                      <Select value={formData.year} onValueChange={(value) => setFormData(prev => ({ ...prev, year: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="first-year">First Year</SelectItem>
                          <SelectItem value="second-year">Second Year</SelectItem>
                          <SelectItem value="third-year">Third Year</SelectItem>
                          <SelectItem value="fourth-year">Fourth Year</SelectItem>
                          <SelectItem value="graduate">Graduate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gpa">CGPA (Optional)</Label>
                      <Input
                        id="gpa"
                        value={formData.gpa}
                        onChange={(e) => setFormData(prev => ({ ...prev, gpa: e.target.value }))}
                        placeholder="8.5"
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                      />
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Preferred Location</span>
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="City, State or Remote"
                    required
                  />
                </div>

                {/* Skills */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Star className="h-5 w-5 text-primary" />
                    <span>Skills</span>
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {formData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(newSkill))}
                    />
                    <Button type="button" onClick={() => addSkill(newSkill)} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Suggested skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {skillSuggestions.filter(skill => !formData.skills.includes(skill)).slice(0, 8).map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="outline" 
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                          onClick={() => addSkill(skill)}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Interests */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Career Interests</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {formData.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                        <span>{interest}</span>
                        <button
                          type="button"
                          onClick={() => removeInterest(interest)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      placeholder="Add an interest"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest(newInterest))}
                    />
                    <Button type="button" onClick={() => addInterest(newInterest)} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Suggested interests:</p>
                    <div className="flex flex-wrap gap-2">
                      {interestSuggestions.filter(interest => !formData.interests.includes(interest)).slice(0, 6).map((interest) => (
                        <Badge 
                          key={interest} 
                          variant="outline" 
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                          onClick={() => addInterest(interest)}
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio (Optional)</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us a bit about yourself, your goals, and what you're looking for in an internship..."
                    rows={4}
                  />
                </div>

                <Button type="submit" variant="gradient" size="lg" className="w-full">
                  Create Profile & Get Recommendations
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;