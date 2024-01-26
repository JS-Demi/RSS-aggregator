import { string, object } from 'yup';

export default (url, feeds) => {
  const urlSchema = object({
    url: string().url('invalidUrl').notOneOf(feeds, 'alreadyExist'),
  });
  return urlSchema.validate({ url });
};
