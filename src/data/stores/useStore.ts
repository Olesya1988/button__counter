import create, { State, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { Store } from "../interfaces.tsx";
import { data } from "../data.ts";

function isStore(object: any): object is Store {
  return "items" in object;
}

// обновление store в localStorag
const localStorageUpdate =
  <T extends State>(config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) =>
    config(
      (nextState, ...args) => {
        if (isStore(nextState)) {
          window.localStorage.setItem("items", JSON.stringify(nextState.items));
        }
        set(nextState, ...args);
      },
      get,
      api
    );

// получаем сохранённый store из localStorag
const getCurrentState = () => {
  try {
    const currentState = JSON.parse(
      window.localStorage.getItem("items") || data
    );
    return currentState;
  } catch (err) {
    window.localStorage.setItem("items", data);
  }
  return data;
};

// создаём store
export const useStore = create<Store>(
  localStorageUpdate(
    devtools((set, get) => ({
      items: getCurrentState(), // массив элементов
      modal: false, // статус модального окна
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
        set({
          modal: true,
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
  )
);
