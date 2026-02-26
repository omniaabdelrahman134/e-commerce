import React from 'react';

export default async function GetAllSubCategories() {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/subcategories`, {
    headers: {
      'Content-type': 'application/json',
    },
  });

  const payload = await res.json();
  console.log(payload);
  return payload;
}
