/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from 'react-router-dom';
import { ActivityCard, SearchActivity } from '../components';
import customFetch from '../util/customFetch';
import { toastService } from '../util/toastUtil';

export const activitiesLoader = async () => {
  try {
    const { data } = await customFetch('/activities');
    return { data };
  } catch (error) {
    toastService.error(
      error?.response?.data?.msg || 'Failed to fetch activities'
    );
  }
};

const AllActivities = () => {
  const { data } = useLoaderData();
  return (
    <div>
      <SearchActivity />
      <div className='flex flex-col md:grid grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-4'>
        {data?.activities?.map((activity) => (
          <ActivityCard key={activity._id} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default AllActivities;
