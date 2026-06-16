import { useState } from 'react';
import './App.css';

// Reusable Table Component definition
function DataTable({ columns, data, initialSortKey = '', rowsPerPage = 5 }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: initialSortKey, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState(new Set());

  // Handle row sorting trigger
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Checkbox interactions
  const handleSelectAll = (e, currentData) => {
    if (e.target.checked) {
      const allIds = currentData.map(item => item.id);
      setSelectedRows(new Set(allIds));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id) => {
    const updated = new Set(selectedRows);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setSelectedRows(updated);
  };

  // Filter and sort computation
  const filteredData = data.filter(item => {
    return columns.some(col => {
      const val = item[col.key];
      if (val === null || val === undefined) return false;
      return String(val).toLowerCase().includes(searchQuery.toLowerCase());
    });
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    }
    
    const aStr = String(aVal).toLowerCase();
    const bStr = String(bVal).toLowerCase();
    return sortConfig.direction === 'asc' 
      ? aStr.localeCompare(bStr) 
      : bStr.localeCompare(aStr);
  });

  // Paginate calculation
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage) || 1;
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="reusable-table-widget">
      {/* Search Header */}
      <div className="table-actions-bar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Type query to filter grid rows..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div className="selection-status">
          Selected: <strong>{selectedRows.size}</strong> rows
        </div>
      </div>

      {/* Main Grid */}
      <div className="table-wrapper">
        <table className="custom-data-table">
          <thead>
            <tr>
              <th className="checkbox-col">
                <input
                  type="checkbox"
                  onChange={(e) => handleSelectAll(e, paginatedData)}
                  checked={paginatedData.length > 0 && paginatedData.every(item => selectedRows.has(item.id))}
                />
              </th>
              {columns.map(col => (
                <th 
                  key={col.key} 
                  onClick={() => requestSort(col.key)}
                  className={`sortable-header ${sortConfig.key === col.key ? 'active' : ''}`}
                >
                  <div className="header-cell-content">
                    {col.title}
                    <span className="sort-arrow">
                      {sortConfig.key === col.key 
                        ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') 
                        : ' ⇅'}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="no-data">No rows match criteria.</td>
              </tr>
            ) : (
              paginatedData.map(item => (
                <tr key={item.id} className={selectedRows.has(item.id) ? 'row-selected' : ''}>
                  <td className="checkbox-col">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(item.id)}
                      onChange={() => handleSelectRow(item.id)}
                    />
                  </td>
                  {columns.map(col => (
                    <td key={col.key}>
                      {col.render ? col.render(item[col.key], item) : item[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="table-footer">
        <span className="showing-info">
          Page {currentPage} of {totalPages} ({totalItems} total entries)
        </span>
        <div className="pagination-buttons">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="btn-p"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              onClick={() => setCurrentPage(idx + 1)}
              className={`page-num-btn ${currentPage === idx + 1 ? 'active' : ''}`}
            >
              {idx + 1}
            </button>
          ))}
          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="btn-p"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

// Parent demo consumer component
const USER_DATA = [
  { id: 1, name: 'Alice Thorne', role: 'DevOps Lead', rating: 4.8, status: 'active' },
  { id: 2, name: 'Bob Sinclair', role: 'MERN Specialist', rating: 4.9, status: 'active' },
  { id: 3, name: 'Clara Oswald', role: 'QA Automation', rating: 4.2, status: 'inactive' },
  { id: 4, name: 'David Vance', role: 'Security Architect', rating: 4.7, status: 'active' },
  { id: 5, name: 'Emily Watson', role: 'UI Engineer', rating: 4.5, status: 'active' },
  { id: 6, name: 'Frank Reynolds', role: 'Database Admin', rating: 4.1, status: 'inactive' }
];

function App() {
  const tableColumns = [
    { key: 'name', title: 'Employee Name' },
    { key: 'role', title: 'System Role' },
    { 
      key: 'rating', 
      title: 'Performance Score',
      render: (rating) => `⭐ ${rating.toFixed(1)} / 5.0`
    },
    { 
      key: 'status', 
      title: 'Status Badge',
      render: (status) => (
        <span className={`status-badge status-${status}`}>
          {status}
        </span>
      )
    }
  ];

  return (
    <div className="table-page-container">
      <header className="table-page-header">
        <div className="brand">
          <span className="logo-icon">📋</span>
          <div>
            <h1>GridPro</h1>
            <p className="subtitle">MERN Level - Reusable Generic Table Components with Custom Cell Renderers</p>
          </div>
        </div>
      </header>

      <div className="card">
        <h2>Corporate Directory</h2>
        <p className="description-text">Generic table passing columns, data props, sort handlers, checkbox states & paginate rules.</p>
        
        <DataTable
          columns={tableColumns}
          data={USER_DATA}
          initialSortKey="name"
          rowsPerPage={4}
        />
      </div>
    </div>
  );
}

export default App;
