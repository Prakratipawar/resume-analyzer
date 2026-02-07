export const COLORS = {
  primary: '#4a6cf7',
  primaryGradient: 'linear-gradient(135deg, #667eea, #764ba2)',
  white: '#ffffff',
  black: '#000000',
  gray100: '#f8f9fa',
  gray200: '#e9ecef',
  gray300: '#dee2e6',
  gray500: '#6c757d',
  gray700: '#495057',
};

export const PAGE_STYLES = {
  fullPageGradient: {
    minHeight: 'calc(100vh - 70px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    padding: '20px'
  }
};

export const CARD_STYLES = {
  featureCard: {
    width: '800px',
    maxWidth: '95%',
    background: '#fff',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
  }
};

export const BUTTON_STYLES = {
  primary: {
    width: '100%',
    maxWidth: '600px',
    padding: '16px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
    cursor: 'pointer'
  },
  outline: {
    padding: '8px 16px',
    borderRadius: '8px',
    border: '1px solid #667eea',
    background: 'transparent',
    color: '#667eea',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer'
  }
};

export const INPUT_STYLES = {
  textarea: {
    width: '100%',
    maxWidth: '600px',
    padding: '16px',
    borderRadius: '12px',
    border: '2px solid #e0e0e0',
    fontSize: '15px',
    resize: 'vertical',
    minHeight: '200px',
    fontFamily: 'inherit',
    lineHeight: '1.5',
    transition: 'border-color 0.3s'
  }
};