import type { ISearchPagation } from '../type'

export interface ICreateDictionary {
  id: number;
  code: string;
  describe: string;
  items?: DictionaryItem[];
  enabled: boolean;
}

export interface IDictionaryItem {
  id: number;
  text: string;
}

export type IDictionary = ICreateDictionary

export interface ISearchDictionary extends ISearchPagation {
  name?: string;
  describe?: string;
}

