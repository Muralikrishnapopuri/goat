import { useState } from 'react';
import './App.css';

// Monthly sales database matching pure SVG representation
const CHART_DATA = [
  { month: 'Jan', revenue: 4200, count: 120 },
  { month: 'Feb', revenue: 5800, count: 145 },
  { month: 'Mar', revenue: 7100, count: 180 },
  { month: 'Apr', revenue: 6400, count: 165 },
  { month: 'May', revenue: 8900, count: 210 },
  { month: 'Jun', revenue: 9800, count: 240 }
];

const RECENT_TRANSACTIONS = [
  { id: 'TXN-9081', user: 'Sophia Bennett', email: 'sophia@example.com', product: 'Apex GPU', amount: 799.99, status: 'completed', date: '2026-06-16' },
  { id: 'TXN-9082', user: 'Liam Patterson', email: 'liam@example.com', product: 'Nova Keyboard', amount: 149.99, status: 'completed', date: '2026-06-16' },
  { id: 'TXN-9083', user: 'Marcus Vance', email: 'marcus@example.com', product: 'Aether Router', amount: 129.99, status: 'pending', date: '2026-06-15' },
  { id: 'TXN-9084', user: 'Elena Rostova', email: 'elena@example.com', product: 'Quantum Core CPU', amount: 299.99, status: 'failed', date: '2026-06-14' }
];

function App() {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const maxRevenue = Math.max(...CHART_DATA.map(d => d.revenue));
  const svgHeight = 200;
  const svgWidth = 500;
  const padding = 40;

  return (
    <div className="dashboard-container">
      {/* Sidebar navigation */}
      <aside className="dashboard-sidebar">
        <div className="brand">
          <span className="logo-icon">💠</span>
          <div>
            <h2>CoreControl</h2>
            <p>Admin Operations</p>
          </div>
        </div>

        <nav className="nav-links">
          <button 
            className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview Stats
          </button>
          <button 
            className={`nav-link ${activeTab === 'transactions' ? 'active' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            💳 Transactions
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile-widget">
            <div className="widget-avatar">MK</div>
            <div className="widget-info">
              <h4>Murali Krishna</h4>
              <span>System Architect</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content viewport */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-title">
            <h1>Operational Dashboard</h1>
            <p className="subtitle">MERN Level - Premium Analytics, Live SVG Renderers & Layout Grids</p>
          </div>
        </header>

        {activeTab === 'overview' ? (
          <div className="overview-tab">
            {/* KPI Cards row */}
            <div className="kpi-grid">
              <div className="kpi-card card">
                <div className="kpi-header">
                  <span className="kpi-title">Gross Revenue</span>
                  <span className="kpi-growth positive">+18.2%</span>
                </div>
                <div className="kpi-value">$42,300</div>
                <p className="kpi-footer">Compared to last month</p>
              </div>

              <div className="kpi-card card">
                <div className="kpi-header">
                  <span className="kpi-title">Orders Processed</span>
                  <span className="kpi-growth positive">+10.5%</span>
                </div>
                <div className="kpi-value">1,060</div>
                <p className="kpi-footer">Completed database rows</p>
              </div>

              <div className="kpi-card card">
                <div className="kpi-header">
                  <span className="kpi-title">API Response Avg</span>
                  <span className="kpi-growth neutral">0.0%</span>
                </div>
                <div className="kpi-value">145ms</div>
                <p className="kpi-footer">Healthy latency times</p>
              </div>
            </div>

            {/* Visual SVG Chart Card */}
            <div className="chart-card card">
              <div className="chart-header-row">
                <div>
                  <h3>Revenue Performance (H1 2026)</h3>
                  <p className="subtitle">Hover columns to analyze monthly transactions count</p>
                </div>
                {selectedMonth && (
                  <div className="month-popover">
                    <strong>{selectedMonth.month}</strong>: {selectedMonth.count} orders (${selectedMonth.revenue} revenue)
                  </div>
                )}
              </div>

              <div className="chart-wrapper">
                <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="svg-chart">
                  {/* Grid Lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
                    const y = padding + (svgHeight - padding * 2) * ratio;
                    return (
                      <g key={index}>
                        <line 
                          x1={padding} 
                          y1={y} 
                          x2={svgWidth - padding} 
                          y2={y} 
                          className="chart-grid-line" 
                        />
                        <text 
                          x={padding - 10} 
                          y={y + 4} 
                          className="chart-axis-label text-right"
                        >
                          {Math.round(maxRevenue * (1 - ratio))}
                        </text>
                      </g>
                    );
                  })}

                  {/* Columns */}
                  {CHART_DATA.map((d, i) => {
                    const colWidth = 40;
                    const spacing = (svgWidth - padding * 2) / CHART_DATA.length;
                    const x = padding + spacing * i + (spacing - colWidth) / 2;
                    const colHeight = (d.revenue / maxRevenue) * (svgHeight - padding * 2);
                    const y = svgHeight - padding - colHeight;

                    return (
                      <g 
                        key={i}
                        onMouseEnter={() => setSelectedMonth(d)}
                        onMouseLeave={() => setSelectedMonth(null)}
                        className="bar-group"
                      >
                        <rect
                          x={x}
                          y={y}
                          width={colWidth}
                          height={colHeight}
                          rx="4"
                          className="chart-bar"
                        />
                        <text
                          x={x + colWidth / 2}
                          y={svgHeight - padding + 18}
                          className="chart-axis-label text-center"
                        >
                          {d.month}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Recent transactions under metrics */}
            <div className="transactions-card card">
              <h3>Recent Actions</h3>
              <div className="table-wrapper">
                <table className="txn-table">
                  <thead>
                    <tr>
                      <th>TXN ID</th>
                      <th>Client Name</th>
                      <th>Product</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RECENT_TRANSACTIONS.map(txn => (
                      <tr key={txn.id}>
                        <td><code>{txn.id}</code></td>
                        <td>
                          <div className="client-cell">
                            <strong>{txn.user}</strong>
                            <span>{txn.email}</span>
                          </div>
                        </td>
                        <td>{txn.product}</td>
                        <td className="amount">${txn.amount.toFixed(2)}</td>
                        <td>
                          <span className={`status-badge status-${txn.status}`}>
                            {txn.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="transactions-card card">
            <h2>Complete Transaction Logs</h2>
            <div className="table-wrapper">
              <table className="txn-table">
                <thead>
                  <tr>
                    <th>TXN ID</th>
                    <th>Client Name</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_TRANSACTIONS.map(txn => (
                    <tr key={txn.id}>
                      <td><code>{txn.id}</code></td>
                      <td>
                        <div className="client-cell">
                          <strong>{txn.user}</strong>
                          <span>{txn.email}</span>
                        </div>
                      </td>
                      <td>{txn.product}</td>
                      <td className="amount">${txn.amount.toFixed(2)}</td>
                      <td>
                        <span className={`status-badge status-${txn.status}`}>
                          {txn.status}
                        </span>
                      </td>
                      <td>{txn.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
