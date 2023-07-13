// import { describe, it } from 'vitest';
// import { render, screen } from '@testing-library/react';

// import { MemoryRouter } from 'react-router-dom';
// import App from '../App';

// describe('App', () => {
//   it('Renders Hello world', () => {
//     render(<App />);
//     expect(
//       screen.getByRole('heading', {
//         level: 1,
//       })
//     ).toHaveTextContent('Recipe Central');
//   });
//   it('renders not found if invalid path', () => {
//     render(
//       <MemoryRouter initialEntries={['/this-route-is-not-found']}>
//         <App />
//       </MemoryRouter>
//     );
//     expect(
//       screen.getByRole('heading', {
//         level: 1,
//       })
//     ).toHaveTextContent('Not Found');
//   });
// });
