import {
  RedirectProps,
  RouteProps as RoutePropsInterface,
} from 'react-router-dom';

export type Mounted = {
  [path: string]: boolean;
};

export interface Location {
  pathname: string;
  search: string;
  state: unknown;
  hash: string;
  key?: string | undefined;
}

export type Match = {
  params: { [key: string]: string };
  isExact: boolean;
  path: string;
  url: string;
};

export type ComputedMatch = Match | null;

export interface SwitchProps {
  children: SwitchChild | SwitchChild[];
  onChange?: (location: Location) => void;
}

export interface SwitchChildProps extends RedirectProps {
  computedMatch: ComputedMatch;
  location: Location;
}

export type SwitchChild = {
  props: SwitchChildProps;
};

export interface RouteProps extends RoutePropsInterface {
  path: string | undefined;
  location?: Location;
  computedMatch?: ComputedMatch;
}

export interface Context {
  getAllMounted: () => Mounted;
  getMounted: (path: string[] | string | undefined) => boolean;
  setMounted: (path: string) => void;
  setUnMounted: (path: string | string[]) => void;
}
