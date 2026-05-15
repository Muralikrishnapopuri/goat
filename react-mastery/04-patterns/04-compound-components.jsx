// ============================================================
// 🎨 TASK 4.4: Compound Component Pattern
// ============================================================
import { createContext, useContext, useState } from 'react';

// ━━━ WHAT IS COMPOUND COMPONENTS? ━━━
/*
Components that work together to form a complete UI.
Like <select> + <option> — they share implicit state.
The parent manages state, children consume it via context.
*/

// ━━━ EXAMPLE: Accordion Component ━━━

const AccordionContext = createContext();

function Accordion({ children, allowMultiple = false }) {
  const [openItems, setOpenItems] = useState(new Set());

  const toggle = (id) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({ id, children }) {
  return <div className="accordion-item">{children}</div>;
}

function AccordionHeader({ id, children }) {
  const { openItems, toggle } = useContext(AccordionContext);
  const isOpen = openItems.has(id);

  return (
    <button onClick={() => toggle(id)} className="accordion-header">
      {children} {isOpen ? '▲' : '▼'}
    </button>
  );
}

function AccordionBody({ id, children }) {
  const { openItems } = useContext(AccordionContext);
  if (!openItems.has(id)) return null;
  return <div className="accordion-body">{children}</div>;
}

// Attach sub-components
Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;

// ━━━ USAGE — Clean, declarative API ━━━
function AccordionDemo() {
  return (
    <Accordion allowMultiple>
      <Accordion.Item id="1">
        <Accordion.Header id="1">What is React?</Accordion.Header>
        <Accordion.Body id="1">A JavaScript library for building UIs.</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item id="2">
        <Accordion.Header id="2">What is JSX?</Accordion.Header>
        <Accordion.Body id="2">Syntax extension for JavaScript.</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

// ━━━ EXAMPLE 2: Tabs Component ━━━

const TabsContext = createContext();

function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return <div className="tab-list" role="tablist">{children}</div>;
}

function Tab({ id, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  return (
    <button
      role="tab"
      onClick={() => setActiveTab(id)}
      className={activeTab === id ? 'tab active' : 'tab'}
    >
      {children}
    </button>
  );
}

function TabPanel({ id, children }) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== id) return null;
  return <div role="tabpanel">{children}</div>;
}

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

// Usage:
function TabsDemo() {
  return (
    <Tabs defaultTab="overview">
      <Tabs.List>
        <Tabs.Tab id="overview">Overview</Tabs.Tab>
        <Tabs.Tab id="features">Features</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel id="overview"><p>Overview content</p></Tabs.Panel>
      <Tabs.Panel id="features"><p>Features content</p></Tabs.Panel>
    </Tabs>
  );
}

/*
🎯 INTERVIEW:
Q: "What is the Compound Component pattern?"
A: Components that share implicit state via Context.
   Parent manages state, children consume it.
   Provides a clean, flexible, declarative API.
   Example: <Tabs> <Tabs.Tab> <Tabs.Panel>
*/

export { Accordion, AccordionDemo, Tabs, TabsDemo };
