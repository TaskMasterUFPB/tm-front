// UserCircles.tsx
import React from 'react';
import { Avatar, AvatarGroup } from '@mui/material'; // Importação correta dos componentes

// Defina um tipo para os usuários
type User = {
  id: number;
  initials: string;
  color: string; // Define a cor de fundo do círculo
};

const users: User[] = [
  { id: 1, initials: 'H', color: '#3498db' }, // Azul
  { id: 2, initials: 'O', color: '#e74c3c' }, // Vermelho
  { id: 3, initials: 'A', color: '#95a5a6' }, // Cinza
  { id: 4, initials: 'A', color: '#ffab00' }, // Amarelo
  { id: 5, initials: 'T', color: '#00c853' }  // Verde
];

const UserCircles: React.FC = () => {
  return (
    <AvatarGroup max={3} style={{ display: 'flex', gap: '0px' }}>
      {users.map((user) => (
        <Avatar
          key={user.id}
          style={{ backgroundColor: user.color }}
          alt={`Avatar for ${user.initials}`}
        >
          {user.initials}
        </Avatar>
      ))}
    </AvatarGroup>
  );
};

export default UserCircles;
