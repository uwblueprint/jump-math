interface LinkItemProps {
  name: string;
  url: string;
  // eslint-disable-next-line react/no-unused-prop-types
  subPages?: LinkItemProps[];
}

export interface LinkItemArrayProps {
  linkItems: LinkItemProps[];
}

export default LinkItemProps;
