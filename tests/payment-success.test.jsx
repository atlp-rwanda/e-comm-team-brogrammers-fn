import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { expect, it, describe, beforeEach } from '@jest/globals';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import PaymentSuccessPage, {
  ConfirmationBox,
} from '../src/Views/payments/Success';

Enzyme.configure({ adapter: new Adapter() });

describe('PaymentSuccessPage', () => {
  it('should render the payment success page', () => {
    const { getByText, getByTestId } = render(<PaymentSuccessPage />);
    expect(getByText('Payment Successful')).toBeInTheDocument();
    expect(getByTestId('payment-success-icon')).toBeInTheDocument();
  });
});

describe('ConfirmationBox', () => {
  let wrapper;
  const props = {
    orderNumber: '12345',
    totalCost: '$100.00',
    deliveryDate: '01/01/2020',
    paymentConfirmation: 'Confirmed',
  };

  beforeEach(() => {
    wrapper = shallow(<ConfirmationBox {...props} />);
  });

  it('should render the component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the correct order number', () => {
    expect(wrapper.find('span').at(0).text()).toEqual(props.orderNumber);
  });

  it('should render the correct total cost', () => {
    expect(wrapper.find('span').at(1).text()).toEqual(props.totalCost);
  });

  it('should render the correct delivery date', () => {
    expect(wrapper.find('span').at(2).text()).toEqual(props.deliveryDate);
  });

  it('should render the correct payment confirmation', () => {
    expect(wrapper.find('span').at(3).text()).toEqual(
      props.paymentConfirmation
    );
  });
});
