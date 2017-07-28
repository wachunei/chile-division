import source from '../../src';

const transform = () => {
  const {
    communes,
    districts,
    provinces,
    provincialCircumscriptions,
    regions,
    senatorialCircumscriptions,
  } = source;

  const transformedCommunes = communes.map(commune => ({
    ...commune,
    code: Number(commune.code),
    province: Number(commune.province),
  }));

  const transformedDistricts = districts.map(district => ({
    ...district,
    code: Number(district.code),
    region: Number(district.region),
    communes: district.communes.map(Number),
    apportionment: Number(district.apportionment),
  }));

  const transformedProvinces = provinces.map(province => ({
    ...province,
    code: Number(province.code),
    region: Number(province.region),
  }));

  const transformedProvincialCircumscriptions = provincialCircumscriptions.map(
    provincialCircumscription => ({
      ...provincialCircumscription,
      province: Number(provincialCircumscription.province),
      communes: provincialCircumscription.communes.map(Number),
      apportionment: Number(provincialCircumscription.apportionment),
    })
  );

  const transformedRegions = regions.map(region => ({
    ...region,
    code: Number(region.code),
    geoOrder: Number(region.geoOrder),
  }));

  const transformedSenatorialCircumscriptions = senatorialCircumscriptions.map(
    senatorialCircumscription => ({
      ...senatorialCircumscription,
      code: Number(senatorialCircumscription.code),
      apportionment: Number(senatorialCircumscription.apportionment),
      region: Number(senatorialCircumscription.region),
    })
  );

  return {
    communes: transformedCommunes,
    districts: transformedDistricts,
    provinces: transformedProvinces,
    provincialCircumscriptions: transformedProvincialCircumscriptions,
    regions: transformedRegions,
    senatorialCircumscriptions: transformedSenatorialCircumscriptions,
  };
};

export default {
  transform,
};
