import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Componente FavoritePokemoons', () => {
  it(`Teste se é exibida na tela a mensagem "No favorite pokemon found", 
  caso não tenha pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);
    const heading1 = screen.getByRole('heading',
      { name: /Favorite pokémons/i, level: 2 });
    const notFound = screen.getByText(/no favorite pokemon found/i);
    expect(heading1).toBeDefined();
    expect(notFound).toBeDefined();
  });

  it('Teste se são exibidos todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const btnEletric = screen.getByRole('button', { name: /electric/i });
    expect(btnEletric).toBeDefined();
    userEvent.click(btnEletric);
    const moreDetail = screen.getByRole('link', { name: /more details/i });
    expect(moreDetail).toBeDefined();
    userEvent.click(moreDetail);
    const favoritado = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(favoritado).toBeDefined();
    userEvent.click(favoritado);
    const clickFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(clickFavorite);
    const cardFavorite = screen.getAllByRole('link', { name: /more details/i });
    expect(cardFavorite.length).toBe(1);
    // screen.logTestingPlaygroundURL();
  });
});
