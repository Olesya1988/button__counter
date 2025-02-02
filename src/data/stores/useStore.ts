import create from "zustand";
import { devtools } from "zustand/middleware";
import { Store } from "../interfaces.tsx";
import { data } from "../data.ts";

// создаём store
export const useStore = create<Store>(
  devtools((set, get) => ({
    items: data, // массив элементов
    increment: (id: number) => {
      // увеличение счётчика
      const { items } = get();
      // запуска лоадинга
      set({
        items: items.map((item) => ({
          ...item,
          loading: item.id === id ? true : false,
        })),
      });
      // увеличение счётчика с задержкой 0,5ms + стоп лоадинга
      setTimeout(() => {
        set({
          items: items.map((item) => ({
            ...item,
            counter: item.id === id ? item.counter + 1 : item.counter,
            loading: item.id === id ? false : false,
          })),
        });
      }, 500);
    },
  }))
);
