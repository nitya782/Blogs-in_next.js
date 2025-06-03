"use client";

import { useState, useEffect, useRef } from 'react';


export default function BlogLayout() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolling, setIsScrolling] = useState(false);
  const heroRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "e505fedc-14ad-49ed-834f-32cd23ad6136",
          email: email,
          subject: "New Blog Subscription",
          from_name: "Future Tech Insights Blog",
          botcheck: false
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setIsSubscribed(true);
        setEmail('');
      } else {
        setError(result.message || 'Subscription failed. Please try again.');
      }
    } catch (err) {
      console.error('Subscription error:', err);
      setError('Network error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      setIsScrolling(true);
      clearTimeout(window.scrollEndTimer);
      window.scrollEndTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "How Comparison Quotes, Reviews, and Articles Help a Tech Buyer’s Journey",
      date: "April, 2025",
      readTime: "5 min read",
      category: "MarTech",
      imageUrl: "https://blogs.compare-bazaar.com/images/blog1.jpg",
      slug: "/buyers-content-help",
      views: Math.floor(Math.random() * 500 + 100),
      likes: Math.floor(Math.random() * 200 + 50)
    },
    {
      id: 2,
      title: "Tech Buyer And Its Decision Making Journey.",
      date: "May 12, 2025",
      readTime: "7 min read",
      category: "DeFi",
      imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=300&fit=crop",
     slug: "/buyer-journey",
      views: Math.floor(Math.random() * 500 + 100),
      likes: Math.floor(Math.random() * 200 + 50)
    },
    {
      id: 3,
      title: "AI in HR & Payroll: How AI is reshaping HR & Payroll in 2025",
      date: "June 1, 2025",
      readTime: "5 min read",
      category: "Informative",
      imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=500&h=300&fit=crop",
      slug: "/AI-in-HR-Payroll",
      views: Math.floor(Math.random() * 500 + 100),
      likes: Math.floor(Math.random() * 200 + 50)
    },
        {
      id: 4,
      title: "VoIP vs. Traditional Phone: What’s Right for Your Business?",
      date: "June 2, 2025",
      readTime: "5 min read",
      category: "Informative",
      imageUrl: "https://pbxinthe.cloud/wp-content/uploads/2021/08/VoIP-phone-system-scaled.jpeg",
      slug: "/VoIP",
      views: Math.floor(Math.random() * 500 + 100),
      likes: Math.floor(Math.random() * 200 + 50)
    },
            {
      id: 5,
      title: "Top 5 Things to Look for in a Fleet Management System in 2025",
      date: "June 3, 2025",
      readTime: "5 min read",
      category: "Informative",
      imageUrl: "https://th.bing.com/th/id/OIP.hz30-amlv3X95J3WzWzoCQHaHQ?r=0&rs=1&pid=ImgDetMain",
      slug: "/fleet-management-system-2025",
      views: Math.floor(Math.random() * 500 + 100),
      likes: Math.floor(Math.random() * 200 + 50)
    },
            {
      id: 6,
      title: "Salesforce vs. HubSpot vs. Zoho: Which CRM Is Best for You?",
      date: "June 4, 2025",
      readTime: "5 min read",
      category: "Informative",
      imageUrl: "https://www.apexhours.com/wp-content/uploads/2024/01/Difference-between-Salesforce-vs.-HubSpot-vs.-Zoho.jpg",
      slug: "/salesforce-vs-hubspot-vs-zoho",
      views: Math.floor(Math.random() * 500 + 100),
      likes: Math.floor(Math.random() * 200 + 50)
    },
            {
      id: 7,
      title: "Is Your CRM GDPR-Compliant? What You Need to Know",
      date: "June 5, 2025",
      readTime: "5 min read",
      category: "Informative",
      imageUrl: "https://th.bing.com/th/id/OIP.zkMVHoOnG3wmiIZJs1GE5AAAAA?r=0&rs=1&pid=ImgDetMain",
      slug: "/crm-gdpr-compliance-guide",
      views: Math.floor(Math.random() * 500 + 100),
      likes: Math.floor(Math.random() * 200 + 50)
    },
   
  ];

  const categories = ['All', 'AI', 'MarTech', 'DeFi', 'NFTs', 'Metaverse', 'Security', 'Gaming'];
  
  const filteredPosts = activeCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  // Calculate mouse position relative to hero section
  const heroRect = heroRef.current?.getBoundingClientRect();
  const mouseX = heroRect ? (mousePosition.x - heroRect.left) / heroRect.width : 0;
  const mouseY = heroRect ? (mousePosition.y - heroRect.top) / heroRect.height : 0;

  return (
    <>

      <div className="min-h-screen bg-gray-50">
        {/* Enhanced Hero Section with Interactive Effects */}
        <div 
  ref={heroRef}
  className="relative py-16 lg:py-32 overflow-hidden bg-gradient-to-br from-[#000e54] via-[#1a237e] to-[#303f9f]"
  style={{
    '--mouse-x': mouseX,
    '--mouse-y': mouseY
  }}
>

          {/* Dynamic gradient that follows mouse */}
          <div className="absolute inset-0 overflow-hidden opacity-80">
            <div 
              className="absolute inset-0 bg-[radial-gradient(circle_at_calc(var(--mouse-x)*100%)_calc(var(--mouse-y)*100%),_var(--tw-gradient-stops))] from-[#000e54]/20 via-[#1a237e]/10 to-[#303f9f]/20 animate-pulse"
              style={{
                backgroundPosition: `calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%)`
              }}
            ></div>
          </div>
          
          {/* Floating particles with depth */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(80)].map((_, i) => {
              const size = Math.random() * 8 + 2;
              const depth = Math.random() * 0.5 + 0.5;
              return (
                <div
                  key={`particle-${i}`}
                  className="absolute rounded-full bg-white/10"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `float ${Math.random() * 15 + 5}s linear infinite`,
                    animationDelay: `${Math.random() * 5}s`,
                    opacity: Math.random() * 0.5 + 0.1,
                    transform: `translateY(${scrollPosition * (1 - depth)}px`,
                    zIndex: Math.floor(depth * 10)
                  }}
                />
              );
            })}
          </div>

          {/* Interactive tech icons */}
          <div className="absolute inset-0 overflow-hidden">
            {['🔗', '⚡', '🔮', '🌐', '💎', '🧠', '📊', '🔒', '🚀', '🖥️', '🔑', '💡'].map((icon, i) => {
              const depth = Math.random() * 0.7 + 0.3;
              return (
                <div
                  key={`icon-${i}`}
                  className="absolute text-2xl md:text-3xl opacity-20 hover:opacity-60 transition-all duration-500 cursor-pointer hover:text-[#64b5f6] interactive"
                  style={{
                    top: `${Math.random() * 80 + 10}%`,
                    left: `${Math.random() * 80 + 10}%`,
                    animation: `float ${Math.random() * 20 + 10}s linear infinite`,
                    animationDelay: `${Math.random() * 5}s`,
                    transform: `translateY(${scrollPosition * (1 - depth)}px) translateX(${mouseX * 10}px)`,
                    zIndex: Math.floor(depth * 10),
                    textShadow: hoveredCard === `icon-${i}` ? '0 0 15px rgba(100,181,246,0.7)' : 'none'
                  }}
                  onMouseEnter={() => setHoveredCard(`icon-${i}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {icon}
                  {hoveredCard === `icon-${i}` && (
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap backdrop-blur-sm border border-white/20 shadow-lg">
                      Tech Topic #{i+1}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
              {/* Left side - Main heading */}
              <div className="lg:w-2/3 text-center lg:text-left">
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold border border-white/30 shadow-lg animate-bounce hover:animate-none hover:scale-105 transition-transform hover:bg-white/30 interactive">
                    🚀 Web3 Insights Hub
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  <span className="inline-block bg-gradient-to-r from-[#64b5f6] via-[#42a5f5] to-[#90caf9] bg-clip-text text-transparent animate-gradient">
                    Future Tech
                  </span>{' '}
                  <span className="inline-block bg-gradient-to-r from-[#ff9a3c] via-[#ff8633] to-[#ff6f00] bg-clip-text text-transparent animate-gradient delay-100">
                    Insights
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-3xl">
                  Explore the cutting-edge world of Web3, blockchain, AI, and decentralized technologies through our comprehensive guides and expert analysis.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button 
                    onClick={() => document.getElementById('blog-section').scrollIntoView({ behavior: 'smooth' })}
                    className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#000e54] to-[#1a237e] text-white font-medium rounded-lg hover:from-[#1a237e] hover:to-[#303f9f] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group relative overflow-hidden interactive"
                  >
                    <span className="relative z-10">🔍 Explore Articles</span>
                    <svg className="w-5 h-5 group-hover:translate-y-0.5 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#1a237e] to-[#303f9f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                  <button className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#ff9a3c] to-[#ff6f00] text-white font-medium rounded-lg hover:from-[#ff8633] hover:to-[#ff9a3c] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group relative overflow-hidden interactive">
                    <span className="relative z-10">🌐 Join Community</span>
                    <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#ff8633] to-[#ff9a3c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                </div>
                
                {/* Stats with counter animation */}
                <div className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start">
                  <StatCounter endValue={500} label="Published Articles" duration={2} />
                  <StatCounter endValue={50000} label="Monthly Readers" duration={2.5} />
                  <StatCounter endValue={100} label="Industry Experts" duration={3} />
                </div>
              </div>

              {/* Right side - Subscription Form */}
              <div className="lg:w-1/3 w-full max-w-md">
                <div className="bg-gradient-to-br from-[#ff9a3c]/20 via-[#ff8633]/15 to-[#ff6f00]/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl relative overflow-hidden interactive">
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#ff8633]/30 rounded-full filter blur-xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-[#ff6f00]/30 rounded-full filter blur-xl"></div>
                  <div className="relative z-10">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#ff9a3c] to-[#ff6f00] rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">Subscribe to our monthly newsletter.</h3>
                    
                    </div>
                    
                    {isSubscribed ? (
                      <div className="text-center py-6">
                        <div className="w-16 h-16 mx-auto mb-4 bg-green-500/30 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-green-400/50 animate-bounce">
                          <svg className="w-8 h-8 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">🎉 Welcome!</h4>
                        <p className="text-white/90 mb-4">You're now part of our community. Check your email for confirmation.</p>
                        <button 
                          onClick={() => setIsSubscribed(false)} 
                          className="px-4 py-2 bg-gradient-to-r from-[#ff9a3c] to-[#ff6f00] text-white rounded-lg hover:from-[#ff8633] hover:to-[#ff9a3c] transition-all duration-300 border border-white/30 interactive"
                        >
                          Subscribe Another Email
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 rounded-lg border border-white/30 focus:border-white/60 focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-[#ff8633]/50 interactive"
                            required
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                        {error && (
                          <div className="text-red-300 text-sm flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {error}
                          </div>
                        )}
                        <button
                          type="submit"
                          disabled={isLoading}
                          className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 relative overflow-hidden ${
                            isLoading 
                              ? 'bg-gray-500/50 text-gray-300 cursor-not-allowed' 
                              : 'bg-gradient-to-r from-[#ff9a3c] to-[#ff6f00] text-white hover:from-[#ff8633] hover:to-[#ff9a3c] shadow-lg hover:shadow-xl'
                          } flex items-center justify-center gap-2 interactive`}
                        >
                          <span className="relative z-10">
                            {isLoading ? (
                              <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                Subscribing...
                              </>
                            ) : (
                              <>
                                <span>Signup</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </>
                            )}
                          </span>
                          <span className="absolute inset-0 bg-gradient-to-r from-[#ff8633] to-[#ff9a3c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </button>
                      </form>
                    )}
                    
                    <div className="mt-6 text-center">
                      <p className="text-xs text-white/70">
                        Join with us.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Blog Content */}
        <div id="blog-section" className="container mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              <span className="bg-gradient-to-r from-[#ff9a3c] via-[#ff8633] to-[#ff6f00] bg-clip-text text-transparent">
                Latest Web3 & Tech Insights
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover the future of technology through our expert analysis</p>
          </div>

          {/* Interactive Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button 
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-[#ff9a3c] to-[#ff6f00] text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                } flex items-center gap-2 hover:scale-105 interactive`}
              >
                {category === 'AI' && '🤖'}
                {category === 'MarTech' && '🔍'}
                {category === 'DeFi' && '💸'}
                {category === 'NFTs' && '🖼️'}
                {category === 'Metaverse' && '🌌'}
                {category === 'Security' && '🔒'}
                {category === 'Gaming' && '🎮'}
                {category}
              </button>
            ))}
          </div>

          {/* Enhanced Blog Grid with 3 cards fixed for all screen sizes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <BlogCard 
                key={post.id} 
                post={post} 
                index={index}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
                mouseX={mouseX}
                mouseY={mouseY}
              />
            ))}
          </div>

          {/* Enhanced Load More Section */}
          <div className="text-center mt-16">
            <button className="px-8 py-4 bg-gradient-to-r from-[#ff9a3c] to-[#ff6f00] text-white font-medium rounded-lg hover:from-[#ff8633] hover:to-[#ff9a3c] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mx-auto group relative overflow-hidden interactive">
              <span className="relative z-10">Load More Articles</span>
              <svg className="w-5 h-5 relative z-10 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span className="absolute inset-0 bg-gradient-to-r from-[#ff8633] to-[#ff9a3c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </div>
        </div>
      </div>
      
      
      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
        
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 6s ease infinite;
        }
        
        .animate-gradient.delay-100 {
          animation-delay: 0.1s;
        }
        
        .animate-gradient.delay-200 {
          animation-delay: 0.2s;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .card-hover-effect {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .card-hover-effect:hover {
          transform: translateY(-5px) rotate(1deg);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
      `}</style>
    </>
  );
}

function StatCounter({ endValue, label, duration = 2 }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const increment = endValue / (duration * 60); // 60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000/60); // 60fps
    
    return () => clearInterval(timer);
  }, [endValue, duration]);
  
  return (
    <div className="text-center transform hover:scale-105 transition-transform duration-300 interactive">
      <div className="text-3xl font-bold text-white mb-1">
        {count.toLocaleString()}+
      </div>
      <div className="text-sm text-white/80">{label}</div>
    </div>
  );
}

function BlogCard({ post, index, hoveredCard, setHoveredCard, mouseX, mouseY }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const cardRef = useRef(null);
  
  const handleLike = (e) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  // Calculate card position relative to viewport
  const cardRect = cardRef.current?.getBoundingClientRect();
  const cardCenterX = cardRect ? (cardRect.left + cardRect.width / 2) / window.innerWidth : 0;
  const cardCenterY = cardRect ? (cardRect.top + cardRect.height / 2) / window.innerHeight : 0;

  // Calculate distance from mouse to card center
  const distanceX = mouseX - cardCenterX;
  const distanceY = mouseY - cardCenterY;
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  // Only apply transform if mouse is within certain distance
  const shouldTransform = distance < 0.3;
  const transformX = shouldTransform ? distanceX * 20 : 0;
  const transformY = shouldTransform ? distanceY * 20 : 0;

  return (
    <a 
      href={post.slug} 
      className="block group interactive"
      onMouseEnter={() => {
        setIsHovered(true);
        setHoveredCard(`card-${post.id}`);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredCard(null);
      }}
    >
      <div 
        ref={cardRef}
        className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col card-hover-effect ${
          hoveredCard && hoveredCard !== `card-${post.id}` ? 'opacity-70' : 'opacity-100'
        }`}
        style={{
          transform: isHovered 
            ? `translateY(-8px) rotate(0.5deg) scale(1.02) translateX(${transformX}px) translateY(${transformY}px)` 
            : hoveredCard 
              ? `translateY(-2px) translateX(${transformX * 0.5}px) translateY(${transformY * 0.5}px)` 
              : `translateX(${transformX * 0.3}px) translateY(${transformY * 0.3}px)`,
          transitionDelay: `${index * 50}ms`,
          zIndex: isHovered ? 10 : 1,
          boxShadow: isHovered ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Enhanced Image with hover effect */}
        <div className="relative overflow-hidden h-48">
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-800 rounded-full shadow-sm flex items-center gap-1">
              {post.category === 'AI' && '🤖'}
              {post.category === 'MarTech' && '🔍'}
              {post.category === 'DeFi' && '💸'}
              {post.category === 'NFTs' && '🖼️'}
              {post.category === 'Metaverse' && '🌌'}
              {post.category === 'Security' && '🔒'}
              {post.category === 'Gaming' && '🎮'}
              {post.category}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-end">
            <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-[#ff9a3c] to-[#ff6f00] text-white text-xs font-semibold rounded-full shadow-md flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {post.views} views
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{post.date}</span>
            <span className="mx-1">•</span>
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{post.readTime}</span>
          </div>
          
          <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {post.title}
          </h3>
          
          {/* Footer with read more and actions */}
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="inline-flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors duration-200">
              Read More
              <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="flex space-x-1">
              <button 
                onClick={handleLike} 
                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors transform hover:scale-125"
                aria-label="Save to favorites"
              >
                <svg 
                  className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={isLiked ? 0 : 2} 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                  />
                </svg>
                <span className="sr-only">{likeCount} likes</span>
              </button>
              <button 
                onClick={(e) => e.preventDefault()} 
                className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors transform hover:scale-125"
                aria-label="Share article"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}