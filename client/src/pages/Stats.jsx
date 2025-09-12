import { Card, CardContent } from '../components';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { FiTrendingUp, FiUsers } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';

// Dummy data
const dummyUserStats = {
  total: 245,
  weeklyAvg: 35,
  streak: 6,
  weeklyData: [
    { day: 'Mon', emissions: 12 },
    { day: 'Tue', emissions: 18 },
    { day: 'Wed', emissions: 10 },
    { day: 'Thu', emissions: 20 },
    { day: 'Fri', emissions: 15 },
    { day: 'Sat', emissions: 8 },
    { day: 'Sun', emissions: 9 },
  ],
};

const dummyCommunityStats = { avg: 42 };

const dummyLeaderboard = [
  { id: 1, name: 'Alice', avg: 22 },
  { id: 2, name: 'Bob', avg: 25 },
  { id: 3, name: 'Lerato', avg: 27 },
  { id: 4, name: 'Kwame', avg: 29 },
  { id: 5, name: 'Maya', avg: 31 },
];

const dummyLogs = [
  {
    id: 1,
    date: '2025-09-01',
    activity: 'Car trip',
    category: 'Transport',
    emissions: 8,
  },
  {
    id: 2,
    date: '2025-09-02',
    activity: 'Beef meal',
    category: 'Food',
    emissions: 5,
  },
  {
    id: 3,
    date: '2025-09-04',
    activity: 'Flight',
    category: 'Travel',
    emissions: 60,
  },
  {
    id: 4,
    date: '2025-09-07',
    activity: 'Bus ride',
    category: 'Transport',
    emissions: 2,
  },
];

const Dashboard = () => {
  return (
    <div className='space-y-6'>
      {/* Summary cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Card>
          <CardContent className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500'>Total Emissions</p>
              <h2 className='text-xl font-semibold'>
                {dummyUserStats.total} kg CO₂
              </h2>
            </div>
            <FaLeaf className='text-green-500 text-2xl' />
          </CardContent>
        </Card>

        <Card>
          <CardContent className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500'>Your Weekly Avg</p>
              <h2 className='text-xl font-semibold'>
                {dummyUserStats.weeklyAvg} kg CO₂
              </h2>
            </div>
            <FiTrendingUp className='text-blue-500 text-2xl' />
          </CardContent>
        </Card>

        <Card>
          <CardContent className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-500'>Community Avg</p>
              <h2 className='text-xl font-semibold'>
                {dummyCommunityStats.avg} kg CO₂
              </h2>
            </div>
            <FiUsers className='text-purple-500 text-2xl' />
          </CardContent>
        </Card>
      </div>

      {/* Weekly summary + leaderboard */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Card className='md:col-span-2'>
          <CardContent>
            <h3 className='text-lg font-semibold mb-4'>Weekly Emissions</h3>
            <ResponsiveContainer width='100%' height={200}>
              <BarChart data={dummyUserStats.weeklyData}>
                <XAxis dataKey='day' />
                <YAxis />
                <Tooltip />
                <Bar dataKey='emissions' fill='#22c55e' />
              </BarChart>
            </ResponsiveContainer>
            <p className='mt-2 text-sm text-gray-500'>
              🔥 Streak: {dummyUserStats.streak} days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className='text-lg font-semibold mb-4'>Leaderboard</h3>
            <ul className='space-y-2'>
              {dummyLeaderboard.map((user, idx) => (
                <li key={user.id} className='flex justify-between text-sm'>
                  <span>
                    {idx + 1}. {user.name}
                  </span>
                  <span className='text-gray-600'>{user.avg} kg</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Logs table */}
      <Card>
        <CardContent>
          <h3 className='text-lg font-semibold mb-4'>Your Logs</h3>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b'>
                <th className='text-left py-2'>Date</th>
                <th className='text-left'>Activity</th>
                <th className='text-left'>Category</th>
                <th className='text-right'>Emissions (kg)</th>
              </tr>
            </thead>
            <tbody>
              {dummyLogs.map((log) => (
                <tr key={log.id} className='border-b'>
                  <td className='py-2'>{log.date}</td>
                  <td>{log.activity}</td>
                  <td>{log.category}</td>
                  <td className='text-right'>{log.emissions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
