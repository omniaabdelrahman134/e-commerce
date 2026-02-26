import React from 'react';

export default async function GetAllCategories() {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`, {
    headers: {
      'Content-type': 'application/json',
    },
  });

  const payload = await res.json();
  console.log(payload);
  return payload;
}
