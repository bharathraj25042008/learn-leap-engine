import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/Layout";
import { Star, TrendingUp, AlertTriangle, CheckCircle, MapPin, Clock, DollarSign, Building2, Brain, Target } from "lucide-react";

// Sample recommendations with AI matching scores
const generateRecommendations = (studentSkills: string[], studentInterests: string[]) => {
  const internships = [
    {
      id: 1,
      title: "Software Engineering Intern",
      company: "TechMahindra",
      location: "Bangalore, Karnataka",
      duration: "3 months",
      stipend: "₹25,000/month",
      description: "Join our engineering team to work on cutting-edge web applications using React and Node.js.",
      skills: ["JavaScript", "React", "Node.js", "TypeScript", "Git"],
      matchScore: 0,
      skillsMatched: [],
      missingSkills: [],
      category: "Software Development",
    },
    {
      id: 2,
      title: "Frontend Developer Intern",
      company: "Wipro",
      location: "Hyderabad, Telangana",
      duration: "4 months",
      stipend: "₹22,000/month",
      description: "Build responsive web applications and improve user experience.",
      skills: ["React", "TypeScript", "CSS", "HTML", "JavaScript"],
      matchScore: 0,
      skillsMatched: [],
      missingSkills: [],
      category: "Web Development",
    },
    {
      id: 3,
      title: "Data Science Intern",
      company: "Infosys Limited",
      location: "Pune, Maharashtra",
      duration: "4 months",
      stipend: "₹30,000/month",
      description: "Work with machine learning models and analyze large datasets.",
      skills: ["Python", "Machine Learning", "SQL", "Pandas", "TensorFlow"],
      matchScore: 0,
      skillsMatched: [],
      missingSkills: [],
      category: "Data Science",
    },
    {
      id: 4,
      title: "Full Stack Developer Intern",
      company: "Flipkart",
      location: "Gurgaon, Haryana",
      duration: "5 months",
      stipend: "₹24,000/month",
      description: "Work on both frontend and backend systems using modern technologies.",
      skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
      matchScore: 0,
      skillsMatched: [],
      missingSkills: [],
      category: "Software Development",
    },
    {
      id: 5,
      title: "Mobile App Developer Intern",
      company: "Paytm",
      location: "Chennai, Tamil Nadu",
      duration: "3 months",
      stipend: "₹26,000/month",
      description: "Develop mobile applications for iOS and Android platforms.",
      skills: ["React Native", "JavaScript", "Mobile Development", "iOS", "Android"],
      matchScore: 0,
      skillsMatched: [],
      missingSkills: [],
      category: "Mobile Development",
    },
  ];

  // Calculate accurate match scores based on student skills
  internships.forEach(internship => {
    const matched = internship.skills.filter(skill => 
      studentSkills.some(studentSkill => 
        studentSkill.toLowerCase() === skill.toLowerCase()
      )
    );
    
    const missing = internship.skills.filter(skill => 
      !studentSkills.some(studentSkill => 
        studentSkill.toLowerCase() === skill.toLowerCase()
      )
    );
    
    // Calculate match percentage based on skill overlap
    const matchPercentage = Math.round((matched.length / internship.skills.length) * 100);
    
    // Add bonus points for interest alignment
    const hasInterestMatch = studentInterests.some(interest => 
      internship.category.toLowerCase().includes(interest.toLowerCase()) ||
      interest.toLowerCase().includes(internship.category.toLowerCase())
    );
    
    internship.matchScore = Math.min(100, matchPercentage + (hasInterestMatch ? 10 : 0));
    internship.skillsMatched = matched;
    internship.missingSkills = missing;
  });

  // Sort by match score and return top 5
  return internships.sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);
};

