import { createAsyncThunk, createEntityAdapter, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit';
import { Kafka } from 'kafkajs';

import { v4 as uuidv4 } from 'uuid';
import { AppDispatch, RootState } from '../store';

interface Cluster {
  id: string,
  name: string,
  brokers: string[],
  topics?: string[]
}

export const fetchTopics = createAsyncThunk<{ topics: string[], clusterId: string }, string, { state: RootState, dispatch: AppDispatch }>(
  'cluster/fetchTopics',
  async (clusterId, { getState }) => {
    const cluster = selectById(getState().cluster, clusterId);

    if (!cluster) {
      throw new Error(`No cluster matching ${clusterId} found`);
    }
    
    const kafka = new Kafka({ clientId: clusterId, brokers: cluster.brokers });
    const admin = kafka.admin();

    await admin.connect();
    const topics = await admin.listTopics();
    await admin.disconnect();

    return { topics, clusterId };
  }
);

export const clusterAdapter = createEntityAdapter<Cluster>({
  selectId: (cluster) => cluster.id
});

const clusterSlice = createSlice({
  name: 'cluster',
  initialState: clusterAdapter.getInitialState(),
  reducers: {
    addCluster: (state, action: { type: string, payload: { name: string, brokers: string[] }}) => {
      clusterAdapter.addOne(state, { id: uuidv4(), name: action.payload.name, brokers: action.payload.brokers });
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTopics.fulfilled, (state, { payload }) => {
      clusterAdapter.updateOne(state, { id: payload.clusterId, changes: {topics: payload.topics} });
    });
  }
});

export const { selectById, selectAll } = clusterAdapter.getSelectors();
export const { addCluster } = clusterSlice.actions;
export default clusterSlice.reducer;