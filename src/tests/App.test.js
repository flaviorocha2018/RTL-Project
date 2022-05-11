import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testing Component App.js with Links', () => {
  it('Primeiro Link deve possuir texto Home', () => {
    renderWithRouter(<App />);
    const pageLinks = screen.getAllByRole('link');
    expect(pageLinks[0]).toHaveTextContent('Home');
    expect(pageLinks[1]).toHaveTextContent('About');
    expect(pageLinks[2]).toHaveTextContent('Favorite Pokémons');
  });
  it('Se ao clicar no link Home a página é redirecionada para Home "/"', () => {
    const { history } = renderWithRouter(<App />);
    const pageLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(pageLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Se ao clicar no link About a página é redirecionada para "/about"', () => {
    const { history } = renderWithRouter(<App />);
    const pageLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(pageLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('Ao clicar no link Pokémons Favoritados a página é redirecionada para a URL', () => {
    const { history } = renderWithRouter(<App />);
    const pageLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(pageLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('Se  clicar numa URL desconhecida a página é redirecionada Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('não existente');

    const pageNotFound = screen.getByRole('heading',
      { name: 'Page requested not found Crying emoji' });
    expect(pageNotFound).toBeInTheDocument();
  });
});
// https://stackoverflow.com/questions/64886950/how-to-test-whether-a-link-from-router-worked-jest-rtl
// https://stackoverflow.com/questions/57827126/how-to-test-anchors-href-with-react-testing-library
