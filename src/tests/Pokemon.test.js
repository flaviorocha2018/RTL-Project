import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import data from '../data';

describe('Testing component Pokemon.js', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<Pokemon pokemon={ data[0] } />);
    const { averageWeight, image, name, type } = data[0];
    const { value, measurementUnit } = averageWeight;
    const namePokemon = screen.getByText(name);
    const typePokemon = screen.getByTestId('pokemon-type');
    const typeText = `${type}`;
    const weight = screen.getByTestId('pokemon-weight');
    const img = screen.getByRole('img', { name: `${name} sprite` });
    expect(namePokemon).toBeInTheDocument();
    expect(typePokemon).toHaveTextContent(typeText);
    expect(weight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(img).toHaveAttribute('src', image);
  });
  it('Teste se o card do pokémon contém um link para exibir detalhes', () => {
    renderWithRouter(<Pokemon pokemon={ data[0] } />);
    const { id } = data[0];
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    const idPokemon = `/pokemons/${id}`;
    expect(moreDetails).toHaveAttribute('href', idPokemon);
  });
  it(`Teste se ao clicar no link de navegação do pokémon, é feito o redirecionamento 
  da aplicação para a página de detalhes de pokémon.`, () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ data[0] } />);
    const { id } = data[0];
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    const idPokemon = `/pokemons/${id}`;
    expect(moreDetails).toHaveAttribute('href', idPokemon);
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(idPokemon);
  });
  it('Teste se existe um ícone de estrela nos pokémons favoritados.', () => {
    renderWithRouter(<Pokemon pokemon={ data[0] } isFavorite />);
    const { name } = data[0];
    const starIcon = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(starIcon).toBeInTheDocument();
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
