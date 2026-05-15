// ============================================================
// 📘 TASK 6.1: TypeScript Basics for React
// ============================================================
import React, { useState, useEffect } from 'react';

// ━━━ TYPING PROPS ━━━

// Method 1: Inline type
function Greeting({ name, age }: { name: string; age: number }) {
  return <p>{name} is {age}</p>;
}

// Method 2: Interface (Preferred ✅)
interface UserCardProps {
  name: string;
  email: string;
  age: number;
  role?: string;           // Optional prop
  avatar?: string;
  onDelete: (id: number) => void;  // Function prop
  children?: React.ReactNode;       // Children
}

function UserCard({ name, email, age, role = 'Developer', onDelete, children }: UserCardProps) {
  return (
    <div>
      <h2>{name} ({age})</h2>
      <p>{email} - {role}</p>
      <button onClick={() => onDelete(1)}>Delete</button>
      {children}
    </div>
  );
}

// Method 3: Type alias
type ButtonProps = {
  variant: 'primary' | 'secondary' | 'danger'; // Union type
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function Button({ variant, size = 'md', disabled, onClick, children }: ButtonProps) {
  return (
    <button className={`btn-${variant} btn-${size}`} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

// ━━━ TYPING STATE ━━━

interface User {
  id: number;
  name: string;
  email: string;
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]); // Array of User
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // Nullable
  const [loading, setLoading] = useState(false); // Inferred as boolean
  const [count, setCount] = useState(0); // Inferred as number

  const addUser = (user: User) => {
    setUsers(prev => [...prev, user]);
  };

  return <div>{users.map(u => <p key={u.id}>{u.name}</p>)}</div>;
}

// ━━━ TYPING EVENTS ━━━

function EventTyping() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.textContent);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') console.log('Enter pressed');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} onKeyDown={handleKeyDown} />
      <button onClick={handleClick}>Click</button>
    </form>
  );
}

// ━━━ COMMON REACT TYPES ━━━
/*
React.ReactNode       — anything renderable (string, number, JSX, null)
React.ReactElement    — a JSX element specifically
React.FC<Props>       — function component type (avoid, use plain functions)
React.CSSProperties   — inline style object
React.MouseEvent<T>   — mouse event on element T
React.ChangeEvent<T>  — change event on element T
React.FormEvent<T>    — form submit event
React.KeyboardEvent<T>— keyboard event
React.RefObject<T>    — useRef type
*/

// ━━━ STYLE TYPING ━━━
const containerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#333',
  padding: '20px',
};

/*
🎯 INTERVIEW:
Q: "interface vs type in React?"
A: Both work for props. interface can be extended/merged.
   type supports unions/intersections. Convention: interface for objects,
   type for unions and complex types.

Q: "Should you use React.FC?"
A: Generally no. It was common but has issues (implicit children,
   no generic support). Use plain function + typed props instead.
*/

export { Greeting, UserCard, Button, UserList, EventTyping };
