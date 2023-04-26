import React from 'react';
import { render } from '@testing-library/react';
import Home from '../src/Views/Home/Home';

describe('Home component', () => {
  it('should render welcome text', () => {
    const { getByText } = render(<Home />);
    const welcomeText = getByText(/Welcome To Brogrammers Ecommerce!/i);
    expect(welcomeText).toBeInTheDocument();
  });

  it('should render mission text', () => {
    const { getByText } = render(<Home />);
    const missionText = getByText(/Our Mission/i);
    expect(missionText).toBeInTheDocument();
  });

  it('should render contact form', () => {
    const { getByLabelText } = render(<Home />);
    const nameInput = getByLabelText(/Name/i);
    const emailInput = getByLabelText(/Email/i);
    const messageInput = getByLabelText(/Message/i);
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();
  });

  it('should render footer links', () => {
    const { getByText } = render(<Home />);
    const aboutLink = getByText(/About Us/i);
    const contactLink = getByText(/Contact Us/i);
    const faqLink = getByText(/FAQ/i);
    const termsLink = getByText(/Terms and Conditions/i);
    expect(aboutLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
    expect(faqLink).toBeInTheDocument();
    expect(termsLink).toBeInTheDocument();
  });

  it('should render social links', () => {
    const { getByLabelText } = render(<Home />);
    const facebookLink = getByLabelText(/Facebook/i);
    const twitterLink = getByLabelText(/Twitter/i);
    const instagramLink = getByLabelText(/Instagram/i);
    const githubLink = getByLabelText(/Github/i);
    expect(facebookLink).toBeInTheDocument();
    expect(twitterLink).toBeInTheDocument();
    expect(instagramLink).toBeInTheDocument();
    expect(githubLink).toBeInTheDocument();
  });
});
