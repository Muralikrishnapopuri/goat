// ============================================================
// 📘 TASK 6.2: Advanced TypeScript Patterns in React
// ============================================================
import React, { useState } from 'react';

// ━━━ GENERIC COMPONENTS ━━━
// A component that works with ANY data type

interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>{renderItem(item, index)}</li>
      ))}
    </ul>
  );
}

// Usage — TypeScript infers T automatically!
interface User { id: number; name: string; }
interface Product { sku: string; title: string; price: number; }

function Demo() {
  const users: User[] = [{ id: 1, name: 'Murali' }];
  const products: Product[] = [{ sku: 'A1', title: 'Widget', price: 99 }];

  return (
    <div>
      <List items={users} keyExtractor={u => u.id} renderItem={u => u.name} />
      <List items={products} keyExtractor={p => p.sku}
        renderItem={p => `${p.title} - ₹${p.price}`} />
    </div>
  );
}

// ━━━ DISCRIMINATED UNIONS (Powerful for conditional props!) ━━━

// Button can be a link OR a button, never both
type LinkButtonProps = {
  variant: 'link';
  href: string;
  children: React.ReactNode;
};

type ActionButtonProps = {
  variant: 'button';
  onClick: () => void;
  children: React.ReactNode;
};

type SmartButtonProps = LinkButtonProps | ActionButtonProps;

function SmartButton(props: SmartButtonProps) {
  if (props.variant === 'link') {
    return <a href={props.href}>{props.children}</a>;
  }
  return <button onClick={props.onClick}>{props.children}</button>;
}

// ━━━ EXTENDING HTML ELEMENT PROPS ━━━

// Your component gets ALL native button props + your custom ones
interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
  loading?: boolean;
}

function CustomButton({ variant, loading, children, ...rest }: CustomButtonProps) {
  return (
    <button className={`btn-${variant}`} disabled={loading} {...rest}>
      {loading ? 'Loading...' : children}
    </button>
  );
}
// <CustomButton variant="primary" onClick={fn} type="submit" aria-label="Save" />

// ━━━ UTILITY TYPES ━━━

interface FullUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

// Pick: Select specific props
type UserPreview = Pick<FullUser, 'id' | 'name'>;

// Omit: Remove specific props
type PublicUser = Omit<FullUser, 'password'>;

// Partial: All props optional
type UserUpdate = Partial<FullUser>;

// Required: All props required
type StrictUser = Required<FullUser>;

// Record: Key-value map
type UserRoles = Record<string, 'admin' | 'user' | 'guest'>;

// ━━━ TYPEOF & KEYOF ━━━
const defaultConfig = {
  theme: 'dark' as const,
  fontSize: 14,
  language: 'en' as const,
};

type Config = typeof defaultConfig;
// { theme: "dark"; fontSize: number; language: "en" }

type ConfigKey = keyof Config;
// "theme" | "fontSize" | "language"

/*
🎯 INTERVIEW:
Q: "What are Generic Components in React?"
A: Components that accept a type parameter <T> to work with any data type.
   Example: <List<User> items={users} /> — type-safe for User objects.

Q: "What are Discriminated Unions?"
A: Union types with a common discriminant property (like 'variant').
   TypeScript narrows the type based on the discriminant value.

Q: "How to extend native HTML element props?"
A: Use React.ButtonHTMLAttributes<HTMLButtonElement> (or similar)
   with extends/intersection to get all native props.
*/

export { List, SmartButton, CustomButton, Demo };
