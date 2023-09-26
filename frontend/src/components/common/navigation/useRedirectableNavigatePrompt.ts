import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import type { Location, LocationDescriptor } from "history";

export type RedirectableNavigatePromptHistory = {
  push: (location: LocationDescriptor) => void;
  replace: (location: LocationDescriptor) => void;
  location: Location;
};

const useRedirectableNavigatePrompt = (
  isDirty: boolean,
): [boolean, RedirectableNavigatePromptHistory] => {
  const history = useHistory();

  const [pushTo, setPushTo] = useState<LocationDescriptor | null>(null);
  useEffect(() => {
    if (pushTo) {
      history.push(pushTo);
      setPushTo(null);
    }
  }, [history, pushTo]);

  const [replaceTo, setReplaceTo] = useState<LocationDescriptor | null>(null);
  useEffect(() => {
    if (replaceTo) {
      history.replace(replaceTo);
      setReplaceTo(null);
    }
  }, [history, replaceTo]);

  const showPrompt = isDirty && !pushTo && !replaceTo;
  return [
    showPrompt,
    {
      push: setPushTo,
      replace: setReplaceTo,
      location: history.location,
    },
  ];
};

export default useRedirectableNavigatePrompt;
