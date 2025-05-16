import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { UserList } from '../src/components/UserList';
import { server } from '../src/mocks/browser';
import { rest } from 'msw';
import '@testing-library/jest-dom';

describe('UserList Component', () => {
it('affiche le loader puis la liste dʼutilisateurs', async () => {
render(<UserList />);
// 1. Le loader apparaît
expect(screen.getByRole('status')).toHaveTextContent('Chargement...');
// 2. Attendre que les items sʼaffichent
const items = await screen.findAllByRole('listitem');
expect(items).toHaveLength(2);
expect(items[0]).toHaveTextContent('Alice');
expect(items[1]).toHaveTextContent('Bob');
});
it('affiche une erreur si lʼAPI échoue', async () => {
// On override le handler pour renvoyer 500
server.use(
rest.get('/users', (_req, res, ctx) => {
return res(ctx.status(500), ctx.json({ error: 'Server Error' }));
})
);
render(<UserList />);
// Attendre lʼalerte dʼerreur
const alert = await screen.findByRole('alert');
expect(alert).toHaveTextContent('Erreur  Erreur réseau');
});
});