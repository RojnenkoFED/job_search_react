import React, { useState } from 'react'


export const JobItem = (props) => {
  const { jobData } = props;
  const [buttonStyle, setButtonStyle] = useState('chosen-btn');
  

  function chosenClick() {
    if(localStorage.getItem(jobData.id) == null){
      setButtonStyle('chosen-btn pressed-button');
      localStorage.setItem(jobData.id, JSON.stringify(jobData));
      
    }else {
      setButtonStyle('chosen-btn');
      localStorage.removeItem(jobData.id);  
    }
  }

  return (
    <li className="job-item">
      <div className="job-head">
        <div className="job-wrap">
          <JobBusy type={jobData.type} />
          <JobTitle title={jobData.title} url={jobData.url} />
          <JobCompany company={jobData.company} company_url={jobData.company_url} />
          <JobLocation location={jobData.location} />
        </div>
        <CompanyImg company_url={jobData.company_url} logo={jobData.company_logo} company={jobData.company}/>
      </div>
      <JobApply accept={jobData.how_to_apply} />
      <button className={buttonStyle} onClick={chosenClick}/>
      <JobDate date={jobData.created_at} />
    </li>
  );
};

const CompanyImg = (props) => {
  return (
    <div className="company-img">
      <a href={props.company_url}>
        <img className="logo" src={props.logo} alt={`Логотип ` + props.company} />
      </a>
    </div>
  );
};

const JobBusy = (props) => {
  return <div className="job-busy">{props.type}</div>;
};

const JobTitle = (props) => {
  return (
    <div className="job-title">
      <a href={props.url}>{props.title}</a>
    </div>
  );
};

const JobCompany = (props) => {
  return (
    <div className="job-company">
      <a href={props.company_url}>{props.company}</a>
    </div>
  );
};

const JobLocation = (props) => {
  return <div className="job-location">{props.location}</div>;
};

const JobApply = (props) => {
  // eslint-disable-next-line react/no-danger-with-children
  return <div className="job-apply" dangerouslySetInnerHTML={{__html: props.accept}}></div>;
};

const JobDate = (props) => {
  let DatePosting = props.date;
  let splits = [] = DatePosting.split(' ', 6);
  return <div className="job-date">{splits[2]} {splits[1]} {splits[5]}</div>;
};
