import React from 'react';
import { screen } from '@testing-library/react';
import RenderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('Testing component NotFound.js', () => {
  test(`Teste se a página contém um heading h2 com o texto 
   "Page requested not found 😭"`, () => {
    RenderWithRouter(<NotFound />);
    const notFound = screen
      .getByRole('heading', { name: /Page requested not found/i, level: 2 });
    expect(notFound).toBeInTheDocument();
  });
  test('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    () => {
      RenderWithRouter(<NotFound />);
      const img = screen.getByRole('img',
        { name: 'Pikachu crying because the page requested was not found' });
      expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    });
});

// alt= 'Pikachu crying because the page requested was not found'
