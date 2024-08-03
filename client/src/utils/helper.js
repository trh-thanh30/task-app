export const validateEmail = (email) => {
  const regex = /^[\w-^\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
};
export const getInitilas = (name) => {
  if (!name) return "";
  const words = name.split(" ");
  let initilas = "";
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initilas += words[i][0];
  }
  return initilas.toUpperCase()
};
