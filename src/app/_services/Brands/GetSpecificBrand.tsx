export default async function GetSingleBrand(id: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
  );

  console.log('STATUS:', res.status);

  const data = await res.json();
  console.log('DATA:', data);

  return data;
}
 