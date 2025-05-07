'use client';

import React, { useState } from "react";

export default function PhoneInput() {
  const [phone, setPhone] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.target;
    const { selectionStart } = target;
    const value = target.value.replace(/\D/g, '').trim();
    const size = value.length;

    if (size > 10) return;

    const formatted = [];
    for (let i = 0; i < size; i++) {
      if (size > 3 && i === 0) formatted.push('(');
      formatted.push(value[i]);
      if (size > 3 && i === 2) formatted.push(') ');
      if (size > 5 && i === 5) formatted.push('-');
    }

    const diff = formatted.length - value.length;
    if (selectionStart) target.selectionStart = selectionStart + diff;

    setPhone(formatted.join(''));
  }

  return (
    <label htmlFor="phone" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
      Phone
      <input type="text"
             id="phone"
             value={phone}
             onChange={onChange}
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             placeholder="(000) 111-2222"
             required />
    </label>
  )
}
