import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --error-color: #ef4444;
    --text-primary: #1f2937;
    --text-secondary: #6b7280;
    --text-light: #9ca3af;
    --background-light: #f9fafb;
    --background-white: #ffffff;
    --border-color: #e5e7eb;
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    --border-radius: 0.5rem;
    --border-radius-lg: 0.75rem;
    --transition: all 0.2s ease-in-out;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    line-height: 1.6;
    color: var(--text-primary);
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    min-height: 100vh;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .card {
    background: var(--background-white);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
    padding: 2rem;
    margin-bottom: 2rem;
    border: 1px solid var(--border-color);
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: var(--border-radius);
    font-size: 0.875rem;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    gap: 0.5rem;
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    color: white;
    
    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }
  }

  .btn-secondary {
    background: var(--background-white);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
    
    &:hover:not(:disabled) {
      background: var(--background-light);
      transform: translateY(-1px);
    }
  }

  .btn-danger {
    background: var(--error-color);
    color: white;
    
    &:hover:not(:disabled) {
      background: #dc2626;
      transform: translateY(-1px);
    }
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  .form-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: 0.875rem;
    transition: var(--transition);
    background: var(--background-white);
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgb(102 126 234 / 0.1);
    }
    
    &::placeholder {
      color: var(--text-light);
    }
  }

  .form-textarea {
    min-height: 100px;
    resize: vertical;
  }

  .form-error {
    color: var(--error-color);
    font-size: 0.75rem;
    margin-top: 0.25rem;
  }

  .grid {
    display: grid;
    gap: 1.5rem;
  }

  .grid-2 {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .grid-3 {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  .flex {
    display: flex;
  }

  .flex-col {
    flex-direction: column;
  }

  .items-center {
    align-items: center;
  }

  .justify-center {
    justify-content: center;
  }

  .justify-between {
    justify-content: space-between;
  }

  .gap-2 {
    gap: 0.5rem;
  }

  .gap-4 {
    gap: 1rem;
  }

  .text-center {
    text-align: center;
  }

  .text-sm {
    font-size: 0.875rem;
  }

  .text-lg {
    font-size: 1.125rem;
  }

  .text-xl {
    font-size: 1.25rem;
  }

  .text-2xl {
    font-size: 1.5rem;
  }

  .text-3xl {
    font-size: 1.875rem;
  }

  .font-medium {
    font-weight: 500;
  }

  .font-semibold {
    font-weight: 600;
  }

  .font-bold {
    font-weight: 700;
  }

  .mb-2 {
    margin-bottom: 0.5rem;
  }

  .mb-4 {
    margin-bottom: 1rem;
  }

  .mb-6 {
    margin-bottom: 1.5rem;
  }

  .mb-8 {
    margin-bottom: 2rem;
  }

  .mt-2 {
    margin-top: 0.5rem;
  }

  .mt-4 {
    margin-top: 1rem;
  }

  .mt-6 {
    margin-top: 1.5rem;
  }

  .mt-8 {
    margin-top: 2rem;
  }

  .p-4 {
    padding: 1rem;
  }

  .p-6 {
    padding: 1.5rem;
  }

  .py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }

  .py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .rounded {
    border-radius: var(--border-radius);
  }

  .rounded-lg {
    border-radius: var(--border-radius-lg);
  }

  .shadow {
    box-shadow: var(--shadow-md);
  }

  .shadow-lg {
    box-shadow: var(--shadow-lg);
  }

  .loading-spinner {
    border: 2px solid var(--border-color);
    border-top: 2px solid var(--primary-color);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 0.5rem;
    }
    
    .card {
      padding: 1.5rem;
      margin-bottom: 1rem;
    }
    
    .grid-2,
    .grid-3 {
      grid-template-columns: 1fr;
    }
  }
`;