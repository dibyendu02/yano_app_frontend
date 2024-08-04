import {Countries} from './Countries';

export const getCountryCodeWithFlagAndName = () => {
  return Countries.map(country => ({
    ...country,
    flag: `../assets/country-flags/${country.code.toLowerCase()}.png`,
  }));
};

export const getCountryCodes = () => {
  let data: any = {};
  Countries.map(
    country =>
      (data[country.code] = `require('./${country.code.toLowerCase()}.png')`),
  );
  return data;
};
