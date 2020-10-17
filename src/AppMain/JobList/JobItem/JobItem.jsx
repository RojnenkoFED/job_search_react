import React from 'react'


export const JobItem = (props) => {
  const { jobData } = props

  return (
    <li className="job-item">
      <div className="job-head">
        <div className="job-wrap">
          <JobBusy jobData={jobData.type} />
          <JobTitle jobData />
          <JobCompany jobData />
          <JobLocation jobData />
        </div>
        <CompanyImg jobData />
      </div>
      <JobApply jobData />
      <ChosenButton jobData />
      {/* <JobDate jobData /> */}
    </li>
  );
};

const CompanyImg = (jobData) => {
  return (
    <div className="company-img">
      <a href={jobData.company_url}>
        <img className="logo" src={jobData.company_logo} alt="Логотип {jobData.company}" />
      </a>
    </div>
  );
};

const JobBusy = (jobData) => {
  return <div className="job-busy">{jobData.type}</div>;
};

const JobTitle = (jobData) => {
  return (
    <div className="job-title">
      <a href={jobData.url}>{jobData.title}</a>
    </div>
  );
};

const JobCompany = (jobData) => {
  return (
    <div className="job-company">
      <a href={jobData.company_url}>{jobData.company}</a>
    </div>
  );
};

const JobLocation = (jobData) => {
  return <div className="job-location">{jobData.location}</div>;
};

const JobApply = (jobData) => {
  return <div className="job-apply">{jobData.how_to_apply}</div>;
};

const JobDate = (jobData) => {
  let DatePosting = jobData.created_at;
  let splits = [] = DatePosting.split(' ', 6);
  return <div className="job-date">{splits[2]} {splits[1]} {splits[5]}</div>;
};

const ChosenButton = () => {
  return <button className="chosen-btn"/>;
}
