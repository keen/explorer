import { sortConnectedDashboards } from './sortConnectedDashboards';

const connectedDashboards = [
  {
    title: null,
    id: '3a09c69c-979f-4a89-82cb-3bd2c2b667bb',
  },
  {
    title: null,
    id: '3ffcc7bf-0cb1-4ef6-98cc-04dc2be3b1f4',
  },
  {
    title: 'Clone',
    id: 'b1e8c7b4-ba36-4c5d-b222-41b5ada15db8',
  },
  {
    title: '12Clone',
    id: 'b1e8c7b4-ba36-4c5d-b222-41b5ada15db8',
  },
  {
    title: 'Bar',
    id: 'b1e8c7b4-ba36-4c5d-b222-41b5ada15db8',
  },
  {
    title: null,
    id: 'be8ce4fd-cb3e-4e41-844a-61e22f9af014',
  },
];

test('Sorts array of connected dashboards', () => {
  const sortedDashboards = sortConnectedDashboards(connectedDashboards);
  expect(sortedDashboards).toStrictEqual([
    {
      id: 'b1e8c7b4-ba36-4c5d-b222-41b5ada15db8',
      title: '12Clone',
    },
    {
      id: 'b1e8c7b4-ba36-4c5d-b222-41b5ada15db8',
      title: 'Bar',
    },
    {
      id: 'b1e8c7b4-ba36-4c5d-b222-41b5ada15db8',
      title: 'Clone',
    },
    {
      id: '3a09c69c-979f-4a89-82cb-3bd2c2b667bb',
      title: null,
    },
    {
      id: '3ffcc7bf-0cb1-4ef6-98cc-04dc2be3b1f4',
      title: null,
    },
    {
      id: 'be8ce4fd-cb3e-4e41-844a-61e22f9af014',
      title: null,
    },
  ]);
});
