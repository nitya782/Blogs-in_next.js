"use client";
import React from 'react';
import '../styles/Dropdown.css';
import Link from 'next/link';


const Dropdown = ({ activeDropdown, isMobile, setActiveDropdown, activeNavItem }) => {
  const allSectionsContent = [
    {
      id: 'marketing',
      title: "Marketing",
      items: [
        { name: "Best CRM Software", link: "https://www.compare-bazaar.com/BestCRMSoftware" },
        { name: "Best Email Marketing Services", link: "https://www.compare-bazaar.com/EmailMarketing" },
        { name: "Best Website Building Platforms", link: "https://www.compare-bazaar.com/BestWebsiteBuildingPlatform" }
      ]
    },
    {
      id: 'technology',
      title: "Technology",
      items: [
        { name: "Business Phone Systems", link: "https://www.compare-bazaar.com/phone-systems" },
        { name: "GPS Fleet Management Software", link: "https://www.compare-bazaar.com/GpsFleetMangement" },
        { name: "Best Employee Management Software", link: "https://www.compare-bazaar.com/BestEmployeeMangementSoftware" },
        { name: "Best Payroll System", link: "https://www.compare-bazaar.com/BestPayrollSystem" }
      ]
    },
    {
      id: 'blog',
      title: "Resources",
      items: [
        { name: "WhitePaper", link: "https://www.compare-bazaar.com/WhitePaper" },
        { name: "Blogs", link: "https://blogs.compare-bazaar.com/" }
      ]
    },
    {
      id: 'sales',
      title: "Sales",
      items: [
        { name: "Best CRM Software", link: "https://www.compare-bazaar.com/BestCRMSoftware" },
        { name: "Best Call Center Management Software", link: "https://www.compare-bazaar.com/Callcenter" },
        { name: "Best Project Management Software", link: "https://www.compare-bazaar.com/BestProjectManagement" }
      ]
    },
    {
      id: 'contact',
      title: "Contact Us",
      items: [
        { name: "Contact", link: "https://www.compare-bazaar.com/contact-sales" },
        { name: "About us", link: "https://www.compare-bazaar.com/About%20us" },
        { name: "Careers", link: "https://www.compare-bazaar.com/Careers" }
      ]
    }
  ];

  return (
    <>
      {!isMobile && activeDropdown && (
        <div className="mega-dropdown" onMouseLeave={() => setActiveDropdown(null)}>
          <div className="mega-dropdown-inner">
            <div className="mega-dropdown-sections">
              {allSectionsContent.map((section) => (
                <div 
                  key={section.id} 
                  className={`mega-dropdown-section ${
                    activeNavItem === section.id ? 'active-section-group' : ''
                  }`}
                >
                  <h3 className={`mega-dropdown-title ${
                    activeNavItem === section.id ? 'active-section' : ''
                  }`}>
                    {section.title}
                  </h3>
                  <ul className="mega-dropdown-items">
                    {section.items.map((item) => (
                      <li key={item.link}>
                        <Link 
                          href={item.link} 
                          className={`mega-dropdown-item ${
                            activeNavItem === section.id ? 'active-item' : ''
                          }`}
                          onClick={() => setActiveDropdown(null)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dropdown;