const Recommendations = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load student data and generate recommendations
    const loadData = () => {
      setLoading(true);
      
      // Try to get student from localStorage or use current student
      let studentData = null;
      
      if (studentId) {
        const savedStudent = localStorage.getItem(`student_${studentId}`);
        if (savedStudent) {
          studentData = JSON.parse(savedStudent);
        }
      } else {
        // Try to get current student
        const currentStudentId = localStorage.getItem('currentStudentId');
        if (currentStudentId) {
          const savedStudent = localStorage.getItem(`student_${currentStudentId}`);
          if (savedStudent) {
            studentData = JSON.parse(savedStudent);
          }
        }
      }

      // If no student data, use demo data
      if (!studentData) {
        studentData = {
          id: 'demo',
          name: 'Demo Student',
          skills: ['JavaScript', 'React', 'Python', 'Node.js'],
          interests: ['Software Development', 'Web Development'],
          education: 'Computer Science',
          location: 'Bangalore, Karnataka',
        };
      }

      setStudent(studentData);
      
      // Generate AI recommendations based on student profile
      const recs = generateRecommendations(studentData.skills || [], studentData.interests || []);
      setRecommendations(recs);
      
      setLoading(false);
    };

    loadData();
  }, [studentId]);

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-orange-600";
  };

  const getMatchLabel = (score: number) => {
    if (score >= 90) return "Excellent Match";
    if (score >= 80) return "Great Match";
    if (score >= 70) return "Good Match";
    return "Fair Match";
  };

  if (loading) {
    return (
      <Layout>
        <div className="py-12">
          <div className="container flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-12">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold">
              AI <span className="gradient-text">Recommendations</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Based on your profile, here are your top internship matches powered by our AI engine.
            </p>
          </div>

          {/* Student Profile Summary */}
          {student && (
            <Card className="mb-8 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <span>Your Profile Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Name</h4>
                    <p className="font-medium">{student.name}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Education</h4>
                    <p className="font-medium">{student.education}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Location</h4>
                    <p className="font-medium">{student.location}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Skills</h4>
                    <p className="font-medium">{student.skills?.length || 0} skills</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Your Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {student.skills?.map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          <div className="space-y-6">
            {recommendations.map((rec, index) => (
              <Card key={rec.id} className="shadow-card hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="bg-primary text-primary-foreground text-sm font-bold px-2 py-1 rounded">
                          #{index + 1}
                        </span>
                        <CardTitle className="text-xl">{rec.title}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-4 text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Building2 className="h-4 w-4" />
                          <span>{rec.company}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{rec.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{rec.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{rec.stipend}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className={`text-2xl font-bold ${getMatchColor(rec.matchScore)}`}>
                        {rec.matchScore}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {getMatchLabel(rec.matchScore)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-6">
                    {rec.description}
                  </CardDescription>

                  {/* Match Analysis */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium flex items-center space-x-1">
                          <Target className="h-4 w-4 text-primary" />
                          <span>Match Score</span>
                        </h4>
                        <span className={`font-medium ${getMatchColor(rec.matchScore)}`}>
                          {rec.matchScore}%
                        </span>
                      </div>
                      <Progress value={rec.matchScore} className="h-2" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Skills Matched */}
                      <div>
                        <h4 className="font-medium mb-3 flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Skills You Have</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {rec.skillsMatched.map((skill: string, index: number) => (
                            <Badge key={index} variant="default" className="bg-green-100 text-green-800 border-green-200">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Missing Skills */}
                      <div>
                        <h4 className="font-medium mb-3 flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          <span>Skills to Learn</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {rec.missingSkills.map((skill: string, index: number) => (
                            <Badge key={index} variant="outline" className="border-yellow-200 text-yellow-700">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* All Required Skills */}
                      <div>
                        <h4 className="font-medium mb-3 flex items-center space-x-2">
                          <Star className="h-4 w-4 text-primary" />
                          <span>All Requirements</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {rec.skills.map((skill: string, index: number) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
                      <Button variant="gradient" className="flex-1">
                        Apply Now
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Save for Later
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Learn More
                      </Button>
                    </div>

                    {/* AI Insights */}
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h5 className="font-medium mb-2 flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span>AI Insights</span>
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        {rec.matchScore >= 90 && "Excellent match! Your skills align perfectly with this role. This internship could be a great stepping stone for your career."}
                        {rec.matchScore >= 80 && rec.matchScore < 90 && "Great match! You have most of the required skills. Consider learning the missing skills to become an even stronger candidate."}
                        {rec.matchScore >= 70 && rec.matchScore < 80 && "Good match! While you may need to develop some skills, this role offers great learning opportunities."}
                        {rec.matchScore < 70 && "Fair match. This role might be challenging but could help you grow significantly. Consider if you're ready for the learning curve."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Want to improve your matches?</h3>
                <p className="text-muted-foreground mb-6">
                  Update your profile with new skills and interests to get even better recommendations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild variant="gradient">
                    <Link to="/student">Update Profile</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/internships">Browse All Internships</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Recommendations;