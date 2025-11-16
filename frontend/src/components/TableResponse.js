import React from 'react';

const TableResponse = ({ data, isDarkMode }) => {
  if (!data || !data.headers || !data.rows) return null;

  return (
    <div className={`overflow-hidden rounded-2xl border smooth-transition hover-lift w-full ${
      isDarkMode ? 'border-gray-600' : 'border-gray-200'
    } shadow-lg`}>
      <div className="overflow-x-auto w-full">
        <table className={`w-full divide-y ${
          isDarkMode ? 'divide-gray-600' : 'divide-gray-200'
        }`}>
          <thead>
            <tr className={isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50/80'}>
              {data.headers.map((header, index) => (
                <th
                  key={index}
                  className={`px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  } whitespace-nowrap`}
                >
                  <div className="flex items-center space-x-2">
                    <span>{header}</span>
                    <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={`divide-y ${
            isDarkMode 
              ? 'divide-gray-600 bg-gray-800/30' 
              : 'divide-gray-200 bg-white/30'
          }`}>
            {data.rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`smooth-transition ${
                  isDarkMode 
                    ? 'hover:bg-gray-700/50' 
                    : 'hover:bg-gray-50/80'
                } ${rowIndex % 2 === 0 ? '' : isDarkMode ? 'bg-gray-700/20' : 'bg-gray-50/50'}`}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`px-6 py-4 text-sm smooth-transition ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-900'
                    } whitespace-nowrap`}
                  >
                    {cell.includes('$') || cell.includes('%') || cell.includes('/5') ? (
                      <span className={`font-semibold ${
                        cell.includes('$') 
                          ? 'text-green-500' 
                          : cell.includes('%') 
                            ? 'text-blue-500'
                            : 'text-yellow-500'
                      }`}>
                        {cell}
                      </span>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Table Footer */}
      <div className={`px-6 py-3 text-xs ${
        isDarkMode ? 'bg-gray-700/30 text-gray-400' : 'bg-gray-50/80 text-gray-500'
      } border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <span>{data.rows.length} rows × {data.headers.length} columns</span>
          <div className="flex items-center space-x-4">
            <button className={`smooth-transition hover:opacity-70 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              📋 Copy
            </button>
            <button className={`smooth-transition hover:opacity-70 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              📊 Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableResponse;