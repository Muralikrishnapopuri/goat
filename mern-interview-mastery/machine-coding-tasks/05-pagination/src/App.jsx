import { useState } from 'react';
import './App.css';

// Generating 100 mock logs for expert debugging demo
const LOGS = Array.from({ length: 100 }, (_, i) => {
  const id = i + 1;
  const services = ['AuthService', 'GatewayRouter', 'AggregationEngine', 'DbCluster', 'CacheManager'];
  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
  const paths = ['/api/v1/auth/login', '/api/v1/data/aggregate', '/api/v1/user/profile', '/api/v1/cache/flush', '/api/v1/order/checkout'];
  const statuses = [200, 201, 400, 401, 403, 404, 500];

  const service = services[id % services.length];
  const method = methods[id % methods.length];
  const path = paths[id % paths.length];
  const status = statuses[id % statuses.length];
  
  let severity = 'info';
  if (status >= 400 && status < 500) severity = 'warning';
  if (status >= 500) severity = 'critical';

  return {
    id: `TX-${1000 + id}`,
    timestamp: new Date(Date.now() - (100 - id) * 60 * 1000).toISOString().replace('T', ' ').substring(0, 19),
    service,
    action: `${method} ${path}`,
    status,
    severity,
    responseTime: Math.round(10 + Math.random() * 490)
  };
});

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [severityFilter, setSeverityFilter] = useState('all');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1); // Reset page on resize
  };

  // Filter logs first
  const filteredLogs = LOGS.filter(log => 
    severityFilter === 'all' ? true : log.severity === severityFilter
  );

  const totalLogs = filteredLogs.length;
  const totalPages = Math.ceil(totalLogs / pageSize) || 1;

  // Ensure current page is bounded
  const activePage = Math.min(currentPage, totalPages);

  // Paginated logs
  const startIndex = (activePage - 1) * pageSize;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + pageSize);

  // Generate range of page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, activePage - 2);
      let end = Math.min(totalPages, start + maxVisible - 1);

      if (end === totalPages) {
        start = Math.max(1, end - maxVisible + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    return pages;
  };

  return (
    <div className="pagination-container">
      <header className="pagination-header">
        <div className="brand">
          <span className="logo-icon">📊</span>
          <div>
            <h1>LogConsole</h1>
            <p className="subtitle">MERN Level - Premium Table Pagination & Large Dataset Control</p>
          </div>
        </div>
      </header>

      <div className="pagination-grid card">
        <div className="table-controls">
          <div className="page-size-selector">
            <span>Show</span>
            <select value={pageSize} onChange={handlePageSizeChange}>
              <option value={5}>5 entries</option>
              <option value={10}>10 entries</option>
              <option value={20}>20 entries</option>
              <option value={50}>50 entries</option>
            </select>
          </div>

          <div className="filter-severity">
            <span>Filter Severity:</span>
            <div className="tabs">
              {['all', 'info', 'warning', 'critical'].map(sev => (
                <button
                  key={sev}
                  className={`tab ${severityFilter === sev ? 'active' : ''}`}
                  onClick={() => { setSeverityFilter(sev); setCurrentPage(1); }}
                >
                  {sev.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="table-wrapper">
          <table className="log-table">
            <thead>
              <tr>
                <th>TX ID</th>
                <th>Timestamp</th>
                <th>Service Name</th>
                <th>Action Method</th>
                <th>HTTP Status</th>
                <th>Severity</th>
                <th>Response</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLogs.length === 0 ? (
                <tr>
                  <td colSpan="7" className="no-data">No transaction logs match filters.</td>
                </tr>
              ) : (
                paginatedLogs.map(log => (
                  <tr key={log.id} className={`row-severity-${log.severity}`}>
                    <td><code>{log.id}</code></td>
                    <td className="timestamp">{log.timestamp}</td>
                    <td><span className="badge-service">{log.service}</span></td>
                    <td><code>{log.action}</code></td>
                    <td>
                      <span className={`badge-status status-${log.status >= 500 ? '5xx' : log.status >= 400 ? '4xx' : '2xx'}`}>
                        {log.status}
                      </span>
                    </td>
                    <td>
                      <span className={`badge-severity severity-${log.severity}`}>
                        {log.severity}
                      </span>
                    </td>
                    <td className="response-time">{log.responseTime}ms</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="pagination-footer">
          <div className="showing-entries">
            Showing {totalLogs === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + pageSize, totalLogs)} of {totalLogs} entries
          </div>

          <div className="pagination-nav">
            <button
              className="nav-btn"
              onClick={() => handlePageChange(1)}
              disabled={activePage === 1}
              title="First Page"
            >
              «
            </button>
            <button
              className="nav-btn"
              onClick={() => handlePageChange(activePage - 1)}
              disabled={activePage === 1}
              title="Previous Page"
            >
              ‹
            </button>

            {getPageNumbers().map(p => (
              <button
                key={p}
                className={`page-btn ${activePage === p ? 'active' : ''}`}
                onClick={() => handlePageChange(p)}
              >
                {p}
              </button>
            ))}

            <button
              className="nav-btn"
              onClick={() => handlePageChange(activePage + 1)}
              disabled={activePage === totalPages}
              title="Next Page"
            >
              ›
            </button>
            <button
              className="nav-btn"
              onClick={() => handlePageChange(totalPages)}
              disabled={activePage === totalPages}
              title="Last Page"
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
