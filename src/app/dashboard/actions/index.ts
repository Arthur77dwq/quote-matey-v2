import { changeChatTitle, newChat } from './chat';
import { upgradeToNextPlan } from './plan';

// Actions that can be assigned dynamically
export const ACTIONS = {
  newChat,
  upgradeToNextPlan,
  changeChatTitle,
} as const;

export type ActionName = keyof typeof ACTIONS;
