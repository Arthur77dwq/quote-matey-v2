import { search } from './dashboardGlobalSearch';

export const ACTIONS = {
  newChat: () => {},
  upgradeToNextPlan: (planId: string) => {
    planId.trim();
  },
  search,
};
