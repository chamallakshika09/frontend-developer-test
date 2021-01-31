import { sortData } from './sortData';
import { ASCENDING, DESCENDING } from './types';
const data = [
  {
    id: '8bd0166f-f0c6-48fd-9fcd-a17e76eb1e92',
    timestamp: new Date('2020/2/15').getTime(),
    diff: [{ field: 'name', oldValue: 'Bruce', newValue: 'Nick' }],
  },
  {
    id: 'e28d290a-a2f2-48c2-9001-ff43884e271b',
    timestamp: new Date('2020/2/14').getTime(),
    diff: [{ field: 'name', oldValue: 'John', newValue: 'Bruce' }],
  },
  {
    id: '0a75a2b3-be64-4aeb-ba4c-8ddb913791ac',
    timestamp: new Date('2020/2/16').getTime(),
    diff: [{ field: 'name', oldValue: 'Nick', newValue: 'Michel' }],
  },
];

describe('sortData functionality', () => {
  it('should sort data in ascending order when passed asc as argument', () => {
    const expectedOutput = [
      {
        id: 'e28d290a-a2f2-48c2-9001-ff43884e271b',
        timestamp: new Date('2020/2/14').getTime(),
        diff: [{ field: 'name', oldValue: 'John', newValue: 'Bruce' }],
      },
      {
        id: '8bd0166f-f0c6-48fd-9fcd-a17e76eb1e92',
        timestamp: new Date('2020/2/15').getTime(),
        diff: [{ field: 'name', oldValue: 'Bruce', newValue: 'Nick' }],
      },
      {
        id: '0a75a2b3-be64-4aeb-ba4c-8ddb913791ac',
        timestamp: new Date('2020/2/16').getTime(),
        diff: [{ field: 'name', oldValue: 'Nick', newValue: 'Michel' }],
      },
    ];
    expect(sortData(data, ASCENDING)).toStrictEqual(expectedOutput);
  });

  it('should sort data in descending order when passed desc as argument', () => {
    const expectedOutput = [
      {
        id: '0a75a2b3-be64-4aeb-ba4c-8ddb913791ac',
        timestamp: new Date('2020/2/16').getTime(),
        diff: [{ field: 'name', oldValue: 'Nick', newValue: 'Michel' }],
      },
      {
        id: '8bd0166f-f0c6-48fd-9fcd-a17e76eb1e92',
        timestamp: new Date('2020/2/15').getTime(),
        diff: [{ field: 'name', oldValue: 'Bruce', newValue: 'Nick' }],
      },
      {
        id: 'e28d290a-a2f2-48c2-9001-ff43884e271b',
        timestamp: new Date('2020/2/14').getTime(),
        diff: [{ field: 'name', oldValue: 'John', newValue: 'Bruce' }],
      },
    ];
    expect(sortData(data, DESCENDING)).toStrictEqual(expectedOutput);
  });
});
