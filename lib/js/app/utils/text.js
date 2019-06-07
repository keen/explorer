export const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export const slugify = name => name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/ /g, '-');
