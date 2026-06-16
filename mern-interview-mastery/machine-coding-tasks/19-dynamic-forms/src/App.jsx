import { useState } from 'react';
import './App.css';

// Form schemas configuration database presets
const SCHEMAS = {
  contact: [
    { name: 'fullName', type: 'text', label: 'Full Name', required: true, minLength: 3 },
    { name: 'email', type: 'email', label: 'Email Address', required: true },
    { name: 'topic', type: 'select', label: 'Support Topic', options: ['Technical Feedback', 'Billing Question', 'Partnership Opportunity'], required: true },
    { name: 'subscribe', type: 'checkbox', label: 'Subscribe to Newsletter', required: false },
    { name: 'frequency', type: 'select', label: 'Newsletter Frequency', options: ['Daily digest', 'Weekly summary'], condition: { field: 'subscribe', value: true } }
  ],
  job: [
    { name: 'applicantName', type: 'text', label: 'Applicant Name', required: true, minLength: 2 },
    { name: 'roleApplied', type: 'select', label: 'Position', options: ['MERN Stack Developer', 'System Architect', 'UI/UX Designer'], required: true },
    { name: 'experienceYears', type: 'number', label: 'Years of Experience', required: true, min: 0 },
    { name: 'hasPortfolio', type: 'checkbox', label: 'Do you have a portfolio?', required: false },
    { name: 'portfolioUrl', type: 'text', label: 'Portfolio Link', required: true, condition: { field: 'hasPortfolio', value: true } }
  ]
};

function App() {
  const [activeSchemaKey, setActiveSchemaKey] = useState('contact');
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const activeSchema = SCHEMAS[activeSchemaKey];

  const handleSchemaChange = (key) => {
    setActiveSchemaKey(key);
    setFormData({});
    setErrors({});
    setSubmittedData(null);
  };

  const handleInputChange = (fieldName, value, type) => {
    const parsedValue = type === 'checkbox' ? value : value;
    setFormData(prev => ({
      ...prev,
      [fieldName]: parsedValue
    }));
    // Clear field error
    if (errors[fieldName]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[fieldName];
        return copy;
      });
    }
  };

  // Evaluate conditional field visibility
  const isFieldVisible = (field) => {
    if (!field.condition) return true;
    const triggerVal = formData[field.condition.field];
    return triggerVal === field.condition.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    activeSchema.forEach(field => {
      // Validate only if field is visible
      if (!isFieldVisible(field)) return;

      const val = formData[field.name];

      // Check required
      if (field.required && (val === undefined || val === '' || val === false)) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }

      // Check minLength
      if (field.minLength && typeof val === 'string' && val.length < field.minLength) {
        newErrors[field.name] = `${field.label} must be at least ${field.minLength} characters`;
      }

      // Check numeric min
      if (field.type === 'number' && field.min !== undefined && Number(val) < field.min) {
        newErrors[field.name] = `${field.label} must be at least ${field.min}`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmittedData(null);
    } else {
      setErrors({});
      // Filter out keys of fields that are currently hidden
      const cleanData = {};
      activeSchema.forEach(field => {
        if (isFieldVisible(field)) {
          cleanData[field.name] = formData[field.name] || (field.type === 'checkbox' ? false : '');
        }
      });
      setSubmittedData(cleanData);
    }
  };

  return (
    <div className="dynamic-container">
      <header className="dynamic-header">
        <div className="brand">
          <span className="logo-icon">📝</span>
          <div>
            <h1>FormArchitect</h1>
            <p className="subtitle">MERN Level - JSON Schema-Driven Form Generation, Visibilities & JSON Outputs</p>
          </div>
        </div>
      </header>

      <div className="dynamic-grid">
        {/* Schema Control Panel */}
        <aside className="schema-sidebar card">
          <h2>Select Preset Schema</h2>
          <div className="schema-buttons">
            <button
              className={`btn btn-secondary btn-block ${activeSchemaKey === 'contact' ? 'active' : ''}`}
              onClick={() => handleSchemaChange('contact')}
            >
              ✉️ Contact Details Form
            </button>
            <button
              className={`btn btn-secondary btn-block ${activeSchemaKey === 'job' ? 'active' : ''}`}
              onClick={() => handleSchemaChange('job')}
            >
              💼 Job Application Form
            </button>
          </div>

          <div className="schema-preview-box">
            <h3>Schema Configuration (JSON)</h3>
            <pre><code>{JSON.stringify(activeSchema, null, 2)}</code></pre>
          </div>
        </aside>

        {/* Dynamic Form Render Pane */}
        <main className="form-main-pane card">
          <h2>Form Representation</h2>
          
          <form onSubmit={handleSubmit} className="generated-form">
            {activeSchema.map(field => {
              if (!isFieldVisible(field)) return null;

              return (
                <div key={field.name} className="form-group">
                  <label>
                    {field.label} {field.required && <span className="req">*</span>}
                  </label>

                  {field.type === 'select' ? (
                    <select
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value, 'select')}
                    >
                      <option value="">-- Select option --</option>
                      {field.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : field.type === 'checkbox' ? (
                    <div className="checkbox-row-wrapper">
                      <input
                        type="checkbox"
                        id={`chk-${field.name}`}
                        checked={formData[field.name] || false}
                        onChange={(e) => handleInputChange(field.name, e.target.checked, 'checkbox')}
                      />
                      <label htmlFor={`chk-${field.name}`} className="checkbox-label-custom">
                        {field.label}
                      </label>
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value, field.type)}
                    />
                  )}

                  {errors[field.name] && (
                    <span className="field-error-msg">{errors[field.name]}</span>
                  )}
                </div>
              );
            })}

            <button type="submit" className="btn btn-primary btn-block">Submit JSON Payload</button>
          </form>

          {/* Form JSON Submit output */}
          {submittedData && (
            <div className="submitted-output-box">
              <h3>Validated JSON Output</h3>
              <pre><code>{JSON.stringify(submittedData, null, 2)}</code></pre>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
