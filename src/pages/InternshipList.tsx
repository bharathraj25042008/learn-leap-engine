import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { Search, MapPin, Clock, DollarSign, Building2, Filter, Star } from "lucide-react";

// Sample internship data
const sampleInternships = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "TechMahindra",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    duration: "3 months",
    stipend: "18,000/month",
    description: "Join our engineering team to work on cutting-edge web applications using React and Node.js.",
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "Git"],
    requirements: ["Computer Science student", "Strong programming skills", "Team collaboration"],
    posted: "2 days ago",
    applicants: 45,
    rating: 4.8,
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "Infosys Limited",
    location: "Hyderabad, Telangana",
    type: "Full-time",
    duration: "4 months",
    stipend: "20,000/month",
    description: "Work with our data science team to build machine learning models and analyze large datasets.",
    skills: ["Python", "Machine Learning", "SQL", "Pandas", "TensorFlow"],
    requirements: ["Statistics or CS background", "Python experience", "ML knowledge"],
    posted: "1 week ago",
    applicants: 72,
    rating: 4.9,
  },
  {
    id: 3,
    title: "UI/UX Design Intern",
    company: "Zomato",
    location: "Gurgaon, Haryana",
    type: "Part-time",
    duration: "6 months",
    stipend: "15,000/month",
    description: "Create beautiful and intuitive user interfaces for web and mobile applications.",
    skills: ["Figma", "Adobe Creative Suite", "UI/UX Design", "Prototyping", "User Research"],
    requirements: ["Design portfolio", "Design tools experience", "Creative thinking"],
    posted: "3 days ago",
    applicants: 28,
    rating: 4.7,
  },
  {
    id: 4,
    title: "Marketing Intern",
    company: "Flipkart",
    location: "Mumbai, Maharashtra",
    type: "Full-time",
    duration: "3 months",
    stipend: "16,000/month",
    description: "Help develop and execute marketing campaigns across digital and traditional channels.",
    skills: ["Social Media", "Content Writing", "Google Analytics", "SEO", "Marketing"],
    requirements: ["Marketing or Communications student", "Social media experience", "Creative writing"],
    posted: "5 days ago",
    applicants: 38,
    rating: 4.6,
  },
  {
    id: 5,
    title: "Financial Analyst Intern",
    company: "HDFC Bank",
    location: "Chennai, Tamil Nadu",
    type: "Full-time",
    duration: "4 months",
    stipend: "19,000/month",
    description: "Assist with financial modeling, market research, and investment analysis.",
    skills: ["Excel", "Financial Modeling", "Data Analysis", "Bloomberg Terminal", "Finance"],
    requirements: ["Finance or Economics student", "Excel proficiency", "Analytical skills"],
    posted: "1 day ago",
    applicants: 56,
    rating: 4.5,
  },
  {
    id: 7,
    title: "Software Developer Intern",
    company: "Cognizant",
    location: "Chennai, Tamil Nadu",
    type: "Full-time",
    duration: "3 months",
    stipend: "17,000/month",
    description: "Work on enterprise software solutions using Java and Spring framework.",
    skills: ["Java", "Spring Boot", "SQL", "REST APIs", "Git"],
    requirements: ["Computer Science background", "Java knowledge", "Problem-solving skills"],
    posted: "2 days ago",
    applicants: 42,
    rating: 4.6,
  },
  {
    id: 8,
    title: "DevOps Intern",
    company: "Tata Consultancy Services",
    location: "Chennai, Tamil Nadu",
    type: "Full-time",
    duration: "4 months",
    stipend: "18,500/month",
    description: "Learn cloud technologies and help automate deployment processes.",
    skills: ["AWS", "Docker", "Kubernetes", "Linux", "CI/CD"],
    requirements: ["Basic cloud knowledge", "Linux familiarity", "Eagerness to learn"],
    posted: "3 days ago",
    applicants: 38,
    rating: 4.7,
  },
  {
    id: 9,
    title: "Backend Developer Intern",
    company: "Freshworks",
    location: "Chennai, Tamil Nadu",
    type: "Full-time",
    duration: "5 months",
    stipend: "20,000/month",
    description: "Build scalable backend services and APIs for web applications.",
    skills: ["Node.js", "Express", "MongoDB", "RESTful APIs", "JavaScript"],
    requirements: ["Backend development interest", "Database knowledge", "API design understanding"],
    posted: "1 week ago",
    applicants: 29,
    rating: 4.8,
  },
  {
    id: 6,
    title: "Mobile App Development Intern",
    company: "Paytm",
    location: "Noida, Uttar Pradesh",
    type: "Full-time",
    duration: "5 months",
    stipend: "18,000/month",
    description: "Develop mobile applications for iOS and Android platforms using React Native.",
    skills: ["React Native", "JavaScript", "Mobile Development", "iOS", "Android"],
    requirements: ["Mobile development experience", "React knowledge", "App store submission"],
    posted: "4 days ago",
    applicants: 34,
    rating: 4.8,
  },
];

