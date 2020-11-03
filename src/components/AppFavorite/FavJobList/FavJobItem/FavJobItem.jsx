import React from 'react'
import './FavJobItem.css'

export default class FavJobItem extends React.Component {

  state = {
    listItem: true
  }; 

  deleteItem = () => {
    localStorage.removeItem(this.props.jobItemData.id);
    this.setState({ listItem: false });
  }

  render() {
    const { jobItemData } = this.props;
    const { listItem } = this.state;
    if (listItem) {
      return (
        <li className="job-item">
          <i className="fa fa-window-close" onClick={this.deleteItem}></i>
          <div className="job-title"><a href={jobItemData.url}>{jobItemData.title}</a></div>
          <div className="job-company"><a href={jobItemData.company_url}>{jobItemData.company}</a></div>
          <div className="job-apply" dangerouslySetInnerHTML={{ __html: jobItemData.how_to_apply }}></div>
        </li>
      );
    } else if( localStorage.length === 0 ) {
      return this.props.setEmptyList();
    }
    return true;
  }
}