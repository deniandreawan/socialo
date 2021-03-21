import { useLayoutEffect } from "react";

const useDocumentTitle = (title: string) => {
  useLayoutEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = "Socialo | Social Network";
    }
  }, [title]);
};

export default useDocumentTitle;
