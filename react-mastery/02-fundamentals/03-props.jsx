// ============================================================
// 🧱 TASK 2.3: PROPS — Data Flow in React
// ============================================================
import React from 'react';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📌 WHAT ARE PROPS?
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/*
Props = Properties passed from PARENT to CHILD component
- READ-ONLY (cannot be modified by child)
- Flow ONE WAY: Parent → Child (unidirectional data flow)
- Can be any JS value: string, number, object, array, function, JSX
*/

// ━━━━━ BASIC PROPS ━━━━━
function ProfileCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.age} years old</p>
      <p>Role: {props.role}</p>
    </div>
  );
}
// Usage: <ProfileCard name="Murali" age={25} role="Developer" />

// ━━━━━ DESTRUCTURED PROPS (Preferred ✅) ━━━━━
function ProfileCardBetter({ name, age, role }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{age} years old</p>
      <p>Role: {role}</p>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📌 DEFAULT PROPS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Method 1: Default parameter values (Recommended ✅)
function Button({ text = 'Click Me', color = 'blue', size = 'medium' }) {
  return (
    <button style={{ backgroundColor: color }} className={`btn-${size}`}>
      {text}
    </button>
  );
}
// <Button />              → uses all defaults
// <Button text="Submit" /> → overrides only text

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📌 CHILDREN PROP (Special Prop)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// `children` = whatever you put BETWEEN component tags
function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-body">
        {children}  {/* Renders whatever is inside <Card>...</Card> */}
      </div>
    </div>
  );
}

// Usage:
function CardDemo() {
  return (
    <Card title="My Card">
      <p>This paragraph is the children prop</p>
      <button>So is this button</button>
    </Card>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📌 PASSING DIFFERENT TYPES AS PROPS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function PropsTypesDemo() {
  const handleClick = () => alert('Clicked!');
  const user = { name: 'Murali', age: 25 };
  const items = ['React', 'Vue', 'Angular'];

  return (
    <DemoChild
      text="Hello"                          // String
      count={42}                            // Number
      isActive={true}                       // Boolean
      user={user}                           // Object
      items={items}                         // Array
      onClick={handleClick}                 // Function
      icon={<span>🔥</span>}               // JSX Element
      render={(data) => <p>{data}</p>}      // Render function
    />
  );
}

function DemoChild({ text, count, isActive, user, items, onClick, icon, render }) {
  return (
    <div>
      <p>{text} — {count}</p>
      <p>{isActive ? 'Active' : 'Inactive'}</p>
      <p>{user.name}</p>
      <ul>{items.map((item, i) => <li key={i}>{item}</li>)}</ul>
      <button onClick={onClick}>Click</button>
      {icon}
      {render('Dynamic content')}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📌 PROPS DRILLING (Problem & Solutions)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/*
Props Drilling = passing props through many levels of components
that don't need them, just to reach a deeply nested component.

App → Layout → Sidebar → UserMenu → Avatar (needs user data)
      ↑ passes user   ↑ passes user   ↑ passes user

SOLUTIONS:
1. Context API (built-in)
2. State management (Redux, Zustand)
3. Component composition (restructure components)
*/

// ❌ Props Drilling Problem:
function AppDrilling() {
  const user = { name: 'Murali', avatar: '/murali.jpg' };
  return <Layout user={user} />;  // Layout doesn't need user!
}
function Layout({ user }) {
  return <Sidebar user={user} />;  // Sidebar doesn't need user!
}
function Sidebar({ user }) {
  return <Avatar user={user} />;   // Only Avatar needs user
}
function Avatar({ user }) {
  return <img src={user.avatar} alt={user.name} />;
}

// ✅ Solution: Component Composition
function AppComposition() {
  const user = { name: 'Murali', avatar: '/murali.jpg' };
  return (
    <LayoutComp>
      <SidebarComp>
        <Avatar user={user} />
      </SidebarComp>
    </LayoutComp>
  );
}
function LayoutComp({ children }) { return <div>{children}</div>; }
function SidebarComp({ children }) { return <aside>{children}</aside>; }

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📌 SPREAD PROPS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function SpreadExample() {
  const buttonProps = {
    text: 'Submit',
    color: 'green',
    size: 'large',
  };
  // Spread all props at once
  return <Button {...buttonProps} />;
  // Same as: <Button text="Submit" color="green" size="large" />
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎯 INTERVIEW QUESTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/*
Q1: "What are props in React?"
A: Props are read-only inputs passed from parent to child components.
   They enable unidirectional data flow.

Q2: "Can you modify props inside a child component?"
A: No. Props are read-only. To change data, parent must update
   its state and pass new props down.

Q3: "What is props drilling and how to solve it?"
A: Passing props through multiple intermediate components that don't
   need them. Solutions: Context API, Redux/Zustand, or composition.

Q4: "What is the children prop?"
A: A special prop that contains content between opening and closing
   tags of a component: <Card>this is children</Card>

Q5: "What is the difference between props and state?"
A: Props = external data from parent (read-only)
   State = internal data managed by the component (mutable via setState)
*/

export { ProfileCard, ProfileCardBetter, Button, Card, CardDemo };
