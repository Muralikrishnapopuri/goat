// ============================================================
// ⚡ TASK 5.2: React Fiber Architecture
// ============================================================

// ━━━ WHAT IS REACT FIBER? ━━━
/*
Fiber is React's INTERNAL reconciliation engine (React 16+).
It replaced the old "Stack Reconciler" with an INCREMENTAL renderer.

OLD (Stack Reconciler):
- Renders the entire tree synchronously
- Can't be interrupted
- Long renders = UI freezes (dropped frames)

NEW (Fiber):
- Breaks rendering into small UNITS OF WORK
- Can PAUSE, RESUME, and ABORT work
- Prioritizes urgent updates (user input > animation > data fetch)
*/

// ━━━ HOW FIBER WORKS ━━━
/*
Each component creates a FIBER NODE (a JS object):

FiberNode = {
  tag:           5,              // Type (FunctionComponent=0, HostComponent=5, etc.)
  type:          'div',          // HTML tag or component function
  key:           null,           // Key prop
  stateNode:     <div>,          // Real DOM node (for host components)
  
  // TREE POINTERS (linked list, not array!)
  return:        parentFiber,    // Parent
  child:         firstChildFiber, // First child
  sibling:       nextSiblingFiber,// Next sibling
  
  // STATE
  memoizedState: hooksList,      // Linked list of hooks
  memoizedProps:  { className: 'app' },
  pendingProps:   { className: 'new' },
  
  // EFFECT
  flags:         Update,         // What needs to happen (Placement, Update, Deletion)
  
  // PRIORITY
  lanes:         SyncLane,       // Priority level
}

TREE STRUCTURE (Linked List):
App → div → h1 → "Hello"
              ↓ (sibling)
              p → "World"

Instead of: App.children = [div], div.children = [h1, p]
Fiber uses: App.child = div, div.child = h1, h1.sibling = p
*/

// ━━━ TWO PHASES OF RENDERING ━━━
/*
PHASE 1: RENDER (Reconciliation) — Interruptible!
┌──────────────────────────────────────────────┐
│ 1. Start from root fiber                     │
│ 2. Process one fiber (unit of work)          │
│ 3. Check if browser needs to handle events   │
│    → Yes: PAUSE, handle events, RESUME       │
│    → No: Continue to next fiber              │
│ 4. Build "work-in-progress" tree             │
│ 5. Mark fibers with effects (flags)          │
│ NO DOM CHANGES IN THIS PHASE!               │
└──────────────────────────────────────────────┘

PHASE 2: COMMIT — Synchronous (can't be interrupted!)
┌──────────────────────────────────────────────┐
│ 1. Apply all DOM mutations at once           │
│ 2. Call lifecycle methods / useLayoutEffect   │
│ 3. Schedule useEffect (after paint)          │
│ This must be atomic — no partial updates     │
└──────────────────────────────────────────────┘
*/

// ━━━ DOUBLE BUFFERING ━━━
/*
React maintains TWO fiber trees:
1. CURRENT tree — what's on screen now
2. WORK-IN-PROGRESS tree — being built during render

On commit: WIP tree becomes the new CURRENT tree (pointer swap).
Old current tree is recycled for the next update (memory efficient).

current tree:   [A] → [B] → [C]
                 ↕      ↕      ↕     (alternate pointers)
WIP tree:       [A'] → [B'] → [C']

After commit:   [A'] → [B'] → [C']  ← now current
*/

// ━━━ PRIORITY LANES (React 18 Concurrent Features) ━━━
/*
Different updates have different priorities:

SyncLane          → Highest (text input, clicks) — immediate
InputContinuousLane → Mouse move, scroll
DefaultLane       → Data fetching, normal setState
TransitionLane    → useTransition updates — can be interrupted
IdleLane          → Lowest (offscreen, prefetch)

React processes high-priority updates first.
Low-priority work can be interrupted and restarted.
*/

// ━━━ THE WORK LOOP (Simplified) ━━━
/*
function workLoop(deadline) {
  while (nextUnitOfWork && deadline.timeRemaining() > 0) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  
  if (!nextUnitOfWork && wipRoot) {
    commitRoot(); // Phase 2: Apply all changes
  }
  
  requestIdleCallback(workLoop); // Schedule next batch
}

function performUnitOfWork(fiber) {
  // 1. Do work for this fiber (call component function, diff, etc.)
  // 2. Return next unit of work (child → sibling → uncle)
  if (fiber.child) return fiber.child;
  
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) return nextFiber.sibling;
    nextFiber = nextFiber.return; // Go up to parent
  }
}
*/

/*
🎯 INTERVIEW:
Q: "What is React Fiber?"
A: React's reconciliation engine that uses a linked-list tree structure
   to enable incremental rendering. It can pause/resume work, prioritize
   updates, and prevent UI freezing.

Q: "What are the two phases of rendering?"
A: Render phase (interruptible, builds WIP tree, no DOM changes) and
   Commit phase (synchronous, applies DOM mutations atomically).

Q: "What is Concurrent Mode?"
A: React's ability to work on multiple tasks simultaneously, interrupting
   low-priority work for high-priority updates. Enabled by Fiber.

Q: "What is double buffering in React?"
A: React maintains current and work-in-progress fiber trees.
   On commit, it swaps the pointer. Old tree is recycled.
*/

console.log("✅ Task 5.2 — React Fiber Architecture understood!");
