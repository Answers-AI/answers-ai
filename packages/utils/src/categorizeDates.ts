import { Message } from 'types';

export const categorizeDates = (data: Message[]) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86400000); // 24 * 60 * 60 * 1000
  const sevenDaysAgo = new Date(today.getTime() - 604800000); // 7 * 24 * 60 * 60 * 1000
  const thirtyDaysAgo = new Date(today.getTime() - 2592000000); // 30 * 24 * 60 * 60 * 1000
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const categories: { [key: string]: Array<Message> } = {
    'Today': [],
    'Yesterday': [],
    'Previous 7 Days': [],
    'Previous 30 Days': [],
    'Earlier this Month': [],
    'Earlier': []
  };

  const getDate = (date: Date) =>
    date >= today
      ? 'Today'
      : date >= yesterday
      ? 'Yesterday'
      : date >= sevenDaysAgo
      ? 'Previous 7 Days'
      : date >= thirtyDaysAgo
      ? 'Previous 30 Days'
      : date >= firstDayOfMonth
      ? 'Earlier this Month'
      : 'Earlier';

  data.forEach((item) => {
    categories[getDate(new Date(item.createdAt?.toString() as string))].push(item);
  });

  return categories;
};
