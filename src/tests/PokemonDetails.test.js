import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testing the component PokemonDetails.js', () => {
  it('Teste se as informações detalhadas do pokémon selecionado são mostradas na tela.',
    () => {
      RenderWithRouter(<App />);
      const moreDetails = screen.queryByRole('link', { name: /more details/i });
      userEvent.click(moreDetails);
      const pokemonName = screen.getByRole('heading', { name: /details/i, level: 2 });
      expect(pokemonName).toBeInTheDocument();
      expect(pokemonName.textContent).toBe('Pikachu Details');
      const title = screen.getByRole('heading', { name: /game locations/i, level: 2 });
      expect(title).toBeInTheDocument();
      expect(title.textContent).toBe('Game Locations of Pikachu');
      expect(moreDetails).not.toBeInTheDocument();
      const subTitle = screen.getByRole('heading', { name: 'Summary', level: 2 });
      expect(subTitle).toBeInTheDocument();
      const paragraph = screen.getByText(/this intelligent pokémon roasts hard berries/i);
      expect(paragraph).toBeInTheDocument();
    });
  it(`Teste se existe na página uma seção com os 
  mapas contendo as localizações do pokémon`, () => {
    RenderWithRouter(<App />);
    const moreDetails = screen.queryByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const title = screen.getByRole('heading', { name: /game locations/i, level: 2 });
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe('Game Locations of Pikachu');
    const img = screen.getAllByRole('img', { name: /pikachu location/i });
    expect(img[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(img[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(img[0]).toHaveAttribute('alt', 'Pikachu location'); // alt= 'Pikachu Location'
    expect(img[1]).toHaveAttribute('alt', 'Pikachu location'); // alt= 'Pikachu Location'
  });
  it(`Teste se o usuário pode favoritar um 
  pokémon através da página de detalhes.`, () => {
    RenderWithRouter(<App />);
    const moreDetails = screen.queryByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const checkFavorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    expect(checkFavorite).toBeInTheDocument();
    userEvent.click(checkFavorite);
    const img = screen.queryByRole('img', { name: /favorite/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/star-icon.svg');
    expect(img).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    userEvent.click(checkFavorite);
    expect(img).not.toBeInTheDocument();
  });
});
