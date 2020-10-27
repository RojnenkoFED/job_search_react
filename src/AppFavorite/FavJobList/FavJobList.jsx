import React from 'react'

import { FavJobItem } from './FavJobItem/FavJobItem'

export default class FavJobList extends React.Component {

	setEmptyList = () => {
		return <h1 className="responce">Nothing found</h1>;
	}

	render() {
	
		const { jobItemsData = [] } = this.props;
		console.log(localStorage.length);
		return (
			<div className="jobs-wrapper" >
				<div className="fav-title">
					<h3>Избранные вакансии</h3>
				</div>
				<ul className="jobs">
					{ localStorage.length !== 0 ? jobItemsData.map((jobItemData, index) => {
						return <FavJobItem jobItemData={jobItemData} key={index} setEmptyList={this.setEmptyList} />
					}) : this.setEmptyList() }
				</ul>
			</div>
		);
	}

}