export const slugify = (name) =>
  name.replace(/[^\w\s-]/g, '').replace(/ /g, '-');
