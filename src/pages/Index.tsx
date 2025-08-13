import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Download, Mail, Github, Linkedin, ExternalLink, Sun, Moon, Code, Database, Cloud, Globe, Brain } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import ContactForm from '@/components/ContactForm';
import EmotionDetector from '@/components/EmotionDetector';

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showEmotionDemo, setShowEmotionDemo] = useState(false);
  const { toast } = useToast();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const skills = {
    languages: ['JavaScript', 'Python', 'Java', 'SQL'],
    frontend: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'],
    backend: ['Node.js', 'Express.js', 'Java (Spring Boot)'],
    databases: ['PostgreSQL', 'MongoDB', 'MySQL'],
    cloud: ['Google Cloud Platform', 'Compute Engine', 'BigQuery', 'Cloud Run', 'GitHub Actions'],
    tools: ['Git', 'Postman', 'VS Code', 'Eclipse', 'PyCharm']
  };

  const projects = [
    {
      id: 1,
      title: 'AI Emotion Detection System',
      description: 'Real-time emotion detection using computer vision and machine learning. Features live camera feed analysis, confidence scoring, and emotion history tracking with privacy-focused local processing.',
      tech: ['React', 'TypeScript', 'Computer Vision', 'WebRTC', 'Machine Learning'],
      category: 'ai',
      github: '#',
      demo: 'emotion-demo',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      hasDemo: true
    },
    {
      id: 2,
      title: 'SecureNote – Encrypted Note Sharing App',
      description: 'Built and deployed a secure MERN-based platform with self-destructing messages and email alerts. Configured CI/CD using GitHub + Vercel + GCP Cloud Run.',
      tech: ['MERN', 'Cloud Run', 'SendGrid', 'MongoDB Atlas'],
      category: 'full-stack',
      github: '#',
      demo: '#',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
      hasDemo: false
    },
    {
      id: 3,
      title: 'E-Commerce Store – Apricot',
      description: 'Created product catalogs, shopping cart, authentication. Deployed on AWS EC2 with public access and comprehensive logging system.',
      tech: ['Java', 'Spring Boot', 'PostgreSQL', 'AWS'],
      category: 'backend',
      github: '#',
      demo: '#',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      hasDemo: false
    },
    {
      id: 4,
      title: 'Smart Health Dashboard',
      description: 'Real-time request/response dashboard for emergency alerts. Integrated web sockets and user authentication for seamless communication.',
      tech: ['Node.js', 'Socket.IO', 'MongoDB'],
      category: 'full-stack',
      github: '#',
      demo: '#',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      hasDemo: false
    },
    {
      id: 5,
      title: 'Real-Time Leaderboard System',
      description: 'Tracked player scores with Redis sorted sets. Included dynamic leaderboard with top player highlights and real-time updates.',
      tech: ['Redis', 'Express.js', 'PostgreSQL'],
      category: 'backend',
      github: '#',
      demo: '#',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop',
      hasDemo: false
    }
  ];

  const filteredProjects = activeFilter === 'all' ? projects : projects.filter((project: any) => project.category === activeFilter);

  const handleDownloadResume = () => {
    toast({
      title: "Resume Download",
      description: "Resume download will be available soon!",
    });
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">AJ</div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex space-x-6">
                <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
                <a href="#skills" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Skills</a>
                <a href="#projects" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projects</a>
                <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
              </div>
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4" />
                <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
                <Moon className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl"></div>
              <div className="relative">
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                  Akhil Jonnalagadda
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4">
                  Full Stack Developer
                </p>
                <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-8 italic">
                  "Turning ideas into interactive, scalable, and secure digital experiences."
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button onClick={handleDownloadResume} className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Resume
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="#contact" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Get In Touch
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">About Me</h2>
          <div className="text-lg text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              I'm a passionate Full Stack Developer with a Master's degree in Computer Science and strong experience building scalable web applications and backend systems. My focus is on developing secure, cloud-deployable solutions with a user-first approach.
            </p>
            <p>
              With hands-on experience in GCP, Node.js, React, and PostgreSQL, I enjoy transforming complex problems into elegant solutions. I'm currently seeking opportunities to contribute to impactful projects in cloud or web ecosystems.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">Strong Foundation</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">System design and API development</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">Cloud Experience</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">GCP deployment and CI/CD</p>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">Always Learning</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Eager to learn and adapt</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-blue-600" />
                  Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.languages.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-green-600" />
                  Frontend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.frontend.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-purple-600" />
                  Backend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.backend.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-red-600" />
                  Databases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.databases.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-orange-600" />
                  Cloud/DevOps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.cloud.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-indigo-600" />
                  Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">Projects</h2>
          
          {/* Project Filter */}
          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={activeFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('all')}
                size="sm"
              >
                All
              </Button>
              <Button 
                variant={activeFilter === 'full-stack' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('full-stack')}
                size="sm"
              >
                Full Stack
              </Button>
              <Button 
                variant={activeFilter === 'backend' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('backend')}
                size="sm"
              >
                Backend
              </Button>
              <Button 
                variant={activeFilter === 'ai' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('ai')}
                size="sm"
              >
                <Brain className="w-4 h-4 mr-1" />
                AI/ML
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-all duration-300 group">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline">{tech}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.github} className="flex items-center gap-1">
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    </Button>
                    {project.hasDemo ? (
                      <Button 
                        size="sm" 
                        onClick={() => setShowEmotionDemo(true)}
                        className="flex items-center gap-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </Button>
                    ) : (
                      <Button size="sm" asChild>
                        <a href={project.demo} className="flex items-center gap-1">
                          <ExternalLink className="w-4 h-4" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Demo Modal */}
      {showEmotionDemo && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  AI Emotion Detection - Live Demo
                </h3>
                <Button 
                  variant="outline" 
                  onClick={() => setShowEmotionDemo(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </Button>
              </div>
              <EmotionDetector />
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  🎥 Demo Features:
                </h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Real-time emotion detection from webcam feed</li>
                  <li>• Machine learning confidence scoring</li>
                  <li>• Privacy-focused: All processing happens locally</li>
                  <li>• Emotion history tracking and visualization</li>
                  <li>• Built with React, TypeScript, and Computer Vision APIs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Experience Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">Experience</h2>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Phoenix Global, Hyderabad</CardTitle>
                <p className="text-blue-600 dark:text-blue-400 font-medium">Cloud Intern – Jan 2024 to Mar 2024</p>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Deployed e-commerce web application on AWS (IP: 13.233.164.183)</li>
                  <li>Managed public IP setup, cloud hosting, and monitoring</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Academic Projects</CardTitle>
                <p className="text-blue-600 dark:text-blue-400 font-medium">University of Massachusetts Lowell</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  Multiple GCP and Node.js based applications with real-time and encrypted functionality
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">Education</h2>
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Master of Science in Computer Science</CardTitle>
              <p className="text-blue-600 dark:text-blue-400 font-medium">University of Massachusetts Lowell</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">2023 – 2025 | GPA: 3.8/4.0</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">Contact Me</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <a href="mailto:akhiljonnalagadda851@gmail.com" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
                    akhiljonnalagadda851@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 text-blue-600">📞</span>
                  <span className="text-gray-700 dark:text-gray-300">+1 (774)-786-3206</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 text-blue-600">📍</span>
                  <span className="text-gray-700 dark:text-gray-300">Lowell, MA, USA</span>
                </div>
                <div className="flex gap-4">
                  <a href="https://linkedin.com/in/akhiljonnalagadda3" className="text-blue-600 hover:text-blue-800">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href="https://github.com/Akhil" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    <Github className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Akhil Jonnalagadda. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
