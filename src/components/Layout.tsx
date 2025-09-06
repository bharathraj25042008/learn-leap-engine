import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, Users, Building2, Star, User } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: Brain },
    { name: "Student Profile", href: "/student", icon: User },
    { name: "Internships", href: "/internships", icon: Building2 },
    { name: "Recommendations", href: "/recommendations", icon: Star },
    { name: "Company Dashboard", href: "/company", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold gradient-text">AI InternMatch</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Button
                  key={item.name}
                  asChild
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className="transition-all"
                >
                  <Link to={item.href} className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </Button>
              );
            })}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <Users className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="border-t bg-muted/50 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-primary" />
                <span className="font-bold gradient-text">AI InternMatch</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Smart internship matching powered by AI technology.
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold">For Students</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/student" className="hover:text-primary transition-colors">Create Profile</Link></li>
                <li><Link to="/internships" className="hover:text-primary transition-colors">Browse Internships</Link></li>
                <li><Link to="/recommendations" className="hover:text-primary transition-colors">Get Recommendations</Link></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold">For Companies</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/company" className="hover:text-primary transition-colors">Company Dashboard</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">Post Internships</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Find Candidates</a></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 AI InternMatch. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;