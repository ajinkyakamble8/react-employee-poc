import React from 'react';
import { shallow } from 'enzyme';
import ConfirmationModal from './ConfirmationModal';
import { act } from '@testing-library/react';
import { Button } from 'react-bootstrap';

const initProps = {
  showModal: true,
  hideModal: false,
  onConfirm: jest.fn(),
  action: 'Delete',
  id: '123456',
  message: 'Are you sure you want to Delete?'
}

describe('<ConfirmationModal />', () => {
  let component: any;

  beforeEach(() => {
    component = shallow(<ConfirmationModal {...initProps} />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });

  test('On action click', async () => {
    await act(async () => {
      component.find(Button).at(1).simulate('click')
    });
    expect(initProps.onConfirm).toHaveBeenCalledTimes(1);
  });

});
