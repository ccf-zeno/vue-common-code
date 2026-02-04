import { useRoute as _useRoute, useRouter } from 'vue-router';

export const useRoute = () => {
  const route = _useRoute();
  const router = useRouter();

  function getQuery(key: string, type?: 'string'): string | null;
  function getQuery(key: string, type?: 'array'): string[] | null;
  function getQuery(key: string, type: 'string' | 'array' = 'string') {
    if (type === 'string') {
      const value = route.query[key];
      if (!value) {
        return null;
      } else if (typeof value === 'string') {
        return value;
      } else {
        return value[0];
      }
    }

    if (type === 'array') {
      const value = route.query[key];
      if (!value) {
        return null;
      } else if (typeof value === 'string') {
        return [value];
      } else {
        return value;
      }
    }

    return null;
  }

  return {
    route,
    router,
    getQuery,
  };
};
