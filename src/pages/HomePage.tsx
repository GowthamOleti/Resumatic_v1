import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Zap, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  LayoutTemplate,
  ArrowRight,
  Star
} from 'lucide-react';

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden transition-colors duration-300">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }} />
      {/* Navigation */}
      <nav className={`border-b border-white/20 bg-white/70 backdrop-blur-md fixed top-0 left-0 right-0 z-50 shadow-lg shadow-black/5 transition-all duration-300 ${
        isScrolled ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <img 
                src="https://static.wixstatic.com/media/5c0589_e30e6ff390554063b3ccb163b93366aa~mv2.png" 
                alt="Resumatic" 
                className="h-8 sm:h-10 w-auto"
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to="/builder">
                <Button size="sm" className="gap-1.5 sm:gap-2 h-9 sm:h-10 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30">
                  Get Started <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 relative">
          <div className="text-center max-w-5xl mx-auto">
            {/* Logo */}
            <div className="mb-6 sm:mb-8 flex flex-col items-center">
              <img 
                src="https://static.wixstatic.com/media/5c0589_e30e6ff390554063b3ccb163b93366aa~mv2.png" 
                alt="Resumatic Logo" 
                className="h-32 sm:h-40 md:h-48 lg:h-56 w-auto animate-float-logo"
              />
              <img 
                src="https://static.wixstatic.com/media/5c0589_473db15555bf4a269b856527b650e913~mv2.png" 
                alt="Shadow" 
                className="w-32 sm:w-40 md:w-48 lg:w-56 h-auto -mt-2 sm:-mt-3 opacity-60 animate-float-shadow"
              />
            </div>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm mb-6 sm:mb-8 animate-fade-in animation-delay-200">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Free Professional Resume Builder</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 sm:mb-8 animate-fade-in-up animation-delay-400 px-4">
              <span className="text-gray-900">Build Your Perfect</span>
              <br />
              <span className="text-gray-900">Resume in </span>
              <span className="relative inline-block">
                <span className="text-blue-600">Minutes</span>
                <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10C60 2, 140 2, 198 10" stroke="rgb(37, 99, 235)" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-12 leading-relaxed animate-fade-in-up animation-delay-600 px-4 max-w-3xl mx-auto font-light">
              Create professional, ATS-friendly resumes with our intuitive builder. 
              Choose from premium templates and land your dream job faster.
            </p>
            
            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in animation-delay-600 mb-12 sm:mb-16">
              <Link to="/builder">
                <Button size="lg" className="gap-2 text-lg h-14 px-10 bg-blue-600 hover:bg-blue-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                  Start Building for Free <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          
            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto animate-fade-in animation-delay-600 px-4">
              <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/40 backdrop-blur-sm border border-green-100 hover:border-green-200 transition-all">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-center">
                  <h3 className="font-medium text-gray-900 mb-1">Completely Free</h3>
                  <p className="text-xs text-gray-500">No payment, no credit card</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/40 backdrop-blur-sm border border-blue-100 hover:border-blue-200 transition-all">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <Download className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-center">
                  <h3 className="font-medium text-gray-900 mb-1">Unlimited Downloads</h3>
                  <p className="text-xs text-gray-500">Download as many times as you want</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/40 backdrop-blur-sm border border-purple-100 hover:border-purple-200 transition-all">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-center">
                  <h3 className="font-medium text-gray-900 mb-1">No Account Needed</h3>
                  <p className="text-xs text-gray-500">Start building instantly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 relative">
        <div className="text-center mb-12 sm:mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            Features
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 text-gray-900">Everything You Need to Succeed</h2>
          <p className="text-base sm:text-xl text-gray-600 px-4 max-w-2xl mx-auto">
            Powerful features designed to help you create the perfect resume and land your dream job
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card className="border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                <LayoutTemplate className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl text-blue-600">Premium Templates</CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Choose from professionally designed templates that make you stand out
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-purple-50/30 backdrop-blur-sm">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl text-purple-600">ATS Scanner</CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Real-time ATS score to ensure your resume passes automated screening
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-green-50/30 backdrop-blur-sm">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 shadow-lg shadow-green-500/30">
                <Download className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl text-green-600">PDF Export</CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Download your resume as a high-quality PDF ready to send to employers
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-pink-50/30 backdrop-blur-sm">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mb-4 shadow-lg shadow-pink-500/30">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl text-pink-600">Live Preview</CardTitle>
              <CardDescription className="text-sm text-gray-600">
                See your changes in real-time with our instant preview feature
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-orange-50/30 backdrop-blur-sm">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl text-orange-600">Easy to Use</CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Simple interface that makes resume building fast and enjoyable
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-indigo-50/30 backdrop-blur-sm">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/30">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl text-indigo-600">100% Free</CardTitle>
              <CardDescription className="text-sm text-gray-600">
                All features available at no cost. No hidden fees, no subscriptions
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700"></div>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 text-white">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-8 sm:mb-12 px-4 max-w-2xl mx-auto font-light">
              Join thousands of successful job seekers who've created winning resumes with Resumatic
            </p>
            <Link to="/builder">
              <Button size="lg" className="gap-2 text-lg h-14 px-10 bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                Start Building for Free <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <p className="mt-6 text-sm text-blue-200">No credit card required • 100% Free Forever</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <img 
                src="https://static.wixstatic.com/media/5c0589_e30e6ff390554063b3ccb163b93366aa~mv2.png" 
                alt="Resumatic" 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-xs sm:text-sm text-gray-600 text-center">
              © 2025 Resumatic. Built with ❤️ for job seekers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

