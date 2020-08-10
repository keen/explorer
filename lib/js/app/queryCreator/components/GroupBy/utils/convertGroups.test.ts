import { convertGroups } from './convertGroups';

test('should add id for each group', () => {
  const groups = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
  const convertedGroups = convertGroups(groups);

  convertedGroups.forEach((group) => {
    expect(group.id).toBeTruthy();
  });
});
