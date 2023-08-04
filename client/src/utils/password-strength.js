const hasNumber = (number) => new RegExp(/[0-9]/).test(number);
const hasMixed = (mixed) =>
  new RegExp(/[a-z]/).test(mixed) && new RegExp(/[A-Z]/).test(mixed);
const hasSpecial = (special) => new RegExp(/[!#@$%^&*)(+=._-]/).test(special);

export const strengthColor = (count) => {
  if (count < 2) return { label: 'Poor', color: '#ff1744' };
  if (count < 3) return { label: 'Weak', color: '#ffea00' };
  if (count < 4) return { label: 'Normal', color: '#ffc400' };
  if (count < 5) return { label: 'Good', color: '#47a546' };
  if (count < 6) return { label: 'Strong', color: '#52c41a' };

  return { label: 'Poor', color: '#ff4d4f' };
};

export const strengthIndicator = (number) => {
  let strengths = 0;
  if (number.length > 5) strengths += 2;
  if (number.length > 7) strengths += 1;
  if (hasNumber(number)) strengths += 1;
  if (hasSpecial(number)) strengths += 1;
  if (hasMixed(number)) strengths += 1;

  return strengths;
};
