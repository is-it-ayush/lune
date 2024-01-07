/**
Lune
Copyright (C) 2024 ayush.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "poppins-100": ["PoppinsThin"],
        "poppins-200": ["PoppinsExtraLight"],
        "poppins-300": ["PoppinsLight"],
        "poppins-400": ["PoppinsRegular"],
        "poppins-500": ["PoppinsMedium"],
        "poppins-600": ["PoppinsSemiBold"],
        "poppins-700": ["PoppinsBold"],
        "poppins-800": ["PoppinsExtraBold"],
        "poppins-900": ["PoppinsBlack"],
      },
    },
  },
  plugins: [],
};
