import React, { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState<{id:number;name:string}[]>([]);
  const [name, setName] = useState('');
  
  useEffect(() => {
    fetch('/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('/users', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name}),
    }).then(res => res.json())
      .then(newUser => setUsers([...users, newUser]));
    setName('');
  };

  return (
    <div>
      <h1>Utilisateurs</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nom :</label>
        <input id="name" value={name} onChange={e => setName(e.target.value)} />
        <button type="submit">Créer</button>
      </form>
      <ul>
        {users.map(u => <li key={u.id}>{u.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
