import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import AppFavorite from './AppFavorite'

enzyme.configure({ adapter: new Adapter() });

describe('Тест компонента, подгружающего данные об избранных пользователях из localstorage', () => {

  it('render <AppFavorite /> c одним props', () => {
    const wrapper = shallow(<AppFavorite />);
    expect(wrapper.props().jobItemsData).toEqual([]);
  })

});