const InternshipList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState("");

  const filteredInternships = useMemo(() => {
    return sampleInternships.filter(internship => {
      const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           internship.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesLocation = !locationFilter || locationFilter === "all" || 
                             internship.location.toLowerCase().includes(locationFilter.toLowerCase()) ||
                             (locationFilter === "remote" && internship.location.toLowerCase() === "remote");
      
      const matchesType = !typeFilter || typeFilter === "all" || internship.type === typeFilter;
      const matchesDuration = !durationFilter || durationFilter === "all" || internship.duration.includes(durationFilter);

      return matchesSearch && matchesLocation && matchesType && matchesDuration;
    });
  }, [searchTerm, locationFilter, typeFilter, durationFilter]);

  return (
    <Layout>
      <div className="py-12">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold">
              Browse <span className="gradient-text">Internships</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover amazing internship opportunities from top companies worldwide.
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-8 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-primary" />
                <span>Filter Internships</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search internships..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All locations</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="bangalore">Bangalore, Karnataka</SelectItem>
                      <SelectItem value="hyderabad">Hyderabad, Telangana</SelectItem>
                      <SelectItem value="gurgaon">Gurgaon, Haryana</SelectItem>
                      <SelectItem value="mumbai">Mumbai, Maharashtra</SelectItem>
                      <SelectItem value="chennai">Chennai, Tamil Nadu</SelectItem>
                      <SelectItem value="noida">Noida, Uttar Pradesh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration</label>
                  <Select value={durationFilter} onValueChange={setDurationFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All durations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All durations</SelectItem>
                      <SelectItem value="3">3 months</SelectItem>
                      <SelectItem value="4">4 months</SelectItem>
                      <SelectItem value="5">5 months</SelectItem>
                      <SelectItem value="6">6 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredInternships.length} of {sampleInternships.length} internships
            </p>
          </div>

          {/* Internship list */}
          <div className="grid gap-6">
            {filteredInternships.map((internship) => (
              <Card key={internship.id} className="shadow-card hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <CardTitle className="text-xl hover:text-primary transition-colors cursor-pointer">
                        {internship.title}
                      </CardTitle>
                      <div className="flex items-center space-x-4 text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Building2 className="h-4 w-4" />
                          <span>{internship.company}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{internship.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{internship.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>₹</span>
                          <span>{internship.stipend}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{internship.rating}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {internship.applicants} applicants
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {internship.description}
                  </CardDescription>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Required Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {internship.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Requirements:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {internship.requirements.map((req, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline">{internship.type}</Badge>
                        <span className="text-sm text-muted-foreground">Posted {internship.posted}</span>
                      </div>
                      <Button variant="gradient">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredInternships.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No internships found matching your filters. Try adjusting your search criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default InternshipList;