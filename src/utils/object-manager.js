const removeNullEntries = (obj) => {
  for (const [key, value] of Object.entries(obj))
    if (value === null) delete obj[key];
  return obj;
};

export { removeNullEntries };
