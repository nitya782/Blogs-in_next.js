"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';


const Blog9 = () => {
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
    const title = "Why This Checklist?";
    const text = "Choosing software that’s not just functional but future-ready is essential for scaling businesses. ";
    
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
        <meta property="og:title" content="Why This Checklist?" />
        <meta property="og:description" content="Choosing software that’s not just functional but future-ready is essential for scaling businesses. " />
        <meta property="og:image" content="https://blogs.compare-bazaar.com/images/blog2.webp" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Compare Bazaar" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>


      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className={`max-w-4xl mx-auto px-4 pt-10 pb-2 text-left animate-section transition-all duration-1000 ${isVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8">

{/* introduction */}

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
            
            <div className="prose prose-lg max-w-none text-gray-700">

              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <p className="font-bold text-lg text-[#0A3761] mb-3">
                A Practical Guide to Vetting Scalable, Secure Business Software
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
              </div>
            </div>
          </div>
        </div>


            <h1 className="text-3xl md:text-5xl font-bold text-[#0A3761] mb-6 leading-tight bg-gradient-to-r from-[#0A3761] to-blue-600 bg-clip-text text-transparent">
              📌 Why This Checklist?
            </h1>
            <div className="flex items-center text-gray-500 text-sm mb-6">
              <span>Published on June 9, 2025</span>
              <span className="mx-2">•</span>
              <span>5 min read</span>
            </div>
          </div>
          
          
           {/* <div className="bg-blue-50 border-l-4 border-[#0A3761] p-4 mb-8 rounded-r-lg hover:shadow-md transition-shadow duration-300">
            <p className="italic text-gray-700 text-lg">
              Future-proof your operations with smarter, connected decisions.
            </p>
          </div>  */}
          
          <p className="text-lg leading-relaxed text-gray-700 mt-4">
            Choosing software that’s not just functional but future-ready is essential for scaling businesses. Whether you are an SMB planning growth or an enterprise upgrading legacy tools, this checklist helps you confidently evaluate vendors based on real-world criteria—not just marketing claims.
          </p>
            <p className="text-2xl md:text-3xl font-bold mt-9 text-[#0A3761] mb-6 leading-tight bg-gradient-to-r from-[#0A3761] to-blue-600 bg-clip-text text-transparent">
               CORE ENTERPRISE-READY CRITERIA
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
        Security & Compliance
      </h2>
    </div>
    <div className="pl-14">
      <div className="grid md:grid-rows-2 gap-4 mb-6">

        {[
          "Role-Based Access Control (RBAC)",
          "Multi-Factor Authentication (MFA)",
          "Single Sign-On (SSO)",
          "Data encryption at rest and in transit",
          "Industry compliance (SOC 2, ISO 27001, GDPR, HIPAA)"
        ].map((item, index) => (
          <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 group flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 accent-[#0A3761] w-5 h-5 cursor-pointer"
              checked={false}
              readOnly
            />
            <h3 className="font-semibold text-[#0A3761] group-hover:text-blue-700 transition-colors">
              {item}
            </h3>
          </div>
        ))}

      </div>
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
        Scalability & Performance
      </h2>
    </div>
    <div className="pl-14">
      <div className="grid md:grid-rows-2 gap-4 mb-6">

        {[
           	 "Can support hundreds to thousands of users",
            "Load-tested or proven to handle peak traffic",
            "Cloud-native or hybrid infrastructure options",
            "Reliable uptime (ideally 99.9% SLA or higher)"
        ].map((item, index) => (
          <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 group flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 accent-[#0A3761] w-5 h-5 cursor-pointer"
              checked={false}
              readOnly
            />
            <h3 className="font-semibold text-[#0A3761] group-hover:text-blue-700 transition-colors">
              {item}
            </h3>
          </div>
        ))}

      </div>
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
        Integration Ecosystem
      </h2>
    </div>
    <div className="pl-14">
      <div className="grid md:grid-rows-2 gap-4 mb-6">

        {[
	 "API access for custom integrations",
	 "Native support for core business systems (CRM, ERP, HRIS)",
	 "Plug-and-play with communication, productivity, and analytics tools",
	 "Data import/export tools for easy migration"

        ].map((item, index) => (
          <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 group flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 accent-[#0A3761] w-5 h-5 cursor-pointer"
              checked={false}
              readOnly
            />
            <h3 className="font-semibold text-[#0A3761] group-hover:text-blue-700 transition-colors">
              {item}
            </h3>
          </div>
        ))}

      </div>
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
        Customization & Flexibility
      </h2>
    </div>
    <div className="pl-14">
      <div className="grid md:grid-rows-2 gap-4 mb-6">

        {[
	 "Configurable workflows and automation rules",
	 "Custom roles, permissions, and user settings",
	 "White-label or branding options (if applicable)",
	 "Low-code/no-code interface for non-technical teams"
        ].map((item, index) => (
          <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 group flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 accent-[#0A3761] w-5 h-5 cursor-pointer"
              checked={false}
              readOnly
            />
            <h3 className="font-semibold text-[#0A3761] group-hover:text-blue-700 transition-colors">
              {item}
            </h3>
          </div>
        ))}

      </div>
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
        Enterprise Support & SLAs
      </h2>
    </div>
    <div className="pl-14">
      <div className="grid md:grid-rows-2 gap-4 mb-6">

        {[
     "24/7 customer support",
	 "Dedicated account or success manager",
	"Clear onboarding, migration, and training support",
	 "Formal Service Level Agreement (SLA) with resolution times"
        ].map((item, index) => (
          <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 group flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 accent-[#0A3761] w-5 h-5 cursor-pointer"
              checked={false}
              readOnly
            />
            <h3 className="font-semibold text-[#0A3761] group-hover:text-blue-700 transition-colors">
              {item}
            </h3>
          </div>
        ))}

      </div>
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
        Pricing Transparency & Licensing
      </h2>
    </div>
    <div className="pl-14">
      <div className="grid md:grid-rows-2 gap-4 mb-6">

        {[
	 "Scalable pricing model (by users, usage, or tier)",
	 "No surprise add-on fees for key features",
	 "Clear contract terms and renewal process",
	 "Flexible licensing for scaling teams or regions"

        ].map((item, index) => (
          <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 group flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 accent-[#0A3761] w-5 h-5 cursor-pointer"
              checked={false}
              readOnly
            />
            <h3 className="font-semibold text-[#0A3761] group-hover:text-blue-700 transition-colors">
              {item}
            </h3>
          </div>
        ))}

      </div>
    </div>
  </div>
</div>



{/* step-8 */}

<div className={`max-w-4xl mx-auto px-4 py-8 animate-section transition-all duration-1000 delay-200 ${isVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
  <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
    <div className="flex items-start mb-6">
      <div className="bg-[#0A3761] text-white font-bold rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
        7
      </div>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
        Vendor Trust & Reputation
      </h2>
    </div>
    <div className="pl-14">
      <div className="grid md:grid-rows-2 gap-4 mb-6">

        {[
	 "Case studies with enterprise or mid-market customers",
	 "Verified reviews on G2, Capterra, or TrustRadius",
	 "Active product roadmap with regular updates",
	 "Financial stability and long-term vision"

        ].map((item, index) => (
          <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300 group flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 accent-[#0A3761] w-5 h-5 cursor-pointer"
              checked={false}
              readOnly
            />
            <h3 className="font-semibold text-[#0A3761] group-hover:text-blue-700 transition-colors">
              {item}
            </h3>
          </div>
        ))}

      </div>
    </div>
  </div>
</div>



{/* bottom-line */}

        <div className={`max-w-4xl mx-auto px-4 py-8 animate-section transition-all duration-1000 delay-200 ${isVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-start mb-6">
              <div className="bg-[white] text-white font-bold rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                🧩 
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                 Pro Tip:
              </h2>
            </div>
            <div className="pl-14">
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    <b>Always request a demo, pricing breakdown, and references</b> from similar-sized clients before signing with any vendor.
              </p>

            </div>
          </div>
        </div>

        {/* Bonus Section */}
        <div className={`max-w-4xl mx-auto px-4 py-8 animate-section transition-all duration-1000 delay-400 ${isVisible[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-[#0A3761] to-blue-700 p-6 md:p-8 rounded-xl text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              <span className="inline-block mr-2 animate-bounce">🎯  </span> Use This Checklist When:
            </h2>
               <p className="text-lg leading-relaxed mb-3 font-semibold">
                    •	Shortlisting software vendors<br></br>
                    •	Comparing demo options<br></br>
                    •	Presenting to stakeholders<br></br>
                    •	Preparing RFPs for procurement
              </p>
          </div>
        </div>



        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
            
            <div className="prose prose-lg max-w-none text-gray-700">

              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <p className="font-bold text-lg text-[#0A3761] mb-3">
                  Need Help Comparing Vendors Side-by-Side?
                </p>
                <p className=" text-lg text-[#0A3761] mb-3">
                  Let our experts do the heavy lifting.
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

       </div>
      
    </>
  );
};


export default Blog9;