import { createSlice } from '@reduxjs/toolkit'

export interface ISingleLeaderboardData {
  avatar: string
  coins: number
  mobile: string
  user_id: string
  user_rank: number
  winner_reward: {
    description: string
    image_url: string
  }
}

export interface ILeaderboardData {
  my_rank: ISingleLeaderboardData
  leaderboard: ISingleLeaderboardData[]
}

export interface LeaderboardState {
  my_rank: ISingleLeaderboardData
  leaderboard: ISingleLeaderboardData[]
}

const initialState: LeaderboardState = {
  my_rank: {} as ISingleLeaderboardData,
  leaderboard: []
}

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    updateLeaderboard: (state, action) => {
      const { my_rank, leaderboard } = action.payload
      state.my_rank = { ...my_rank }
      state.leaderboard = [...leaderboard]
    }
  }
})

export const { updateLeaderboard } = leaderboardSlice.actions
export default leaderboardSlice.reducer
