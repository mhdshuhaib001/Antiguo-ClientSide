// categoryValidation.ts
import * as Yup from 'yup';

export const categoryValidationSchema = Yup.object({
  name: Yup.string().required('Category name is required'),
  image: Yup.mixed().required('Category image is required'),
  icon: Yup.mixed()
    .required('Category icon is required')
    .test('fileType', 'Only SVG files are allowed', (value) => {
      if (!value) return true;
      const file = value as File;
      return file?.type === 'image/svg+xml';
    }),
});
