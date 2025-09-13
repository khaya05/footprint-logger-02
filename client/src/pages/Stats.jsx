/* eslint-disable react-refresh/only-export-components */
import { Card, CardContent, NoActivities } from '../components';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { FiTrendingUp, FiUsers, FiCalendar } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';
import customFetch from '../util/customFetch';
import { toastService } from '../util/toastUtil';
import { Link, useLoaderData } from 'react-router-dom';

const dummyLeaderboard = [
  { id: 1, name: 'Alice', avg: 22 },
  { id: 2, name: 'Bob', avg: 25 },
  { id: 3, name: 'Lerato', avg: 27 },
  { id: 4, name: 'Kwame', avg: 29 },
  { id: 5, name: 'Maya', avg: 31 },
];

export const dashboardLoaderStats = async () => {
  try {
    const { data: stats } = await customFetch('/activities/stats');
    const { data: recent } = await customFetch(
      '/activities?sort=newest&limit=5'
    );

    return { stats, recent };
  } catch (error) {
    toastService.error(error?.response?.data?.msg || 'Failed to fetch data.');
    return { error: error?.response?.data?.msg };
  }
};

// userStats
const Dashboard = () => {
  const { stats, recent } = useLoaderData();

  if (recent?.activities.length > 0) {
    return (
      <div className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <Card>
            <CardContent className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-500'>Total Emissions</p>
                <h2 className='text-xl font-semibold'>
                  {stats.userStats.totalEmissions.toFixed(2)} kg CO₂
                </h2>
              </div>
              <FaLeaf className='text-green-500 text-2xl' />
            </CardContent>
          </Card>

          <Card>
            <CardContent className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-500'>Your Monthly Emissions</p>
                <h2 className='text-xl font-semibold'>
                  {stats.monthlySummary.totalEmissions.toFixed(2)} kg CO₂
                </h2>
              </div>
              <FiCalendar className='text-orange-500 text-2xl' />
            </CardContent>
          </Card>

          <Card>
            <CardContent className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-500'>Your Monthly Avg</p>
                <h2 className='text-xl font-semibold'>
                  {stats.monthlySummary.avgEmission.toFixed(2)} kg CO₂
                </h2>
              </div>
              <FiCalendar className='text-orange-500 text-2xl' />
            </CardContent>
          </Card>

          <Card>
            <CardContent className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-500'>Your Weekly Emissions</p>
                <h2 className='text-xl font-semibold'>
                  {stats.weeklySummary.totalEmissions.toFixed(2)} kg CO₂
                </h2>
              </div>
              <FiTrendingUp className='text-blue-500 text-2xl' />
            </CardContent>
          </Card>

          <Card>
            <CardContent className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-500'>Your Weekly Avg</p>
                <h2 className='text-xl font-semibold'>
                  {stats.weeklySummary.avgEmission.toFixed(2)} kg CO₂
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
                  {stats.communityAvg.toFixed(2)} kg CO₂
                </h2>
              </div>
              <FiUsers className='text-purple-500 text-2xl' />
            </CardContent>
          </Card>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Card className='md:col-span-2'>
            <CardContent>
              <h3 className='text-lg font-semibold mb-4'>Weekly Emissions</h3>
              <ResponsiveContainer width='100%' height={200}>
                <BarChart data={recent.activities.emissions}>
                  <XAxis dataKey='day' />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey='emissions' fill='#22c55e' />
                </BarChart>
              </ResponsiveContainer>
              {/* <p className='mt-2 text-sm text-gray-500'>
              🔥 Streak: {dummyUserStats.streak} days
            </p> */}
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

        <Card>
          <CardContent>
            <div className='w-full flex justify-between items-center'>
              <h3 className='text-lg font-semibold mb-4'>
                Your Recent Activities
              </h3>
              <Link
                to='add-activity'
                className='bg-gray-200 px-2 py-1 rounded-sm hover:cursor-pointer hover:bg-green-500 hover:text-white transition-all'
              >
                + Add Activity
              </Link>
            </div>
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
                {recent.activities.map((log) => (
                  <tr key={log._id} className='border-b'>
                    <td className='py-2'>{log.date.split('T')[0]}</td>
                    <td>{log.activity}</td>
                    <td className='capitalize'>{log.category}</td>
                    <td className='text-right'>{log.emissions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link className='my-4 mx-auto text-green-500' to='activities'>
              See all activities
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return <NoActivities />;
  }
};

export default Dashboard;
