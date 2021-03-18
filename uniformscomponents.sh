#!/bin/bash
set -e -v
npm i @ilb/uniformscomponents react-datepicker
sed -i "4 a import 'react-datepicker/dist/react-datepicker.css';" pages/_app.js
sed -i "/import { createSchemaBridge }/d" pages/autoform.js
sed -i "1 a import { createSchemaBridge, CustomAutoField } from '@ilb/uniformscomponents';" pages/autoform.js
sed -i "20 a \ \ \ \ \ \ \ \ autoField={CustomAutoField}"  pages/autoform.js
sed -i "7 a \ \ '@ilb/uniformscomponents'," next.config.js