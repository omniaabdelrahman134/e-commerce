import React from 'react';

export default async function GetSpecificCat(id : string) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`, {
    headers: {
      'Content-type': 'application/json',
    },
  });

  const payload = await res.json();
  console.log(payload);
  return payload;
}
