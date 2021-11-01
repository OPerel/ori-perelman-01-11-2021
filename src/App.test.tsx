import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { index } from './store';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={index}>
      <App />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
