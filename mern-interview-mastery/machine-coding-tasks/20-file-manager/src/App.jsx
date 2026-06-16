import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentFolderId, setCurrentFolderId] = useState('root');
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('mern_file_manager');
    return saved ? JSON.parse(saved) : [
      { id: 'root', name: 'Root Directory', type: 'folder', parentId: null },
      { id: 'docs', name: 'Documentation', type: 'folder', parentId: 'root' },
      { id: 'src', name: 'Source Code', type: 'folder', parentId: 'root' },
      { id: 'readme', name: 'README.md', type: 'file', size: '2 KB', date: '2026-06-15', parentId: 'root' },
      { id: 'react_doc', name: 'reconciliation_guide.pdf', type: 'file', size: '420 KB', date: '2026-06-16', parentId: 'docs' },
      { id: 'index_js', name: 'index.js', type: 'file', size: '4 KB', date: '2026-06-16', parentId: 'src' }
    ];
  });

  const [newItemName, setNewItemName] = useState('');
  const [newItemType, setNewItemType] = useState('folder');

  useEffect(() => {
    localStorage.setItem('mern_file_manager', JSON.stringify(items));
  }, [items]);

  // Find parents to build breadcrumbs
  const getBreadcrumbs = () => {
    const trail = [];
    let current = items.find(item => item.id === currentFolderId);
    while (current) {
      trail.unshift(current);
      current = items.find(item => item.id === current.parentId);
    }
    return trail;
  };

  const handleCreateItem = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      type: newItemType,
      parentId: currentFolderId,
      date: new Date().toISOString().split('T')[0],
      ...(newItemType === 'file' ? { size: '1 KB' } : {})
    };

    setItems([...items, newItem]);
    setNewItemName('');
  };

  const handleDeleteItem = (id) => {
    if (id === 'root') return;
    if (window.confirm('Are you sure you want to delete this item?')) {
      // If folder, recursively delete children
      const toDelete = new Set([id]);
      let checkLength = 0;
      
      while (toDelete.size !== checkLength) {
        checkLength = toDelete.size;
        items.forEach(item => {
          if (toDelete.has(item.parentId)) {
            toDelete.add(item.id);
          }
        });
      }

      setItems(items.filter(item => !toDelete.has(item.id)));
      if (selectedItemId && toDelete.has(selectedItemId)) {
        setSelectedItemId(null);
      }
    }
  };

  const handleRenameItem = (id) => {
    const target = items.find(item => item.id === id);
    if (!target || id === 'root') return;

    const newName = prompt('Enter new name for ' + target.name, target.name);
    if (newName && newName.trim()) {
      setItems(items.map(item => 
        item.id === id ? { ...item, name: newName.trim() } : item
      ));
    }
  };

  // Filter children of current directory
  const currentItems = items.filter(item => item.parentId === currentFolderId);
  const selectedItem = items.find(item => item.id === selectedItemId);

  return (
    <div className="file-container">
      <header className="file-header">
        <div className="brand">
          <span className="logo-icon">📂</span>
          <div>
            <h1>VaultDrive</h1>
            <p className="subtitle">MERN Level - Hierarchical Directory Architectures, Breadcrumb Trails & Asset Operations</p>
          </div>
        </div>
      </header>

      {/* Creation and Breadcrumb Header bar */}
      <div className="actions-bar card">
        <div className="breadcrumbs">
          {getBreadcrumbs().map((b, index, arr) => (
            <span key={b.id}>
              <button 
                className="breadcrumb-btn"
                onClick={() => { setCurrentFolderId(b.id); setSelectedItemId(null); }}
              >
                {b.name}
              </button>
              {index < arr.length - 1 && <span className="separator">/</span>}
            </span>
          ))}
        </div>

        <form onSubmit={handleCreateItem} className="create-item-form">
          <input
            type="text"
            placeholder="Name item..."
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            required
          />
          <select value={newItemType} onChange={(e) => setNewItemType(e.target.value)}>
            <option value="folder">Folder</option>
            <option value="file">File</option>
          </select>
          <button type="submit" className="btn btn-primary btn-sm">Create</button>
        </form>
      </div>

      <div className="file-grid">
        {/* Main Files Display Grid */}
        <main className="files-viewcard card">
          <h2>Items List</h2>
          <div className="files-list-grid">
            {currentItems.length === 0 ? (
              <div className="empty-folder-state">
                <span className="empty-icon">📂</span>
                <p>This directory is empty.</p>
              </div>
            ) : (
              currentItems.map(item => (
                <div 
                  key={item.id} 
                  className={`file-item-card ${selectedItemId === item.id ? 'active' : ''}`}
                  onClick={() => setSelectedItemId(item.id)}
                  onDoubleClick={() => {
                    if (item.type === 'folder') {
                      setCurrentFolderId(item.id);
                      setSelectedItemId(null);
                    }
                  }}
                >
                  <span className="item-large-icon">{item.type === 'folder' ? '📁' : '📄'}</span>
                  <span className="item-name">{item.name}</span>
                  <div className="item-card-actions">
                    <button className="icon-action" onClick={(e) => { e.stopPropagation(); handleRenameItem(item.id); }}>✏️</button>
                    <button className="icon-action delete" onClick={(e) => { e.stopPropagation(); handleDeleteItem(item.id); }}>🗑️</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>

        {/* Selected Item Details Sidebar */}
        <aside className="details-sidebar card">
          <h2>Item Details</h2>
          {selectedItem ? (
            <div className="details-box">
              <span className="details-large-icon">
                {selectedItem.type === 'folder' ? '📁' : '📄'}
              </span>
              <h3>{selectedItem.name}</h3>
              <div className="specs-list">
                <p><strong>Type:</strong> {selectedItem.type === 'folder' ? 'Folder Directory' : 'Binary File'}</p>
                {selectedItem.type === 'file' && <p><strong>File Size:</strong> {selectedItem.size}</p>}
                <p><strong>Modified:</strong> {selectedItem.date || 'System default'}</p>
              </div>
            </div>
          ) : (
            <div className="no-details-placeholder">
              <p>Select a file or folder to view its specs details here.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default App;
