// ─────────────────────────────────────────────
// Accordion.jsx
// CONCEPT: props.children + conditional rendering + dynamic state keys
//          Two class components in one file — parent + reusable child
// EXECUTION FLOW:
//   AccordionItem:
//     1. constructor()  → state.isOpen = props.defaultOpen
//     2. render()       → shows header, conditionally shows body
//     3. [click header] → toggle → setState → render
//
//   Accordion (parent):
//     1. render()       → maps items prop → renders AccordionItem for each
// ─────────────────────────────────────────────

import React, { Component } from 'react';

// ─────────────────────────────────────────
// AccordionItem — child component
// Manages its own open/close state (local state ownership)
// ─────────────────────────────────────────
class AccordionItem extends Component {

  constructor(props) {
    super(props);

    // Props can seed initial state in constructor (one-time read)
    // After mount, props.defaultOpen changes won't affect this state
    // (state is now "owned" by this component)
    this.state = {
      isOpen: props.defaultOpen || false,
    };

    // Arrow function field — no bind needed
    this.toggle = this.toggle.bind(this);
  }

  // ── LIFECYCLE ──────────────────────────────
  componentDidUpdate(prevProps) {
    // Parent can force-open/close via `forceOpen` prop
    // This is a "controlled" override pattern
    if (prevProps.forceOpen !== this.props.forceOpen) {
      this.setState({ isOpen: this.props.forceOpen });
    }
  }

  // ── CUSTOM METHOD ──────────────────────────
  toggle() {
    this.setState(
      prevState => ({ isOpen: !prevState.isOpen }),
      // Callback: runs after setState + re-render complete
      // Notify parent when panel opens/closes (optional callback prop)
      () => {
        if (this.props.onToggle) {
          this.props.onToggle(this.props.id, this.state.isOpen);
        }
      }
    );
  }

  // ── RENDER ─────────────────────────────────
  render() {
    const { isOpen } = this.state;
    // Destructuring props — `children` is a special prop:
    // everything between <AccordionItem>...</AccordionItem> tags
    const { title, children, disabled } = this.props;

    return (
      <div style={{ borderBottom: '1px solid #ddd' }}>
        {/* Header button — aria-expanded for accessibility */}
        <button
          onClick={this.toggle}
          disabled={disabled}
          aria-expanded={isOpen}
          style={{
            width: '100%', padding: '14px 16px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: 'none', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
            fontSize: 15, fontWeight: 500, textAlign: 'left',
            color: disabled ? '#aaa' : '#222',
          }}
        >
          <span>{title}</span>
          {/* Inline ternary: shows ▲ or ▼ based on isOpen */}
          <span style={{ fontSize: 12, transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            ▼
          </span>
        </button>

        {/* Conditional rendering: only mount children when isOpen is true
            Alternative: render always but hide with CSS (keeps DOM nodes in memory)
            This approach unmounts children — cleaner but loses child state on close */}
        {isOpen && (
          <div style={{ padding: '0 16px 14px', fontSize: 14, color: '#555', lineHeight: 1.6 }}>
            {/* `children` renders whatever JSX was nested inside the component */}
            {children}
          </div>
        )}
      </div>
    );
  }
}


// ─────────────────────────────────────────
// Accordion — parent/container component
// Renders multiple AccordionItems from a `items` prop
// Optionally enforces "only one open at a time" (exclusive mode)
// ─────────────────────────────────────────
class Accordion extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // Track which panel ID is currently open (null = all closed)
      // Only used when props.exclusive = true
      openId: null,
    };
  }

  componentDidMount() {
    console.log('[Accordion] Mounted with', this.props.items?.length, 'panels');
  }

  // Handler passed DOWN to each AccordionItem as a prop (callback prop pattern)
  handleToggle = (id, isOpen) => {
    if (this.props.exclusive) {
      // exclusive mode: close others when one opens
      this.setState({ openId: isOpen ? id : null });
    }
    // Bubble event up to grandparent if needed
    if (this.props.onPanelChange) {
      this.props.onPanelChange(id, isOpen);
    }
  }

  render() {
    const { items = [], exclusive = false } = this.props;
    const { openId } = this.state;

    return (
      <div style={{ border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden', fontFamily: 'sans-serif', maxWidth: 480 }}>

        {/* Render via props.items array */}
        {items.map((item, index) => (
          <AccordionItem
            key={item.id}                                   // unique key required
            id={item.id}
            title={item.title}
            defaultOpen={index === 0}                       // first item open by default
            disabled={item.disabled}
            forceOpen={exclusive ? openId === item.id : undefined}  // controlled prop
            onToggle={this.handleToggle}                    // callback prop
          >
            {/* item.content is a string here, but could be any JSX */}
            {item.content}
          </AccordionItem>
        ))}

        {/* Render via props.children (slot pattern — alternative to items prop) */}
        {/* If no items prop, users can pass <AccordionItem> directly as children */}
        {!items.length && this.props.children}
      </div>
    );
  }
}


// ─────────────────────────────────────────
// Demo wrapper — shows both usage patterns
// ─────────────────────────────────────────
class AccordionDemo extends Component {
  render() {
    const faqs = [
      { id: 'q1', title: 'What is a class component?', content: 'A class component is a JavaScript class that extends React.Component and implements a render() method that returns JSX.' },
      { id: 'q2', title: 'When should I use class components?', content: 'Class components are useful when you need lifecycle methods, or when maintaining a large legacy codebase. New code typically uses functional components with hooks.' },
      { id: 'q3', title: 'What is the difference between state and props?', content: 'Props are read-only data passed from parent to child. State is private mutable data owned and managed by the component itself.', disabled: false },
    ];

    return (
      <div style={{ padding: 24 }}>
        <h3 style={{ fontFamily: 'sans-serif', marginBottom: 16 }}>FAQ Accordion</h3>
        {/* Usage pattern 1: items prop */}
        <Accordion items={faqs} exclusive={true} />

        <h3 style={{ fontFamily: 'sans-serif', marginTop: 32, marginBottom: 16 }}>Children pattern</h3>
        {/* Usage pattern 2: direct children */}
        <Accordion>
          <AccordionItem id="a" title="Manual item 1">
            <p>Content passed as JSX children directly.</p>
            <button>Even interactive content works here</button>
          </AccordionItem>
          <AccordionItem id="b" title="Manual item 2" defaultOpen>
            <p>This one starts open (defaultOpen prop).</p>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }
}

export { AccordionItem, Accordion };
export default AccordionDemo;
