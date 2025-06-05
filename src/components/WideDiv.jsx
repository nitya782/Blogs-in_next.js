"use client";
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
// import image from '../images/ICON2.png'; // Adjust the path to your image

const WideDiv = () => {
  return (
    <div className="bg-white text-gray-800 py-20 font-sans">
      <div className="max-w-7xl mx-auto custom-padding-margin"> {/* Increased max-width from 6xl to 7xl */}
        {/* Grid Layout for Sections */}
        <div className="grid px-10 grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5 lg:px-4 custom-padding3 custom-padding-medium">
          {/* Compare Section */}
          <div className="mb-4 -mt-9 lg:pr-3">
            <div className="flex items-center">
              <div className="flex items-center -ml-3 object-contain transition-transform hover:scale-105"> 
                <img src= "/logo.png" alt="Description" className="w-20 h-15 rounded-lg" />
                <img 
                  src="/images/icon1new.png" 
                  alt="Logo" 
                  className="h-30 w-50 object-contain transition-transform hover:scale-105" 
                />
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-2 -mt-6">
              Our mission is to help you take your team, your business, and your career to the next level.
            </p>
            <p className="text-sm text-gray-700">
              Whether you're here for product recommendations, research, or career advice, we're happy you're here!
            </p>
          </div>

          {/* What We Cover Section - Adjusted spacing */}
          <div className="mb-6 lg:pl-6 custom-space">
            <h2 className="text-base font-semibold mb-7 font-serif text-[#ff8633]">What We Cover</h2>
            <ul className="list-none p-0">
             
              <li className="mb-2 text-sm"><a href="https://www.compare-bazaar.com/StartABusiness" className="text-gray-700 no-underline transition-all duration-200 hover:text-[#ff8633] hover:font-semibold"> Start a Business</a></li>
              <li className="mb-2 text-sm"><a href="https://www.compare-bazaar.com/HumanResources" className="text-gray-700 no-underline transition-all duration-200 hover:text-[#ff8633] hover:font-semibold">Human Resources</a></li>
              <li className="mb-2 text-sm"><a href="https://www.compare-bazaar.com/Marketing" className="text-gray-700 no-underline transition-all duration-200 hover:text-[#ff8633] hover:font-semibold">Marketing</a></li>
              <li className="mb-2 text-sm"><a href="https://www.compare-bazaar.com/Technology" className="text-gray-700 no-underline transition-all duration-200 hover:text-[#ff8633] hover:font-semibold">Technology</a></li>
              <li className="mb-2 text-sm"><a href="https://www.compare-bazaar.com/BusinessPlanning" className="text-gray-700 no-underline transition-all duration-200 hover:text-[#ff8633] hover:font-semibold">Business Planning</a></li>
            </ul>
          </div>

          {/* Our Company Section - Adjusted spacing */}
          <div className="mb-6 lg:pl-2">
            <h2 className="text-base font-semibold mb-7 font-serif text-[#ff8633]">Our Company</h2>
            <ul className="list-none p-0">
              <li className="mb-2 text-sm"><a href="https://www.compare-bazaar.com/About%20Us" className="text-gray-700 no-underline transition-all duration-200 hover:text-[#ff8633] hover:font-semibold">About Us</a></li>
              <li className="mb-2 text-sm"><a href="https://www.compare-bazaar.com/Careers" className="text-gray-700 no-underline transition-all duration-200 hover:text-[#ff8633] hover:font-semibold">Careers</a></li>
              {/* <li className="mb-2 text-sm"><a href="/Advertise" className="text-gray-700 no-underline transition-all duration-200 hover:text-[#ff8633] hover:font-semibold">Advertise With Us</a></li> */}
              {/* <li className="mb-2 text-sm"><a href="/EditorialProcess" className="text-gray-700 no-underline transition-all duration-200 hover:text-[#ff8633] hover:font-semibold">Editorial Process</a></li> */}
            </ul>
          </div>

          {/* Legal Section - Adjusted spacing */}
          <div className="mb-6 lg:pl-2">
            <h2 className="text-base font-semibold mb-7 font-serif text-[#ff8633]">Legal</h2>
            <ul className="list-none p-0">
              <li className="mb-2 text-sm"><a href="https://www.compare-bazaar.com/PrivacyPolicy" className="text-gray-700 no-underline transition-all duration-200 hover:text-[#ff8633] hover:font-semibold">Privacy Policy</a></li>
              <li className="mb-2 text-sm"><a href="https://www.compare-bazaar.com/DonotSellMyInfo" className="text-gray-700 no-underline transition-all duration-200 hover:text-[#ff8633] hover:font-semibold">Do Not Sell/Share My Personal Information</a></li>
              <li className="mb-2 text-sm"><a href="https://www.compare-bazaar.com/LimitTheUse" className="text-gray-700 no-underline transition-all duration-200 hover:text-[#ff8633] hover:font-semibold">Limit the Use of My Sensitive Personal Information</a></li>
              <li className="mb-2 text-sm"><a href="https://www.compare-bazaar.com/TermsOfUse" className="text-gray-700 no-underline transition-all duration-200 hover:text-[#ff8633] hover:font-semibold">Terms of Use</a></li>
              <li className="mb-2 text-sm"><a href="https://www.compare-bazaar.com/Accessibility" className="text-gray-700 no-underline transition-all duration-200 hover:text-[#ff8633] hover:font-semibold">Accessibility</a></li>
              <li className="mb-2 text-sm"><a href="https://www.compare-bazaar.com/CopyrightPolicy" className="text-gray-700 no-underline transition-all duration-200 hover:text-[#ff8633] hover:font-semibold">Copyright Policy</a></li>
              <li className="mb-2 text-sm"><a href="https://www.compare-bazaar.com/AdvertisingDisclosure" className="text-gray-700 no-underline transition-all duration-200 hover:text-[#ff8633] hover:font-semibold">Advertising Disclosure</a></li>
            </ul>
          </div>

          {/* Social Section - Adjusted spacing */}
          <div className="lg:pl-2">
            <h2 className="text-base font-semibold mb-6 font-serif text-[#ff8633]">Social</h2>
            <ul className="list-none p-0">
              <li className="mb-2 text-sm">
                <a href="#" className="text-gray-700 no-underline flex items-center group">
                  <div className="w-8 h-8 bg-gray-200 flex items-center justify-center mr-3 rounded transition-colors duration-200 group-hover:bg-[#ff8633]">
                    <FontAwesomeIcon icon={faFacebook} className="text-gray-600 transition-colors duration-200 group-hover:text-white" />
                  </div>
                  <span className="transition-all duration-200 group-hover:text-[#ff8633] group-hover:font-semibold">Facebook</span>
                </a>
              </li>
              <li className="mb-2 text-sm">
                <a href="#" className="text-gray-700 no-underline flex items-center group">
                  <div className="w-8 h-8 bg-gray-200 flex items-center justify-center mr-3 rounded transition-colors duration-200 group-hover:bg-[#ff8633]">
                    <FontAwesomeIcon icon={faInstagram} className="text-gray-600 transition-colors duration-200 group-hover:text-white" />
                  </div>
                  <span className="transition-all duration-200 group-hover:text-[#ff8633] group-hover:font-semibold">Instagram</span>
                </a>
              </li>
              <li className="mb-2 text-sm">
                <a href="#" className="text-gray-700 no-underline flex items-center group">
                  <div className="w-8 h-8 bg-gray-200 flex items-center justify-center mr-3 rounded transition-colors duration-200 group-hover:bg-[#ff8633]">
                    <FontAwesomeIcon icon={faLinkedin} className="text-gray-600 transition-colors duration-200 group-hover:text-white" />
                  </div>
                  <span className="transition-all duration-200 group-hover:text-[#ff8633] group-hover:font-semibold">LinkedIn</span>
                </a>
              </li>
              {/* <li className="mb-2 text-sm">
                <a href="#" className="text-gray-700 no-underline flex items-center group">
                  <div className="w-8 h-8 bg-gray-200 flex items-center justify-center mr-3 rounded transition-colors duration-200 group-hover:bg-[#ff8633]">
                    <FontAwesomeIcon icon={faTwitter} className="text-gray-600 transition-colors duration-200 group-hover:text-white" />
                  </div>
                  <span className="transition-all duration-200 group-hover:text-[#ff8633] group-hover:font-semibold">X</span>
                </a>
              </li> */}
              {/* <li className="mb-2 text-sm">
                <a href="#" className="text-gray-700 no-underline flex items-center group">
                  <div className="w-8 h-8 bg-gray-200 flex items-center justify-center mr-3 rounded transition-colors duration-200 group-hover:bg-[#ff8633]">
                    <FontAwesomeIcon icon={faYoutube} className="text-gray-600 transition-colors duration-200 group-hover:text-white" />
                  </div>
                  <span className="transition-all duration-200 group-hover:text-[#ff8633] group-hover:font-semibold">YouTube</span>
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
      {/* Responsive styles with adjusted spacing */}
      <style jsx>{`
        @media (min-width: 1022px) and (max-width: 1200px) {
          .custom-padding3 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
        
        @media (min-width: 1024px) and (max-width: 1330px) {
          .custom-padding-medium {
            padding-left: 2.5rem !important;
            padding-right: 2.5rem !important;
          }
          .custom-space{
            margin-left: 2rem;
          }
        }
        @media (min-width: 1280px) and (max-width: 1330px) {
          .custom-padding-margin{
            margin-left: 0px;
            margin-right: 0px;
          }
        }
      `}</style>
   
    </div>
  );
};

export default WideDiv;