const returnMissingFields = (requiredFields: Record<string, any>) => {
  return Object.entries(requiredFields)
    .filter(([_, value]) => value == null || value == undefined || value === "")
    .map(([key]) => key[0].toUpperCase() + key.slice(1));
};

export default returnMissingFields;
