import { serializeGroups } from './serializeGroups';

test('should serialize group', () => {
  const groups = [
    { id: '1', property: '1' },
    { id: '2', property: '2' },
    { id: '3', property: '3' },
    { id: '4', property: '4' },
    { id: '5', property: '5' },
  ];
  const serializedGroups = serializeGroups(groups);

  serializedGroups.forEach((group, idx) => {
    expect(group).toEqual(groups[idx].property);
  });
});
