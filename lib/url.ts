import qs from "query-string";

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}
export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const querySting = qs.parse(params);

  querySting[key] = value;

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: querySting,
  });
};

export const removeKeysFromUrlQuery = ({
  params,
  keysToRemove,
}: {
  params: string;
  keysToRemove: string[];
}) => {
  const querySting = qs.parse(params);
  keysToRemove.forEach((key) => {
    delete querySting[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: querySting,
    },
    { skipNull: true }
  );
};
