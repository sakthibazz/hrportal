import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HouseFill, Eye, PeopleFill, SearchHeart, FileEarmarkBarGraphFill, PencilFill, QuestionCircleFill,PersonPlusFill,InfoCircleFill} from 'react-bootstrap-icons';
import useFetch from '../hooks/Fetch.hook.js';
import './SideNavbar.css';

const SideNavbar = () => {
  const [userPosition, setUserPosition] = useState('');
  const [{ isLoading, apiData }] = useFetch();

  useEffect(() => {
    if (!isLoading && apiData) {
      setUserPosition(apiData.position);
    }
  }, [isLoading, apiData]);

  return (
    <div className="side-navbar">
      <Nav defaultActiveKey="/" className="flex-column">
        <div className="row">
          <div className="nav-link-row">
            <Nav.Link as={Link} to="/home" className="nav-link">
              <HouseFill className="nav-link-icon" />
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/arohabenchresource" className="nav-link">
              <Eye className="nav-link-icon" />
              Bench Resource
            </Nav.Link>
          </div>
        </div>
        <hr />

        {userPosition === 'recruiter' ? (
          <div className="row">
            <div className="nav-link-row">
              <div className="nav-link-title">Recruiter</div>
              <Nav.Link as={Link} to="/admindetailsacess" className="nav-link">
                <PeopleFill className="nav-link-icon" />
                Candidate
              </Nav.Link>
              <Nav.Link as={Link} to="/searchform" className="nav-link">
                <SearchHeart className="nav-link-icon" />
                Search
              </Nav.Link>
            </div>
          </div>
        ) : userPosition === 'admin' ? (
          
          <div className="row">
            <div className="nav-link-row">
            <div className="nav-link-title">Recruiter</div>
              <Nav.Link as={Link} to="/admindetailsacess" className="nav-link">
                <PeopleFill className="nav-link-icon" />
                Candidate
              </Nav.Link>
              <Nav.Link as={Link} to="/searchform" className="nav-link">
                <SearchHeart className="nav-link-icon" />
                Search
              </Nav.Link>
              <div className="nav-link-title">Admin</div>
              <Nav.Link as={Link} to="/adminpost" className="nav-link">
                <FileEarmarkBarGraphFill className="nav-link-icon" />
                New Requirement
              </Nav.Link>
              <Nav.Link as={Link} to="/searchadminpost" className="nav-link">
                <PencilFill className="nav-link-icon" />
                Edit Requirement
              </Nav.Link>
              <Nav.Link as={Link} to="/register" className="nav-link">
                <PersonPlusFill className="nav-link-icon" />
                User Registation
              </Nav.Link>
              <Nav.Link as={Link} to="/getCountByTicket" className="nav-link">
                <InfoCircleFill className="nav-link-icon" />
                Report
              </Nav.Link>
            </div>
          </div>
        ) : null}

        <Nav.Link as={Link} className="help-link">
          <QuestionCircleFill className="help-link-icon" />
          Need Help
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default SideNavbar;