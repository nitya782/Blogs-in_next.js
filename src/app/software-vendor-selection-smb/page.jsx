"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';


const Blog10 = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(Array(5).fill(false));
  const [showSubscribe, setShowSubscribe] = useState(false);

  useEffect(() => {
    setCurrentUrl(window.location.href);
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index'));
            setIsVisible(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-section').forEach((section, index) => {
      section.setAttribute('data-index', index);
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const shareOnLinkedIn = () => {
    const title = "The AI Illusion: B2B Marketers Need Better Questions, Not More Hype";
    const summary = "Key insights on AI in B2B Marketing: 1) Bad Data = Bad AI - first-party data is critical, 2) Beware of AI-washing in vendor tools, 3) Targeting precision matters as budgets shrink.";
    const source = "Compare Bazaar";

    const shareUrl = new URL("https://www.linkedin.com/sharing/share-offsite/");
    shareUrl.searchParams.append("url", currentUrl);
    shareUrl.searchParams.append("title", title);
    shareUrl.searchParams.append("summary", summary);
    shareUrl.searchParams.append("source", source);

    const width = 600;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    window.open(
      shareUrl.toString(),
      'LinkedInShare',
      `width=${width},height=${height},top=${top},left=${left},toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no`
    );
  };

  const shareContent = async () => {
    const title = "How to Choose the Right Software Vendor for Your SMB";
    const text = "This guide will walk you through the key factors to consider before committing to a software vendor.";
    
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text,
          url: currentUrl,
        });
      } else {
        shareOnLinkedIn();
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleSubscribe = async () => {
    if (!email.trim()) return alert("Please enter a valid email!");

    setLoading(true);

    const formData = new FormData();
    formData.append("access_key", "4e9faa02-cb51-4253-98e6-b5794f4ece3a");
    formData.append("subject", "New Subscription");
    formData.append("from_name", "Subscription Form");
    formData.append("message", `New user subscribed: ${email}`);
    formData.append("reply_to", email);
    formData.append("redirect", "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubscribed(true);
        setTimeout(() => {
          setEmail("");
          setSubscribed(false);
        }, 3000);
      } else {
        alert("Failed to subscribe. Try again!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>

      <Head>
        <title>Tech Buyer And Its Decision Making Journey.</title>
        <meta property="og:title" content="How to Choose the Right Software Vendor for Your SMB" />
        <meta property="og:description" content="This guide will walk you through the key factors to consider before committing to a software vendor." />
        <meta property="og:image" content="https://blogs.compare-bazaar.com/images/blog2.webp" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Compare Bazaar" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <button
        className="fixed top-1/3 right-0 z-50 font-bold bg-orange-500 text-white px-4 py-5 rounded-l-lg shadow-lg hover:bg-orange-600 transition"
        onClick={() => setShowSubscribe(true)}
      >
        Subscribe Now
      </button>

      {/* Slide-out Subscribe Form */}
      <div
        className={`fixed top-25 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          showSubscribe ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-bold text-orange-600">Subscribe</h3> 

          <button
            className="text-gray-500 hover:text-orange-600 text-2xl"
            onClick={() => setShowSubscribe(false)}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div className="px-4 pt-6 pb-2">
          <h3 className="text-2xl font-bold text-center text-[#0A3761] mb-2 bg-gradient-to-r from-[#0A3761] to-blue-600 bg-clip-text text-transparent">
            Stay Updated
          </h3>
          <p className="text-gray-600 text-center mb-4">
            Subscribe to the very latest B2B lead gen updates — only the best bits, none of the fluff!
          </p>
        </div>

        <form
          className="p-4 space-y-4"
          onSubmit={e => {
            e.preventDefault();
            handleSubscribe();      
         }}
        >
        <div>
          <label htmlFor="slideout-email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address*
          </label>
          <input
            className="w-full border rounded border-gray-300 px-3 py-2"
            placeholder="Email Address"
            type="email"
            id="slideout-email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
          >
            {loading ? "Subscribing..." : subscribed ? "Subscribed!" : "Subscribe"}
          </button>
          {subscribed && (
            <p className="text-green-600 text-sm text-center">Thank you for subscribing!</p>
          )}
          <p className="text-xs text-gray-500 text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </div>



      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className={`max-w-4xl mx-auto px-4 pt-10 pb-2 text-left animate-section transition-all duration-1000 ${isVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-[#0A3761] bg-blue-100 rounded-full mb-4 animate-pulse">
              B2B Tech Buying Guide
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-[#0A3761] mb-6 leading-tight bg-gradient-to-r from-[#0A3761] to-blue-600 bg-clip-text text-transparent">
              How to Choose the Right Software Vendor for Your SMB
            </h1>
            <div className="flex items-center text-gray-500 text-sm mb-6">
              <span>Published on June 9, 2025</span>
              <span className="mx-2">•</span>
              <span>5 min read</span>
            </div>
          </div>
          
          <div className="relative group">
            <img
              src="/images/blog1.jpg"
              alt="Tech buyer's journey"
              className="mx-auto rounded-xl shadow-xl mb-8 w-full max-w-5xl aspect-[13/7] object-cover transform transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          
            <div className="bg-blue-50 border-l-4 border-[#0A3761] p-4 mb-8 rounded-r-lg hover:shadow-md transition-shadow duration-300">
            <p className="italic text-gray-700 text-lg">
              A Simple Guide to Smarter Business Decisions<br></br>
              By <a href="https://www.compare-bazaar.com"><b>Compare-Bazaar.com</b></a>
            </p>
          </div>  
          
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
           When you run a small or mid-sized business, every decision matters—especially the ones that impact your operations, your team, and your bottom line. Choosing the <b>right software</b> vendor isn’t just a tech decision. It’s a <b>strategic partnership</b> that can either empower your growth or create costly friction.
          </p>
          <p className="text-lg leading-relaxed text-gray-700 mt-4">
            With so many options out there, how do you cut through the noise and find a solution that fits your unique needs?
          </p>
          <p className="text-lg leading-relaxed text-gray-700 mt-4">
            At Compare-Bazaar, we help SMBs make informed, confident buying decisions. This guide will walk you through the <b>key factors to consider</b> before committing to a software vendor.
          </p>
        </div>


        {/* Step 2 */}
        <div className={`max-w-4xl mx-auto px-4 py-8 animate-section transition-all duration-1000 delay-200 ${isVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-start mb-6">
              <div className="bg-[#0A3761] text-white font-bold rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                1
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                 Know What Problem You’re Solving
              </h2>
            </div>
            <div className="pl-14">
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Before comparing flashy features or pricing, clarify your core needs.<br></br>
                Ask yourself:
              </p>
              <div className="grid md:grid-rows-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 group">
                  <h3 className="font-semibold text-[#0A3761] mb-2 flex items-center group-hover:text-blue-700 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm4 0h2v2h-2V5zm-4 4h2v2H7V9zm4 0h2v2h-2V9z" clipRule="evenodd" />
                    </svg>
                    What specific business challenge are we trying to solve?
                  </h3>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 group">
                  <h3 className="font-semibold text-[#0A3761] mb-2 flex items-center group-hover:text-blue-700 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                     Is this a nice-to-have or a must-have?
                  </h3>
                  <p className="text-gray-600"></p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 group">
                  <h3 className="font-semibold text-[#0A3761] mb-2 flex items-center group-hover:text-blue-700 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    Who on our team will use this tool—and how?
                  </h3>
                  <p className="text-gray-600"></p>
                </div>
                </div>
              
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                Understanding your use case helps avoid overspending on complex platforms when a simple, targeted solution would do the job.
              </p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className={`max-w-4xl mx-auto px-4 py-8 animate-section transition-all duration-1000 delay-200 ${isVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-start mb-6">
              <div className="bg-[#0A3761] text-white font-bold rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                2
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                 Set a Realistic Budget
              </h2>
            </div>
            <div className="pl-14">
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                 SMBs often overestimate what they need and underestimate hidden costs. <br></br>Consider:
              </p>
              <div className="grid md:grid-rows-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 group">
                  <h3 className="font-semibold text-[#0A3761] mb-2 flex items-center group-hover:text-blue-700 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm4 0h2v2h-2V5zm-4 4h2v2H7V9zm4 0h2v2h-2V9z" clipRule="evenodd" />
                    </svg>
                    Licensing fees (monthly or annual)
                  </h3>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 group">
                  <h3 className="font-semibold text-[#0A3761] mb-2 flex items-center group-hover:text-blue-700 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Setup, onboarding, or migration costs
                  </h3>
                  <p className="text-gray-600"></p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 group">
                  <h3 className="font-semibold text-[#0A3761] mb-2 flex items-center group-hover:text-blue-700 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    Add-ons or integrations you’ll likely need
                  </h3>
                  <p className="text-gray-600"></p>
                </div>

              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed">
               👉 Tip: <b>Always ask vendors for total cost of ownership (TCO)</b> over 1–3 years, not just the monthly sticker price.
              </p>
            </div>
          </div>
        </div>

{/* step-4 */}
        <div className={`max-w-4xl mx-auto px-4 py-8 animate-section transition-all duration-1000 delay-200 ${isVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-start mb-6">
              <div className="bg-[#0A3761] text-white font-bold rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                3
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                 Check Integration Capabilities
              </h2>
            </div>
            <div className="pl-14">
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    No tool works in isolation. Make sure the vendor supports:
              </p>
              <div className="grid md:grid-rows-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 group">
                  <h3 className="font-semibold text-[#0A3761] mb-2 flex items-center group-hover:text-blue-700 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm4 0h2v2h-2V5zm-4 4h2v2H7V9zm4 0h2v2h-2V9z" clipRule="evenodd" />
                    </svg>
                    APIs or native integrations with your existing systems (CRM, accounting, HR)
                  </h3>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 group">
                  <h3 className="font-semibold text-[#0A3761] mb-2 flex items-center group-hover:text-blue-700 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                     Popular tools your team already uses (Google Workspace, Slack, QuickBooks, etc.)
                  </h3>
                  <p className="text-gray-600"></p>
                </div>

              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed">
                A vendor that plays nicely with your stack helps reduce manual work and increases productivity.
              </p>
            </div>
          </div>
        </div>

{/* step-5 */}

        <div className={`max-w-4xl mx-auto px-4 py-8 animate-section transition-all duration-1000 delay-200 ${isVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-start mb-6">
              <div className="bg-[#0A3761] text-white font-bold rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                4
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                 Evaluate Vendor Support and Reliability
              </h2>
            </div>
            <div className="pl-14">
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                This is not the time to gamble on a new, untested provider.<br></br><br></br>
                Look for vendors that offer:

              </p>
              <div className="grid md:grid-rows-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 group">
                  <h3 className="font-semibold text-[#0A3761] mb-2 flex items-center group-hover:text-blue-700 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm4 0h2v2h-2V5zm-4 4h2v2H7V9zm4 0h2v2h-2V9z" clipRule="evenodd" />
                    </svg>
                    Clear SLAs (Service Level Agreements)
                  </h3>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 group">
                  <h3 className="font-semibold text-[#0A3761] mb-2 flex items-center group-hover:text-blue-700 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                     24/7 or regionally-aligned support
                  </h3>
                  <p className="text-gray-600"></p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 group">
                  <h3 className="font-semibold text-[#0A3761] mb-2 flex items-center group-hover:text-blue-700 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    Onboarding assistance and training
                  </h3>
                  <p className="text-gray-600"></p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 group">
                  <h3 className="font-semibold text-[#0A3761] mb-2 flex items-center group-hover:text-blue-700 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    Strong online reviews and case studies
                  </h3>
                  <p className="text-gray-600"></p>
                </div>

              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed">
                💡 Pro Tip: Search for “vendor name + downtime,” “support experience,” or “long-term reliability” in forums and review sites.
              </p>
            </div>
          </div>
        </div>

{/* step-6 */}
        <div className={`max-w-4xl mx-auto px-4 py-8 animate-section transition-all duration-1000 delay-200 ${isVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-start mb-6">
              <div className="bg-[#0A3761] text-white font-bold rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                5
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Ask the Right Questions During Demos
              </h2>
            </div>
            <div className="pl-14">
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Don’t be dazzled by the sales pitch. Use your demo time wisely.<br></br><br></br>
                Ask questions like:

              </p>
              <div className="grid md:grid-rows-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 group">
                  <h3 className="font-semibold text-[#0A3761] mb-2 flex items-center group-hover:text-blue-700 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm4 0h2v2h-2V5zm-4 4h2v2H7V9zm4 0h2v2h-2V9z" clipRule="evenodd" />
                    </svg>
                    How customizable is your platform for SMBs?
                  </h3>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 group">
                  <h3 className="font-semibold text-[#0A3761] mb-2 flex items-center group-hover:text-blue-700 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                     What does your onboarding process look like?
                  </h3>
                  <p className="text-gray-600"></p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 group">
                  <h3 className="font-semibold text-[#0A3761] mb-2 flex items-center group-hover:text-blue-700 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    What are the most common reasons SMBs switch away from your solution?
                  </h3>
                  <p className="text-gray-600"></p>
                </div>

              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed">
                Let the answers guide your decision—not just a slick UI or low upfront price.
              </p>
            </div>
          </div>
        </div>

{/* step-7 */}

        <div className={`max-w-4xl mx-auto px-4 py-8 animate-section transition-all duration-1000 delay-200 ${isVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-start mb-6">
              <div className="bg-[#0A3761] text-white font-bold rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                6
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                 Prioritize Long-Term Partnership, Not Just Features
              </h2>
            </div>
            <div className="pl-14">
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    The best vendors treat you like a partner—not a number. Look for:
              </p>
              <div className="grid md:grid-rows-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 group">
                  <h3 className="font-semibold text-[#0A3761] mb-2 flex items-center group-hover:text-blue-700 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm4 0h2v2h-2V5zm-4 4h2v2H7V9zm4 0h2v2h-2V9z" clipRule="evenodd" />
                    </svg>
                    Transparent pricing and contracts
                  </h3>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 group">
                  <h3 className="font-semibold text-[#0A3761] mb-2 flex items-center group-hover:text-blue-700 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                     Responsive support channels
                  </h3>
                  <p className="text-gray-600"></p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 group">
                  <h3 className="font-semibold text-[#0A3761] mb-2 flex items-center group-hover:text-blue-700 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    Regular product updates
                  </h3>
                  <p className="text-gray-600"></p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 group">
                  <h3 className="font-semibold text-[#0A3761] mb-2 flex items-center group-hover:text-blue-700 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    Willingness to grow with your business
                  </h3>
                  <p className="text-gray-600"></p>
                </div>

              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed">
                If you’re a small team today, you want a vendor that can scale with you tomorrow.
              </p>
            </div>
          </div>
        </div>



        {/* Bonus Section */}
        <div className={`max-w-4xl mx-auto px-4 py-8 animate-section transition-all duration-1000 delay-400 ${isVisible[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-[#0A3761] to-blue-700 p-6 md:p-8 rounded-xl text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              <span className="inline-block mr-2 animate-bounce">🔧</span> Need Help Comparing Vendors? That’s What We Do.
            </h2>
               <p className="text-lg leading-relaxed mb-3 font-semibold">
                 At <b>Compare-Bazaar,</b> we make vendor selection easier, faster, and smarter.<br></br> Whether you are evaluating CRM tools, UCaaS platforms, or accounting software, we offer:<br></br><br></br>
                    •	Side-by-side comparisons of top vendors<br></br>
                    •	Real user reviews<br></br>
                    •	Pre-vetted solutions for SMBs
               
              </p>
          </div>
        </div>



        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
            
            <div className="prose prose-lg max-w-none text-gray-700">

              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <p className="font-bold text-lg text-[#0A3761] mb-3">
                  👉 Don’t just buy. Compare. 
                </p>
                <p className="mb-4">
                  Visit <a href="https://compare-bazaar.com" className="text-blue-600 hover:underline font-medium">Compare-Bazaar.com</a> or reach us at:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center hover:text-[#0A3761] transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>marketing@compare-bazaar.com</span>
                  </li>
                  <li className="flex items-center hover:text-[#0A3761] transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>+1 332-231-0404</span>
                  </li>
                </ul>
                <p className="mt-4 italic text-gray-600">
                  Where smart choices start.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Subscribe Card */}
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500">
            <h3 className="text-2xl font-bold text-center text-[#0A3761] mb-2 bg-gradient-to-r from-[#0A3761] to-blue-600 bg-clip-text text-transparent"> 
              Stay Updated
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Subscribe to the very latest B2B lead gen updates — only the best bits, none of the fluff!
            </p>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A3761] focus:border-[#0A3761] transition hover:border-gray-400"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className={`w-full ${
                  subscribed ? 'bg-green-600' : 'bg-gradient-to-r from-[#ff8633] to-orange-500 hover:from-[#e6732b] hover:to-orange-600'
                } text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.02] mt-2 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </>
                ) : subscribed ? (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Subscribed!
                  </>
                ) : (
                  "Subscribe Now"
                )}
              </button>
              
              <p className="text-xs text-gray-500 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Share Section */}
       <div className="max-w-4xl mx-auto px-4 py-8">
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
    <p className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      Share this article
    </p>
    
    <div className="flex flex-wrap gap-3">
      {/* LinkedIn Button */}
      <button
        onClick={shareOnLinkedIn}
        className="flex items-center px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:bg-[#0A55A0] transition-all duration-300 shadow hover:shadow-md"
      >
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        LinkedIn
      </button>
      
      {/* Instagram Button */}
      <button
        onClick={shareContent}
        className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-all duration-300 shadow hover:shadow-md"
      >
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
        Instagram
      </button>
      
    
      
      {/* Copy Link Button */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(currentUrl);
          alert("Link copied to clipboard!");
        }}
        className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow hover:shadow-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
        Copy Link
      </button>
    </div>
  </div>
</div>
      </div>
      
    </>
  );
};
export default Blog10;