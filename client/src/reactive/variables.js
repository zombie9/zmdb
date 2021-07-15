import { makeVar } from '@apollo/client';

export const filterList = makeVar({
  title: null,
  director: null,
  year: null
})