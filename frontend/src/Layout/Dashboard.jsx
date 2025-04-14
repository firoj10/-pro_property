import React from 'react';
import ChartComponent from '../Components/ChartComponent/ChartComponent';

const Dashboard = () => {
  const cards = [
    {
      title: 'State Management',
      icon: (
        <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12l9-5-9-5-9 5 9 5z" />
        </svg>
      ),
    },
    {
      title: 'Tower Management',
      icon: (
        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 21v-2a4 4 0 014-4h8a4 4 0 014 4v2" />
          <circle cx={12} cy={7} r={4} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
        </svg>
      ),
    },
    {
      title: 'Member Management',
      icon: (
        <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 21v-2a4 4 0 00-3-3.87M8 21v-2a4 4 0 013-3.87M12 7a4 4 0 110-8 4 4 0 010 8z"
          />
        </svg>
      ),
    },
    {
      title: 'Community Management',
      icon: (
        <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10M7 11h4m-4 4h10" />
        </svg>
      ),
    },
    {
      title: 'Floor Unit Staff',
      icon: (
        <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v4a1 1 0 001 1h3m10-5h3a1 1 0 011 1v4m-5 5v4a1 1 0 001 1h3m-10-5H4a1 1 0 01-1-1v-4"
          />
        </svg>
      ),
    },
    {
      title: 'Community staff',
      icon: (
        <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v4a1 1 0 001 1h3m10-5h3a1 1 0 011 1v4m-5 5v4a1 1 0 001 1h3m-10-5H4a1 1 0 01-1-1v-4"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="p-3 bg-gray-100 min-h-screen rounded-lg dark:bg-gray-900">
      

      
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 transition transform hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700">
                {card.icon}
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{card.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Manage your {card.title.toLowerCase()} efficiently.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-gray-800 dark:text-white">125</span>
              <span className="ml-2 text-sm text-green-500">+15%</span>
            </div>
          </div>
        ))}
      </div>
      <section className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Monthly Revenue</h3>
        <ChartComponent />
      </section>
      <section className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Latest Updates</h3>
        <div className="mt-4 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <p className="text-gray-600 dark:text-gray-300">
            Display recent activities, notifications, or analytics charts here.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
