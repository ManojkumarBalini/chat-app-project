const mockSessions = [
    { id: '1', title: 'Project Discussion', timestamp: '2024-01-15 10:30' },
    { id: '2', title: 'Technical Questions', timestamp: '2024-01-15 14:20' },
    { id: '3', title: 'Code Review', timestamp: '2024-01-16 09:15' },
    { id: '4', title: 'API Documentation', timestamp: '2024-01-16 11:45' }
  ];
  
  const mockConversations = {
    '1': [
      { type: 'user', content: 'Can you show me some project metrics?' },
      { 
        type: 'assistant', 
        content: 'Here are the project metrics for Q1 2024:',
        tableData: {
          headers: ['Metric', 'Q1 Target', 'Q1 Actual', 'Status'],
          rows: [
            ['Completion Rate', '95%', '92%', 'Slightly Below'],
            ['User Satisfaction', '4.5/5', '4.7/5', 'Exceeded'],
            ['Budget Utilization', '100%', '97%', 'On Track'],
            ['Timeline Adherence', '100%', '98%', 'On Track']
          ]
        }
      }
    ],
    '2': [
      { type: 'user', content: 'What are the system requirements?' },
      { 
        type: 'assistant', 
        content: 'Here are the detailed system requirements:',
        tableData: {
          headers: ['Component', 'Minimum', 'Recommended'],
          rows: [
            ['CPU', 'Intel i5 8th Gen', 'Intel i7 11th Gen'],
            ['RAM', '8GB', '16GB'],
            ['Storage', '256GB SSD', '512GB SSD'],
            ['OS', 'Windows 10', 'Windows 11']
          ]
        }
      }
    ],
    '3': [
      { type: 'user', content: 'Review this code structure' },
      { 
        type: 'assistant', 
        content: 'I analyzed your code structure. Here are the findings:',
        tableData: {
          headers: ['File Type', 'Count', 'Size (KB)', 'Complexity'],
          rows: [
            ['JavaScript', '15', '245', 'Medium'],
            ['CSS', '8', '120', 'Low'],
            ['HTML', '5', '85', 'Low'],
            ['JSON', '3', '45', 'Low']
          ]
        }
      }
    ],
    '4': [
      { type: 'user', content: 'Show API endpoints' },
      { 
        type: 'assistant', 
        content: 'Available API endpoints for the project:',
        tableData: {
          headers: ['Method', 'Endpoint', 'Description', 'Auth Required'],
          rows: [
            ['GET', '/api/users', 'Get all users', 'Yes'],
            ['POST', '/api/users', 'Create user', 'Yes'],
            ['GET', '/api/sessions', 'Get sessions', 'No'],
            ['POST', '/api/chat', 'Send message', 'No']
          ]
        }
      }
    ]
  };
  
  const tableTemplates = [
    {
      headers: ['Product', 'Price', 'Stock', 'Rating'],
      rows: [
        ['Laptop', '$999', '45', '4.5/5'],
        ['Mouse', '$25', '120', '4.2/5'],
        ['Keyboard', '$79', '85', '4.7/5'],
        ['Monitor', '$299', '30', '4.8/5']
      ]
    },
    {
      headers: ['Team Member', 'Role', 'Tasks Completed', 'Performance'],
      rows: [
        ['John Doe', 'Developer', '15', 'Excellent'],
        ['Jane Smith', 'Designer', '12', 'Good'],
        ['Mike Johnson', 'QA', '18', 'Excellent'],
        ['Sarah Wilson', 'PM', '10', 'Good']
      ]
    },
    {
      headers: ['Feature', 'Status', 'Priority', 'ETA'],
      rows: [
        ['User Auth', 'Completed', 'High', 'N/A'],
        ['Chat Interface', 'In Progress', 'High', '2 days'],
        ['Database', 'Pending', 'Medium', '5 days'],
        ['Deployment', 'Not Started', 'Low', '7 days']
      ]
    }
  ];
  
  module.exports = { mockSessions, mockConversations, tableTemplates };