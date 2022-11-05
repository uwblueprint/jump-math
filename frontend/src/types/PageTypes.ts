interface Page {
  title: string;
  url: string;
  subPages?: Page[];
}

export default Page;
