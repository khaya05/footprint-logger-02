/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from 'react-router-dom';
import { ActivityCard, SearchActivity } from '../components';
import customFetch from '../util/customFetch';
import { toastService } from '../util/toastUtil';
import { createContext, useContext } from 'react';

const ActivitiesContext = createContext();

export const activitiesLoader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    
    const { data } = await customFetch('/activities', {
      params
    });

    return { data, 
      searchValues: { ...params } 
    };

  } catch (error) {
    toastService.error(
      error?.response?.data?.msg || 'Failed to fetch activities'
    );
  }
};

const AllActivities = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <ActivitiesContext.Provider value={{ data, searchValues }}>
      <SearchActivity />

      <p className='m-4 text-xl font-bold'>Activities({data?.activities?.length})</p>
      <div className='flex flex-col md:grid grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-4'>
        {data.activities?.length > 0 ? (
          data.activities.map((activity) => (
            <ActivityCard key={activity._id} activity={activity} />
          ))
        ) : (
          <p className='text-gray-500'>No activities found.</p>
        )}
      </div>
    </ActivitiesContext.Provider>
  );
};

export const useActivityContext = () => useContext(ActivitiesContext);

export default AllActivities;
