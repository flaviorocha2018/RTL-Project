import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { history } = renderWithRouter(<About />);
    console.log(history);
    const pageTitle = screen.getAllByRole('heading',
      { name: /about pokédex/i, level: 2 });
    expect(pageTitle).toBeDefined();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const heading1 = 'This application simulates a Pokédex, a';
    const heading2 = 'digital encyclopedia containing all Pokémons';
    const subTitle1 = screen.getByText(`${heading1} ${heading2}`);
    const heading3 = 'One can filter Pokémons by type,';
    const heading4 = 'and see more details for each one of them';
    const subTitle2 = screen.getByText(`${heading3} ${heading4}`);
    expect(subTitle1).toBeDefined();
    expect(subTitle2).toBeDefined();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    renderWithRouter(<About />);
    const imgPokedex = screen.getByRole('img', { name: /pokédex/i });
    expect(imgPokedex).toBeDefined();
    expect(imgPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
