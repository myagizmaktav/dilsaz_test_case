// eslint-disable-next-line no-unused-vars
type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
  ? A
  : never;

type fetchInputType = ArgumentTypes<typeof fetch>;

export const fetcher = (...args: fetchInputType) =>
  fetch(...args).then((res) => res.json());
